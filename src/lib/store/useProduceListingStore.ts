import { create } from 'zustand';

export interface Listing {
  id: string;
  location: string;
  description: string;
  quantity: number;
  status: string;
  harvestDate?: string;
  soldDate?: string;        // ✅ new
  soldPrice?: number;       // ✅ new
  soldQuantity?: number;    // ✅ new
  produce: {
    id: string;
    name: string;
    category: string;
    type?: string | null;
    unitType: string;
    pricePerUnit: string;
  };
  images: {
    id: string;
    url: string;
  }[];
}

interface ProduceListingStore {
  listings: Listing[];
  page: number;
  total: number;
  hasMore: boolean;

  setListings: (listings: Listing[], total: number, hasMore: boolean) => void;
  addListings: (listings: Listing[], total: number, hasMore: boolean) => void;
  incrementPage: () => void;
  reset: () => void;

  updateListing: (updatedListing: Listing) => void;
  addListing: (newListing: Listing) => void;
}

export const useProduceListingStore = create<ProduceListingStore>((set) => ({
  listings: [],
  page: 1,
  total: 0,
  hasMore: true,

  setListings: (listings, total, hasMore) =>
    set(() => ({ listings, total, hasMore })),

  addListings: (newListings, total, hasMore) =>
    set((state) => {

      return {
        listings: [...state.listings, ...newListings],
        total,
        hasMore,
      };
    }),

  incrementPage: () =>
    set((state) => ({ page: state.page + 1 })),

  reset: () =>
    set(() => ({
      listings: [],
      page: 1,
      total: 0,
      hasMore: true,
    })),

  updateListing: (updatedListing) =>
    set((state) => {

      const newListings = state.listings.map((listing) =>
        listing.id === updatedListing.id ? updatedListing : listing
      );


      return { listings: newListings };
    }),

  addListing: (newListing) =>
    set((state) => ({
      listings: [newListing, ...state.listings],
      total: state.total + 1,
    })),
}));
