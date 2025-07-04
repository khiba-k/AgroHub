import React from 'react'
import { Farmer } from '../../utils/types'
import { Card, CardContent } from '@/components/ui/card'

const AgroHubProductCard = (
    {
      type = undefined,
      produce,  
      farmer,
        
    }: {
        type: string | undefined,
        produce: string | undefined,
        farmer: Farmer | null
    }
) => {
  return (
    <div>
        
              
                <Card
                  key={farmer?.id}
                  className="border-gray-200 hover:border-black transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl"
                  onClick={() => farmer}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={farmer?.image}
                        alt="Produce Image"
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3">
                        {/* <span className="px-2 py-1 rounded text-xs font-semibold bg-black">
                          Fresh
                        </span> */}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold  mb-2">{type} {produce}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="">
                          <span className="font-medium">Farmer:</span> {farmer?.name}
                        </p>
                        <p className="">
                          <span className="font-medium">Location:</span> {farmer?.location}
                        </p>
                        <p className="text-gray-600 bg-gray-100 px-3 py-1 rounded-md px-3 py-1 rounded-md">
                          <span className="font-medium">Quantity Available:</span> {farmer?.quantityAvailable}kg
                        </p>
                        {/* <p className=" font-bold text-lg mt-2">
                          M{farmer?.pricePerKg}/kg
                        </p> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
    </div>
  )
}

export default AgroHubProductCard