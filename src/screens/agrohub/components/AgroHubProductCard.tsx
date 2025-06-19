import React from 'react'
import { Farmer } from '../utils/types'
import { Card, CardContent } from '@/components/ui/card'

const AgroHubProductCard = (
    {
        farmer,
        handleCardClick
    }: {
        handleCardClick: (farmer: Farmer) => void, 
        farmer: Farmer | null
    }
) => {
  return (
    <div>
        
              
                <Card
                  key={farmer?.id}
                  className="bg-white border-gray-200 hover:border-black transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl"
                  onClick={() => farmer && handleCardClick(farmer)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={farmer?.image}
                        alt="Fuji Apples"
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-black text-white px-2 py-1 rounded text-xs font-semibold">
                          Fresh
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black mb-2">Fuji Apples</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Farmer:</span> {farmer?.name}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Location:</span> {farmer?.location}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Quantity Available:</span> {farmer?.quantityAvailable}kg
                        </p>
                        <p className="text-black font-bold text-lg mt-2">
                          M{farmer?.pricePerKg}/kg
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
    </div>
  )
}

export default AgroHubProductCard