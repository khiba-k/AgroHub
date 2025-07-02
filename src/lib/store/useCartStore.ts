// lib/store/useCartStore.ts

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
  produceType?: string // ✅ optional
  unitType: string
  selectedQuantity: number
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
}

interface CartStore {
  selectedQuantity: number
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
  unitType: string

  cartItems: CartItem[]

  setQuantity: (quantity: number, listings: FilteredListing[]) => void
  calculateBreakdown: (quantity: number, listings: FilteredListing[]) => void
  addToCart: (produceId: string, produceName: string, produceType?: string) => void
  removeFromCart: (produceId: string) => void
  loadFromCart: (produceId: string) => CartItem | undefined
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

  addToCart: (produceId, produceName, produceType) => {
    const { selectedQuantity, orderBreakdown, totalPrice, unitType, cartItems } = get()

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

    console.log('Adding to cart:', newItem)

    if (existingIndex >= 0) {
      const updated = [...cartItems]
      updated[existingIndex] = newItem
      set({ cartItems: updated })
    } else {
      set({ cartItems: [...cartItems, newItem] })
    }

    get().reset()
  },

  removeFromCart: (produceId) => {
    set({
      cartItems: get().cartItems.filter(item => item.produceId !== produceId),
    })
  },

  loadFromCart: (produceId) => {
    const found = get().cartItems.find(item => item.produceId === produceId)
    if (found) {
      set({
        selectedQuantity: found.selectedQuantity,
        orderBreakdown: found.orderBreakdown,
        totalPrice: found.totalPrice,
        unitType: found.unitType,
      })
    } else {
      get().reset()
    }
    return found
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
