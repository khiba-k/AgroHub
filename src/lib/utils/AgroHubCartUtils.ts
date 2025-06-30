import { use } from "react"
import { FilteredListing } from "../store/useFilterListingStore"
import { useCartStore } from "../store/useCartStore"


// Handles quantity change and updates the cart state
export const handleQuantityChange = (quantity: number,
    listings: FilteredListing[],
    setQuantity: (quantity: number, listings: FilteredListing[]) => void,
) => {
    setQuantity(quantity, listings)
}

// Add to cart before switching produce filters (AgroHubListings.tsx)
export const handleBlockSwitchAddToCart = (
    pendingProduceId: string | null,
    selectedProduce: string | undefined,
    addToCart: (produceId: string, produceName: string) => void,
    loadFromCart: (produceId: string) => void,
    setIsBlockSwitchOpen: (open: boolean) => void,
    setSelectedProduce: (produceId: string | undefined) => void,
    setPendingProduceId: (produceId: string | null) => void
) => {
    if (pendingProduceId && selectedProduce) {
        addToCart(selectedProduce, selectedProduce)
        setIsBlockSwitchOpen(false)
        setSelectedProduce(pendingProduceId)
        loadFromCart(pendingProduceId)
        setPendingProduceId(null)
    }
}

// Discard selected produce if switching to a new one (AgroHubListings.tsx)
export const handleBlockSwitchDiscard = (
    pendingProduceId: string | null,
    reset: () => void,
    setIsBlockSwitchOpen: (open: boolean) => void,
    setSelectedProduce: (produceId: string | undefined) => void,
    loadFromCart: (produceId: string) => void,
    setPendingProduceId: (produceId: string | null) => void,
) => {
    reset() // Clear cart
    setIsBlockSwitchOpen(false) // Close the dialog
    if (pendingProduceId) {
        setSelectedProduce(pendingProduceId)
        loadFromCart(pendingProduceId)
        setPendingProduceId(null)
    }
}

// Cancel the block switch dialog without action (AgroHubListings.tsx)
export const handleBlockSwitchCancel = (
    setIsBlockSwitchOpen: (open: boolean) => void,
    setPendingProduceId: (produceId: string | null) => void,
) => {
    setIsBlockSwitchOpen(false)
    setPendingProduceId(null)
}