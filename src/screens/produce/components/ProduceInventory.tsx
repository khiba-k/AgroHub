"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, BarChart3, PieChart, Eye } from "lucide-react";
import { useFarmStore } from "@/lib/store/userStores";
import { fetchProduceListings } from "@/lib/requests/produceListingsRequests";

export function ProduceInventory() {
  const { farmId } = useFarmStore();

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (farmId) {
      loadListings(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmId]);

  const loadListings = async (pageToLoad: number) => {
    if (!farmId) return;

    setLoading(true);
    try {
      const data = await fetchProduceListings({
        farmId,
        status: "active",
        page: pageToLoad,
      });

      if (pageToLoad === 1) {
        setListings(data.listings);
      } else {
        setListings((prev) => [...prev, ...data.listings]);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.error("[INVENTORY_FETCH_ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    loadListings(nextPage);
    setPage(nextPage);
  };

  // Example for later
  const totalWeight = listings.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = listings.filter((item) => item.quantity < 100).length;

  return (
    <div className="space-y-6">
      {/* 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWeight} kg</div>
            <p className="text-xs text-muted-foreground">
              Across {listings.length} products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">
              Item{lowStockCount !== 1 && "s"} below threshold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,842</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 days</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">-2.3 days</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      */}

      <Card>
        <CardHeader>
          <CardTitle>Produce Inventory</CardTitle>
          <CardDescription>
            Current active produce listings and stock levels
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

            {listings.map((item) => {
              const hasStock = item.quantity > 0;
              const productName = item.produce?.type
                ? `${item.produce.type} ${item.produce.name}`
                : item.produce?.name;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-6 border-b p-3 items-center"
                >
                  <div className="col-span-2 font-medium">{productName}</div>
                  <div>{item.quantity} kg</div>
                  <div>
                    <Badge
                      variant="outline"
                      className={`${
                        hasStock
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {hasStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <div>{item.location}</div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" /> View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button onClick={loadMore} disabled={loading} variant="outline">
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
