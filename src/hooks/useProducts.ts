// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';

// Chocolate Images
import coco1 from '../assets/image/cocolate/image.png';
import coco2 from '../assets/image/cocolate/image copy.png';
import coco3 from '../assets/image/cocolate/image copy 2.png';
import coco4 from '../assets/image/cocolate/image copy 3.png';
import coco5 from '../assets/image/cocolate/image copy 4.png';
import coco6 from '../assets/image/cocolate/image copy 5.png';

// Drink Images
import drink1 from '../assets/image/drink/image.png';
import drink2 from '../assets/image/drink/image copy.png';
import drink3 from '../assets/image/drink/image copy 2.png';
import drink4 from '../assets/image/drink/image copy 3.png';
import drink5 from '../assets/image/drink/image copy 4.png';

// Noodle Images
import noodle1 from '../assets/image/noodle/image.png';
import noodle2 from '../assets/image/noodle/image copy.png';
import noodle3 from '../assets/image/noodle/image copy 2.png';
import noodle4 from '../assets/image/noodle/image copy 3.png';
import noodle5 from '../assets/image/noodle/image copy 4.png';

// Snack Images
import snack1 from '../assets/image/snack/image.png';
import snack2 from '../assets/image/snack/image copy.png';
import snack3 from '../assets/image/snack/image copy 2.png';
import snack4 from '../assets/image/snack/image copy 3.png';
import snack5 from '../assets/image/snack/image copy 4.png';
import snack6 from '../assets/image/snack/image copy 5.png';
import snack7 from '../assets/image/snack/image copy 6.png';
import snack8 from '../assets/image/snack/image copy 7.png';
import snack9 from '../assets/image/snack/image copy 8.png';

// Baby Product Images
import baby1 from '../assets/image/babyproduct/image.png';
import baby2 from '../assets/image/babyproduct/image copy.png';
import baby3 from '../assets/image/babyproduct/image copy 2.png';
import baby4 from '../assets/image/babyproduct/image copy 3.png';
import baby5 from '../assets/image/babyproduct/image copy 4.png';
import baby6 from '../assets/image/babyproduct/image copy 5.png';

// Water Images
import water1 from '../assets/image/water/image.png';
import water2 from '../assets/image/water/image copy.png';
import water3 from '../assets/image/water/image copy 2.png';
import water4 from '../assets/image/water/image copy 3.png';
import water5 from '../assets/image/water/image copy 4.png';

// Milk Images
import milk1 from '../assets/image/milk/image.png';
import milk2 from '../assets/image/milk/image copy.png';
import milk3 from '../assets/image/milk/image copy 2.png';
import milk4 from '../assets/image/milk/image copy 3.png';
import milk5 from '../assets/image/milk/image copy 4.png';
import milk6 from '../assets/image/milk/image copy 5.png';

// Soft Drink Images
import soft1 from '../assets/image/soft_drink/image.png';
import soft2 from '../assets/image/soft_drink/image copy.png';
import soft3 from '../assets/image/soft_drink/image copy 2.png';
import soft4 from '../assets/image/soft_drink/image copy 3.png';
import soft5 from '../assets/image/soft_drink/image copy 4.png';

// Instant Food Images
import instant1 from '../assets/image/instandfood/image.png';
import instant2 from '../assets/image/instandfood/image copy.png';
import instant3 from '../assets/image/instandfood/image copy 2.png';
import instant4 from '../assets/image/instandfood/image copy 3.png';
import instant5 from '../assets/image/instandfood/image copy 4.png';
import instant6 from '../assets/image/instandfood/image copy 5.png';
import instant7 from '../assets/image/instandfood/image copy 6.png';
import instant8 from '../assets/image/instandfood/image copy 7.png';
import instant9 from '../assets/image/instandfood/image copy 8.png';
import instant10 from '../assets/image/instandfood/image copy 9.png';
import instant11 from '../assets/image/instandfood/image copy 10.png';
import instant12 from '../assets/image/instandfood/image copy 11.png';
import instant13 from '../assets/image/instandfood/image copy 12.png';
import instant14 from '../assets/image/instandfood/image copy 13.png';
import instant15 from '../assets/image/instandfood/image copy 14.png';

