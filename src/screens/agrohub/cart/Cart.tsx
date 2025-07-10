"use client";

import { useState, useMemo, useEffect } from "react";
import { CartItem, OrderBreakdown } from "../utils/types";
import CartItems from "./components/CartItems";
import CartOrderSummary from "./components/CartOrderSummary";
import { filterProduceListings } from "@/lib/requests/produceListingsRequests";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lineErrors, setLineErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const [hasMounted, setHasMounted] = useState(false);

  // ✅ Listings for ALL cart items, fetched once
  const [cartListings, setCartListings] = useState<Record<string, any[]>>({});
  const [isLoadingListings, setIsLoadingListings] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("cart-items");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
    setHasMounted(true);
  }, []);

  // ✅ Save to sessionStorage only AFTER initial load
  useEffect(() => {
    if (hasMounted) {
      sessionStorage.setItem("cart-items", JSON.stringify(cartItems));
    }
  }, [cartItems, hasMounted]);

  // ✅ Fetch listings for ALL unique cart produce on mount
  useEffect(() => {
    const loadAllListings = async () => {
      if (cartItems.length === 0) {
        setIsLoadingListings(false);
        return;
      }

      setIsLoadingListings(true);

      const listingsMap: Record<string, any[]> = {};
      for (const item of cartItems) {
        const listings = await filterProduceListings({
          category: item.category,
          name: item.produceName,
          type: item.produceType,
          status: "active",
          limit: 20,
        });
        listingsMap[item.produceId] = listings;
      }

      setCartListings(listingsMap);
      setIsLoadingListings(false);
    };

    if (hasMounted) {
      loadAllListings();
    }
  }, [hasMounted]);

  const filteredCartItems = useMemo(() => {
    if (!searchQuery.trim()) return cartItems;
    return cartItems.filter(
      (item) =>
        item.produceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.produceType &&
          item.produceType.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [cartItems, searchQuery]);

  const updateQuantity = (produceId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((ci) => ci.produceId === produceId);
    if (!item) return;

    const listings = cartListings[produceId] || [];

    let remaining = newQuantity;
    const newBreakdown: OrderBreakdown[] = [];

    for (const listing of listings) {
      if (remaining <= 0) break;

      const chunk = Math.min(remaining, listing.quantity);
      if (chunk > 0) {
        newBreakdown.push({
          farmerId: listing.id,
          farmerName: listing.farm.name,
          quantity: chunk,
          price: chunk * Number(listing.produce.pricePerUnit),
          location: listing.farm.district,
        });
        remaining -= chunk;
      }
    }

    if (remaining > 0) {
      setLineErrors((prev) => ({
        ...prev,
        [produceId]: `Requested quantity exceeds stock. Only ${newQuantity - remaining
          } ${item.unitType} available.`,
      }));
      return;
    }

    const newTotalPrice = newBreakdown.reduce((sum, b) => sum + b.price, 0);

    setCartItems((items) =>
      items.map((ci) =>
        ci.produceId === produceId
          ? {
            ...ci,
            selectedQuantity: newQuantity,
            orderBreakdown: newBreakdown,
            totalPrice: newTotalPrice,
          }
          : ci
      )
    );

    setLineErrors((prev) => ({
      ...prev,
      [produceId]: "",
    }));
  };

  const removeItem = (produceId: string) => {
    setCartItems((items) =>
      items.filter((item) => item.produceId !== produceId)
    );
    setLineErrors((prev) => {
      const updated = { ...prev };
      delete updated[produceId];
      return updated;
    });
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems
              filteredCartItems={filteredCartItems}
              totalItems={totalItems}
              searchQuery={searchQuery}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              lineErrors={lineErrors}
              isLoadingListings={isLoadingListings}
            />
          </div>

          <div className="lg:col-span-1">
            <CartOrderSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              cartItems={cartItems}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
