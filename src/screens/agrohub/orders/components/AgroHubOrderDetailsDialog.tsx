"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Eye,
  UploadCloud,
  Loader2,
  Download,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breakdown, // Ensure this is correctly defined/imported
  handleCancel, // Ensure this is correctly defined/imported
  handleConfirmPayment, // Ensure this is correctly defined/imported
  handleUploadProof, // Ensure this is correctly defined/imported
} from "../Orders"; // Adjust path if necessary
import { useState } from "react";

// Import Tabs components from shadcn/ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AgroHubOrderDetailsDialog({
  breakdown,
  mutate,
}: {
  breakdown: Breakdown;
  mutate: () => void;
}) {
  const b = breakdown;

  const buyer = `${b.orderItem.order.buyer.firstname} ${b.orderItem.order.buyer.lastname}`;
  const farm = b.produceListing.farm;

  const primaryPayment = farm.paymentMethods.find((p) => p.isPrimary);
  const additionalPayments = farm.paymentMethods.filter((p) => !p.isPrimary);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function doCancel() {
    setLoadingId(b.id);
    await handleCancel(b.id);
    mutate();
    setLoadingId(null);
  }

  async function doConfirmPayment() {
    setLoadingId(b.id);
    await handleConfirmPayment(b.id);
    mutate();
    setLoadingId(null);
  }

  async function doUploadSelectedProof() {
    if (selectedFile) {
      setLoadingId(b.id);
      await handleUploadProof(b.id, selectedFile);
      mutate();
      setLoadingId(null);
      setSelectedFile(null); // Clear selected file after upload
    }
  }

  // Helper component to display payment method details
  function PaymentMethodDisplay({
    payment,
  }: {
    payment: Breakdown["produceListing"]["farm"]["paymentMethods"][0];
  }) {
    return (
      <div className="border rounded p-2 mb-2">
        <p className="text-sm font-medium">
          Type: <span className="font-normal">{payment.type}</span>
        </p>
        {payment.isMerchant && (
          <p className="text-sm">
            Merchant Name:{" "}
            <span className="font-normal">{payment.merchantName}</span>
          </p>
        )}
        {payment.accountHolder && (
          <p className="text-sm">
            Account Holder:{" "}
            <span className="font-normal">{payment.accountHolder}</span>
          </p>
        )}
        {payment.accountNumber && (
          <p className="text-sm">
            Account Number:{" "}
            <span className="font-normal">{payment.accountNumber}</span>
          </p>
        )}
        {payment.bankName && (
          <p className="text-sm">
            Bank: <span className="font-normal">{payment.bankName}</span>
          </p>
        )}
        {payment.branchCode && (
          <p className="text-sm">
            Branch Code:{" "}
            <span className="font-normal">{payment.branchCode}</span>
          </p>
        )}
        {payment.cellphoneNumber && (
          <p className="text-sm">
            Cellphone:{" "}
            <span className="font-normal">{payment.cellphoneNumber}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Eye className="w-4 h-4" />
          <span>Details</span>
        </Button>
      </DialogTrigger>
      {/* Dialog content - Optimized for mobile responsiveness */}
      <DialogContent
        className="
          flex flex-col h-[95vh] w-[95vw] max-h-[95vh] max-w-none
          sm:h-auto sm:w-full sm:max-w-3xl sm:max-h-[90vh]
        "
      >
        <DialogHeader>
          <DialogTitle>Order #{b.orderItem.order.orderNumber}</DialogTitle>
        </DialogHeader>

        {/* Tabs for content organization */}
        <Tabs defaultValue="order-summary" className="w-full flex-grow flex flex-col">
          {/* Tab Headers */}
          {/* TabsList: Default to flex-col, switch to grid-cols-2 on sm screens */}
          <TabsList className="w-full flex flex-col sm:grid sm:grid-cols-2">
            <TabsTrigger value="order-summary">Order Summary</TabsTrigger>
            <TabsTrigger value="payment-actions">Payment & Actions</TabsTrigger>
          </TabsList>

          {/* Tab 1 Content: Order Summary */}
          {/* Ensure tabs content can scroll if needed */}
          <TabsContent value="order-summary" className="flex-grow overflow-y-auto pr-2">
            <div className="flex flex-col gap-6 pt-4 pb-4"> {/* Added pb-4 for bottom spacing */}
              {/* Buyer */}
              <div>
                <h4 className="font-semibold mb-1">Buyer</h4>
                <p>{buyer}</p>
              </div>

              {/* Farmer Contact */}
              <div>
                <h4 className="font-semibold mb-1">Farmer Contact</h4>
                <p>Farm: {farm.name}</p>
                <p>Contact 1: {farm.contactNumber1}</p>
                {farm.contactNumber2 && (
                  <p>Contact 2: {farm.contactNumber2}</p>
                )}
              </div>

              {/* Order Details */}
              <div>
                <h4 className="font-semibold mb-1">Order Details</h4>
                <p>
                  Produce: {b.produceListing.produce.name} (
                  {b.produceListing.produce.type})
                </p>
                <p>
                  Quantity: {b.quantity} {b.produceListing.produce.unitType}
                </p>
                <p>Total: M{b.price}</p>
              </div>

              {/* Farmer Confirmation */}
              <div>
                <h4 className="font-semibold mb-1">Farmer Confirmation</h4>
                <p className="text-sm">
                  {b.farmerConfirmed ? "✅ Confirmed" : "❌ Not Confirmed"}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2 Content: Payment & Actions */}
          {/* Ensure tabs content can scroll if needed */}
          <TabsContent value="payment-actions" className="flex-grow overflow-y-auto pr-2">
            <div className="flex flex-col gap-6 pt-4 pb-4"> {/* Added pb-4 for bottom spacing */}
              {/* Payment Status */}
              <div>
                <h4 className="font-semibold mb-1">Payment Status</h4>
                <p className="text-sm">
                  {b.agrohubConfirmsPayment && b.farmerConfirmsPayment ? (
                    <Badge className="bg-green-200 text-green-800">Paid</Badge>
                  ) : (
                    <Badge className="bg-yellow-200 text-yellow-800">
                      Not Paid
                    </Badge>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Agrohub:</strong>{" "}
                  {b.agrohubConfirmsPayment ? "✅ Confirmed" : "❌ Not Confirmed"}{" "}
                  | <strong>Farmer:</strong>{" "}
                  {b.farmerConfirmsPayment ? "✅ Confirmed" : "❌ Not Confirmed"}
                </p>
              </div>

              {/* Payment Methods */}
              {primaryPayment && (
                <div>
                  <h4 className="font-semibold mb-1">
                    Primary Payment Method
                  </h4>
                  <PaymentMethodDisplay payment={primaryPayment} />
                </div>
              )}

              {additionalPayments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">
                    Additional Payment Methods
                  </h4>
                  {additionalPayments.map((p) => (
                    <PaymentMethodDisplay key={p.id} payment={p} />
                  ))}
                </div>
              )}

              {/* Payment Proof Section */}
              <div className="space-y-2">
                <h4 className="font-semibold">Payment Proof</h4>
                {b.paymentProofUrl ? (
                  <Button variant="outline" asChild>
                    <a
                      href={b.paymentProofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Proof of Payment
                    </a>
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No payment proof uploaded yet.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label htmlFor="payment-proof-upload" className="sr-only">
                    Upload Payment Proof
                  </label>
                  <input
                    id="payment-proof-upload"
                    type="file"
                    title="Upload Payment Proof"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={doUploadSelectedProof}
                    disabled={!selectedFile || loadingId === b.id}
                  >
                    {loadingId === b.id ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <UploadCloud className="w-4 h-4 mr-1" />
                    )}
                    Upload Proof
                  </Button>
                </div>
              </div>

              {/* Actions */}
              {!b.cancelledBy && !b.agrohubShipped && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-4">
                  <Button
                    variant="secondary"
                    onClick={doConfirmPayment}
                    disabled={loadingId === b.id}
                  >
                    {loadingId === b.id ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Confirm Payment
                  </Button>

                  {!b.agrohubConfirmsPayment && ( // Only show Cancel if Agrohub hasn't confirmed payment
                    <Button
                      variant="destructive"
                      onClick={doCancel}
                      disabled={loadingId === b.id}
                    >
                      {loadingId === b.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      Cancel Order
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}