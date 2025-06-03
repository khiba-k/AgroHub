"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, DollarSign, Plus } from "lucide-react";
import { useState } from "react";
import { AuctionsDetails } from "./AuctionsDetails";
import { AuctionsForm } from "./AuctionsForm";

export function AuctionsCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [view, setView] = useState<"month" | "year">("month");
    const [selectedAuction, setSelectedAuction] = useState<any>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // Mock auction events
    const auctions = [
        {
            id: "1",
            title: "Premium Dairy Cows",
            date: new Date(2023, 10, 15, 14, 0),
            type: "active",
            category: "Livestock",
            currentBid: 1450,
            image:
                "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80",
            description:
                "Healthy dairy cows with excellent milk production history. All vaccinations up to date.",
            location: "Eastern Region Farm",
            quantity: 5,
            startingBid: 1200,
            bidCount: 8,
            endDate: "2023-11-15T14:00:00",
            seller: {
                name: "Green Valley Farm",
                rating: 4.8,
                verified: true,
            },
        },
        {
            id: "2",
            title: "Merino Sheep Flock",
            date: new Date(2023, 10, 18, 16, 0),
            type: "active",
            category: "Livestock",
            currentBid: 950,
            image:
                "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80",
            description:
                "Quality Merino sheep known for premium wool. Healthy and well-maintained.",
            location: "Central Region Farm",
            quantity: 12,
            startingBid: 800,
            bidCount: 5,
            endDate: "2023-11-18T16:00:00",
            seller: {
                name: "Highland Pastures",
                rating: 4.6,
                verified: true,
            },
        },
        {
            id: "3",
            title: "Free-Range Chickens",
            date: new Date(2023, 10, 25, 12, 0),
            type: "upcoming",
            category: "Poultry",
            currentBid: 300,
            image:
                "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
            description:
                "Healthy free-range chickens raised on organic feed. Excellent for egg production.",
            location: "Western Region Farm",
            quantity: 50,
            startingBid: 300,
            bidCount: 0,
            endDate: "2023-11-25T12:00:00",
            seller: {
                name: "Sunrise Poultry",
                rating: 4.5,
                verified: true,
            },
        },
        {
            id: "4",
            title: "Angus Beef Cattle",
            date: new Date(2023, 10, 30, 15, 0),
            type: "upcoming",
            category: "Livestock",
            currentBid: 1500,
            image:
                "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&q=80",
            description:
                "Premium Angus beef cattle. Grass-fed and raised with sustainable farming practices.",
            location: "Northern Region Farm",
            quantity: 3,
            startingBid: 1500,
            bidCount: 0,
            endDate: "2023-11-30T15:00:00",
            seller: {
                name: "Quality Meats Farm",
                rating: 4.9,
                verified: true,
            },
        },
        {
            id: "5",
            title: "Berkshire Pigs",
            date: new Date(2023, 10, 10, 10, 0),
            type: "my-auction",
            category: "Livestock",
            currentBid: 1100,
            image:
                "https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=800&q=80",
            description:
                "Healthy Berkshire pigs known for their superior meat quality. Well-cared for and ready for sale.",
            location: "Your Farm",
            quantity: 8,
            startingBid: 900,
            bidCount: 6,
            endDate: "2023-11-10T10:00:00",
            seller: {
                name: "Your Farm",
                rating: 4.7,
                verified: true,
            },
        },
    ];

    // Function to render calendar day contents
    const renderDay = (day: Date) => {
        const dayAuctions = auctions.filter(
            (auction) => auction.date.toDateString() === day.toDateString(),
        );

        if (dayAuctions.length === 0) return null;

        return (
            <div className="relative h-full w-full p-2">
                <div className="absolute bottom-1 right-1 flex flex-wrap gap-1 justify-end">
                    {dayAuctions.map((auction, i) => (
                        <Badge
                            key={i}
                            variant="outline"
                            className={`${auction.type === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : auction.type === "upcoming" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"}`}
                        >
                            {auction.type === "active"
                                ? "A"
                                : auction.type === "upcoming"
                                    ? "U"
                                    : "M"}
                        </Badge>
                    ))}
                </div>
            </div>
        );
    };

    // Get auctions for the selected date
    const selectedDateAuctions = date
        ? auctions.filter(
            (auction) => auction.date.toDateString() === date.toDateString(),
        )
        : [];

    const handleViewDetails = (auction: any) => {
        setSelectedAuction(auction);
        setDetailsOpen(true);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle>Auction Calendar</CardTitle>
                        <CardDescription>
                            View upcoming and active livestock auctions
                        </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select
                            value={view}
                            onValueChange={(value) => setView(value as "month" | "year")}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="View" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="month">Month</SelectItem>
                                <SelectItem value="year">Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" /> Create Auction
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Create New Auction</DialogTitle>
                                    <DialogDescription>
                                        Enter details about your livestock auction
                                    </DialogDescription>
                                </DialogHeader>
                                <AuctionsForm />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        components={{
                            Day: ({ day, ...props }) => (
                                <div {...props}>
                                    {day.day}
                                    {renderDay(day.date)}
                                </div>
                            ),
                        }}
                    />
                    <div className="mt-4 flex items-center justify-center space-x-4">
                        <div className="flex items-center">
                            <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 mr-2"
                            >
                                A
                            </Badge>
                            <span className="text-sm">Active</span>
                        </div>
                        <div className="flex items-center">
                            <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 mr-2"
                            >
                                U
                            </Badge>
                            <span className="text-sm">Upcoming</span>
                        </div>
                        <div className="flex items-center">
                            <Badge
                                variant="outline"
                                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 mr-2"
                            >
                                M
                            </Badge>
                            <span className="text-sm">My Auctions</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {date
                            ? date.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })
                            : "Select a date"}
                    </CardTitle>
                    <CardDescription>
                        {selectedDateAuctions.length > 0
                            ? `${selectedDateAuctions.length} auction${selectedDateAuctions.length > 1 ? "s" : ""} scheduled`
                            : "No auctions scheduled"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedDateAuctions.length > 0 ? (
                        <div className="space-y-4">
                            {selectedDateAuctions.map((auction, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <Badge
                                        variant="outline"
                                        className={`${auction.type === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : auction.type === "upcoming" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"}`}
                                    >
                                        {auction.type === "active"
                                            ? "Active"
                                            : auction.type === "upcoming"
                                                ? "Upcoming"
                                                : "My Auction"}
                                    </Badge>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{auction.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {auction.date.toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                            })}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Current Bid: ${auction.currentBid}
                                        </p>
                                        <div className="mt-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewDetails(auction)}
                                            >
                                                View Details
                                            </Button>
                                            {auction.type !== "my-auction" && (
                                                <Button size="sm" className="ml-2">
                                                    <DollarSign className="mr-1 h-3 w-3" /> Bid
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-2">
                                No auctions scheduled for this date
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <Plus className="mr-2 h-4 w-4" /> Create Auction
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Create New Auction</DialogTitle>
                                        <DialogDescription>
                                            Enter details about your livestock auction
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AuctionsForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="sm:max-w-[800px]">
                    {selectedAuction && <AuctionsDetails auction={selectedAuction} />}
                </DialogContent>
            </Dialog>
        </div>
    );
}
