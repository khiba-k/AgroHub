"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useFarmStore } from "@/lib/store/userStores";

interface InventoryGroup {
  location: string;
  category: string;
  name: string;
  type: string | null;
  active: any;
  harvests: any[];
  solds: any[];
  images: any[];
  description: string | null;
  quantity: number;
  unitType: string;
  pricePerUnit: string;
}

export function ProduceInventory() {
  const { farmId } = useFarmStore();

  const [inventory, setInventory] = useState<InventoryGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<InventoryGroup | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (farmId) {
      loadInventory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmId]);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inventory/get?farmId=${farmId}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const enriched = json.data.map((item: any) => ({
          ...item,
          unitType:
            item.active?.produce?.unitType ||
            item.active?.unitType ||
            item.produce?.unitType ||
            "unit",
          pricePerUnit:
            item.active?.produce?.pricePerUnit ||
            item.active?.pricePerUnit ||
            item.produce?.pricePerUnit ||
            "0",
        }));

        console.log("[INVENTORY_FETCH_SUCCESS]", enriched);

        setInventory(enriched);
      } else {
        setInventory([]);
        console.error("Invalid inventory response", json);
      }
    } catch (error) {
      console.error("[INVENTORY_FETCH_ERROR]", error);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Produce Inventory</CardTitle>
          <CardDescription>
            Inventory of your produce currently available for sale and to be harvested.
          </CardDescription>
        </CardHeader>
        <CardContent>

          <div className="rounded-md border">
            <div className="grid grid-cols-6 border-b bg-muted/50 p-3 font-medium">
              <div className="col-span-2">Product</div>
              <div>Quantity</div>
              <div>Status</div>
              <div>Location</div>
              <div>Actions</div>
            </div>

            {loading ? (
              <div className="text-center py-6">Loading inventory...</div>
            ) : (
              <>
                {inventory.length > 0 ? (
                  inventory.map((item, idx) => {
                    const hasStock = item.quantity > 0;
                    const productName = item.type
                      ? `${item.type} ${item.name}`
                      : item.name;

                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-6 border-b p-3 items-center"
                      >
                        <div className="col-span-2 font-medium">{productName}</div>
                        <div>
                          {item.quantity > 0
                            ? `${item.quantity} ${item.unitType}`
                            : `0 ${item.harvests[0]?.listing?.produce?.unitType || "units"}`}
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className={`${hasStock
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              }`}
                          >
                            {hasStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div>{item.location}</div>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelected(item)}
                          >
                            <Eye className="w-4 h-4 mr-1" /> View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6">
                    No inventory items found.
                  </div>
                )}
              </>
            )}
          </div>

        </CardContent>
      </Card>

      {/* View more Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {selected.type
                    ? `${selected.type} ${selected.name}`
                    : selected.name}
                </DialogTitle>
                <DialogDescription>
                  Location: {selected.location}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Active Listing */}
                <section className="border-b pb-4">
                  <h4 className="text-lg font-semibold mb-2">Active Listing</h4>
                  {selected.quantity > 0 ? (
                    <>
                      <p className="mb-1">
                        Description: {selected.description || "N/A"}
                      </p>
                      <p className="mb-1">
                        Quantity: {selected.quantity} {selected.unitType}
                      </p>
                      <p className="mb-1">
                        Unit Price: M{selected.pricePerUnit} per{" "}
                        {selected.unitType}
                      </p>
                      <p className="font-medium">
                        Est. Income: M
                        {(
                          parseFloat(selected.pricePerUnit || "0") *
                          selected.quantity
                        ).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p>No active listing available.</p>
                  )}
                </section>

                {/* Harvest Batches */}
                <section className="border-b pb-4">
                  <h4 className="text-lg font-semibold mb-2">Harvest Batches</h4>
                  {selected.harvests.length ? (
                    <ul className="list-disc list-inside space-y-1">
                      {selected.harvests.map((h) => (
                        <li key={h.id}>
                          Date: {new Date(h.harvestDate).toLocaleDateString()}
                          {h.listing?.quantity > 0 &&
                            ` – ${h.listing.quantity} ${h.listing.produce.unitType} to be harvested`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No harvests recorded.</p>
                  )}
                </section>

                {/* Sold History */}
                <section className="border-b pb-4">
                  <h4 className="text-lg font-semibold mb-2">Sales</h4>
                  {selected.solds.length ? (
                    <ul className="list-disc list-inside space-y-1">
                      {selected.solds.map((s) => (
                        <li key={s.id}>
                          Sold {s.soldQuantity} {selected.unitType} for M
                          {s.soldPrice}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No sales yet.</p>
                  )}
                </section>

                {/* Images */}
                <section>
                  <h4 className="text-lg font-semibold mb-2">Images</h4>
                  {selected.images.length ? (
                    <div className="flex gap-3 flex-wrap">
                      {selected.images.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => setPreviewImage(img.url)}
                          className="focus:outline-none"
                        >
                          <img
                            src={img.url}
                            alt="Listing"
                            className="w-28 h-28 object-cover rounded border hover:opacity-80"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>No images uploaded.</p>
                  )}
                  {previewImage && (
                    <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
                      <DialogContent className="max-w-4xl p-0 overflow-hidden">
                        <img src={previewImage} alt="Preview" className="w-full h-auto object-contain" />
                      </DialogContent>
                    </Dialog>
                  )}

                </section>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
