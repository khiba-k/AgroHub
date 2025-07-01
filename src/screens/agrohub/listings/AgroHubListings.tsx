"use client"

import { useState, useEffect } from "react"
import AgroHubProductFilter from "./components/AgroHubProductFilter"
import AgroHubProductCard from "./components/AgroHubProductCard"
import AgroHubOrderSummary from "./components/AgroHubOrderSummary"
import AgroHubQuantityDialog from "./components/AgroHubQuantityDialog"
import { AgroHubBlockSwitchDialog } from "./components/AgroHubBlockSwitchDialog"

import { useFilterListingsStore } from "@/lib/store/useFilterListingStore"
import { useCartStore } from "@/lib/store/useCartStore"
import { loadListings } from "@/lib/utils/AgroHubListingsUtils"
import {
  // handleBlockSwitchAddToCart,
  // handleBlockSwitchCancel,
  // handleBlockSwitchDiscard,
  handleQuantityChange,
} from "@/lib/utils/AgroHubCartUtils"
import { useProduceStore } from "@/lib/store/useProductStore"

export default function AgroHubListings() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedProduceId, setSelectedProduceId] = useState<string | undefined>(undefined)
  const [selectedProduce, setSelectedProduce] = useState<string | undefined>(undefined)
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isBlockSwitchOpen, setIsBlockSwitchOpen] = useState(false)
  const [pendingProduceId, setPendingProduceId] = useState<string | null>(null)
  const [pendingProduceName, setPendingProduceName] = useState<string | null>(null)

  const { selectedQuantity, orderBreakdown, totalPrice, setQuantity, addToCart, reset, isInCart, loadFromCart, cartItems } = useCartStore()
  const { getSuggestions } = useProduceStore()
  const { listings, setListings } = useFilterListingsStore()

  useEffect(() => {
    console.log("Cart Items: ", cartItems)
    console.log("Selected Produce: ", selectedProduce)
    loadListings(setIsLoading, setListings, selectedCategory, selectedProduce, selectedType, getSuggestions)
  }, [selectedCategory, selectedProduce, selectedType])

  const quantityChange = (quantity: number) => {
    handleQuantityChange(quantity, listings, setQuantity)
  }

  const handleProduceSwitch = (newProduceName: string | undefined) => {
    const { reset, loadFromCart, isInCart } = useCartStore.getState()

    if (!selectedProduceId) {
      console.warn("No selectedProduceId to match switch logic.")
      reset()
      setSelectedProduce(newProduceName)
      setSelectedType(undefined) // Clear type on fresh start
      return
    }

    // If current produce has unsaved quantity, show block switch dialog
    if (selectedQuantity > 0 && !isInCart(selectedProduceId)) {
      setPendingProduceId(selectedProduceId)
      setPendingProduceName(newProduceName || null)
      setIsBlockSwitchOpen(true)
      return
    }

    // Normal switch flow — reset draft and load saved if exists
    reset()
    setSelectedProduce(newProduceName)

    const loaded = loadFromCart(selectedProduceId)
    if (loaded) {
      // Set produce name and type from loaded cart item if present
      setSelectedProduce(loaded.produceName)
      if (loaded.produceType) {
        setSelectedType(loaded.produceType)
      } else {
        setSelectedType(undefined) // no produceType available, clear it
      }
    } else {
      setSelectedType(undefined)
    }
  }


  const handleAddToCartFromSummary = () => {
    if (selectedProduceId && selectedProduce) {
      addToCart(selectedProduceId, selectedProduce)
      reset()
    }
  }

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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Produce Listing</h2>
            </div>

            <AgroHubProductFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedProduceId={setSelectedProduceId}
              selectedProduce={selectedProduce}
              setSelectedProduce={handleProduceSwitch}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />

            {renderContent()}
          </div>

          <AgroHubOrderSummary
            selectedQuantity={selectedQuantity}
            handleQuantityChange={quantityChange}
            orderBreakdown={orderBreakdown}
            totalPrice={totalPrice}
            onAddToCart={handleAddToCartFromSummary}
          />
        </div>
      </div>

      <AgroHubQuantityDialog
        isOrderDialogOpen={isOrderDialogOpen}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={(q) => setQuantity(q, listings)}
        orderBreakdown={orderBreakdown}
        totalPrice={totalPrice}
        handleQuantityChange={quantityChange}
      />

      <AgroHubBlockSwitchDialog
        open={isBlockSwitchOpen}
        onAddToCart={() => {
          if (pendingProduceId && pendingProduceName) {
            // Add current produce to cart first
            addToCart(selectedProduceId!, selectedProduce!, selectedType) // pass produceType too

            reset()
            setIsBlockSwitchOpen(false)

            // Switch to pending produce (the one user wants to switch to)
            setSelectedProduce(pendingProduceName)

            // Load saved cart draft for pending produce, including produceType
            const loaded = loadFromCart(pendingProduceId)
            if (loaded) {
              setSelectedProduce(loaded.produceName)
              if (loaded.produceType) {
                setSelectedType(loaded.produceType)
              } else {
                setSelectedType(undefined)
              }
            } else {
              setSelectedType(undefined)
            }

            setPendingProduceId(null)
            setPendingProduceName(null)
          }
        }}
        onDiscard={() => {
          reset()
          setIsBlockSwitchOpen(false)

          if (pendingProduceName && pendingProduceId) {
            setSelectedProduce(pendingProduceName)

            const loaded = loadFromCart(pendingProduceId)
            if (loaded) {
              setSelectedProduce(loaded.produceName)
              if (loaded.produceType) {
                setSelectedType(loaded.produceType)
              } else {
                setSelectedType(undefined)
              }
            } else {
              setSelectedType(undefined)
            }
          } else {
            setSelectedType(undefined)
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
