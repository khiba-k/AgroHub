"use client";

import { useState, useEffect } from "react";
import AgroHubProductFilter from "./components/AgroHubProductFilter";
import AgroHubProductCard from "./components/AgroHubProductCard";
import AgroHubOrderSummary from "./components/AgroHubOrderSummary";
import AgroHubQuantityDialog from "./components/AgroHubQuantityDialog";
import { AgroHubBlockSwitchDialog } from "./components/AgroHubBlockSwitchDialog";

import { loadListings } from "@/lib/utils/AgroHubListingsUtils";
import { useProduceStore } from "@/lib/store/useProductStore";

import { ShoppingCart, MenuIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderBreakdown {
  farmerId: string;
  farmerName: string;
  quantity: number;
  price: number;
}

interface CartItem {
  produceId: string;
  produceName: string;
  produceType?: string;
  unitType: string;
  selectedQuantity: number;
  orderBreakdown: OrderBreakdown[];
  totalPrice: number;
}

export default function AgroHubListings() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedProduceId, setSelectedProduceId] = useState<string | undefined>();
  const [selectedProduce, setSelectedProduce] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [orderBreakdown, setOrderBreakdown] = useState<OrderBreakdown[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [unitType, setUnitType] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAvailableQuantity, setTotalAvailableQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState("");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isBlockSwitchOpen, setIsBlockSwitchOpen] = useState(false);
  const [pendingProduceId, setPendingProduceId] = useState<string | null>(null);
  const [pendingProduceName, setPendingProduceName] = useState<string | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);

  const { getSuggestions, produceMap } = useProduceStore();

  useEffect(() => {
    const stored = sessionStorage.getItem("cart-items");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart-items", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    loadListings(
      setIsLoading,
      (newListings, newTotal, newHasMore, newTotalAvailable) => {
        setListings(newListings);
        setTotal(newTotal);
        setHasMore(newHasMore);
        setTotalAvailableQuantity(newTotalAvailable);
      },
      selectedCategory,
      selectedProduce,
      selectedType,
      getSuggestions
    );
  }, [selectedCategory, selectedProduce, selectedType, produceMap]);

  useEffect(() => {
    if (!selectedProduceId) {
      reset();
      return;
    }
    const found = loadFromCart(selectedProduceId);
    if (!found) reset();
  }, [selectedProduceId]);

  const setQuantity = (quantity: number) => {
    if (quantity > totalAvailableQuantity) {
      setQuantityError(`Exceeded total available. Only ${totalAvailableQuantity}kg available.`);
    } else {
      setQuantityError("");
      setSelectedQuantity(quantity);
      calculateBreakdown(quantity);
    }
  };

  const calculateBreakdown = (quantity: number) => {
    let remaining = quantity;
    const breakdown: OrderBreakdown[] = [];

    for (const listing of listings) {
      if (remaining <= 0) break;
      const chunk = Math.min(remaining, listing.quantity);
      if (chunk > 0) {
        breakdown.push({
          farmerId: listing.id,
          farmerName: listing.farm.name,
          quantity: chunk,
          price: chunk * Number(listing.produce.pricePerUnit),
        });
        remaining -= chunk;
      }
    }

    const newTotalPrice = breakdown.reduce((sum, b) => sum + b.price, 0);
    setOrderBreakdown(breakdown);
    setTotalPrice(newTotalPrice);
    setUnitType(listings[0]?.produce.unitType || "");
  };

  const addToCart = (produceId: string, produceName: string, produceType?: string) => {
    if (selectedQuantity <= 0 || orderBreakdown.length === 0) return;

    const existingIndex = cartItems.findIndex((item) => item.produceId === produceId);
    const newItem: CartItem = {
      produceId,
      produceName,
      produceType,
      unitType,
      selectedQuantity,
      orderBreakdown,
      totalPrice,
    };

    if (existingIndex >= 0) {
      const updated = [...cartItems];
      updated[existingIndex] = newItem;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, newItem]);
    }

    reset();
    setIsCartDialogOpen(false);
  };

  const loadFromCart = (produceId: string) => {
    const found = cartItems.find((item) => item.produceId === produceId);
    if (found) {
      setSelectedQuantity(found.selectedQuantity);
      setOrderBreakdown(found.orderBreakdown);
      setTotalPrice(found.totalPrice);
      setUnitType(found.unitType);
    }
    return found;
  };

  const reset = () => {
    setSelectedQuantity(0);
    setOrderBreakdown([]);
    setTotalPrice(0);
    setUnitType("");
  };

  const handleProduceSwitch = (newProduceId: string, newProduceName: string | undefined) => {
    reset();
    setSelectedProduceId(newProduceId);
    setSelectedProduce(newProduceName);
    const suggestions = getSuggestions(selectedCategory, newProduceName);
    if (!suggestions.some((t) => t.trim() !== "")) {
      setSelectedType(undefined);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-4"></div>
            <p className="text-gray-600">Loading produce listings...</p>
          </div>
        </div>
      );
    }
    if (listings.length === 0) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">No listings found for current filters.</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <AgroHubProductCard
            key={listing.id}
            type={selectedType}
            produce={selectedProduce}
            farmer={{
              id: listing.id,
              name: listing.farm.name,
              location: listing.location,
              quantityAvailable: listing.quantity,
              pricePerKg: Number(listing.produce.pricePerUnit),
              image: listing.images[0]?.url || "/placeholder.jpg",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* 🛒 Mobile Cart Icon in a Button */}
        <div className="lg:hidden flex justify-end mb-4">
          <Dialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
            <DialogTrigger asChild>
              <Button className="p-">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-sm sm:rounded-xl p- ">
              <AgroHubOrderSummary
                selectedQuantity={selectedQuantity}
                handleQuantityChange={setQuantity}
                orderBreakdown={orderBreakdown}
                totalPrice={totalPrice}
                onAddToCart={() => {
                  if (selectedProduceId && selectedProduce) {
                    addToCart(selectedProduceId, selectedProduce, selectedType);
                  }
                }}
                quantityError={quantityError}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Produce Listing</h2>

            <AgroHubProductFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedProduceId={setSelectedProduceId}
              selectedProduce={selectedProduce}
              setSelectedProduce={setSelectedProduce}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />

            {renderContent()}
          </div>

          {/* 💻 Desktop Cart on Right */}
          <div className="hidden lg:block">
            <AgroHubOrderSummary
              selectedQuantity={selectedQuantity}
              handleQuantityChange={setQuantity}
              orderBreakdown={orderBreakdown}
              totalPrice={totalPrice}
              onAddToCart={() => {
                if (selectedProduceId && selectedProduce) {
                  addToCart(selectedProduceId, selectedProduce, selectedType);
                }
              }}
              quantityError={quantityError}
            />
          </div>
        </div>
      </div>

      <AgroHubQuantityDialog
        isOrderDialogOpen={isOrderDialogOpen}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setQuantity}
        orderBreakdown={orderBreakdown}
        totalPrice={totalPrice}
        handleQuantityChange={setQuantity}
      />

      <AgroHubBlockSwitchDialog
        open={isBlockSwitchOpen}
        onAddToCart={() => {
          if (pendingProduceId && pendingProduceName) {
            addToCart(selectedProduceId!, selectedProduce!, selectedType);
            reset();
            setIsBlockSwitchOpen(false);
            handleProduceSwitch(pendingProduceId, pendingProduceName);
            setPendingProduceId(null);
            setPendingProduceName(null);
          }
        }}
        onDiscard={() => {
          reset();
          setIsBlockSwitchOpen(false);
          if (pendingProduceId && pendingProduceName) {
            handleProduceSwitch(pendingProduceId, pendingProduceName);
          }
          setPendingProduceId(null);
          setPendingProduceName(null);
        }}
        onCancel={() => {
          setIsBlockSwitchOpen(false);
          setPendingProduceId(null);
          setPendingProduceName(null);
        }}
      />
    </div>
  );
}
