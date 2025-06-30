"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

interface OrderBreakdown {
  farmerId: string
  farmerName: string
  quantity: number
  price: number
}

interface AgroHubQuantityDialogProps {
  isOrderDialogOpen: boolean
  setIsOrderDialogOpen: (value: boolean) => void
  selectedQuantity: number
  setSelectedQuantity: (value: number) => void
  orderBreakdown: OrderBreakdown[]
  totalPrice: number
  handleQuantityChange: (quantity: number) => void
}

const AgroHubQuantityDialog = ({
  isOrderDialogOpen,
  setIsOrderDialogOpen,
  selectedQuantity,
  setSelectedQuantity,
  orderBreakdown,
  totalPrice,
  handleQuantityChange
}: AgroHubQuantityDialogProps) => {
  return (
    <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
      <DialogContent className="bg-white border-gray-200 text-black max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Select Quantity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Quantity (kg)</Label>
            <Input
              type="number"
              value={selectedQuantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="mt-1 bg-white border-gray-300 text-black"
              min="1"
            />
          </div>

          {orderBreakdown.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Distribution:</h4>
              {orderBreakdown.map((order, index) => (
                <div key={index} className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="font-medium">{order.farmerName}:</span> {order.quantity}kg (M{order.price.toFixed(2)})
                </div>
              ))}
              <div className="font-bold text-black text-lg">
                Total: M{totalPrice.toFixed(2)}
              </div>
            </div>
          )}

          <Button
            onClick={() => setIsOrderDialogOpen(false)}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Confirm Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AgroHubQuantityDialog
