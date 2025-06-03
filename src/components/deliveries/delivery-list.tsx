"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  MapPin,
  Calendar,
  Truck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeliveryForm } from "./delivery-form";

interface DeliveryListProps {
  status: "active" | "pending" | "completed";
}

export function DeliveryList({ status }: DeliveryListProps) {
  // Mock delivery data
  const deliveries = [
    {
      id: "1",
      title: "Organic Tomatoes Delivery",
      from: "Green Valley Farm",
      to: "Nairobi Central Market",
      pickupDate: "2023-11-15",
      deliveryDate: "2023-11-16",
      status: "active",
      items: [{ name: "Organic Tomatoes", quantity: "500 kg" }],
      vehicle: "Refrigerated Truck",
      driver: "John Mwangi",
      notes: "Handle with care. Keep refrigerated.",
    },
    {
      id: "2",
      title: "Maize Bulk Delivery",
      from: "Central Region Farm",
      to: "Eastern Distribution Center",
      pickupDate: "2023-11-18",
      deliveryDate: "2023-11-19",
      status: "pending",
      items: [{ name: "Maize", quantity: "2 tons" }],
      vehicle: "Cargo Truck",
      driver: "David Kimani",
      notes: "Bulk delivery. Loading assistance required.",
    },
    {
      id: "3",
      title: "Mixed Vegetables Delivery",
      from: "Western Region Farm",
      to: "Local Supermarket Chain",
      pickupDate: "2023-11-10",
      deliveryDate: "2023-11-10",
      status: "completed",
      items: [
        { name: "Kale", quantity: "200 kg" },
        { name: "Carrots", quantity: "150 kg" },
        { name: "Onions", quantity: "100 kg" },
      ],
      vehicle: "Delivery Van",
      driver: "Sarah Ochieng",
      notes: "Multiple drop-off points. Contact store managers upon arrival.",
    },
    {
      id: "4",
      title: "Dairy Products Delivery",
      from: "Highland Dairy Farm",
      to: "Urban Retailers",
      pickupDate: "2023-11-14",
      deliveryDate: "2023-11-14",
      status: "active",
      items: [
        { name: "Fresh Milk", quantity: "300 liters" },
        { name: "Yogurt", quantity: "100 kg" },
      ],
      vehicle: "Refrigerated Van",
      driver: "Michael Omondi",
      notes: "Temperature-sensitive products. Maintain cold chain.",
    },
  ];

  const filteredDeliveries = deliveries.filter(
    (delivery) => delivery.status === status,
  );

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDeliveries.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-muted-foreground">No {status} deliveries found.</p>
        </div>
      ) : (
        filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{delivery.title}</h3>
                  <Badge
                    className={`mt-1 ${status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Delivery
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Delivery</DialogTitle>
                          <DialogDescription>
                            Update the details of this delivery
                          </DialogDescription>
                        </DialogHeader>
                        <DeliveryForm initialData={delivery} />
                      </DialogContent>
                    </Dialog>
                    {status !== "completed" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Cancel Delivery
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="text-sm">
                      <span className="font-medium">From:</span> {delivery.from}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">To:</span> {delivery.to}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="text-sm">
                    <span className="font-medium">Pickup:</span>{" "}
                    {formatDate(delivery.pickupDate)}
                  </div>
                </div>

                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="text-sm">
                    <span className="font-medium">Delivery:</span>{" "}
                    {formatDate(delivery.deliveryDate)}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-sm font-medium">Items:</div>
                  <ul className="text-sm text-muted-foreground">
                    {delivery.items.map((item, index) => (
                      <li key={index}>
                        {item.name} ({item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between border-t mt-4">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Button>
              {status === "active" && (
                <Button size="sm">
                  <Truck className="mr-2 h-4 w-4" /> Track
                </Button>
              )}
              {status === "pending" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Edit Delivery</DialogTitle>
                      <DialogDescription>
                        Update the details of this delivery
                      </DialogDescription>
                    </DialogHeader>
                    <DeliveryForm initialData={delivery} />
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
