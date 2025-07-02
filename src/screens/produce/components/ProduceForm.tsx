"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProduceStore } from "@/lib/store/useProductStore";
import { fetchProduce } from "@/screens/agrohub/utils/produceRequests";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import ProduceFormListingUpload from "./ProduceListingUpload";

interface ProduceFormProps {
    initialData?: any;
}

const capitalize = (str: string | null | undefined) =>
    (str ?? '')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

// Type examples based on produce name
const getTypeExamples = (produceName: string): string => {
    const examples: Record<string, string> = {
        'apple': 'e.g. Granny Smith, Red Delicious, Gala',
        'tomato': 'e.g. Cherry, Roma, Beefsteak',
        'potato': 'e.g. Russet, Red, Yukon Gold',
        'corn': 'e.g. Sweet Corn, Dent Corn, Popcorn',
        'bean': 'e.g. Black, Pinto, Navy',
        'lettuce': 'e.g. Romaine, Iceberg, Butterhead',
        'carrot': 'e.g. Nantes, Chantenay, Imperator',
        'onion': 'e.g. Yellow, Red, White',
        'pepper': 'e.g. Bell, Jalapeño, Habanero',
        'cabbage': 'e.g. Green, Red, Savoy',
        'orange': 'e.g. Navel, Valencia, Blood',
        'grape': 'e.g. Red Globe, Thompson, Concord',
        'banana': 'e.g. Cavendish, Plantain, Lady Finger',
        'wheat': 'e.g. Hard Red, Soft White, Durum',
        'rice': 'e.g. Basmati, Jasmine, Brown',
        'spinach': 'e.g. Baby, Savoy, Flat Leaf',
        'broccoli': 'e.g. Calabrese, Purple Sprouting, Romanesco'
    };

    const lowerName = produceName.toLowerCase();
    for (const [key, example] of Object.entries(examples)) {
        if (lowerName.includes(key)) {
            return example;
        }
    }
    return 'e.g. specify variety or cultivar';
};

