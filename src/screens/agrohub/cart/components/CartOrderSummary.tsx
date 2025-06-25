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
        <Card className="sticky top-8  border border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Items ({totalItems})</span>
                    <span className="font-medium ">LSL {totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold ">Total</span>
                      <span className="text-lg font-bold ">
                        LSL {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full  hover:bg-gray-800 "
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