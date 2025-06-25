"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User, Plus, ShoppingCart } from 'lucide-react';
import { OrderBreakdown, ProductFormData } from '../utils/types';
import { farmers, predefinedProductTypes } from '../utils/data';
import AgroHubProductFilter from './components/AgroHubProductFilter';
import AgroHubProductCard from './components/AgroHubProductCard';
import AgroHubOrderSummary from './components/AgroHubOrderSummary';
import AgroHubQuantityDialog from './components/AgroHubQuantityDialog';


export default function AgroHubListings() {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [orderBreakdown, setOrderBreakdown] = useState<OrderBreakdown[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduce, setSelectedProduce] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    

  const calculateOrderBreakdown = (quantity: number) => {
    const breakdown: OrderBreakdown[] = [];
    let remainingQuantity = quantity;
    let total = 0;

    // Sort farmers by price (cheapest first)
    const sortedFarmers = [...farmers].sort((a, b) => a.pricePerKg - b.pricePerKg);

    for (const farmer of sortedFarmers) {
      if (remainingQuantity <= 0) break;
      
      const quantityFromFarmer = Math.min(remainingQuantity, farmer.quantityAvailable);
      const price = quantityFromFarmer * farmer.pricePerKg;
      
      if (quantityFromFarmer > 0) {
        breakdown.push({
          farmerId: farmer.id,
          farmerName: farmer.name, // This ensures the full name is stored
          quantity: quantityFromFarmer,
          price: price
        });
        
        total += price;
        remainingQuantity -= quantityFromFarmer;
      }
    }

    setOrderBreakdown(breakdown);
    setTotalPrice(total);
    
    if (remainingQuantity > 0) {
      alert(`Only ${quantity - remainingQuantity}kg available from all farmers`);
    }
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
    calculateOrderBreakdown(quantity);
  };

  const handleCardClick = () => {
    setIsOrderDialogOpen(true);
    calculateOrderBreakdown(selectedQuantity);
  };

  


  return (
    <div className="min-h-screen ">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Filters and Products */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold ">Produce Listing</h2>
            </div>

            {/* Filters */}
            <AgroHubProductFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            selectedProduce={selectedProduce} setSelectedProduce={setSelectedProduce}
            selectedType={selectedType} setSelectedType={setSelectedType} />

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {farmers.map((farmer) => (
                <AgroHubProductCard farmer={farmer} handleCardClick={handleCardClick}/>
              ))}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <AgroHubOrderSummary
            selectedQuantity={selectedQuantity}
            handleQuantityChange={handleQuantityChange}
            orderBreakdown={orderBreakdown}
            totalPrice={totalPrice}         />
      </div>
      </div>
      {/* Quantity Selection Dialog */}
      <AgroHubQuantityDialog
        isOrderDialogOpen={isOrderDialogOpen}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
        orderBreakdown={orderBreakdown}
        totalPrice={totalPrice}
        handleQuantityChange={handleQuantityChange}
      />
      
    </div>
  );
}