import { filterProduceListings } from "../requests/produceListingsRequests"
import { FilteredListing } from "../store/useFilterListingStore"

// This function loads listings based on selected filters and updates the store with the results.(AgroHubListings.tsx)
export const loadListings = async (setIsLoading: (loading: boolean) => void,
    setListings: (listings: FilteredListing[], total: number, hasMore: boolean) => void,
    selectedCategory: string | undefined,
    selectedProduce: string | undefined,
    selectedType: string | undefined,
    getSuggestions: (category?: string, produce?: string) => string[],

) => {
    try {
      setIsLoading(true)

      if (!selectedCategory || !selectedProduce) {
        setListings([], 0, false)
        setIsLoading(false)
        return
      }

      const availableTypes = getSuggestions(selectedCategory, selectedProduce)
      const hasTypes = availableTypes.length > 0 && availableTypes.some(type => type && type.trim() !== "")

      if (hasTypes && !selectedType) {
        setListings([], 0, false)
        setIsLoading(false)
        return
      }

      const data = await filterProduceListings({
        category: selectedCategory,
        name: selectedProduce,
        type: hasTypes ? selectedType : undefined,
      })

      setListings(data, data.length, data.length >= 6)
    } catch (error) {
      setListings([], 0, false)
    } finally {
      setIsLoading(false)
    }
  }