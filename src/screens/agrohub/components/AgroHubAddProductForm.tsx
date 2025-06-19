import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react'
import { ProductFormData } from '../utils/types';
import { predefinedProductTypes } from '../utils/data';

interface AgroHubAddProductFormProps {
    showAddProduct: boolean;
    setShowAddProduct: (value: boolean) => void;
}

const AgroHubAddProductForm = ({showAddProduct, setShowAddProduct}: AgroHubAddProductFormProps) => {
    const [productForm, setProductForm] = useState<ProductFormData>({
        category: '',
        productName: '',
        productType: '',
        pricePerUnit: 0,
        unitType: ''
    });

    const handleProductTypeChange = (value: string) => {
        if (value === 'custom') {
            setProductForm(prev => ({ ...prev, productType: '' }));
        } else {
            setProductForm(prev => ({ ...prev, productType: value }));
        }
    };

    const handleSaveProduct = () => {
        console.log('Saving product:', productForm);
        setShowAddProduct(false);
        // Reset form
        setProductForm({
            category: '',
            productName: '',
            productType: '',
            pricePerUnit: 0,
            unitType: ''
        });
    };
    return (
        <div>
            <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                <DialogContent className="bg-white border-gray-200 text-black max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Add New Produce</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div>
                            <Label className="text-sm font-medium">Category</Label>
                            <Select
                                value={productForm.category}
                                onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                            >
                                <SelectTrigger className="mt-1 bg-white border-gray-300 text-black">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200">
                                    <SelectItem value="fruits">Fruits</SelectItem>
                                    <SelectItem value="vegetables">Vegetables</SelectItem>
                                    <SelectItem value="grains">Grains</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Product Name</Label>
                            <Input
                                placeholder="Enter Product Name"
                                value={productForm.productName}
                                onChange={(e) => setProductForm(prev => ({ ...prev, productName: e.target.value }))}
                                className="mt-1 bg-white border-gray-300 text-black"
                            />
                        </div>


                        <div>
                            <Label className="text-sm font-medium">Product Type</Label>
                            <div className="space-y-2">
                                <Select onValueChange={handleProductTypeChange}>
                                    <SelectTrigger className="mt-1 bg-white border-gray-300 text-black">
                                        <SelectValue placeholder="Select or enter custom type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-200">
                                        {predefinedProductTypes.map((type) => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                        <SelectItem value="custom">Custom (Enter below)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="Enter custom product type"
                                    value={productForm.productType}
                                    onChange={(e) => setProductForm(prev => ({ ...prev, productType: e.target.value }))}
                                    className="bg-white border-gray-300 text-black"
                                />
                            </div>
                        </div>

                    

                        <div>
                            <Label className="text-sm font-medium">Price per Unit</Label>
                            <Input
                                type="number"
                                placeholder="Enter Price per Unit"
                                value={productForm.pricePerUnit || ''}
                                onChange={(e) => setProductForm(prev => ({ ...prev, pricePerUnit: Number(e.target.value) }))}
                                className="mt-1 bg-white border-gray-300 text-black"
                            />
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Unit Type</Label>
                            <Select
                                value={productForm.unitType}
                                onValueChange={(value) => setProductForm(prev => ({ ...prev, unitType: value }))}
                            >
                                <SelectTrigger className="mt-1 bg-white border-gray-300 text-black">
                                    <SelectValue placeholder="Select Unit Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200">
                                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                                    <SelectItem value="g">Gram (g)</SelectItem>
                                    <SelectItem value="ton">Ton</SelectItem>
                                    <SelectItem value="piece">Piece</SelectItem>
                                    <SelectItem value="bunch">Bunch</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleSaveProduct}
                            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3"
                        >
                            Save Product
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AgroHubAddProductForm