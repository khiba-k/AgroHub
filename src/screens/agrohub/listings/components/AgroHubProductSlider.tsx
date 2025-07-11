"use client"

import React from 'react'
import AgroHubProductCard from './AgroHubProductCard'
// Import both Farmer and Produce types
import { Farmer, Produce } from '../../utils/types'

// Define the interface for a single item in the data array
// This represents the combination of a produce item and its farmer
interface ProductDataItem {
  produceItem: Produce; // This will hold the actual produce object
  farmer: Farmer;       // This will hold the farmer object associated with that produce
}

interface ProductSliderProps {
  // The 'data' prop should now be an array of ProductDataItem
  data: ProductDataItem[]
}

const AgroHubProductSlider = ({ data }: ProductSliderProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4 px-4 py-2">
        {data.map((item, index) => (
          <div key={index} className="min-w-[260px] flex-shrink-0">
            <AgroHubProductCard
              // Pass the 'produceItem' and 'farmer' properties from the 'item' object
              produceItem={item.produceItem}
              farmer={item.farmer}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgroHubProductSlider