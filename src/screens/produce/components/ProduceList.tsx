"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2, Loader2 } from "lucide-react";
import { useProduceListingStore } from "@/lib/store/useProduceListingStore";
import { fetchProduceListings } from "@/lib/requests/produceListingsRequests";
import { useFarmStore } from "@/lib/store/userStores";
import { useToastStore } from "@/lib/store/useToastStore";
import ProduceForm from "./ProduceForm";
import axios from "axios";

interface ProduceListProps {
  status: "active" | "draft" | "harvest" | "sold";
}

export function ProduceList({ status }: ProduceListProps) {
  const { farmId } = useFarmStore();
  const {
    listings,
    page,
    hasMore,
    setListings,
    addListings,
    incrementPage,
    reset,
  } = useProduceListingStore();

  const { showToast } = useToastStore();

  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | "setActive" | "delete">(null);

  const [activeMode, setActiveMode] = useState<null | {
    type: "merge" | "new";
    harvest?: any;
    active?: any;
    listing: any;
  }>(null);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    reset();
    loadListings(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, farmId]);

  const loadListings = async (pageToLoad: number) => {
    if (!farmId) {
      console.warn("No farm ID found in store.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchProduceListings({
        farmId: farmId,
        status,
        page: pageToLoad,
      });

      console.log("-----Corect Data: ", data)

      if (pageToLoad === 1) {
        setListings(data.listings, data.total, data.hasMore);
      } else {
        addListings(data.listings, data.total, data.hasMore);
      }
    } catch (error) {
      console.error("[LOAD_LISTINGS_ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    loadListings(nextPage);
    incrementPage();
  };

  const handleSetActive = async (listing: any) => {
    if (!farmId) {
      showToast(false, "No farm ID found. Cannot continue.");
      return;
    }

    if (listing.status === "harvest") {
      try {
        const data = await fetchProduceListings({
          farmId,
          status: "active",
          page: 1,
        });

        const match = data.listings.find((l: any) =>
          l.produce?.category === listing.produce?.category &&
          l.produce?.name === listing.produce?.name &&
          l.produce?.type === listing.produce?.type &&
          l.location === listing.location
        );

        if (match) {
          setActiveMode({
            type: "merge",
            harvest: listing,
            active: match,
            listing: match,
          });
        } else {
          setActiveMode({
            type: "new",
            listing,
          });
        }
      } catch (err) {
        console.error(err);
        showToast(false, "Error checking for match.");
      }
    }

    if (listing.status === "draft") {
      setActiveMode({
        type: "new",
        listing,
      });
    }
  };

  const handleDelete = async (listingId: string) => {
    setConfirmLoading(true);
    try {
      await axios.post(`/api/produce/farmer/delete/listing`, { id: listingId });
      showToast(true, "Listing deleted!");
      setListings(
        listings.filter((l) => l.id !== listingId),
        listings.length - 1,
        hasMore
      );
    } catch (err) {
      console.error(err);
      showToast(false, "Failed to delete listing.");
    } finally {
      setConfirmLoading(false);
      setConfirmAction(null);
      setSelectedListing(null);
    }
  };

  return (
    <>
      {/* If loading and no data yet */}
      {loading && listings.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-muted-foreground">Loading listings...</p>
        </div>
      )}

      {/* If loaded but no listings */}
      {!loading && listings.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-muted-foreground">
            No {status} produce listings found.
          </p>
        </div>
      )}

      {/* Listings grid */}
      {listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings
            .filter((item) => item.status === status)
            .map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  {item.images?.length > 0 && (
                    <img
                      src={item.images[0].url}
                      alt={item.produce.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  )}
                  <Badge className="absolute top-2 right-2">
                    {item.produce?.category ?? ""}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.produce?.type ?? ""} {item.produce?.name ?? ""}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.location ?? ""}
                      </p>
                    </div>

                    {status !== "sold" && (<DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        {(status === "draft" || status === "harvest") && (
                          <DropdownMenuItem onClick={() => handleSetActive(item)}>
                            ✅ Set Active
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedListing(item);
                            setConfirmAction("delete");
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>)}
                  </div>

                  {/* ✅ Important details */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Quantity:</span>
                      <span className="font-medium">{status === "sold" ? item.soldQuantity : item.quantity} kg</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm">Price:</span>
                      <span className="font-medium">
                        M {item.produce?.pricePerUnit ?? "0"}/
                        {item.produce?.unitType ?? ""}
                      </span>
                    </div>

                    {status === "harvest" && (
                      <div className="flex justify-between">
                        <span className="text-sm">Harvest Date:</span>
                        <span className="font-medium">
                          {item.harvestDate
                            ? new Date(item.harvestDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                            : "N/A"}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>

                {status !== "sold" && (<CardFooter className="p-4 pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedListing(item);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Produce Listing</DialogTitle>
                        <DialogDescription>
                          Update the details of your produce listing.
                        </DialogDescription>
                      </DialogHeader>
                      <ProduceForm initialData={item} onClose={handleDialogClose} />
                    </DialogContent>
                  </Dialog>
                </CardFooter>)}
              </Card>
            ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && listings.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}

      {/* View Details Dialog (must be OUTSIDE map) */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Produce Listing Details</DialogTitle>
            <DialogDescription>
              Full details for this produce listing.
            </DialogDescription>
          </DialogHeader>

          {selectedListing && (
            <div className="space-y-4">
              <div className="w-full overflow-hidden relative">
                <div className="flex overflow-x-auto space-x-4 pb-2">
                  {selectedListing.images?.map(
                    (img: { id: string; url: string }) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt="Produce"
                        className="w-64 h-40 object-cover flex-shrink-0 rounded"
                      />
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {selectedListing.produce?.name}
                </p>
                <p>
                  <strong>Type:</strong> {selectedListing.produce?.type}
                </p>
                <p>
                  <strong>Category:</strong> {selectedListing.produce?.category}
                </p>
                <p>
                  <strong>Location:</strong> {selectedListing.location}
                </p>
                <p>
                  <strong>Description:</strong> {selectedListing.description}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedListing.quantity} kg
                </p>
                <p>
                  <strong>Price:</strong> M{selectedListing.produce?.pricePerUnit} per{" "}
                  {selectedListing.produce?.unitType}
                </p>
                {selectedListing.harvestDate && (
                  <p>
                    <strong>Harvest Date:</strong>{" "}
                    {new Date(selectedListing.harvestDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                <h4 className="font-semibold">Sales History</h4>
                <p className="text-muted-foreground text-sm">
                  No sales history available yet.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
