import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { MarketPlaceProductCard, Product } from "./components/MarketPlaceProductCard";
import { MarketPlaceProductFilters } from "./components/MarketPlaceProductFilters";

export default function MarketPlace() {
    // Mock products data
    const products: Product[] = [
        {
            id: "1",
            name: "Organic Tomatoes",
            description:
                "Fresh, locally grown organic tomatoes. Perfect for salads and cooking.",
            price: 45.99,
            unit: "kg",
            image:
                "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
            seller: {
                name: "Cape Town Organics",
                location: "Western Cape, South Africa",
            },
            available: 50,
            currency: "ZAR",
        },
        {
            id: "2",
            name: "Fresh Maize",
            description:
                "Sweet corn harvested this week. Great for roasting or boiling.",
            price: 180.5,
            unit: "kg",
            image:
                "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
            seller: {
                name: "Nairobi Fresh Produce",
                location: "Nairobi, Kenya",
            },
            available: 100,
            currency: "KES",
        },
        {
            id: "3",
            name: "Organic Kale",
            description:
                "Nutrient-rich kale grown without pesticides. Great for smoothies and salads.",
            price: 35.5,
            unit: "bunch",
            image:
                "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=800&q=80",
            seller: {
                name: "Lesotho Highland Farms",
                location: "Maseru, Lesotho",
            },
            available: 30,
            currency: "LSL",
        },
        {
            id: "4",
            name: "Free-Range Eggs",
            description:
                "Farm fresh eggs from free-range chickens. Rich in flavor and nutrition.",
            price: 75.99,
            unit: "dozen",
            image:
                "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&q=80",
            seller: {
                name: "Happy Hen Farm",
                location: "Eastern Cape, South Africa",
            },
            available: 20,
            currency: "ZAR",
        },
        {
            id: "5",
            name: "Raw Honey",
            description:
                "Pure, unfiltered honey from local beekeepers. Perfect natural sweetener.",
            price: 950.0,
            unit: "jar",
            image:
                "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&q=80",
            seller: {
                name: "Bee Haven",
                location: "Nakuru, Kenya",
            },
            available: 15,
            currency: "KES",
        },
        {
            id: "6",
            name: "Fresh Avocados",
            description: "Creamy, ripe avocados. Perfect for guacamole or on toast.",
            price: 28.5,
            unit: "kg",
            image:
                "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
            seller: {
                name: "Thaba Bosiu Farms",
                location: "Leribe, Lesotho",
            },
            available: 40,
            currency: "LSL",
        },
    ];

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                    <p className="text-muted-foreground">
                        Browse and purchase agricultural products
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products, sellers..."
                            className="pl-8"
                        />
                    </div>
                    <Select defaultValue="USD">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="ZAR">ZAR (R)</SelectItem>
                            <SelectItem value="KES">KES (KSh)</SelectItem>
                            <SelectItem value="LSL">LSL (M)</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>Search</Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="hidden md:block">
                        <MarketPlaceProductFilters />
                    </div>
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <MarketPlaceProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
