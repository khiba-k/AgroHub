"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import ProduceFormListingUpload from "./ProduceListingUpload";

interface ProduceFormProps {
    initialData?: any;
}

export function ProduceForm({ initialData }: ProduceFormProps) {
    const [harvestDate, setHarvestDate] = useState<Date | undefined>(
        initialData?.harvestDate ? new Date(initialData.harvestDate) : undefined,
    );
    const [status, setStatus] = useState(initialData?.status || "active");
    const [quantity, setQuantity] = useState(initialData?.quantity || "");
    const [pricePerUnit] = useState(2.50); // This would come from system/admin
    const [estimatedIncome, setEstimatedIncome] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories with common options
    const categories = [
        "Vegetables", "Fruits", "Grains", "Legumes", "Dairy", "Poultry", "Livestock", "Herbs & Spices", "Nuts & Seeds", "Other"
    ];

    // Common produce names by category (simplified list)
    const produceNames = [
        "Tomatoes", "Potatoes", "Onions", "Carrots", "Cabbage", "Spinach", "Lettuce", "Peppers",
        "Apples", "Bananas", "Oranges", "Mangoes", "Avocados", "Berries", "Grapes",
        "Maize", "Rice", "Wheat", "Barley", "Beans", "Peas", "Lentils", "Chickpeas",
        "Milk", "Eggs", "Cheese", "Chicken", "Beef", "Pork", "Goat", "Lamb"
    ];

    // Produce types (varieties/specifications)
    const produceTypes = [
        "Organic", "Conventional", "Heirloom", "Hybrid", "Fresh", "Dried", "Processed",
        "Grade A", "Grade B", "Premium", "Standard", "Free Range", "Grass Fed"
    ];

    const units = [
        "Kilograms (kg)", "Grams (g)", "Tons", "Liters (L)", "Dozen", "Pieces", "Crates", "Bags", "Bunches"
    ];

    // Calculate estimated income when quantity changes
    useEffect(() => {
        const numQuantity = parseFloat(quantity) || 0;
        setEstimatedIncome(numQuantity * pricePerUnit);
    }, [quantity, pricePerUnit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            // Close dialog or redirect
        }, 1000);
    };

    const ComboboxSelect = ({ items, placeholder, defaultValue, name }: {
        items: string[];
        placeholder: string;
        defaultValue?: string;
        name: string;
    }) => {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(defaultValue || "");
        
        return (
            <div className="relative">
                <Input
                    name={name}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="pr-10"
                    list={`${name}-list`}
                />
                <datalist id={`${name}-list`}>
                    {items.map((item) => (
                        <option key={item} value={item} />
                    ))}
                </datalist>
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add New Produce</h1>
                <p className="text-gray-600 mt-1">Fill in the details to list your produce</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <ComboboxSelect
                                items={categories}
                                placeholder="Select or type category"
                                defaultValue={initialData?.category}
                                name="category"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="produce-name">Produce Name</Label>
                            <ComboboxSelect
                                items={produceNames}
                                placeholder="Select or type produce name"
                                defaultValue={initialData?.produceName}
                                name="produce-name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="produce-type">Produce Type</Label>
                        <ComboboxSelect
                            items={produceTypes}
                            placeholder="Select or type produce type (e.g., Organic, Grade A)"
                            defaultValue={initialData?.produceType}
                            name="produce-type"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Select defaultValue={initialData?.unit || "kg"}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {units.map((unit) => (
                                        <SelectItem key={unit} value={unit.split(" ")[0].toLowerCase()}>
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                placeholder="e.g. 500"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Farm Location</Label>
                        <Input
                            id="location"
                            placeholder="e.g. Eastern Region Farm, Nairobi"
                            defaultValue={initialData?.location}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                            <ProduceFormListingUpload />
                        
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Select Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="future-harvest">Future Harvest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {status === "future-harvest" && (
                        <div className="space-y-2">
                            <Label htmlFor="harvest-date">Harvest Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {harvestDate ? format(harvestDate, "PPP") : <span>Pick harvest date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={harvestDate}
                                        onSelect={setHarvestDate}
                                        initialFocus
                                        disabled={(date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="space-y-2">
                            <div className="text-sm text-gray-600">
                                <strong>Pricing Information:</strong>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-sm">
                                <div>
                                    <span className="text-gray-600">Price per unit:</span>
                                    <div className="font-semibold">${pricePerUnit.toFixed(2)}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Quantity:</span>
                                    <div className="font-semibold">{quantity || "0"}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Estimated Income:</span>
                                    <div className="font-bold text-green-600 text-lg">
                                        ${estimatedIncome.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                * Price per unit is set by the system and may vary based on market conditions
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting
                            ? "Saving..."
                            : initialData
                                ? "Update Listing"
                                : "Create Listing"}
                    </Button>
                </div>
            </div>
        </div>
    );
}