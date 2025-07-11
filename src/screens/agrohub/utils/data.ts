import { Farmer } from './types';

export const farmers: Farmer[] = [
  {
    id: '1',
    name: 'Mampheteng Koote',
    location: 'Maseru', // Changed to Maseru to match the public listing screenshot for Potatoes
    produces: [
      {
        id: 'p1',
        name: 'Potatoes', // Added Potatoes to Mampheteng's produce
        category: 'Vegetable',
        quantityAvailable: 32, // Quantity from screenshot
        pricePerKg: 80, // Price from farmer dashboard screenshot (assuming /kg, not /g)
        images: [
          'https://images.pexels.com/photos/144248/potatoes-vegetables-raw-food-144248.jpeg?auto=compress&cs=tinysrgb&w=400', // A good potato image
          'https://images.pexels.com/photos/5895780/pexels-photo-5895780.jpeg?auto=compress&cs=tinysrgb&w=400'
        ]
      },
      {
        id: 'p2',
        name: 'Carrots',
        category: 'Vegetable',
        quantityAvailable: 180,
        pricePerKg: 25,
        images: [
          'https://images.pexels.com/photos/8390/food-healthy-carrot-8390.jpg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/158679/cornfield-corn-agriculture-farm-158679.jpeg?auto=compress&cs=tinysrgb&w=400'
        ]
      },
      { // Original Tomatoes, still valid
        id: 'p5', // New ID if 'p2' was taken by Carrots. Ensure unique.
        name: 'Tomatoes',
        category: 'Vegetable',
        quantityAvailable: 100,
        pricePerKg: 20,
        images: [
          'https://images.pexels.com/photos/775031/pexels-photo-775031.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/8397/food-salad-tomatoes.jpg?auto=compress&cs=tinysrgb&w=400'
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Khiba Koenane',
    location: 'Maseru', // Changed to Maseru to match farmer dashboard screenshot for Banana
    produces: [
      {
        id: 'p3',
        name: 'Banana', // Added Banana to Khiba's produce
        category: 'Fruit',
        quantityAvailable: 43, // Quantity from screenshot
        pricePerKg: 5, // Price from screenshot
        images: [
          'https://images.pexels.com/photos/2260195/pexels-photo-2260195.jpeg?auto=compress&cs=tinysrgb&w=400', // A good banana image
          'https://images.pexels.com/photos/618526/pexels-photo-618526.jpeg?auto=compress&cs=tinysrgb&w=400'
        ]
      },
      { // Original Apples, still valid
        id: 'p6', // New ID if 'p3' was taken by Banana. Ensure unique.
        name: 'Apples',
        category: 'Fruit',
        quantityAvailable: 150,
        pricePerKg: 23,
        images: [
          'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/158679/cornfield-corn-agriculture-farm-158679.jpeg?auto=compress&cs=tinysrgb&w=400'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Mohale Malebanye',
    location: 'Maseru',
    produces: [
      {
        id: 'p4',
        name: 'Lettuce',
        category: 'Vegetable',
        quantityAvailable: 200,
        pricePerKg: 27,
        images: [
          'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/158679/cornfield-corn-agriculture-farm-158679.jpeg?auto=compress&cs=tinysrgb&w=400'
        ]
      }
    ]
  }
];

export const predefinedProductTypes = [
  'Fuji Apples',
  'Gala Apples',
  'Red Delicious Apples',
  'Green Apples',
  'Bananas',
  'Oranges',
  'Tomatoes',
  'Potatoes',
  'Carrots',
  'Lettuce'
];

export const predefinedCartItems = [
  {
    id: '1',
    name: 'Apples',
    category: 'Fruit',
    price: 59.99,
    quantity: 1
  },
  {
    id: '2',
    name: 'Bananas',
    category: 'Fruit',
    price: 39.49,
    quantity: 2
  },
  {
    id: '3',
    name: 'Carrots',
    category: 'Vegetable',
    price: 29.99,
    quantity: 3
  }
];