export function ProduceForm({ initialData }: ProduceFormProps) {
    const [date, setDate] = useState<Date | undefined>(
        initialData?.harvestDate ? new Date(initialData.harvestDate) : undefined,
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showHarvestDialog, setShowHarvestDialog] = useState(false);
    const [harvestDate, setHarvestDate] = useState<Date | undefined>(undefined);

    // Check if this is an active listing (limits what can be edited)
    const isActiveListing = initialData?.status === 'active';
    const isEditing = !!initialData;

    // Form field states - Initialize with data from nested produce object
    const [category, setCategory] = useState(initialData?.produce?.category || initialData?.category || "");
    const [produceName, setProduceName] = useState(initialData?.produce?.name || initialData?.name || "");
    const [produceType, setProduceType] = useState(initialData?.produce?.type || initialData?.type || "");
    const [location, setLocation] = useState(initialData?.location || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [imageUrls, setImageUrls] = useState<string[]>([])

    const getQuantityAndUnit = (data: any): [string, string] => {
        if (!data?.quantity) return ["", "kg"];
        if (typeof data.quantity === "number") {
            return [String(data.quantity), data.unit || "kg"];
        }
        if (typeof data.quantity === "string" && data.quantity.includes(" ")) {
            const [qty, u] = data.quantity.split(" ");
            return [qty, u || "kg"];
        }
        return [String(data.quantity), data.unit || "kg"];
    };

    const [initialQty, initialUnit] = getQuantityAndUnit(initialData);
    const [quantity, setQuantity] = useState(initialQty);
    const [unit, setUnit] = useState(initialUnit);
    const [status, setStatus] = useState(initialData?.status || "draft");

    // Update form fields when initialData changes
    useEffect(() => {
        if (initialData) {
            setCategory(initialData?.produce?.category || initialData?.category || "");
            setProduceName(initialData?.produce?.name || initialData?.name || "");
            setProduceType(initialData?.produce?.type || initialData?.type || "");
            setLocation(initialData?.location || "");
            setDescription(initialData?.description || "");
            setStatus(initialData?.status || "draft");

            const [qty, unit] = getQuantityAndUnit(initialData);
            setQuantity(qty);
            setUnit(unit);

            if (initialData?.harvestDate) {
                setDate(new Date(initialData.harvestDate));
            }
        }
    }, [initialData]);

    // Dropdown states
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [nameOpen, setNameOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);

    const { getSuggestions, resetProduce, setProduceMap, produceMap } = useProduceStore();

    // Calculate estimated income
    const [estimatedIncome, setEstimatedIncome] = useState<number | null>(null);

    // Helper function to get produce details from the store
    const getProduceDetails = (category: string, name: string, type?: string) => {
        if (!category || !name) return null;

        const formattedCategory = capitalize(category);
        const formattedName = capitalize(name);
        const formattedType = type ? capitalize(type) : '';

        const categoryMap = produceMap[formattedCategory];
        if (!categoryMap) return null;

        const nameMap = categoryMap[formattedName];
        if (!nameMap) return null;

        // If type is specified, try to get that specific type
        if (formattedType && nameMap[formattedType]) {
            return nameMap[formattedType];
        }

        // If no type specified or type not found, get the first available type
        const availableTypes = Object.keys(nameMap);
        if (availableTypes.length > 0) {
            return nameMap[availableTypes[0]];
        }

        return null;
    };

    useEffect(() => {
        if (category && produceName && quantity && !isNaN(Number(quantity))) {
            const details = getProduceDetails(category, produceName, produceType);
            if (details && details.pricePerUnit) {
                const price = parseFloat(details.pricePerUnit);
                const qty = parseFloat(quantity);
                if (!isNaN(price) && !isNaN(qty)) {
                    setEstimatedIncome(price * qty);
                } else {
                    setEstimatedIncome(null);
                }
            } else {
                setEstimatedIncome(null);
            }
        } else {
            setEstimatedIncome(null);
        }
    }, [category, produceName, produceType, quantity, produceMap]);

    // Load produce data on mount
    useEffect(() => {
        const refreshProduce = async () => {
            try {
                resetProduce();

                const produceData = await fetchProduce();

                // Transform array into nested object
                const structuredData: Record<string, Record<string, Record<string, { id: string; pricePerUnit: string; unitType: string }>>> = {};

                produceData.forEach((item: { id: string; category: string; name: string; type: string; pricePerUnit: string; unitType: string }) => {
                    const cat = capitalize(item.category);
                    const name = capitalize(item.name);
                    const type = capitalize(item.type);

                    if (!structuredData[cat]) structuredData[cat] = {};
                    if (!structuredData[cat][name]) structuredData[cat][name] = {};

                    structuredData[cat][name][type] = {
                        id: item.id,
                        pricePerUnit: item.pricePerUnit,
                        unitType: item.unitType,
                    };
                });

                setProduceMap(structuredData);
            } catch (error) {
                console.error('Failed to refresh produce:', error);
            }
        };

        refreshProduce();
    }, []);

    // Get suggestions based on current selections
    const categorySuggestions = getSuggestions();
    const nameSuggestions = category ? getSuggestions(category) : [];
    const typeSuggestions = category && produceName ? getSuggestions(category, produceName) : [];

    // Clear dependent fields when parent changes (but only if not editing or not active listing)
    useEffect(() => {
        if (!initialData && !isActiveListing && !nameSuggestions.includes(produceName)) {
            setProduceName('');
            setProduceType('');
        }
    }, [category, initialData, isActiveListing]);

    useEffect(() => {
        if (!initialData && !isActiveListing && !typeSuggestions.includes(produceType)) {
            setProduceType('');
        }
    }, [produceName, initialData, isActiveListing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // If status is "to_be_harvested", show harvest date dialog
        if (status === 'to_be_harvested') {
            setShowHarvestDialog(true);
            return;
        }

        // Otherwise proceed with normal submission
        submitForm();
    };

    const submitForm = () => {
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setShowHarvestDialog(false);
            // Close dialog or redirect
            console.log('Form submitted successfully!');
        }, 1000);
    };

    const handleHarvestDateSubmit = () => {
        if (!harvestDate) {
            alert('Please select a harvest date');
            return;
        }

        // Process the form with harvest date
        submitForm();
    };

    const renderSuggestInput = (
        value: string,
        onChange: (value: string) => void,
        suggestions: string[],
        open: boolean,
        setOpen: (v: boolean) => void,
        placeholder: string,
        required: boolean = false
    ) => {
        const [focused, setFocused] = useState(false);

        const filteredSuggestions = suggestions
            .filter(s => s.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5);

        const showSuggestions = focused && filteredSuggestions.length > 0;

        return (
            <div className="relative">
                <div className="flex items-center relative">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute left-0 ml-1 z-10"
                        onClick={() => setOpen(!open)}
                    >
                        ▼
                    </Button>
                    <Input
                        placeholder={placeholder}
                        className="pl-10"
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setTimeout(() => setFocused(false), 100)}
                        required={required}
                    />
                </div>

                {showSuggestions && (
                    <div className="absolute bg-background left-0 mt-1 w-full z-20 border border-border rounded-md shadow-md max-h-48 overflow-y-auto">
                        {filteredSuggestions.map(suggestion => (
                            <div
                                key={suggestion}
                                onClick={() => {
                                    onChange(suggestion);
                                    setFocused(false);
                                }}
                                className="cursor-pointer px-3 py-1 text-sm hover:bg-accent"
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}

                {open && (
                    <div className="absolute bg-background left-0 mt-1 w-full z-20 border border-border rounded-md shadow-md max-h-48 overflow-y-auto">
                        {suggestions.slice(0, 10).map(suggestion => (
                            <div
                                key={suggestion}
                                onClick={() => {
                                    onChange(suggestion);
                                    setOpen(false);
                                }}
                                className="cursor-pointer px-3 py-1 text-sm hover:bg-accent"
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            {/* Basic Information Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                    {isActiveListing && (
                        <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                            🔒 Product details locked for active listings
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        {isActiveListing ? (
                            <Input
                                value={category}
                                disabled
                                className="bg-gray-50 text-gray-500"
                            />
                        ) : (
                            renderSuggestInput(
                                category,
                                setCategory,
                                categorySuggestions,
                                categoryOpen,
                                setCategoryOpen,
                                "e.g. Vegetables, Fruits, Grains",
                                true
                            )
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Produce Name *</Label>
                        {isActiveListing ? (
                            <Input
                                value={produceName}
                                disabled
                                className="bg-gray-50 text-gray-500"
                            />
                        ) : (
                            renderSuggestInput(
                                produceName,
                                setProduceName,
                                nameSuggestions,
                                nameOpen,
                                setNameOpen,
                                "e.g. Tomatoes, Apples, Maize",
                                true
                            )
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Type/Variety (Optional)</Label>
                        {isActiveListing ? (
                            <Input
                                value={produceType}
                                disabled
                                className="bg-gray-50 text-gray-500"
                                placeholder={produceType || "Not specified"}
                            />
                        ) : (
                            renderSuggestInput(
                                produceType,
                                setProduceType,
                                typeSuggestions,
                                typeOpen,
                                setTypeOpen,
                                getTypeExamples(produceName),
                                false
                            )
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Farm Location *</Label>
                        <Input
                            id="location"
                            placeholder="e.g. Maseru District, Leribe"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Quantity and Pricing Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold border-b pb-2">Quantity & Pricing</h3>
                    {isActiveListing && (
                        <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                            🔒 Unit type locked for active listings
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                            id="quantity"
                            type="number"
                            placeholder="e.g. 500"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unit">Unit *</Label>
                        {isActiveListing ? (
                            <Input
                                value={unit === 'kg' ? 'Kilograms (kg)' :
                                    unit === 'g' ? 'Grams (g)' :
                                        unit === 'ton' ? 'Tons' :
                                            unit === 'l' ? 'Liters (L)' :
                                                unit === 'dozen' ? 'Dozen' :
                                                    unit === 'pieces' ? 'Pieces' :
                                                        unit === 'crates' ? 'Crates' :
                                                            unit === 'bags' ? 'Bags' : unit}
                                disabled
                                className="bg-gray-50 text-gray-500"
                            />
                        ) : (
                            <Select value={unit} onValueChange={setUnit}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                    <SelectItem value="g">Grams (g)</SelectItem>
                                    <SelectItem value="ton">Tons</SelectItem>
                                    <SelectItem value="l">Liters (L)</SelectItem>
                                    <SelectItem value="dozen">Dozen</SelectItem>
                                    <SelectItem value="pieces">Pieces</SelectItem>
                                    <SelectItem value="crates">Crates</SelectItem>
                                    <SelectItem value="bags">Bags</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status *</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="active">Available Now</SelectItem>
                                {isActiveListing ? null : (<SelectItem value="to_be_harvested">To Be Harvested</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Estimated Income Display */}
                {estimatedIncome !== null && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">Estimated Income:</span>
                            <span className="text-lg font-bold text-green-900">
                                M {estimatedIncome.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                            Based on current market pricing for {produceName} {produceType && `(${produceType})`}
                        </p>
                    </div>
                )}
            </div>

            {/* Description Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Additional Details</h3>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your produce quality, growing methods, organic certification, etc."
                        className="min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            {/* Images Section */}
            <div className="space-y-1">
                <h3 className="text-lg font-semibold border-b pb-2">Images</h3>

                {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-900">
                                Upload photos of your produce
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                PNG, JPG or WEBP up to 5MB each (max 5 photos)
                            </p>
                        </div>
                        <Button type="button" variant="outline" className="mt-2">
                            Choose Files
                        </Button>
                    </div>
                </div> */}
                <ProduceFormListingUpload imageUrls={imageUrls} setImageUrls={setImageUrls} />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t">
                <Button type="button" variant="outline" className="sm:w-auto w-full">
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="sm:w-auto w-full">
                    {isSubmitting
                        ? "Saving..."
                        : initialData
                            ? "Update Listing"
                            : "Create Listing"}
                </Button>
            </div>

            {/* Harvest Date Dialog */}
            <Dialog open={showHarvestDialog} onOpenChange={setShowHarvestDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Set Harvest Date</DialogTitle>
                        <DialogDescription>
                            When do you expect to harvest your {produceName}? This helps buyers plan their purchases.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Expected Harvest Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {harvestDate ? format(harvestDate, "PPP") : "Select harvest date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={harvestDate}
                                        onSelect={setHarvestDate}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowHarvestDialog(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleHarvestDateSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Listing"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    );
}