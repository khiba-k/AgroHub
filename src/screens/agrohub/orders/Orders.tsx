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

// Re-exporting functions as they are used elsewhere
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

    // Define your tab options and their display names
    const tabOptions = [
        { value: "all", label: "All Orders" },
        { value: "processing", label: "Processing" },
        { value: "confirmed", label: "Confirmed" },
        { value: "ready", label: "Ready For Pickup" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
    ];

    const { data, mutate, isLoading } = useSWR(
        `/api/orders/agrohub${activeTab !== "all" ? `?tab=${activeTab}` : ""}`,
        fetcher
    );

    const breakdowns: Breakdown[] = data || [];

    return (
        <div className="space-y-6 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
            <OrdersHeader />

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                {/* Desktop/Larger Screen TabsList */}
                <TabsList className="w-full justify-start overflow-x-auto whitespace-nowrap hidden sm:flex">
                    {tabOptions.map((option) => (
                        <TabsTrigger key={option.value} value={option.value}>
                            {option.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Mobile/Small Screen Dropdown */}
                <div className="w-full sm:hidden">
                    <select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="w-full p-2 border rounded-md bg-background text-foreground"
                    >
                        {tabOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                    {/* <div className="relative w-full sm:max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search orders..." className="pl-8 w-full" />
                    </div> */}
                    {/* <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button> */}
                </div>

                {isLoading ? (
                    <LoadingOrders />
                ) : (
                    <>
                        {/* Render TabsContent based on activeTab */}
                        {tabOptions.map((option) => (
                            <TabsContent key={option.value} value={option.value} className="space-y-4 mt-4">
                                <AgroHubOrdersTable data={breakdowns} mutate={mutate} />
                            </TabsContent>
                        ))}
                    </>
                )}
            </Tabs>
        </div>
    );
}