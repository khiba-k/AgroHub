"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import { useFarmStore } from "@/lib/store/userStores";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import { OrdersTable } from "./components/OrdersTable";
import { OrdersHeader } from "./components/OrdersHeader";

export interface Breakdown {
    id: string;
    status: string;
    orderItemId: string;
    produceListingId: string;
    farmId: string;
    quantity: number;
    price: number;
    farmerConfirmed: boolean;
    agrohubConfirmsPayment: boolean;
    farmerConfirmsPayment: boolean;
    farmerShipped: boolean;
    agrohubShipped: boolean;
    delivered: boolean;
    cancelledBy?: string;
    paymentProofUrl?: string;
    invoiceUrl?: string;
    createdAt: string;
    orderItem: {
        order: {
            orderNumber: number;
            createdAt: string;
        };
    };
    produceListing: {
        produce: {
            name: string;
            type: string;
            unitType: string;
        };
        activeDraftListing?: {
            status: string;
            quantity: number;
        };
    };
}

// Loading component
const LoadingOrders = () => (
    <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading orders...</p>
        </div>
    </div>
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Orders() {
    const farmId = useFarmStore((state) => state.farmId);
    const [activeTab, setActiveTab] = useState("all");

    const { data, mutate, isLoading } = useSWR(
        farmId
            ? `/api/orders/farmer?farmId=${farmId}${activeTab !== "all" ? `&tab=${activeTab}` : ""}`
            : null,
        fetcher
    );

    const breakdowns: Breakdown[] = data || [];

    return (
        <div className="space-y-6">
            <OrdersHeader />

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="unconfirmed">Unconfirmed</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="awaiting">Awaiting Pickup</TabsTrigger>
                    <TabsTrigger value="complete">Complete</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <div className="flex justify-between items-center mt-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search orders..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>

                {isLoading ? (
                    <LoadingOrders />
                ) : (
                    <>
                        <TabsContent value="all" className="space-y-4 mt-4">
                            <OrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>

                        <TabsContent value="unconfirmed" className="space-y-4 mt-4">
                            <OrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>

                        <TabsContent value="confirmed" className="space-y-4 mt-4">
                            <OrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>

                        <TabsContent value="awaiting" className="space-y-4 mt-4">
                            <OrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>

                        <TabsContent value="complete" className="space-y-4 mt-4">
                            <OrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>

                        <TabsContent value="cancelled" className="space-y-4 mt-4">
                            <OrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    );
}
