"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { ProduceForm } from "./ProduceForm";

interface ProduceListProps {
    status: "active" | "draft" | "sold";
}

export function ProduceList({ status }: ProduceListProps) {
    // Mock produce data
    const produceItems = [
        {
            id: "1",
            name: "Organic Tomatoes",
            category: "Vegetables",
            quantity: "500 kg",
            price: "$2.99/kg",
            image:
                "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
            status: "active",
            harvestDate: "2023-10-15",
            location: "Eastern Region Farm",
        },
        {
            id: "2",
            name: "Fresh Maize",
            category: "Grains",
            quantity: "1,200 kg",
            price: "$1.49/kg",
            image:
                "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
            status: "active",
            harvestDate: "2023-10-10",
            location: "Central Region Farm",
        },
        {
            id: "3",
            name: "Organic Kale",
            category: "Vegetables",
            quantity: "300 kg",
            price: "$3.29/kg",
            image:
                "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=800&q=80",
            status: "draft",
            harvestDate: "2023-10-20",
            location: "Western Region Farm",
        },
        {
            id: "4",
            name: "Free-Range Eggs",
            category: "Poultry",
            quantity: "200 dozen",
            price: "$4.99/dozen",
            image:
                "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&q=80",
            status: "sold",
            harvestDate: "2023-10-05",
            location: "Eastern Region Farm",
        },
    ];

    const filteredItems = produceItems.filter((item) => item.status === status);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">
                        No {status} produce listings found.
                    </p>
                </div>
            ) : (
                filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-video relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                            <Badge className="absolute top-2 right-2">{item.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.location}
                                    </p>
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
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Listing
                                                </DropdownMenuItem>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[600px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Produce Listing</DialogTitle>
                                                    <DialogDescription>
                                                        Update the details of your produce listing
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <ProduceForm initialData={item} />
                                            </DialogContent>
                                        </Dialog>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Quantity:</span>
                                    <span className="font-medium">{item.quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Price:</span>
                                    <span className="font-medium">{item.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Harvest Date:</span>
                                    <span className="font-medium">{item.harvestDate}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                            <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" /> View Details
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit Produce Listing</DialogTitle>
                                        <DialogDescription>
                                            Update the details of your produce listing
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ProduceForm initialData={item} />
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))
            )}
        </div>
    );
}
