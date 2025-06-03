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
import { Calendar as CalendarIcon, Clock, Upload } from "lucide-react";
import { useState } from "react";

interface AuctionFormProps {
    initialData?: any;
}

export function AuctionsForm({ initialData }: AuctionFormProps) {
    const [endDate, setEndDate] = useState<Date | undefined>(
        initialData?.endDate ? new Date(initialData.endDate) : undefined,
    );
    const [endTime, setEndTime] = useState(
        initialData?.endDate
            ? new Date(initialData.endDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            : "",
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
                        <Label htmlFor="title">Auction Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Premium Dairy Cows"
                            defaultValue={initialData?.title}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue={initialData?.category || "livestock"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="livestock">Livestock</SelectItem>
                                <SelectItem value="poultry">Poultry</SelectItem>
                                <SelectItem value="equipment">Farm Equipment</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select defaultValue={initialData?.type || "cattle"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cattle">Cattle</SelectItem>
                                <SelectItem value="sheep">Sheep</SelectItem>
                                <SelectItem value="goats">Goats</SelectItem>
                                <SelectItem value="pigs">Pigs</SelectItem>
                                <SelectItem value="poultry">Poultry</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            min="1"
                            placeholder="e.g. 5"
                            defaultValue={initialData?.quantity}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="starting-bid">Starting Bid ($)</Label>
                        <Input
                            id="starting-bid"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="e.g. 1200"
                            defaultValue={initialData?.startingBid}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reserve-price">Reserve Price ($) (Optional)</Label>
                        <Input
                            id="reserve-price"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="e.g. 1500"
                            defaultValue={initialData?.reservePrice}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="end-time"
                                type="time"
                                className="pl-10"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        placeholder="e.g. Eastern Region Farm"
                        defaultValue={initialData?.location}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe the livestock or items being auctioned..."
                        className="min-h-[100px]"
                        defaultValue={initialData?.description}
                        required
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
                    <Label htmlFor="terms">Auction Terms</Label>
                    <Textarea
                        id="terms"
                        placeholder="Enter any specific terms or conditions for this auction..."
                        className="min-h-[80px]"
                        defaultValue={initialData?.terms}
                    />
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
                            ? "Update Auction"
                            : "Create Auction"}
                </Button>
            </div>
        </form>
    );
}
