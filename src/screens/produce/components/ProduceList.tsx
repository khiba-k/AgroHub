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
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useProduceListingStore } from "@/lib/store/useProduceListingStore";
import { fetchProduceListings } from "@/lib/requests/produceListingsRequests";
import { useFarmStore } from "@/lib/store/userStores";
import ProduceForm from "./ProduceForm";

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

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

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
        farmId,
        status,
        page: pageToLoad,
      });

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

  if (loading && listings.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-muted-foreground">Loading listings...</p>
      </div>
    );
  }

  if (!loading && listings.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-muted-foreground">
          No {status} produce listings found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((item) => {
          return (
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          setSelectedListing(item);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Listing
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Produce Listing</DialogTitle>
                            <DialogDescription>
                              Update the details of your produce listing
                            </DialogDescription>
                          </DialogHeader>
                          <ProduceForm initialData={item} onClose={handleDialogClose} />
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Quantity:</span>
                    <span className="font-medium">{item.quantity} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Price:</span>
                    <span className="font-medium">
                      ${item.produce?.pricePerUnit ?? "0"}/
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
              <CardFooter className="p-4 pt-0 flex justify-between">
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
                        Update the details of your produce listing
                      </DialogDescription>
                    </DialogHeader>
                    <ProduceForm initialData={item} onClose={handleDialogClose} />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMore} variant="outline">
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* View Details Dialog */}
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
              {/* Carousel */}
              <div className="w-full overflow-hidden relative">
                <div className="flex overflow-x-auto space-x-4 pb-2">
                  {selectedListing.images?.map((img: { id: string; url: string }) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt="Produce"
                      className="w-64 h-40 object-cover flex-shrink-0 rounded"
                    />
                  ))}
                </div>
              </div>

              {/* Listing Info */}
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedListing.produce?.name}</p>
                <p><strong>Type:</strong> {selectedListing.produce?.type}</p>
                <p><strong>Category:</strong> {selectedListing.produce?.category}</p>
                <p><strong>Location:</strong> {selectedListing.location}</p>
                <p><strong>Description:</strong> {selectedListing.description}</p>
                <p><strong>Quantity:</strong> {selectedListing.quantity} kg</p>
                <p><strong>Price:</strong> ${selectedListing.produce?.pricePerUnit} per {selectedListing.produce?.unitType}</p>
                {selectedListing.harvestDate && (
                  <p>
                    <strong>Harvest Date:</strong>{" "}
                    {new Date(selectedListing.harvestDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Sales History Placeholder */}
              <div>
                <h4 className="font-semibold">Sales History</h4>
                <p className="text-muted-foreground text-sm">No sales history available yet.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
