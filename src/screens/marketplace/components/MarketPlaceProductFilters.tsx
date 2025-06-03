"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ProductFiltersProps {
    onFilterChange?: (filters: any) => void;
}

export function MarketPlaceProductFilters({ onFilterChange }: ProductFiltersProps) {
    const [priceRange, setPriceRange] = useState([0, 100]);

    const categories = [
        { id: "fruits", label: "Fruits" },
        { id: "vegetables", label: "Vegetables" },
        { id: "grains", label: "Grains" },
        { id: "dairy", label: "Dairy" },
        { id: "meat", label: "Meat" },
        { id: "poultry", label: "Poultry" },
    ];

    const locations = [
        { id: "nairobi", label: "Nairobi Region" },
        { id: "central", label: "Central Region" },
        { id: "eastern", label: "Eastern Region" },
        { id: "western", label: "Western Region" },
        { id: "coast", label: "Coastal Region" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="px-2">
                        <Slider
                            defaultValue={[0, 100]}
                            max={100}
                            step={1}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="mb-4"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="min-price">$</Label>
                                <Input
                                    id="min-price"
                                    type="number"
                                    className="w-20 h-8"
                                    value={priceRange[0]}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setPriceRange([value, priceRange[1]]);
                                    }}
                                />
                            </div>
                            <span>to</span>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="max-price">$</Label>
                                <Input
                                    id="max-price"
                                    type="number"
                                    className="w-20 h-8"
                                    value={priceRange[1]}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setPriceRange([priceRange[0], value]);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox id={`category-${category.id}`} />
                                <Label htmlFor={`category-${category.id}`}>
                                    {category.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium">Location</h3>
                    <div className="space-y-2">
                        {locations.map((location) => (
                            <div key={location.id} className="flex items-center space-x-2">
                                <Checkbox id={`location-${location.id}`} />
                                <Label htmlFor={`location-${location.id}`}>
                                    {location.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
            </CardContent>
        </Card>
    );
}
