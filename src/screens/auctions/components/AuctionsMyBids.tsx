"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Clock, DollarSign, Eye } from "lucide-react";
import { useState } from "react";
import { AuctionsDetails } from "./AuctionsDetails";

export function AuctionsMyBids() {
    const [selectedAuction, setSelectedAuction] = useState<any>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // Mock bids data
    const bids = [
        {
            id: "1",
            auction: {
                id: "1",
                title: "Premium Dairy Cows",
                category: "Livestock",
                type: "Cattle",
                quantity: 5,
                startingBid: 1200,
                currentBid: 1450,
                bidCount: 8,
                endDate: "2023-11-15T14:00:00",
                status: "active",
                location: "Eastern Region Farm",
                image:
                    "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80",
                description:
                    "Healthy dairy cows with excellent milk production history. All vaccinations up to date.",
                seller: {
                    name: "Green Valley Farm",
                    rating: 4.8,
                    verified: true,
                },
            },
            amount: 1450,
            date: "2023-11-10T09:30:00",
            status: "highest",
            outbid: false,
        },
        {
            id: "2",
            auction: {
                id: "2",
                title: "Merino Sheep Flock",
                category: "Livestock",
                type: "Sheep",
                quantity: 12,
                startingBid: 800,
                currentBid: 950,
                bidCount: 5,
                endDate: "2023-11-18T16:00:00",
                status: "active",
                location: "Central Region Farm",
                image:
                    "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80",
                description:
                    "Quality Merino sheep known for premium wool. Healthy and well-maintained.",
                seller: {
                    name: "Highland Pastures",
                    rating: 4.6,
                    verified: true,
                },
            },
            amount: 900,
            date: "2023-11-09T14:15:00",
            status: "outbid",
            outbid: true,
        },
        {
            id: "3",
            auction: {
                id: "6",
                title: "Vintage Tractor",
                category: "Equipment",
                type: "Machinery",
                quantity: 1,
                startingBid: 5000,
                currentBid: 6200,
                bidCount: 12,
                endDate: "2023-11-05T18:00:00",
                status: "completed",
                location: "Southern Region Farm",
                image:
                    "https://images.unsplash.com/photo-1588862081167-d5b98006637e?w=800&q=80",
                description:
                    "Well-maintained vintage tractor in excellent working condition. Perfect for small farms or collectors.",
                seller: {
                    name: "Farm Equipment Depot",
                    rating: 4.9,
                    verified: true,
                },
            },
            amount: 6200,
            date: "2023-11-05T17:45:00",
            status: "won",
            outbid: false,
        },
        {
            id: "4",
            auction: {
                id: "7",
                title: "Irrigation System",
                category: "Equipment",
                type: "Irrigation",
                quantity: 1,
                startingBid: 3000,
                currentBid: 3500,
                bidCount: 7,
                endDate: "2023-11-03T12:00:00",
                status: "completed",
                location: "Western Region Farm",
                image:
                    "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=800&q=80",
                description:
                    "Complete irrigation system suitable for medium-sized farms. Includes pumps, pipes, and sprinklers.",
                seller: {
                    name: "AgriTech Solutions",
                    rating: 4.7,
                    verified: true,
                },
            },
            amount: 3400,
            date: "2023-11-03T11:30:00",
            status: "lost",
            outbid: true,
        },
    ];

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Function to calculate time remaining
    const getTimeRemaining = (endDate: string) => {
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        const distance = end - now;

        if (distance < 0) return "Ended";

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days}d ${hours}h left`;
        if (hours > 0) return `${hours}h ${minutes}m left`;
        return `${minutes}m left`;
    };

    const handleViewDetails = (auction: any) => {
        setSelectedAuction(auction);
        setDetailsOpen(true);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Bids</CardTitle>
                    <CardDescription>
                        Track your bids on livestock auctions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {bids.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">
                                You haven't placed any bids yet.
                            </p>
                            <Button className="mt-4">Browse Auctions</Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Auction</TableHead>
                                    <TableHead>Your Bid</TableHead>
                                    <TableHead>Current Bid</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bids.map((bid) => (
                                    <TableRow key={bid.id}>
                                        <TableCell className="font-medium">
                                            {bid.auction.title}
                                        </TableCell>
                                        <TableCell>${bid.amount.toFixed(2)}</TableCell>
                                        <TableCell>${bid.auction.currentBid.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`${bid.status === "highest"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                        : bid.status === "outbid"
                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                                            : bid.status === "won"
                                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                                    }`}
                                            >
                                                {bid.status === "highest"
                                                    ? "Highest Bidder"
                                                    : bid.status === "outbid"
                                                        ? "Outbid"
                                                        : bid.status === "won"
                                                            ? "Won"
                                                            : "Lost"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {bid.auction.status === "active" ? (
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                                    <span>{getTimeRemaining(bid.auction.endDate)}</span>
                                                </div>
                                            ) : (
                                                formatDate(bid.auction.endDate)
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(bid.auction)}
                                                >
                                                    <Eye className="h-4 w-4 mr-1" /> Details
                                                </Button>
                                                {bid.status === "outbid" &&
                                                    bid.auction.status === "active" && (
                                                        <Button size="sm">
                                                            <DollarSign className="h-4 w-4 mr-1" /> Bid Again
                                                        </Button>
                                                    )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
