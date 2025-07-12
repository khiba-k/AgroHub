"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Loader2 } from "lucide-react";
import React from "react";

export function OrderDetailsDialog({
    breakdown,
    isPaid,
    uploadingId,
    loadingId,
    selectedFile,
    setSelectedFile,
    handleUpload,
    handleConfirmPayment,
    handleCancel,
}: {
    breakdown: any;
    isPaid: boolean;
    uploadingId: string | null;
    loadingId: string | null;
    selectedFile: File | null;
    setSelectedFile: (file: File) => void;
    handleUpload: (id: string) => void;
    handleConfirmPayment: (id: string) => void;
    handleCancel: (id: string) => void;
}) {
    const b = breakdown;

    const produceName = `${b.produceListing?.produce?.type ?? ""} ${b.produceListing?.produce?.name ?? ""}`;
    const unitType = b.produceListing?.produce?.unit ?? "";

    const breakdownStatus = b.cancelledBy
        ? "Cancelled"
        : b.delivered
            ? "Complete"
            : b.status === "READY_FOR_PICKUP"
                ? "Awaiting Pickup"
                : b.farmerConfirmed
                    ? "Confirmed"
                    : "Unconfirmed";

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Order #{b.orderItem.order.orderNumber} Details</DialogTitle>
                </DialogHeader>

                {/* ORDER SUMMARY */}
                <div className="space-y-2 mb-6">
                    <h4 className="font-semibold">Order Summary</h4>
                    <p>
                        <strong>Status:</strong>{" "}
                        <Badge>{breakdownStatus}</Badge>
                    </p>
                    {b.cancelledBy && (<p className="text-sm text-muted-foreground">Order Cancelled By <strong>{b.cancelledBy}</strong></p>)}
                    <p>
                        <strong>Order ID:</strong> {b.orderItem.order.orderNumber}
                    </p>
                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(b.orderItem.order.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Produce:</strong> {produceName}
                    </p>
                    <p>
                        <strong>Quantity:</strong> {b.quantity} {b.produceListing?.produce?.unitType || unitType}
                    </p>
                    <p>
                        <strong>Total:</strong> M{b.price}
                    </p>
                    <p>
                        <strong>Paid Status:</strong>{" "}
                        {isPaid ? (
                            <Badge className="bg-green-200 text-green-800">Paid</Badge>
                        ) : (
                            <Badge className="bg-yellow-200 text-yellow-800">Not Paid</Badge>
                        )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        <strong>Agrohub:</strong> {b.agrohubConfirmsPayment ? "✅ Confirmed" : "❌ Not Confirmed"}
                        {" | "}
                        <strong>Farmer:</strong> {b.farmerConfirmsPayment ? "✅ Confirmed" : "❌ Not Confirmed"}
                    </p>
                </div>

                {/* INVOICE SECTION */}
                <div className="space-y-2 mb-6">
                    <h4 className="font-semibold">Invoice</h4>

                    {b.invoiceUrl ? (
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" asChild>
                                <a href={b.invoiceUrl} download>
                                    Download Invoice
                                </a>
                            </Button>
                            <p className="text-sm text-muted-foreground">Replace Invoice:</p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No invoice uploaded yet.</p>
                    )}

                    <Input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setSelectedFile(e.target.files[0]);
                            }
                        }}
                    />
                    <Button
                        onClick={() => selectedFile && handleUpload(b.id)}
                        disabled={uploadingId === b.id || !selectedFile}
                    >
                        {uploadingId === b.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Upload Invoice"
                        )}
                    </Button>
                </div>

                {/* PROOF OF PAYMENT SECTION */}
                <div className="space-y-2 mb-6">
                    <h4 className="font-semibold">Payment Proof</h4>
                    {b.paymentProofUrl ? (
                        <Button variant="outline" asChild>
                            <a href={b.paymentProofUrl} download>
                                Download Proof of Payment
                            </a>
                        </Button>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No payment proof uploaded yet.
                        </p>
                    )}
                </div>

                {/* ACTIONS */}
                {!b.cancelledBy && (
                    <DialogFooter className="flex justify-between gap-2 pt-4">
                        {(!b.agrohubConfirmsPayment && !b.farmerShipped) && (
                            <Button
                                variant="destructive"
                                onClick={() => handleCancel(b.id)}
                                disabled={loadingId === b.id}
                            >
                                {loadingId === b.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    "Cancel Order"
                                )}
                            </Button>
                        )}
                        {!b.farmerConfirmsPayment && b.farmerConfirmed && (
                            <Button
                                onClick={() => handleConfirmPayment(b.id)}
                                disabled={loadingId === b.id}
                            >
                                {loadingId === b.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    "Confirm Payment"
                                )}
                            </Button>
                        )}
                    </DialogFooter>)}
            </DialogContent>
        </Dialog>
    );
}
