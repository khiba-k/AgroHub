// lib/store/useProduceStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ProduceItem {
  id: string | undefined
  unitType: string
  pricePerUnit: string
}

export type ProduceStoreData = {
  [category: string]: {
    [name: string]: {
      [type: string]: ProduceItem
    }
  }
}

const capitalize = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

interface ProduceStore {
  produceMap: ProduceStoreData
  addProduce: (
    category: string,
    name: string,
    type: string,
    data: ProduceItem
  ) => void
  getSuggestions: (category?: string, name?: string) => string[]
  resetProduce: () => void
  setProduceMap: (map: ProduceStoreData) => void
}

export const useProduceStore = create<ProduceStore>()(
  persist(
    (set, get) => ({
      produceMap: {},

      addProduce: (category, name, type, data) => {
        const formattedCategory = capitalize(category)
        const formattedName = capitalize(name)
        const formattedType = capitalize(type)

        set(state => {
          const current = { ...state.produceMap }

          if (!current[formattedCategory]) current[formattedCategory] = {}
          if (!current[formattedCategory][formattedName]) current[formattedCategory][formattedName] = {}

          current[formattedCategory][formattedName][formattedType] = data

          return { produceMap: current }
        })
      },

      getSuggestions: (category, name) => {
        const map = get().produceMap

        if (!category) {
          return Object.keys(map)
        }

        const formattedCategory = capitalize(category)
        const categoryMap = map[formattedCategory]
        if (!categoryMap) return []

        if (!name) {
          return Object.keys(categoryMap)
        }

        const formattedName = capitalize(name)
        const nameMap = categoryMap[formattedName]
        if (!nameMap) return []

        return Object.keys(nameMap)
      },

      resetProduce: () => set({ produceMap: {} }),

      setProduceMap: (map: ProduceStoreData) => set({ produceMap: map }),
    }),
    {
      name: 'produce-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
