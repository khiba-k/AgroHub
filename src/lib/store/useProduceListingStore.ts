// stores/produceListingStore.ts
import { create } from 'zustand';

interface Listing {
  id: string;
  location: string;
  description: string;
  quantity: number;
  status: string;
  harvestDate?: string;
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
}

export const useProduceListingStore = create<ProduceListingStore>((set) => ({
  listings: [],
  page: 1,
  total: 0,
  hasMore: true,

  setListings: (listings, total, hasMore) =>
    set(() => ({ listings, total, hasMore })),

  addListings: (newListings, total, hasMore) =>
    set((state) => ({
      listings: [...state.listings, ...newListings],
      total,
      hasMore,
    })),

  incrementPage: () =>
    set((state) => ({ page: state.page + 1 })),

  reset: () =>
    set(() => ({
      listings: [],
      page: 1,
      total: 0,
      hasMore: true,
    })),
}));
