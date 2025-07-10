export interface Farmer {
    id: string;
    name: string;
    location: string;
    quantityAvailable: number;
    pricePerKg: number;
    image: string;
  }

  
  export interface ProductFormData {
    category: string;
    productType: string;
    productName: string;
    pricePerUnit: number;
    unitType: string;
  }
  
  export interface OrderBreakdown {
    farmerId: string;
    farmerName: string;
    quantity: number;
    price: number;
    location?: string
  }
  
  export interface CartItem {
    produceId: string;
    produceName: string;
    produceType?: string;
    unitType: string;
    selectedQuantity: number;
    orderBreakdown: OrderBreakdown[];
    totalPrice: number;
    category: string
  }
  