// Extra Drink/Noodle
import drink6 from '../assets/image/drink/image copy 5.png';
import noodle6 from '../assets/image/noodle/image copy 5.png';
import noodle7 from '../assets/image/noodle/image copy 6.png';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  weight?: string;
  rating?: number;
  discount?: number;
}

export interface EssentialItem extends Product {
  offer?: string;
}

export interface ProductSectionData {
  title: string;
  countdown?: number;
  items: Product[];
}

const MOCK_SECTIONS: ProductSectionData[] = [
  {
    title: 'Best Sellers',
    countdown: 1803686399,
    items: [
      {
        id: 1,
        name: 'Cadbury Clinkers',
        price: 4.99,
        originalPrice: 6.50,
        weight: '300g',
        image: coco1,
        rating: 4.9,
        discount: 23
      },
      {
        id: 2,
        name: 'Cadbury Dairy Milk Chocolate',
        price: 2.49,
        originalPrice: 3.20,
        weight: '180g',
        image: coco2,
        rating: 4.8,
        discount: 22
      },
      {
        id: 3,
        name: 'Samyang Buldak Hot Chicken Ramen (5 Pack)',
        price: 7.99,
        originalPrice: 9.99,
        weight: '700g',
        image: noodle1,
        rating: 4.9,
        discount: 20
      },
      {
        id: 4,
        name: 'Mogu Mogu Grape with Nata de Coco',
        price: 1.89,
        weight: '320ml',
        image: drink1,
        rating: 4.7
      },
      {
        id: 5,
        name: 'Tao Kae Noi Big Roll Classic Seaweed',
        price: 3.99,
        weight: '9 x 3.6g',
        image: snack1,
        rating: 4.8
      },
      {
        id: 6,
        name: 'Pringles Sour Cream & Onion',
        price: 2.79,
        originalPrice: 3.50,
        weight: '165g',
        image: snack2,
        rating: 4.6,
        discount: 20
      }
    ]
  },
  {
    title: 'Trending Snacks',
    items: [
      {
        id: 7,
        name: 'Cadbury Gems',
        price: 1.99,
        weight: '37g',
        image: coco3,
        rating: 4.7
      },
      {
        id: 8,
        name: 'Mini Oreo Chocolate Cup',
        price: 2.29,
        weight: '67g',
        image: snack3,
        rating: 4.8
      },
      {
        id: 9,
        name: 'Samyang Buldak Rosé Ramen (5 Pack)',
        price: 8.49,
        weight: '720g',
        image: noodle2,
        rating: 4.9
      },
      {
        id: 10,
        name: 'Tao Kae Noi Big Roll Spicy',
        price: 3.99,
        weight: '10 x 3.6g',
        image: snack4,
        rating: 4.6
      },
      {
        id: 11,
        name: 'Buldak Hot Chicken Dumplings',
        price: 5.99,
        weight: '600g',
        image: noodle3,
        rating: 4.8
      },
      {
        id: 12,
        name: 'PlayMore Cooling Watermelon Candy',
        price: 1.59,
        weight: '22g',
        image: snack5,
        rating: 4.5
      },
      {
        id: 121,
        name: 'Bento Squid Seafood Snack',
        price: 1.99,
        weight: '20g',
        image: snack8,
        rating: 4.6
      },
      {
        id: 122,
        name: 'Hanami Prawn Crackers',
        price: 2.49,
        weight: '60g',
        image: snack9,
        rating: 4.7
      }
    ]
  },
  {
    title: 'Drinks Corner',
    items: [
      {
        id: 13,
        name: 'Mogu Mogu Blackcurrant',
        price: 1.89,
        weight: '320ml',
        image: drink2,
        rating: 4.7
      },
      {
        id: 14,
        name: 'Tropicana Pure Premium Orange',
        price: 3.49,
        weight: '1L',
        image: drink3,
        rating: 4.8
      },
      {
        id: 15,
        name: 'Basil Seed Drink Strawberry',
        price: 1.79,
        weight: '290ml',
        image: drink4,
        rating: 4.6
      },
      {
        id: 16,
        name: 'Tamek Mixed Fruit Nectar',
        price: 2.29,
        weight: '1L',
        image: drink5,
        rating: 4.5
      }
    ]
  },
  {
    title: 'Self-Heating Hot Pots',
    items: [
      {
        id: 17,
        name: 'Laweike Spicy Self-Heating Hot Pot',
        price: 8.99,
        originalPrice: 11.99,
        weight: '1 Serving',
        image: noodle4,
        rating: 4.8,
        discount: 25
      },
      {
        id: 18,
        name: 'Niurou Self-Heating Beef Hot Pot',
        price: 9.49,
        weight: '1 Serving',
        image: noodle5,
        rating: 4.9
      }
    ]
  },
  {
    title: 'Baby Essentials',
    items: [
      { id: 21, name: 'Huggies Dry Pants L (44 Pcs)', price: 12.99, weight: '44 Pcs', image: baby1, rating: 4.9 },
      { id: 22, name: 'Johnson\'s Baby Bath Milk + Rice', price: 4.99, weight: '500ml', image: baby2, rating: 4.8 },
      { id: 23, name: 'Pigeon Baby Wipes 99% Pure Water', price: 3.49, weight: '80 Pcs', image: baby3, rating: 4.7 },
      { id: 24, name: 'Cerelac Infant Cereal Wheat & Milk', price: 5.99, weight: '250g', image: baby4, rating: 4.8 },
      { id: 25, name: 'Pampers Premium Care Pants M', price: 14.99, weight: '48 Pcs', image: baby5, rating: 4.9, discount: 10 },
      { id: 26, name: 'Johnson\'s Baby Oil Regular', price: 3.99, weight: '200ml', image: baby6, rating: 4.6 }
    ]
  },
  {
    title: 'Hydration Station',
    items: [
      { id: 31, name: 'Evian Natural Mineral Water', price: 2.49, weight: '500ml', image: water1, rating: 4.8 },
      { id: 32, name: 'Perrier Carbonated Mineral Water', price: 1.99, weight: '330ml', image: water2, rating: 4.7 },
      { id: 33, name: 'Fiji Natural Artesian Water', price: 2.99, weight: '1L', image: water3, rating: 4.9 },
      { id: 34, name: 'Glaceau Vitamin Water XXX', price: 1.89, weight: '500ml', image: water4, rating: 4.6 },
      { id: 35, name: 'Smartwater Alkaline 9+pH', price: 2.19, weight: '1L', image: water5, rating: 4.7 }
    ]
  },
  {
    title: 'Dairy Favorites',
    items: [
      { id: 41, name: 'Fresh Milk Full Cream', price: 2.99, weight: '1L', image: milk1, rating: 4.9 },
      { id: 42, name: 'Strawberry Flavored Milk', price: 1.50, weight: '200ml', image: milk2, rating: 4.7 },
      { id: 43, name: 'Chocolate Milk Box', price: 1.50, weight: '200ml', image: milk3, rating: 4.8 },
      { id: 44, name: 'Soy Milk Original', price: 2.29, weight: '1L', image: milk4, rating: 4.6 },
      { id: 45, name: 'Almond Milk Unsweetened', price: 3.49, weight: '1L', image: milk5, rating: 4.8 },
      { id: 46, name: 'Oat Milk Barista Edition', price: 4.99, weight: '1L', image: milk6, rating: 4.9 }
    ]
  },
  {
    title: 'Refreshing Soft Drinks',
    items: [
      { id: 51, name: 'Coca-Cola Original', price: 1.29, weight: '330ml', image: soft1, rating: 4.8 },
      { id: 52, name: 'Pepsi Cola Can', price: 1.19, weight: '330ml', image: soft2, rating: 4.7 },
      { id: 53, name: 'Sprite Lemon-Lime', price: 1.29, weight: '330ml', image: soft3, rating: 4.7 },
      { id: 54, name: 'Fanta Orange Soda', price: 1.29, weight: '330ml', image: soft4, rating: 4.8 },
      { id: 55, name: '7UP Lemon Lime', price: 1.19, weight: '330ml', image: soft5, rating: 4.6 }
    ]
  },
  {
    title: 'Quick & Easy Meals',
    items: [
      { id: 61, name: 'Spicy Beef Instant Noodle Cup', price: 1.99, weight: '120g', image: instant1, rating: 4.8 },
      { id: 62, name: 'Seafood Flavor Cup Noodle', price: 1.99, weight: '120g', image: instant2, rating: 4.7 },
      { id: 63, name: 'Creamy Carbonara Hot Chicken', price: 2.49, weight: '140g', image: instant3, rating: 4.9 },
      { id: 64, name: 'Korean Kimchi Stew Ramen', price: 1.89, weight: '120g', image: instant4, rating: 4.8, discount: 15 },
      { id: 65, name: 'Vegetable Soup Instant', price: 1.49, weight: '80g', image: instant5, rating: 4.5 },
      { id: 66, name: 'Cheese Ramen Multi Pack', price: 6.99, weight: '5 x 120g', image: instant6, rating: 4.8 },
      { id: 67, name: 'Miso Soup Instant Paste', price: 3.49, weight: '200g', image: instant7, rating: 4.6 },
      { id: 68, name: 'Curry Rice Instant Meal', price: 4.49, weight: '300g', image: instant8, rating: 4.7 }
    ]
  },
  {
    title: 'Pantry & Ready Meals',
    items: [
      { id: 71, name: 'Canned Tuna in Brine', price: 2.49, weight: '185g', image: instant9, rating: 4.8 },
      { id: 72, name: 'Baked Beans in Tomato Sauce', price: 1.49, weight: '420g', image: instant10, rating: 4.7 },
      { id: 73, name: 'Canned Sweet Corn Kernels', price: 1.29, weight: '340g', image: instant11, rating: 4.6 },
      { id: 74, name: 'Spam Luncheon Meat', price: 3.99, weight: '340g', image: instant12, rating: 4.8 },
      { id: 75, name: 'Sardines in Tomato Sauce', price: 1.89, weight: '155g', image: instant13, rating: 4.5 },
      { id: 76, name: 'Vegetable Curry Pouch', price: 3.29, weight: '280g', image: instant14, rating: 4.6 },
      { id: 77, name: 'Butter Chicken Ready Meal', price: 5.49, weight: '350g', image: instant15, rating: 4.7 }
    ]
  }
];

