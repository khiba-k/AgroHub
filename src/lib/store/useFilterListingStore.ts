// // stores/useFilterListingsStore.ts

// import { create } from 'zustand'

// export interface FilteredListing {
//   id: string
//   location: string
//   description: string
//   quantity: number
//   status: string
//   produce: {
//     id: string
//     name: string
//     category: string
//     type?: string | null
//     unitType: string
//     pricePerUnit: string
//   }
//   farm: {
//     id: string
//     name: string
//     district: string
//     country: string
//   }
//   images: {
//     id: string
//     url: string
//   }[]
// }

// interface FilterListingsStore {
//   listings: FilteredListing[]
//   page: number
//   total: number
//   hasMore: boolean
//   setListings: (listings: FilteredListing[], total: number, hasMore: boolean) => void
//   reset: () => void
// }

// export const useFilterListingsStore = create<FilterListingsStore>((set) => ({
//   listings: [],
//   page: 1,
//   total: 0,
//   hasMore: true,

//   setListings: (listings, total, hasMore) =>
//     set(() => ({ listings, total, hasMore })),

//   reset: () =>
//     set(() => ({
//       listings: [],
//       page: 1,
//       total: 0,
//       hasMore: true,
//     })),
// }))
