"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
    Breakdown,
    handleMarkReady,
    handleMarkShipped,
    handleMarkDelivered,
} from "../Orders";
import { AgroHubOrderDetailsDialog } from "./AgroHubOrderDetailsDialog";
import { Search, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AgroHubOrdersTable({
    data,
    mutate,
    tab = "all",
}: {
    data: Breakdown[];
    mutate: () => void;
    tab?: string;
}) {

    const [search, setSearch] = React.useState("");

    // Filter data based on search input
    const filteredData = data.filter((b) => {
        const farmName = b.produceListing.farm.name.toLowerCase();
        const produceName = b.produceListing.produce.name.toLowerCase();
        const produceType = b.produceListing.produce.type?.toLowerCase() || "";

        const query = search.toLowerCase();

        return (
            farmName.includes(query) ||
            produceName.includes(query) ||
            produceType.includes(query)
        );
    });

    function statusColor(b: Breakdown) {
        if (b.status === "PROCESSING") return "bg-yellow-200 text-yellow-800";
        if (b.status === "READY_FOR_PICKUP") {
            if (b.delivered) return "bg-green-200 text-green-800";
            if (b.agrohubShipped) return "bg-purple-200 text-purple-800";
            return "bg-indigo-200 text-indigo-800";
        }
        return "bg-gray-200 text-gray-800";
    }

    function statusLabel(b: Breakdown) {
        if (b.status === "PROCESSING" && b.farmerConfirmed) return "Confirmed";
        if (b.status === "PROCESSING") return "Processing";
        if (b.status === "READY_FOR_PICKUP") {
            if (b.delivered) return "Delivered";
            if (b.agrohubShipped) return "Shipped";
            return "Ready for Pickup";
        }
        return "Unknown";
    }

    return (
        <div className="rounded-md md:border">
             <div className="p-4 md:border-b flex flex-col md:flex-row items-start md:items-center justify-between">
                <h3 className="font-semibold text-lg hidden md:block">Orders</h3>
                <div className="flex items-end justify-center border px-4 py-2 rounded">
                <SearchIcon className="h-8 w-4 "/>
                <Input
                    type="search"
                    placeholder="Search by farm, produce..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-72 ml-2"
                />
                </div>
            </div>
            {filteredData.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                    No orders in this tab.
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">Order #</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Total (M)</th>
                                    <th className="px-4 py-2 text-left">Farm</th>
                                    <th className="px-4 py-2 text-left">Produce</th>
                                    {tab === "all" && (
                                        <th className="px-4 py-2 text-left">Status</th>
                                    )}
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredData.map((b) => (
                                    <tr key={b.id} className="border-b">
                                        <td className="px-4 py-2">{b.orderItem.order.orderNumber}</td>
                                        <td className="px-4 py-2">
                                            {new Date(b.orderItem.order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2">M{b.price}</td>
                                        <td className="px-4 py-2">{b.produceListing.farm.name}</td>
                                        <td className="px-4 py-2">
                                        {b.produceListing.produce?.type}{" "}
                                        {b.produceListing.produce.name}
                                        </td>
                                        {tab === "all" && (
                                            <td className="px-4 py-2">
                                                <Badge className={statusColor(b)}>
                                                    {statusLabel(b)}
                                                </Badge>
                                            </td>
                                        )}
                                        <td className="px-4 py-2 flex flex-wrap gap-2">
                                            <AgroHubOrderDetailsDialog
                                                breakdown={b}
                                                mutate={mutate}
                                            />
                                            {b.status === "PROCESSING" && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={async () => {
                                                        await handleMarkReady(b.id);
                                                        mutate();
                                                    }}
                                                >
                                                    Mark Ready
                                                </Button>
                                            )}
                                            {b.status === "READY_FOR_PICKUP" && !b.agrohubShipped && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={async () => {
                                                        await handleMarkShipped(b.id);
                                                        mutate();
                                                    }}
                                                >
                                                    Mark Shipped
                                                </Button>
                                            )}
                                            {b.status === "READY_FOR_PICKUP" &&
                                                b.agrohubShipped &&
                                                !b.delivered && (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={async () => {
                                                            await handleMarkDelivered(b.id);
                                                            mutate();
                                                        }}
                                                    >
                                                        Mark Delivered
                                                    </Button>
                                                )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="block md:hidden space-y-4 p-4 ">
                    {filteredData.map((b) => (
                            
                            <div
                                key={b.id}
                                className="border rounded-lg p-4 bg-background shadow-sm space-y-2"
                            >
                                <div>
                                    <strong>Order #:</strong> {b.orderItem.order.orderNumber}
                                </div>
                                <div>
                                    <strong>Date:</strong>{" "}
                                    {new Date(b.orderItem.order.createdAt).toLocaleDateString()}
                                </div>
                                <div>
                                    <strong>Total:</strong> M{b.price}
                                </div>
                                <div>
                                    <strong>Farm:</strong> {b.produceListing.farm.name}
                                </div>
                                <div>
                                    <strong>Produce:</strong>{" "}
                                    {b.produceListing.produce?.type}{" "}
                                    {b.produceListing.produce.name}
                                </div>
                                {tab === "all" && (
                                    <div>
                                        <strong>Status:</strong>{" "}
                                        <Badge className={statusColor(b)}>
                                            {statusLabel(b)}
                                        </Badge>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <AgroHubOrderDetailsDialog breakdown={b} mutate={mutate} />
                                    {b.status === "PROCESSING" && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={async () => {
                                                await handleMarkReady(b.id);
                                                mutate();
                                            }}
                                        >
                                            Mark Ready
                                        </Button>
                                    )}
                                    {b.status === "READY_FOR_PICKUP" && !b.agrohubShipped && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={async () => {
                                                await handleMarkShipped(b.id);
                                                mutate();
                                            }}
                                        >
                                            Mark Shipped
                                        </Button>
                                    )}
                                    {b.status === "READY_FOR_PICKUP" &&
                                        b.agrohubShipped &&
                                        !b.delivered && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={async () => {
                                                    await handleMarkDelivered(b.id);
                                                    mutate();
                                                }}
                                            >
                                                Mark Delivered
                                            </Button>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

