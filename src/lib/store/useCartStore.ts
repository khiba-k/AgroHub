// stores/useCartStore.ts

import { create } from 'zustand'
import { FilteredListing } from './useFilterListingStore'

interface OrderBreakdown {
  farmerId: string
  farmerName: string
  quantity: number
  price: number
}

interface CartItem {
  produceId: string
  produceName: string
  unitType: string
  selectedQuantity: number
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
}

interface CartStore {
  // Current draft order
  selectedQuantity: number
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
  unitType: string

  // Multiple produce in cart
  cartItems: CartItem[]

  // Actions
  setQuantity: (quantity: number, listings: FilteredListing[]) => void
  calculateBreakdown: (quantity: number, listings: FilteredListing[]) => void
  addToCart: (produceId: string, produceName: string) => void
  removeFromCart: (produceId: string) => void
  loadFromCart: (produceId: string) => void
  isInCart: (produceId: string) => boolean
  reset: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  selectedQuantity: 0,
  orderBreakdown: [],
  totalPrice: 0,
  unitType: '',
  cartItems: [],

  setQuantity: (quantity, listings) => {
    set({ selectedQuantity: quantity })
    get().calculateBreakdown(quantity, listings)
  },

  calculateBreakdown: (quantity, listings) => {
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

    const totalPrice = breakdown.reduce((sum, b) => sum + b.price, 0)

    set({
      orderBreakdown: breakdown,
      totalPrice: totalPrice,
      unitType: listings[0]?.produce.unitType || '',
    })
  },

  addToCart: (produceId, produceName) => {
    const { selectedQuantity, orderBreakdown, totalPrice, unitType, cartItems } = get()

    if (selectedQuantity <= 0 || orderBreakdown.length === 0) {
      console.warn('Nothing to add — quantity is zero or no breakdown.')
      return
    }

    const existingIndex = cartItems.findIndex(item => item.produceId === produceId)

    if (existingIndex >= 0) {
      // Overwrite if it already exists
      const updatedItems = [...cartItems]
      updatedItems[existingIndex] = {
        produceId,
        produceName,
        unitType,
        selectedQuantity,
        orderBreakdown,
        totalPrice,
      }
      set({ cartItems: updatedItems })
    } else {
      // Add new
      set({
        cartItems: [
          ...cartItems,
          {
            produceId,
            produceName,
            unitType,
            selectedQuantity,
            orderBreakdown,
            totalPrice,
          },
        ],
      })
    }

    // Clear current draft after adding
    get().reset()
  },

  removeFromCart: (produceId) => {
    const { cartItems } = get()
    set({
      cartItems: cartItems.filter(item => item.produceId !== produceId),
    })
  },

  loadFromCart: (produceId) => {
    const item = get().cartItems.find(item => item.produceId === produceId)
    if (item) {
      set({
        selectedQuantity: item.selectedQuantity,
        orderBreakdown: item.orderBreakdown,
        totalPrice: item.totalPrice,
        unitType: item.unitType,
      })
    } else {
      console.warn('No saved item for this produceId.')
    }
  },

  isInCart: (produceId) => {
    return get().cartItems.some(item => item.produceId === produceId)
  },

  reset: () => set({
    selectedQuantity: 0,
    orderBreakdown: [],
    totalPrice: 0,
    unitType: '',
  }),
}))
