"use client";

import { useState, useEffect } from "react";
import AgroHubProductFilter from "./components/AgroHubProductFilter";
import AgroHubProductCard from "./components/AgroHubProductCard";
import AgroHubOrderSummary from "./components/AgroHubOrderSummary";
import AgroHubQuantityDialog from "./components/AgroHubQuantityDialog";
import { AgroHubBlockSwitchDialog } from "./components/AgroHubBlockSwitchDialog";

import { loadListings } from "@/lib/utils/AgroHubListingsUtils"
import { useProduceStore } from "@/lib/store/useProductStore"
import { useToastStore } from "@/lib/store/useToastStore"

import { ShoppingCart, MenuIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ✅ Local types
interface OrderBreakdown {
  farmerId: string
  farmerName: string
  quantity: number
  price: number
  location?: string
}

interface CartItem {
  produceId: string
  produceName: string
  produceType?: string
  unitType: string
  selectedQuantity: number
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
  category: string
}

export default function AgroHubListings() {
  // ✅ Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedProduceId, setSelectedProduceId] = useState<string | undefined>(undefined)
  const [selectedProduce, setSelectedProduce] = useState<string | undefined>(undefined)
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // ✅ Cart states (local to this page)
  const [selectedQuantity, setSelectedQuantity] = useState(0)
  const [orderBreakdown, setOrderBreakdown] = useState<OrderBreakdown[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [unitType, setUnitType] = useState('')

  // This local cartItems reflects what's currently in sessionStorage
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const [totalAvailableQuantity, setTotalAvailableQuantity] = useState(0)
  const [quantityError, setQuantityError] = useState('')

  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)

  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);

  // ✅ Block switch states
  const [isBlockSwitchOpen, setIsBlockSwitchOpen] = useState(false)
  const [pendingProduceId, setPendingProduceId] = useState<string | null>(null)
  const [pendingProduceName, setPendingProduceName] = useState<string | null>(null)

  // ✅ Listings states
  const [listings, setListings] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const { getSuggestions, produceMap } = useProduceStore()
  const { showToast } = useToastStore()

  // ✅ Load cart from sessionStorage ONCE on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('cart-items')
    if (stored) {
      try {
        setCartItems(JSON.parse(stored))
      } catch {
        // fallback, clear bad session data
        sessionStorage.removeItem('cart-items')
      }
    }
  }, [])

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

  // ✅ When selectedProduceId changes: restore quantity etc from cart if any
  useEffect(() => {
    if (!selectedProduceId) {
      reset();
      return;
    }
    const found = cartItems.find(item => item.produceId === selectedProduceId)
    if (found) {
      setSelectedQuantity(found.selectedQuantity)
      setOrderBreakdown(found.orderBreakdown)
      setTotalPrice(found.totalPrice)
      setUnitType(found.unitType)
    } else {
      reset()
    }
  }, [selectedProduceId, cartItems])

  // ✅ Cart helpers

  const setQuantity = (quantity: number) => {
    if (quantity > totalAvailableQuantity) {
      setQuantityError(`Exceeded total available. Only ${totalAvailableQuantity}kg available.`)
      return
    }
    setQuantityError('')
    setSelectedQuantity(quantity)
    calculateBreakdown(quantity)
  }

  const calculateBreakdown = (quantity: number) => {
    let remaining = quantity;
    const breakdown: OrderBreakdown[] = [];

    console.log("[LISTINGS_BREAKDOWN]", listings);

    for (const listing of listings) {
      if (remaining <= 0) break;
      const chunk = Math.min(remaining, listing.quantity);
      if (chunk > 0) {
        breakdown.push({
          farmerId: listing.farm.id,
          farmerName: listing.location,
          quantity: chunk,
          price: chunk * Number(listing.produce.pricePerUnit),
          location: listing.farm.district,
        })
        remaining -= chunk
      }
    }

    const newTotalPrice = breakdown.reduce((sum, b) => sum + b.price, 0)

    setOrderBreakdown(breakdown)
    setTotalPrice(newTotalPrice)
    setUnitType(listings[0]?.produce.unitType || '')
  }

  // ✅ NEW: Sync cartItems safely with sessionStorage

  const saveCartToSession = (items: CartItem[]) => {
    sessionStorage.setItem('cart-items', JSON.stringify(items))
  }

  // ✅ Add or update produce in cart & sessionStorage (safe merge)
  const addToCart = (produceId: string, produceName: string, produceType?: string) => {
    if (selectedQuantity <= 0 || orderBreakdown.length === 0) return;

    // Get current cart from sessionStorage (fresh)
    let stored: CartItem[] = []
    const storedRaw = sessionStorage.getItem('cart-items')
    if (storedRaw) {
      try {
        stored = JSON.parse(storedRaw)
      } catch {
        stored = []
      }
    }

    // Check if already exists, replace if so
    const existingIndex = stored.findIndex(item => item.produceId === produceId)
    const newItem: CartItem = {
      produceId,
      produceName,
      produceType,
      unitType,
      selectedQuantity,
      orderBreakdown,
      totalPrice,
      category: selectedCategory || '',
    }

    if (existingIndex >= 0) {
      stored[existingIndex] = newItem
    } else {
      stored.push(newItem)
    }

    // Save back to sessionStorage and update local state
    saveCartToSession(stored)
    setCartItems(stored)

    reset()
  }

  // ✅ Remove produce from cart & sessionStorage
  const removeFromCart = (produceId: string) => {
    // Get current cart fresh
    let stored: CartItem[] = []
    const storedRaw = sessionStorage.getItem('cart-items')
    if (storedRaw) {
      try {
        stored = JSON.parse(storedRaw)
      } catch {
        stored = []
      }
    }

    const updated = stored.filter(item => item.produceId !== produceId)
    saveCartToSession(updated)
    setCartItems(updated)
  }

  const reset = () => {
    setSelectedQuantity(0)
    setOrderBreakdown([])
    setTotalPrice(0)
    setUnitType('')
    setQuantityError('')
  }

  // ✅ Produce switch with ID + Name
  const handleProduceSwitch = (newProduceId: string, newProduceName: string | undefined) => {
    reset();
    setSelectedProduceId(newProduceId);
    setSelectedProduce(newProduceName);
    const suggestions = getSuggestions(selectedCategory, newProduceName);
    if (!suggestions.some((t) => t.trim() !== "")) {
      setSelectedType(undefined);
    }
  }

  // ✅ UI rendering

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
              location: listing.farm.district,
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
                  setIsAddingToCart(true)
                  if (selectedProduceId && selectedProduce) {
                    addToCart(selectedProduceId, selectedProduce, selectedType)
                    showToast(
                      true,
                      `${selectedQuantity} ${selectedType ? selectedType + " " : ""}${selectedProduce} added to cart`
                    )

                  }
                  setIsAddingToCart(false);
                }}
                quantityError={quantityError}
                isAddingToCart={isAddingToCart}
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

          <div className="hidden lg:block">
            <AgroHubOrderSummary
              selectedQuantity={selectedQuantity}
              handleQuantityChange={setQuantity}
              orderBreakdown={orderBreakdown}
              totalPrice={totalPrice}
              onAddToCart={() => {
                setIsAddingToCart(true)
                if (selectedProduceId && selectedProduce) {
                  addToCart(selectedProduceId, selectedProduce, selectedType)
                  showToast(
                    true,
                    `${selectedQuantity} ${selectedType ? selectedType + " " : ""}${selectedProduce} added to cart`
                  )

                }
                setIsAddingToCart(false);
              }}
              quantityError={quantityError}
              isAddingToCart={isAddingToCart}
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
