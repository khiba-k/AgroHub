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
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { useState } from "react";

interface ProduceFormProps {
    initialData?: any;
}

export function ProduceForm({ initialData }: ProduceFormProps) {
    const [date, setDate] = useState<Date | undefined>(
        initialData?.harvestDate ? new Date(initialData.harvestDate) : undefined,
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Produce Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Organic Tomatoes"
                            defaultValue={initialData?.name}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue={initialData?.category || "vegetables"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vegetables">Vegetables</SelectItem>
                                <SelectItem value="fruits">Fruits</SelectItem>
                                <SelectItem value="grains">Grains</SelectItem>
                                <SelectItem value="dairy">Dairy</SelectItem>
                                <SelectItem value="poultry">Poultry</SelectItem>
                                <SelectItem value="livestock">Livestock</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            placeholder="e.g. 500"
                            defaultValue={initialData?.quantity?.split(" ")[0]}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select defaultValue={initialData?.quantity?.split(" ")[1] || "kg"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                <SelectItem value="g">Grams (g)</SelectItem>
                                <SelectItem value="ton">Tons</SelectItem>
                                <SelectItem value="l">Liters (L)</SelectItem>
                                <SelectItem value="dozen">Dozen</SelectItem>
                                <SelectItem value="pieces">Pieces</SelectItem>
                                <SelectItem value="crates">Crates</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price per Unit</Label>
                        <Input
                            id="price"
                            placeholder="e.g. 2.99"
                            defaultValue={initialData?.price?.replace(/[^0-9.]/g, "")}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue="usd">
                            <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usd">USD ($)</SelectItem>
                                <SelectItem value="kes">KES (KSh)</SelectItem>
                                <SelectItem value="eur">EUR (€)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="harvest-date">Harvest Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Farm Location</Label>
                        <Input
                            id="location"
                            placeholder="e.g. Eastern Region Farm"
                            defaultValue={initialData?.location}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your produce, including quality, growing methods, etc."
                        className="min-h-[100px]"
                        defaultValue={initialData?.description}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Images</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">
                            Drag & drop images here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG or WEBP, up to 5 images (max 5MB each)
                        </p>
                        <Button type="button" variant="outline" size="sm" className="mt-4">
                            Upload Images
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Listing Status</Label>
                    <Select defaultValue={initialData?.status || "draft"}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active (Public)</SelectItem>
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
                            ? "Update Listing"
                            : "Create Listing"}
                </Button>
            </div>
        </form>
    );
}
