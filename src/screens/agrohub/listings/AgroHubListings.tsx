"use client"

import { useState, useEffect } from "react"
import AgroHubProductFilter from "./components/AgroHubProductFilter"
import AgroHubProductCard from "./components/AgroHubProductCard"
import AgroHubOrderSummary from "./components/AgroHubOrderSummary"
import AgroHubQuantityDialog from "./components/AgroHubQuantityDialog"
import { AgroHubBlockSwitchDialog } from "./components/AgroHubBlockSwitchDialog"

import { loadListings } from "@/lib/utils/AgroHubListingsUtils"
import { useProduceStore } from "@/lib/store/useProductStore"

// ✅ Local types
interface OrderBreakdown {
  farmerId: string
  farmerName: string
  quantity: number
  price: number
}

interface CartItem {
  produceId: string
  produceName: string
  produceType?: string
  unitType: string
  selectedQuantity: number
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
}

export default function AgroHubListings() {
  // ✅ Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedProduceId, setSelectedProduceId] = useState<string | undefined>(undefined)
  const [selectedProduce, setSelectedProduce] = useState<string | undefined>(undefined)
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(false)

  // ✅ Cart states
  const [selectedQuantity, setSelectedQuantity] = useState(0)
  const [orderBreakdown, setOrderBreakdown] = useState<OrderBreakdown[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [unitType, setUnitType] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalAvailableQuantity, setTotalAvailableQuantity] = useState(0)
  const [quantityError, setQuantityError] = useState('')

  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)

  // ✅ Block switch states
  const [isBlockSwitchOpen, setIsBlockSwitchOpen] = useState(false)
  const [pendingProduceId, setPendingProduceId] = useState<string | null>(null)
  const [pendingProduceName, setPendingProduceName] = useState<string | null>(null)

  // ✅ Listings states
  const [listings, setListings] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const { getSuggestions, produceMap } = useProduceStore()

  // ✅ Load cart from session on page load
  useEffect(() => {
    const stored = sessionStorage.getItem('cart-items')
    if (stored) {
      setCartItems(JSON.parse(stored))
    }
  }, [])

  // ✅ Save cart to session when changed
  useEffect(() => {
    sessionStorage.setItem('cart-items', JSON.stringify(cartItems))
  }, [cartItems])

  // ✅ Load listings when filters change
  useEffect(() => {
    loadListings(
      setIsLoading,
      (newListings, newTotal, newHasMore, newTotalAvailable) => {
        setListings(newListings)
        setTotal(newTotal)
        setHasMore(newHasMore)
        setTotalAvailableQuantity(newTotalAvailable)
      },
      selectedCategory,
      selectedProduce,
      selectedType,
      getSuggestions
    )
  }, [selectedCategory, selectedProduce, selectedType, produceMap])

  // ✅ When selectedProduceId changes: restore cart item if saved, else reset
  useEffect(() => {
    if (!selectedProduceId) {
      reset()
      return
    }
    console.log("Selected Quantity:", selectedQuantity)
    const found = loadFromCart(selectedProduceId)
    if (!found) {
      reset()
    }
  }, [selectedProduceId])

  // ✅ Cart helpers
  const setQuantity = (quantity: number) => {
    if (quantity > totalAvailableQuantity) {
      setQuantityError(`Exceeded total available. Only ${totalAvailableQuantity}kg available.`)
    } else {
      setQuantityError('')
      setSelectedQuantity(quantity)
      calculateBreakdown(quantity)
    }
  }

  const calculateBreakdown = (quantity: number) => {
    let remaining = quantity
    const breakdown: OrderBreakdown[] = []

    for (const listing of listings) {
      if (remaining <= 0) break

      const chunk = Math.min(remaining, listing.quantity)
      if (chunk > 0) {
        breakdown.push({
          farmerId: listing.id,
          farmerName: listing.farm.name,
          quantity: chunk,
          price: chunk * Number(listing.produce.pricePerUnit),
        })
        remaining -= chunk
      }
    }

    const newTotalPrice = breakdown.reduce((sum, b) => sum + b.price, 0)

    setOrderBreakdown(breakdown)
    setTotalPrice(newTotalPrice)
    setUnitType(listings[0]?.produce.unitType || '')
  }

  const addToCart = (produceId: string, produceName: string, produceType?: string) => {
    if (selectedQuantity <= 0 || orderBreakdown.length === 0) {
      console.warn('Nothing to add.')
      return
    }

    const existingIndex = cartItems.findIndex(item => item.produceId === produceId)
    const newItem: CartItem = {
      produceId,
      produceName,
      produceType,
      unitType,
      selectedQuantity,
      orderBreakdown,
      totalPrice,
    }

    if (existingIndex >= 0) {
      const updated = [...cartItems]
      updated[existingIndex] = newItem
      setCartItems(updated)
    } else {
      setCartItems([...cartItems, newItem])
    }

    reset()
  }

  const removeFromCart = (produceId: string) => {
    setCartItems(cartItems.filter(item => item.produceId !== produceId))
  }

  const loadFromCart = (produceId: string) => {
    const found = cartItems.find(item => item.produceId === produceId)
    if (found) {
      setSelectedQuantity(found.selectedQuantity)
      setOrderBreakdown(found.orderBreakdown)
      setTotalPrice(found.totalPrice)
      setUnitType(found.unitType)
    }
    return found
  }

  const isInCart = (produceId: string) => {
    return cartItems.some(item => item.produceId === produceId)
  }

  const reset = () => {
    setSelectedQuantity(0)
    setOrderBreakdown([])
    setTotalPrice(0)
    setUnitType('')
  }

  const clearCart = () => {
    setCartItems([])
    reset()
  }

  // ✅ Produce switch with ID + Name
  const handleProduceSwitch = (newProduceId: string, newProduceName: string | undefined) => {
    reset()
    setSelectedProduceId(newProduceId)
    setSelectedProduce(newProduceName)

    const suggestions = getSuggestions(selectedCategory, newProduceName)
    if (!suggestions.some(t => t.trim() !== "")) {
      setSelectedType(undefined)
    }
  }

  // ✅ UI
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-4"></div>
            <p className="text-gray-600">Loading produce listings...</p>
          </div>
        </div>
      )
    }

    if (listings.length === 0) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">No listings found for current filters.</p>
        </div>
      )
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
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Produce Listing</h2>

            <AgroHubProductFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedProduceId={setSelectedProduceId}
              selectedProduce={selectedProduce}
              setSelectedProduce={setSelectedProduce} // ✅ One arg only
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />

            {renderContent()}
          </div>

          <AgroHubOrderSummary
            selectedQuantity={selectedQuantity}
            handleQuantityChange={setQuantity}
            orderBreakdown={orderBreakdown}
            totalPrice={totalPrice}
            onAddToCart={() => {
              if (selectedProduceId && selectedProduce) {
                addToCart(selectedProduceId, selectedProduce, selectedType)
              }
            }}
            quantityError={quantityError}
          />
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
            addToCart(selectedProduceId!, selectedProduce!, selectedType)
            reset()
            setIsBlockSwitchOpen(false)
            handleProduceSwitch(pendingProduceId, pendingProduceName)
            setPendingProduceId(null)
            setPendingProduceName(null)
          }
        }}
        onDiscard={() => {
          reset()
          setIsBlockSwitchOpen(false)
          if (pendingProduceId && pendingProduceName) {
            handleProduceSwitch(pendingProduceId, pendingProduceName)
          }
          setPendingProduceId(null)
          setPendingProduceName(null)
        }}
        onCancel={() => {
          setIsBlockSwitchOpen(false)
          setPendingProduceId(null)
          setPendingProduceName(null)
        }}
      />
    </div>
  )
}
