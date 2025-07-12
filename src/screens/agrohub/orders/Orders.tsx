"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import { OrdersHeader } from "@/screens/orders/components/OrdersHeader";
import { AgroHubOrdersTable } from "./components/AgroHubOrdersTable";
import { useToastStore } from "@/lib/store/useToastStore";

export async function handleMarkReady(id: string) {
    try {
        await axios.post(`/api/orders/agrohub/${id}/ready`);
        useToastStore.getState().showToast(true, "Marked ready for pickup.");
    } catch {
        useToastStore.getState().showToast(false, "Failed to mark ready.");
    }
}

export async function handleMarkShipped(id: string) {
    try {
        await axios.post(`/api/orders/agrohub/${id}/shipped`);
        useToastStore.getState().showToast(true, "Marked as shipped.");
    } catch {
        useToastStore.getState().showToast(false, "Failed to mark shipped.");
    }
}

export async function handleMarkDelivered(id: string) {
    try {
        await axios.post(`/api/orders/agrohub/${id}/delivered`);
        useToastStore.getState().showToast(true, "Marked as delivered.");
    } catch {
        useToastStore.getState().showToast(false, "Failed to mark delivered.");
    }
}

export async function handleUploadProof(id: string, file: File) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        await axios.post(`/api/orders/agrohub/${id}/upload-proof`, formData);
        useToastStore.getState().showToast(true, "Proof of payment uploaded.");
    } catch {
        useToastStore.getState().showToast(false, "Failed to upload proof.");
    }
}

export async function handleCancel(id: string) {
    try {
        await axios.post(`/api/orders/agrohub/${id}/cancel`);
        useToastStore.getState().showToast(true, "Order cancelled.");
    } catch {
        useToastStore.getState().showToast(false, "Failed to cancel order.");
    }
}

export async function handleConfirmPayment(id: string) {
    try {
        await axios.post(`/api/orders/agrohub/${id}/confirm-payment`);
        useToastStore.getState().showToast(true, "Payment confirmed.");
    } catch {
        useToastStore.getState().showToast(false, "Failed to confirm payment.");
    }
}

// === TYPES ===
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
            buyer: {
                firstname: string;
                lastname: string;
            };
        };
    };

    produceListing: {
        produce: {
            name: string;
            type: string;
            unitType: string;
        };
        farm: {
            name: string;
            contactNumber1: string;
            contactNumber2?: string;
            paymentMethods: {
                id: string;
                type: string;
                isPrimary: boolean;
                isMerchant?: boolean;
                accountHolder?: string;
                accountNumber?: string;
                accountType?: string;
                bankName?: string;
                branchCode?: string;
                merchantName?: string;
                merchantNumber?: string;
                recipientName?: string;
                cellphoneNumber?: string;
            }[];
        };
    };
}

// === FETCHER ===
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// === LOADING ===
const LoadingOrders = () => (
    <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading orders...</p>
        </div>
    </div>
);

// === MAIN ===
export default function Orders() {
    const [activeTab, setActiveTab] = useState("all");

    const { data, mutate, isLoading } = useSWR(
        `/api/orders/agrohub${activeTab !== "all" ? `?tab=${activeTab}` : ""}`,
        fetcher
    );

    const breakdowns: Breakdown[] = data || [];

    return (
        <div className="space-y-6 w-[80%]">
            <OrdersHeader />

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="ready">Ready For Pickup</TabsTrigger>
                    <TabsTrigger value="shipped">Shipped</TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <div className="flex justify-between items-center mt-4">
                    <div className="relative w-full max-w-sm">
                        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search orders..." className="pl-8" /> */}
                    </div>
                    {/* <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button> */}
                </div>

                {isLoading ? (
                    <LoadingOrders />
                ) : (
                    <>
                        <TabsContent value="all" className="space-y-4 mt-4">
                            <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                        <TabsContent value="processing" className="space-y-4 mt-4">
                            <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                        <TabsContent value="confirmed" className="space-y-4 mt-4">
                            <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                        <TabsContent value="ready" className="space-y-4 mt-4">
                            <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                        <TabsContent value="shipped" className="space-y-4 mt-4">
                            <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                        <TabsContent value="delivered" className="space-y-4 mt-4">
                            <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                        <TabsContent value="cancelled" className="space-y-4 mt-4">
                            <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    );
}
