import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Gavel, Plus } from "lucide-react";
import { AuctionsCalendar } from "./components/AuctionsCalendar";
import { AuctionsForm } from "./components/AuctionsForm";
import { AuctionsList } from "./components/AuctionsList";
import { AuctionsMyBids } from "./components/AuctionsMyBids";

export default function Auctions() {
    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Gavel className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Auctions</h1>
                            <p className="text-muted-foreground">
                                Browse and participate in livestock and agricultural auctions
                            </p>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Create Auction
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Create New Auction</DialogTitle>
                                <DialogDescription>
                                    Enter details about your auction
                                </DialogDescription>
                            </DialogHeader>
                            <AuctionsForm />
                        </DialogContent>
                    </Dialog>
                </div>

                <Tabs defaultValue="active">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="active">Active Auctions</TabsTrigger>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="my-auctions">My Auctions</TabsTrigger>
                        <TabsTrigger value="my-bids">My Bids</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active" className="space-y-4 pt-4">
                        <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                        </div>
                        <AuctionsList status="active" />
                    </TabsContent>
                    <TabsContent value="upcoming" className="space-y-4 pt-4">
                        <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                        </div>
                        <AuctionsList status="upcoming" />
                    </TabsContent>
                    <TabsContent value="my-auctions" className="space-y-4 pt-4">
                        <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                        </div>
                        <AuctionsList status="my-auctions" />
                    </TabsContent>
                    <TabsContent value="my-bids" className="space-y-4 pt-4">
                        <AuctionsMyBids />
                    </TabsContent>
                    <TabsContent value="calendar" className="space-y-4 pt-4">
                        <AuctionsCalendar />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
