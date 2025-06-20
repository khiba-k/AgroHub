import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const CartOrderSummary = ({
    totalItems,
    totalPrice,
    cartItems
}: {
    totalItems: number;
    totalPrice: number;
    cartItems: { id: string; name: string; price: number; quantity: number }[];
}) => {
  return (
    <div>
        <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span className="font-medium text-black">LSL {totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-black">
                        LSL {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  size="lg"
                  disabled={cartItems.length === 0}
                >
                  Proceed with Order
                </Button>
              </CardContent>
            </Card>
    </div>
  )
}

export default CartOrderSummary