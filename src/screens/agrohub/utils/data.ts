import { Farmer } from './types';

export const farmers: Farmer[] = [
    {
      id: '1',
      name: 'Mampheteng Koote',
      location: 'Mafeteng',
      quantityAvailable: 180,
      pricePerKg: 25,
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Khiba Koenane',
      location: 'Berea',
      quantityAvailable: 150,
      pricePerKg: 23,
      image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Langa Matross',
      location: 'Maseru',
      quantityAvailable: 200,
      pricePerKg: 27,
      image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=400'
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