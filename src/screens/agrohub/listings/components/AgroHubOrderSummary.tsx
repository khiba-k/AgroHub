"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

interface OrderBreakdown {
  farmerId: string
  farmerName: string
  quantity: number
  price: number
}

interface AgroHubOrderSummaryProps {
  selectedQuantity: number
  handleQuantityChange: (quantity: number) => void
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
  onAddToCart: () => void
  quantityError: string
  onClose?: () => void;
}

const AgroHubOrderSummary = ({
  selectedQuantity,
  handleQuantityChange,
  orderBreakdown,
  totalPrice,
  onAddToCart,
  quantityError,
  onClose,
}: AgroHubOrderSummaryProps) => {
  return (
    <div className="w-full max-w-[90vw] sm:max-w-md mx-auto">
      <div className="border border-transparent sm:border-gray-200 rounded-lg p-3 sm:p-4 bg-background shadow-lg max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <h3 className="text-lg sm:text-xl font-bold flex items-center mb-4">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Order Summary
        </h3>

        <div className="space-y-4">
          <div>
            <Label className="font-medium">Order Quantity (kg)</Label>
            <Input
              type="number"
              value={selectedQuantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="mt-1 border-gray-300"
              min="1"
              inputMode="numeric"
            />
            {quantityError && (
              <p className="text-red-600 text-sm mt-1">{quantityError}</p>
            )}
          </div>

          {orderBreakdown.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Order Breakdown:</h4>
              {orderBreakdown.map((order, index) => (
                <div
                  key={index}
                  className="bg-muted p-3 rounded-lg border border-gray-200"
                >
                  <p className="text-sm font-medium">{order.farmerName}</p>
                  <p className="text-xs text-gray-600">
                    {order.quantity}kg × M{(order.quantity > 0 ? (order.price / order.quantity) : 0).toFixed(2)}
                  </p>
                  <p className="text-sm font-bold">M{order.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center text-base sm:text-xl font-bold">
              <span>Total Price:</span>
              <span>M{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full hover:bg-gray-800 font-semibold py-3"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AgroHubOrderSummary

