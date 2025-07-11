import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import * as React from "react";
import { useToastStore } from "@/lib/store/useToastStore";
import { Breakdown } from "../Orders";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

export function OrdersTable({
  data,
  mutate,
}: {
  data: Breakdown[];
  mutate: () => void;
}) {
  const { showToast } = useToastStore();
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [uploadingId, setUploadingId] = React.useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<Record<string, File>>({});

  const setSelectedFile = (id: string, file: File) => {
    setSelectedFiles((prev) => ({ ...prev, [id]: file }));
  };

  const handleUpload = async (id: string) => {
    const file = selectedFiles[id];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploadingId(id);
    try {
      await axios.post(`/api/orders/farmer/${id}/upload-invoice`, formData);
      showToast(true, "Invoice uploaded.");
      mutate();
    } catch {
      showToast(false, "Upload failed.");
    } finally {
      setUploadingId(null);
    }
  };

  const handleConfirm = async (id: string) => {
    setLoadingId(id);
    try {
      await axios.post(`/api/orders/farmer/${id}/confirm`);
      showToast(true, "Order confirmed successfully");
      mutate();
    } catch {
      showToast(false, "Failed to confirm order.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleConfirmPickup = async (id: string) => {
    setLoadingId(id);
    try {
      await axios.post(`/api/orders/farmer/${id}/confirm-pickup`);
      showToast(true, "Pickup confirmed.");
      mutate();
    } catch {
      showToast(false, "Failed to confirm pickup.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleConfirmPayment = async (id: string) => {
    setLoadingId(id);
    try {
      await axios.post(`/api/orders/farmer/${id}/confirm-payment`);
      showToast(true, "Payment confirmed.");
      mutate();
    } catch {
      showToast(false, "Could not confirm payment.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleCancel = async (id: string) => {
    setLoadingId(id);
    try {
      await axios.post(`/api/orders/farmer/${id}/cancel`);
      showToast(true, "Order cancelled.");
      mutate();
    } catch {
      showToast(false, "Could not cancel order.");
    } finally {
      setLoadingId(null);
    }
  };

  const isPaid = (b: Breakdown) =>
    b.agrohubConfirmsPayment && b.farmerConfirmsPayment;

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        {data.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No orders in this tab.
          </div>
        ) : (
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Total (M)</th>
                <th className="px-4 py-2 text-left">Paid</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="px-4 py-2">{b.orderItem.order.orderNumber}</td>
                  <td className="px-4 py-2">
                    {new Date(b.orderItem.order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">M{b.price}</td>
                  <td className="px-4 py-2">
                    {isPaid(b) ? (
                      <Badge className="bg-green-200 text-green-800">Paid</Badge>
                    ) : (
                      <Badge className="bg-yellow-200 text-yellow-800">Not Paid</Badge>
                    )}
                  </td>
                  <td className="px-4 py-2 flex justify-between">
                    <OrderDetailsDialog
                      breakdown={b}
                      isPaid={isPaid(b)}
                      uploadingId={uploadingId}
                      loadingId={loadingId}
                      selectedFile={selectedFiles[b.id] || null} // ✅ pass the selected file for this row
                      setSelectedFile={(file) => setSelectedFile(b.id, file)} // ✅ id handled here
                      handleUpload={handleUpload}
                      handleConfirmPayment={handleConfirmPayment}
                      handleCancel={handleCancel}
                    />
                    {!b.cancelledBy && (
                      <>
                        {b.status === "READY_FOR_PICKUP" && !b.farmerShipped ? (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleConfirmPickup(b.id)}
                            disabled={loadingId === b.id}
                          >
                            Confirm Pickup
                          </Button>
                        ) : !b.farmerConfirmed ? (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleConfirm(b.id)}
                            disabled={loadingId === b.id}
                          >
                            Confirm Order
                          </Button>
                        ) : null}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
