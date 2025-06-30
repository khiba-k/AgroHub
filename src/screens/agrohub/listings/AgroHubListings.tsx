"use client"

import { useState, useEffect } from "react"
import AgroHubProductFilter from "./components/AgroHubProductFilter"
import AgroHubProductCard from "./components/AgroHubProductCard"
import AgroHubOrderSummary from "./components/AgroHubOrderSummary"
import AgroHubQuantityDialog from "./components/AgroHubQuantityDialog"

import { useFilterListingsStore } from "@/lib/store/useFilterListingStore"
import { filterProduceListings } from "@/lib/requests/produceListingsRequests"
import { useProduceStore } from "@/lib/store/useProductStore"
import { useCartStore } from "@/lib/store/useCartStore"
import { AgroHubBlockSwitchDialog } from "./components/AgroHubBlockSwitchDialog"
import { loadListings } from "@/lib/utils/AgroHubListingsUtils"
import { set } from "date-fns"
import { handleBlockSwitchAddToCart, handleBlockSwitchCancel, handleBlockSwitchDiscard, handleQuantityChange } from "@/lib/utils/AgroHubCartUtils"

export default function AgroHubListings() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedProduceId, setSelectedProduceId] = useState<string | undefined>(undefined)
  const [selectedProduce, setSelectedProduce] = useState<string | undefined>(undefined)
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isBlockSwitchOpen, setIsBlockSwitchOpen] = useState(false)
  const [pendingProduceId, setPendingProduceId] = useState<string | null>(null)

  const { selectedQuantity, orderBreakdown, totalPrice, setQuantity, addToCart, reset, isInCart, loadFromCart, cartItems } = useCartStore()
  const { getSuggestions } = useProduceStore()
  const { listings, setListings } = useFilterListingsStore()

  useEffect(() => {
    console.log("Cart Items: ", cartItems)
    loadListings(setIsLoading, setListings, selectedCategory, selectedProduce, selectedType, getSuggestions)
  }, [selectedCategory, selectedProduce, selectedType])

  // const handleCardClick = () => {
  //   setIsOrderDialogOpen(true)
  // }

  // Entered quantity change updates
  const quantityChange = (quantity: number) => {
    handleQuantityChange(quantity, listings, setQuantity)
  }


  // Add to cart before switching to different produce
  const handleProduceSwitch = (newProduceId: string | undefined) => {
    if (selectedQuantity > 0 && newProduceId && !isInCart(newProduceId)) {
      setPendingProduceId(newProduceId)
      setIsBlockSwitchOpen(true)
      return
    }

    setSelectedProduce(newProduceId)
    if (newProduceId) {
      loadFromCart(newProduceId)
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
          {/* Filters + Product Cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Produce Listing</h2>
            </div>

            <AgroHubProductFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedProduce={selectedProduce}
              setSelectedProduce={(newProduceId) => handleProduceSwitch(newProduceId)}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />

            {renderContent()}
          </div>

          {/* Order Summary */}
          <AgroHubOrderSummary
            selectedQuantity={selectedQuantity}
            handleQuantityChange={quantityChange}
            orderBreakdown={orderBreakdown}
            totalPrice={totalPrice}
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
        onAddToCart={() =>
          handleBlockSwitchAddToCart(
            pendingProduceId,
            selectedProduce,
            addToCart,
            loadFromCart,
            setIsBlockSwitchOpen,
            setSelectedProduce,
            setPendingProduceId
          )
        }
        onDiscard={() =>
          handleBlockSwitchDiscard(
            pendingProduceId,
            reset,
            setIsBlockSwitchOpen,
            setSelectedProduce,
            loadFromCart,
            setPendingProduceId
          )
        }
        onCancel={() =>
          handleBlockSwitchCancel(
            setIsBlockSwitchOpen,
            setPendingProduceId
          )
        }
      />
    </div>
  )
}
