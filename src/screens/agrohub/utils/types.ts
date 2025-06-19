export interface Farmer {
    id: string;
    name: string;
    location: string;
    quantityAvailable: number;
    pricePerKg: number;
    image: string;
  }
  
  export interface OrderBreakdown {
    farmerId: string;
    farmerName: string;
    quantity: number;
    price: number;
  }
  
  export interface ProductFormData {
    category: string;
    productType: string;
    productName: string;
    pricePerUnit: number;
    unitType: string;
  }
  