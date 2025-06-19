import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

const AgroHubOrderSummary = (
  {
    selectedQuantity,
    handleQuantityChange,
    orderBreakdown,
    totalPrice
  }: {
    selectedQuantity: number;
    handleQuantityChange: (quantity: number) => void;
    orderBreakdown: { farmerName: string; quantity: number; price: number }[];
    totalPrice: number;
  }
) => {
  return (
    <div>
        <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Summary
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-black font-medium">Order Quantity (kg)</Label>
                  <Input
                    type="number"
                    value={selectedQuantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    className="mt-1 bg-white border-gray-300 text-black"
                    min="1"
                  />
                </div>

                {orderBreakdown.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-black">Order Breakdown:</h4>
                    {orderBreakdown.map((order, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-sm font-medium text-black">{order.farmerName}</p>
                        <p className="text-xs text-gray-600">{order.quantity}kg × M{(order.price / order.quantity).toFixed(2)}</p>
                        <p className="text-sm font-bold text-black">M{order.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-black">
                    <span>Total Price:</span>
                    <span>M{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      
  )
}

export default AgroHubOrderSummary