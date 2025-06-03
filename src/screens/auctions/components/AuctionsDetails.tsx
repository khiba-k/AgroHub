"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    DollarSign,
    MapPin,
    Star,
    User
} from "lucide-react";
import { useState } from "react";

interface AuctionDetailsProps {
    auction: any;
}

export function AuctionsDetails({ auction }: AuctionDetailsProps) {
    const [bidAmount, setBidAmount] = useState<string>(
        (auction.currentBid + 50).toString(),
    );
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock bid history
    const bidHistory = [
        {
            id: "1",
            bidder: "User123",
            amount: auction.currentBid,
            date: "2023-11-10T09:30:00",
        },
        {
            id: "2",
            bidder: "Farmer45",
            amount: auction.currentBid - 50,
            date: "2023-11-09T14:15:00",
        },
        {
            id: "3",
            bidder: "AgriPro",
            amount: auction.currentBid - 100,
            date: "2023-11-08T11:20:00",
        },
    ];

    // Mock images (in a real app, these would come from the auction data)
    const images = [
        auction.image,
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80",
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
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

        if (distance < 0) return "Auction ended";

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const handlePlaceBid = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Bid placed successfully!");
        }, 1000);
    };

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div className="space-y-2">
                    <div className="relative aspect-video overflow-hidden rounded-lg border">
                        <img
                            src={images[activeImageIndex]}
                            alt={auction.title}
                            className="w-full h-full object-cover"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                            onClick={nextImage}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer ${index === activeImageIndex ? "border-primary" : "border-transparent"}`}
                                onClick={() => setActiveImageIndex(index)}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Auction Details */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">{auction.title}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                            <Badge>{auction.category}</Badge>
                            <Badge variant="outline">{auction.type}</Badge>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{auction.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Ends: {formatDate(auction.endDate)}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-orange-500" />
                            <span className="font-medium text-orange-500">
                                {getTimeRemaining(auction.endDate)}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm">Starting Bid:</span>
                            <span className="font-medium">
                                ${auction.startingBid.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Current Bid:</span>
                            <span className="font-bold text-lg text-primary">
                                ${auction.currentBid.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Bids:</span>
                            <span className="font-medium">{auction.bidCount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Quantity:</span>
                            <span className="font-medium">
                                {auction.quantity} {auction.quantity > 1 ? "items" : "item"}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Seller: {auction.seller.name}</span>
                            {auction.seller.verified && (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{auction.seller.rating}</span>
                            <span className="text-xs text-muted-foreground">
                                (Seller Rating)
                            </span>
                        </div>
                    </div>

                    {/* Bid Form */}
                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle className="text-lg">Place Your Bid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-2">
                                <div className="relative flex-1">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="number"
                                        min={auction.currentBid + 1}
                                        step="1"
                                        className="pl-9"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handlePlaceBid}
                                    disabled={
                                        isSubmitting || parseFloat(bidAmount) <= auction.currentBid
                                    }
                                >
                                    {isSubmitting ? "Placing Bid..." : "Place Bid"}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Enter ${(auction.currentBid + 1).toFixed(2)} or more
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Tabs defaultValue="details">
                <TabsList className="w-full">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="bidHistory">Bid History</TabsTrigger>
                    <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                    <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p>{auction.description}</p>
                    </div>
                </TabsContent>
                <TabsContent value="bidHistory" className="space-y-4 pt-4">
                    {bidHistory.length > 0 ? (
                        <div className="space-y-4">
                            {bidHistory.map((bid) => (
                                <div
                                    key={bid.id}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <div className="font-medium">{bid.bidder}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {formatDate(bid.date)}
                                        </div>
                                    </div>
                                    <div className="font-bold">${bid.amount.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No bids yet.</p>
                    )}
                </TabsContent>
                <TabsContent value="terms" className="space-y-4 pt-4">
                    <div>
                        <h3 className="font-semibold mb-2">Auction Terms</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>All sales are final.</li>
                            <li>
                                Payment must be completed within 48 hours of auction closing.
                            </li>
                            <li>
                                Buyer is responsible for transportation arrangements and costs.
                            </li>
                            <li>
                                Inspection is available by appointment before placing a bid.
                            </li>
                            <li>
                                The seller reserves the right to withdraw the item from the
                                auction at any time before the actual sale.
                            </li>
                        </ul>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