const MOCK_ESSENTIALS: EssentialItem[] = [
  { id: 101, name: 'Kit Kat Classic', price: 1.99, weight: '45g', image: coco4, offer: 'Buy 2 Get 1 Free' },
  { id: 102, name: 'Cadbury Dairy Milk Spread', price: 5.99, weight: '400g', image: coco5 },
  { id: 103, name: 'Cadbury Dinky Deckers', price: 3.79, weight: '120g', image: coco6, discount: 15 },
  { id: 104, name: 'Pringles Hot & Spicy', price: 2.99, weight: '165g', image: snack6 },
  { id: 105, name: 'Lays Classic Salted', price: 1.99, weight: '50g', image: snack7 },
  { id: 106, name: 'Lipton Iced Tea Lemon', price: 1.49, weight: '320ml', image: drink6 },
  { id: 107, name: 'Nissin Cup Noodle Seafood', price: 1.49, weight: '75g', image: noodle6 },
  { id: 108, name: 'Nongshim Shin Ramyun Spicy', price: 1.29, weight: '120g', image: noodle7 }
];

export const useProducts = () => {
  const [sections, setSections] = useState<ProductSectionData[]>([]);
  const [essentials, setEssentials] = useState<EssentialItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mini Mart Categories
  const [navLinks] = useState<string[]>([
    'Beverages',
    'Instant Food',
    'Snacks',
    'Chocolate',
    'Grocery',
    'Frozen',
    'Fresh',
    'Household'
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSections(MOCK_SECTIONS);
      setEssentials(MOCK_ESSENTIALS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { sections, essentials, loading, navLinks };
};