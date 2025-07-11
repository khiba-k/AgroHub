// ../../utils/types.ts (or wherever your main types file is)

// Existing interfaces (Farmer, Produce, etc.)
export interface Produce {
  id: string;
  name: string;
  category: string;
  quantityAvailable: number;
  pricePerKg: number;
  images: string[];
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  produces: Produce[];
}

export interface ProductFormData {
  category: string;
  productType: string;
  productName: string;
  pricePerUnit: number;
  unitType: string;
}

// ✅ NEW/MOVED: Define OrderBreakdown
export interface OrderBreakdown {
  farmerId: string;
  farmerName: string;
  quantity: number;
  price: number;
  location?: string;
}

// ✅ NEW/MOVED: Define CartItem
export interface CartItem {
  produceId: string;
  produceName: string;
  produceType?: string; // This was 'type' in your old AgroHubProductCard, now 'produceType'
  unitType: string;
  selectedQuantity: number;
  orderBreakdown: OrderBreakdown[];
  totalPrice: number;
  category: string;
}

// ... any other interfaces you might have ...