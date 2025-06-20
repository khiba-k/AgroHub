"use client";

import { useState, useMemo } from 'react';
import { Search, Heart, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '../utils/types';
import CartItems from './components/CartItems';
import { predefinedCartItems } from '../utils/data';
import CartOrderSummary from './components/CartOrderSummary';



export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(predefinedCartItems);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter cart items based on search query
  const filteredCartItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return cartItems;
    }
    
    return cartItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cartItems, searchQuery]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
          <CartItems
            filteredCartItems={filteredCartItems}
            totalItems={totalItems}
            searchQuery={searchQuery}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartOrderSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              cartItems={cartItems}
              />
          </div>
        </div>
      </main>
    </div>
  );
}