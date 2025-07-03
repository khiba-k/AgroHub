"use client";

import { useState, useMemo, useEffect } from 'react';
import { CartItem } from '../utils/types'; // uses your correct CartItem interface
import CartItems from './components/CartItems';
import CartOrderSummary from './components/CartOrderSummary';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('cart-items');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Filter by produce name, produce type or unit type if you like
  const filteredCartItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return cartItems;
    }

    return cartItems.filter(item =>
      item.produceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.produceType && item.produceType.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [cartItems, searchQuery]);

  // ✅ Update by produceId
  const updateQuantity = (produceId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.produceId === produceId ? { ...item, selectedQuantity: newQuantity } : item
      )
    );
  };

  // ✅ Remove by produceId
  const removeItem = (produceId: string) => {
    setCartItems(items => items.filter(item => item.produceId !== produceId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.selectedQuantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen">
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
