import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function StorePreviewPage() {
  // Mock products data
  const products = [
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
    {
      id: "4",
      name: "Fresh Lettuce",
      description: "Crisp, fresh lettuce harvested daily from our farms.",
      price: 3.49,
      currency: "USD",
      category: "fruits",
      quantity: 75,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80",
      status: "active",
    },
    {
      id: "5",
      name: "Organic Fertilizer",
      description: "Natural, organic fertilizer for healthier plants and soil.",
      price: 45.0,
      currency: "USD",
      category: "supplies",
      quantity: 20,
      unit: "bag",
      image:
        "https://images.unsplash.com/photo-1585314540237-13cb52fe9e67?w=800&q=80",
      status: "active",
    },
    {
      id: "6",
      name: "Irrigation Kit",
      description: "Complete drip irrigation system for small to medium farms.",
      price: 120.0,
      currency: "USD",
      category: "equipment",
      quantity: 10,
      unit: "kit",
      image:
        "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=800&q=80",
      status: "active",
    },
  ];

  // Categories
  const categories = [
    { id: "fruits", name: "Fruits & Vegetables" },
    { id: "grains", name: "Grains & Cereals" },
    { id: "dairy", name: "Dairy Products" },
    { id: "meat", name: "Meat & Livestock" },
    { id: "seeds", name: "Seeds & Seedlings" },
    { id: "equipment", name: "Farm Equipment" },
    { id: "supplies", name: "Farm Supplies" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">AgroHub Store</h1>
            <p className="text-muted-foreground">
              Quality agricultural products direct from the farm
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-[200px] md:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Link href="/store">
              <Button variant="default" size="sm">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between hover:bg-accent/50 p-2 rounded-md cursor-pointer"
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline">
                      {
                        products.filter((p) => p.category === category.id)
                          .length
                      }
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" placeholder="Min" />
                    <Input type="number" placeholder="Max" />
                  </div>
                </div>
                <Button className="w-full">
                  <Filter className="mr-2 h-4 w-4" /> Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Products</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded p-1">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2">
                    {categories.find((c) => c.id === product.category)?.name}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
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
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
