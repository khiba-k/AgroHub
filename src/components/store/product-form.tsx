"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

interface ProductFormProps {
  initialData?: any;
  onSubmit?: (values: any) => void;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    currency: initialData?.currency || "USD",
    category: initialData?.category || "",
    quantity: initialData?.quantity || 0,
    unit: initialData?.unit || "kg",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, this would send the data to your backend

    if (onSubmit) {
      onSubmit(formData);
      setIsSubmitting(false);
    } else {
      // Default behavior if no onSubmit provided
      setTimeout(() => {
        setIsSubmitting(false);
        // Show success message
        alert("Product saved successfully!");
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Organic Tomatoes"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your product..."
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => handleSelectChange("currency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="ZAR">ZAR (R)</SelectItem>
              <SelectItem value="KES">KES (KSh)</SelectItem>
              <SelectItem value="LSL">LSL (M)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fruits">Fruits & Vegetables</SelectItem>
            <SelectItem value="grains">Grains & Cereals</SelectItem>
            <SelectItem value="dairy">Dairy Products</SelectItem>
            <SelectItem value="meat">Meat & Livestock</SelectItem>
            <SelectItem value="seeds">Seeds & Seedlings</SelectItem>
            <SelectItem value="equipment">Farm Equipment</SelectItem>
            <SelectItem value="supplies">Farm Supplies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity Available</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select
            value={formData.unit}
            onValueChange={(value) => handleSelectChange("unit", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilograms (kg)</SelectItem>
              <SelectItem value="g">Grams (g)</SelectItem>
              <SelectItem value="ton">Tons</SelectItem>
              <SelectItem value="l">Liters (l)</SelectItem>
              <SelectItem value="ml">Milliliters (ml)</SelectItem>
              <SelectItem value="pcs">Pieces</SelectItem>
              <SelectItem value="box">Boxes</SelectItem>
              <SelectItem value="bag">Bags</SelectItem>
              <SelectItem value="head">Head (Livestock)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Image upload would go here in a real implementation */}
      <div className="border-2 border-dashed rounded-md p-6 text-center">
        <p className="text-muted-foreground">
          Drag and drop product images here or click to browse
        </p>
        <Button type="button" variant="outline" className="mt-2">
          <Upload className="mr-2 h-4 w-4" /> Upload Images
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : initialData
            ? "Update Product"
            : "Add Product"}
      </Button>
    </form>
  );
}
