import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart } from 'lucide-react';
import React from 'react'
import { CartItem } from '../../utils/types';

const CartItems = (
    {
    filteredCartItems,
    totalItems,
    searchQuery,
    updateQuantity,
    removeItem
    }:{
    filteredCartItems: CartItem[];
    totalItems: number;
    searchQuery: string;
    updateQuantity: (id: string, newQuantity: number) => void;
    removeItem: (id: string) => void;
}
) => {
  return (
    <div>
        
            <div className=" rounded-lg border border-gray-200">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold ">Your Cart</h1>
                <p className="text-sm  mt-1">
                  {searchQuery ? (
                    <>
                      {filteredCartItems.length} of {totalItems} {totalItems === 1 ? 'item' : 'items'} 
                      {filteredCartItems.length === 0 ? ' found' : ' matching your search'}
                    </>
                  ) : (
                    <>
                      {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                    </>
                  )}
                </p>
              </div>

              <div className="divide-y">
                {filteredCartItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <ShoppingCart className="w-12 h-12  mx-auto mb-4" />
                    {searchQuery ? (
                      <>
                        <h3 className="text-lg font-medium  mb-2">No items found</h3>
                        <p>Try searching for a different product name or category</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                        <p className="text-gray-500">Start shopping to add items to your cart</p>
                      </>
                    )}
                  </div>
                ) : (
                  filteredCartItems.map((item) => (
                    <div key={item.id} className="p-6 hover: transition-colors">
                      <div className="flex items-center justify-between">
                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-medium ">
                            {item.name}
                          </h3>
                          <p className="text-sm capitalize mt-1">
                            {item.category}
                          </p>
                          <p className="text-lg font-semibold  mt-2">
                            LSL {item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Input */}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium ">
                              Quantity:
                            </label>
                            <Input
                              id={`quantity-${item.id}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 1;
                                updateQuantity(item.id, newQuantity);
                              }}
                              className="w-20 text-center"
                            />
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
  )
}

export default CartItems