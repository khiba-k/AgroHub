import { filterProduceListings } from "../requests/produceListingsRequests"

export interface FilteredListing {
  id: string
  location: string
  description: string
  quantity: number
  status: string
  produce: {
    id: string
    name: string
    category: string
    type?: string | null
    unitType: string
    pricePerUnit: string
  }
  farm: {
    id: string
    name: string
    district: string
    country: string
  }
  images: {
    id: string
    url: string
  }[]
}

// This function loads listings based on selected filters and updates the store with the results.(AgroHubListings.tsx)
export const loadListings = async (
  setIsLoading: (loading: boolean) => void,
  setListings: (listings: FilteredListing[], total: number, hasMore: boolean, totalAvailable: number) => void,
  selectedCategory: string | undefined,
  selectedProduce: string | undefined,
  selectedType: string | undefined,
  getSuggestions: (category?: string, produce?: string) => string[],
) => {
  

  try {
    setIsLoading(true)

    if (!selectedCategory || !selectedProduce) {
      setListings([], 0, false, 0)
      setIsLoading(false)
      return
    }

    const availableTypes = getSuggestions(selectedCategory, selectedProduce)
    const realTypes = availableTypes.filter(type => type && type.trim() !== "")
    const hasTypes = realTypes.length > 0

    if (hasTypes && !selectedType) {
      setListings([], 0, false, 0)
      setIsLoading(false)
      return
    }

    const data = await filterProduceListings({
      category: selectedCategory,
      name: selectedProduce,
      type: hasTypes ? selectedType : undefined,
    })


    const totalAvailable: number = data.reduce(
      (sum: number, item: FilteredListing) => sum + item.quantity,
      0
    )

    setListings(data, data.length, data.length >= 6, totalAvailable)
  } catch (error) {
    setListings([], 0, false, 0)
  } finally {
    setIsLoading(false)
  }
}