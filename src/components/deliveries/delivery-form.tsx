"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Minus } from "lucide-react";

interface DeliveryFormProps {
  initialData?: any;
}

export function DeliveryForm({ initialData }: DeliveryFormProps) {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(
    initialData?.pickupDate ? new Date(initialData.pickupDate) : undefined,
  );
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    initialData?.deliveryDate ? new Date(initialData.deliveryDate) : undefined,
  );
  const [items, setItems] = useState<Array<{ name: string; quantity: string }>>(
    initialData?.items || [{ name: "", quantity: "" }],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Close dialog or redirect
    }, 1000);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: "" }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (
    index: number,
    field: "name" | "quantity",
    value: string,
  ) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Delivery Title</Label>
          <Input
            id="title"
            placeholder="e.g. Organic Tomatoes Delivery"
            defaultValue={initialData?.title}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="from">Pickup Location</Label>
            <Input
              id="from"
              placeholder="e.g. Green Valley Farm"
              defaultValue={initialData?.from}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">Delivery Location</Label>
            <Input
              id="to"
              placeholder="e.g. Nairobi Central Market"
              defaultValue={initialData?.to}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pickup-date">Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {pickupDate ? (
                    format(pickupDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery-date">Delivery Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDate ? (
                    format(deliveryDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={setDeliveryDate}
                  initialFocus
                  disabled={(date) => (pickupDate ? date < pickupDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle Type</Label>
            <Select defaultValue={initialData?.vehicle || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Refrigerated Truck">
                  Refrigerated Truck
                </SelectItem>
                <SelectItem value="Cargo Truck">Cargo Truck</SelectItem>
                <SelectItem value="Delivery Van">Delivery Van</SelectItem>
                <SelectItem value="Refrigerated Van">
                  Refrigerated Van
                </SelectItem>
                <SelectItem value="Pickup Truck">Pickup Truck</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="driver">Driver Name</Label>
            <Input
              id="driver"
              placeholder="e.g. John Mwangi"
              defaultValue={initialData?.driver}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Items</Label>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>
          {items.map((item, index) => (
            <div key={index} className="flex items-end gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                <Input
                  id={`item-name-${index}`}
                  placeholder="e.g. Organic Tomatoes"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  required
                />
              </div>
              <div className="w-1/3 space-y-2">
                <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                <Input
                  id={`item-quantity-${index}`}
                  placeholder="e.g. 500 kg"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", e.target.value)
                  }
                  required
                />
              </div>
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  className="mb-0.5 text-red-500 hover:text-red-700 hover:bg-red-100"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Special Instructions</Label>
          <Textarea
            id="notes"
            placeholder="Enter any special instructions or notes for this delivery..."
            className="min-h-[80px]"
            defaultValue={initialData?.notes}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Delivery Status</Label>
          <Select defaultValue={initialData?.status || "pending"}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Delivery"
              : "Create Delivery"}
        </Button>
      </div>
    </form>
  );
}
