"use client"
import { Button } from '@/components/ui/button'
import { Plus, User } from 'lucide-react'
import React, { useState } from 'react'
import { ProductFormData } from '../utils/types';
import AgroHubAddProductForm from '../components/AgroHubAddProductForm';

const AgroHubHeader = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
  return (
    <div>
        <header className="border-b border-gray-200 bg-white">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-black">AgroHub</h1>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => setShowAddProduct(true)}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Produce</span>
        </Button>
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  </header>
  {/* Form for adding new produce */}
    <AgroHubAddProductForm showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct}/>
  
  </div>
  )
}

export default AgroHubHeader