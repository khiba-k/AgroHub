"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

export function StoreProducts() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Organic Tomatoes",
      description: "Fresh organic tomatoes grown in our sustainable farm.",
      price: 5.99,
      currency: "USD",
      category: "fruits",
      quantity: 100,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
      status: "active",
    },
    {
      id: "2",
      name: "Premium Maize Seeds",
      description: "High-yield maize seeds for optimal crop production.",
      price: 12.5,
      currency: "USD",
      category: "seeds",
      quantity: 50,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
      status: "active",
    },
    {
      id: "3",
      name: "Merino Wool",
      description: "Premium quality wool from our highland sheep.",
      price: 25.0,
      currency: "USD",
      category: "livestock",
      quantity: 30,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1470137430626-983a37b8ea46?w=800&q=80",
      status: "active",
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const handleUpdateProduct = (values: any) => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...values } : product,
      ),
    );
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="aspect-video relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2">
                {product.category}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(product)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">
                    {product.currency === "USD"
                      ? "$"
                      : product.currency === "ZAR"
                        ? "R"
                        : product.currency === "KES"
                          ? "KSh"
                          : product.currency === "LSL"
                            ? "M"
                            : ""}
                    {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.quantity} {product.unit} available
                  </p>
                </div>
                <Button size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground mb-4">No products found</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Your First Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter details about your new product
                </DialogDescription>
              </DialogHeader>
              <ProductForm />
            </DialogContent>
          </Dialog>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details of your product
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleUpdateProduct}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
