import React, { useState } from 'react';
import {
  Search,
  Menu,
  User,
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface HeaderProps {
  onMenuToggle: () => void;
  cartItemCount?: number;
  onSearchOpen?: () => void;
}

const CATEGORIES = [
  {
    name: 'Beverages',
    sub: ['Water', 'Soft drinks', 'Juice', 'Energy drinks', 'Milk', 'Coffee/Tea']
  },
  {
    name: 'Instant Food',
    sub: ['Instant noodles', 'Cup noodles', 'Canned food', 'Ready-to-eat meals']
  },
  {
    name: 'Snacks',
    sub: ['Chips', 'Biscuits', 'Chocolate', 'Nuts']
  },
  {
    name: 'Bread & Bakery',
    sub: ['Bread', 'Sandwich', 'Pastries']
  },
  {
    name: 'Grocery',
    sub: ['Rice', 'Cooking oil', 'Sugar', 'Salt', 'Seasonings', 'Spices']
  },
  {
    name: 'Frozen Food',
    sub: ['Frozen meat', 'Sausage', 'Ice cream', 'Dumplings']
  },
  {
    name: 'Fresh Produce',
    sub: ['Fruits', 'Vegetables']
  },
  {
    name: 'Personal Care',
    sub: ['Shampoo', 'Soap', 'Toothpaste', 'Skin care', 'Sanitary pads']
  },
  {
    name: 'Household',
    sub: ['Detergent', 'Cleaning liquid', 'Dishwashing liquid', 'Tissue paper']
  },
  {
    name: 'Baby products',
    sub: ['Diapers', 'Milk powder', 'Baby food']
  }
];

const SEARCH_CATEGORIES = [
  'All Categories',
  'Beverages',
  'Instant Food',
  'Snacks',
  'Grocery',
  'Frozen Food',
  'Fresh Produce',
  'Personal Care',
  'Household',
  'Baby products'
];

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearchOpen }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { openDrawer, cartCount, cartTotal } = useCart();
  const { openWishlistDrawer, wishlistCount } = useWishlist();

  return (
    <header className="font-sans">
      {/* 1. TOP HEADER (Utility Links) */}
      <div className="bg-gray-50 border-b border-gray-100 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 h-10 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div className="flex items-center space-x-6">
            <a href="/about" className="hover:text-[#00A651] transition-colors">About Us</a>
            <a href="/blog" className="hover:text-[#00A651] transition-colors">Blog</a>
            <a href="/contact" className="hover:text-[#00A651] transition-colors">Contact Us</a>
            <a href="/faqs" className="hover:text-[#00A651] transition-colors">FAQs</a>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-400">Save up to 10% on all products with <span className="text-[#00A651] font-bold cursor-pointer">"GET20OFF"</span> code</span>
            <span className="text-gray-400">Free Shipping on orders over <span className="text-[#00A651] font-bold">$100!</span></span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Search, Icons) */}
      <div className="bg-white py-3 md:py-6 sticky top-0 z-30 shadow-sm md:shadow-none md:static">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between gap-2 md:gap-8">

          {/* Mobile Menu Button (Left) */}
          {/* Mobile Menu Button (Left) - Removed as menu is empty */}

          {/* Logo (Center on mobile, Left on desktop) */}
          <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-auto">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00A651] rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl">M</div>
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl font-bold text-gray-900 leading-none tracking-tight">Mini <span className="text-[#00A651]">Mart</span></span>
                <span className="text-[8px] md:text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden sm:block">Convenience Store</span>
              </div>
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-2xl hidden lg:block mx-auto">
            <form action="/shop" method="GET" className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 border-r border-gray-200 pr-2 z-10">
                <select
                  name="category"
                  aria-label="Select Category"
                  className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer pr-6 outline-none appearance-none font-medium max-w-[140px] h-full py-0"
                  defaultValue="All Categories"
                  onChange={(e) => e.target.form?.requestSubmit()}
                >
                  {SEARCH_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-2 pointer-events-none" />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search products..."
                autoComplete="off"
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 h-12 pl-44 pr-12 focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all text-sm placeholder-gray-400"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-0 h-12 w-12 bg-[#00A651] rounded-r-full flex items-center justify-center text-white hover:bg-[#008c44] transition-colors z-10"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Action Icons (Right) */}
          <div className="flex items-center gap-2 md:gap-6">

            {/* Mobile Search Icon */}
            <button
              aria-label="Search"
              onClick={() => onSearchOpen?.()}
              className="lg:hidden w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#00A651] hover:text-white transition-all"
            >
              <Search size={20} />
            </button>

            <a href="/login" className="hidden md:flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#00A651] group-hover:text-white transition-all">
                <User size={20} />
              </div>
              <div className="hidden xl:flex flex-col text-xs">
                <span className="text-gray-400">Account</span>
                <span className="font-bold text-gray-900">Login / Register</span>
              </div>
            </a>

            <button
              aria-label="Wishlist"
              onClick={(e) => {
                e.preventDefault();
                openWishlistDrawer();
              }}
              className="relative group hidden md:block"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#00A651] group-hover:text-white transition-all">
                <Heart size={20} />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00A651] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">{wishlistCount}</span>
            </button>

            {/* Cart Icon - Visible on Mobile now */}
            <button
              aria-label="Cart"
              onClick={(e) => {
                e.preventDefault();
                openDrawer();
              }}
              className="relative group flex items-center gap-3 hover:text-[#00A651] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#00A651] group-hover:text-white transition-all">
                <ShoppingCart size={20} />
              </div>
              <span className="absolute -top-1 right-0 md:left-7 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
              <div className="hidden xl:flex flex-col text-xs text-left">
                <span className="text-gray-400 font-normal">Your Cart</span>
                <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM NAVIGATION (Vertical + Horizontal) - Hidden on Mobile */}
      <div className="border-t border-gray-100 shadow-sm sticky top-0 bg-white z-40 hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center relative h-14">

          {/* Vertical Menu Trigger */}
          <div className="w-64 flex-shrink-0 h-full relative group">
            <button
              className="w-full h-full bg-[#00A651] text-white flex items-center justify-between px-6 font-bold text-sm tracking-wide uppercase transition-colors hover:bg-[#008c44]"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <div className="flex items-center gap-3">
                <Menu size={20} />
                <span>Shop By Categories</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu (Visible on Desktop) */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-100 rounded-b-lg overflow-visible py-2 hidden lg:block animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <ul className="text-sm text-gray-600 font-medium">
                  {CATEGORIES.map((cat, index) => (
                    <li key={index} className="px-6 py-2.5 hover:bg-emerald-50 hover:text-[#008c44] cursor-pointer flex items-center justify-between group/item relative">
                      <a href={`/shop?category=${cat.name.toLowerCase()}`} className="flex-1">
                        {cat.name}
                      </a>
                      {cat.sub && cat.sub.length > 0 && (
                        <>
                          <ChevronRight size={14} className="text-gray-300 group-hover/item:text-[#00A651]" />
                          {/* Sub Menu */}
                          <div className="absolute left-full top-0 w-56 bg-white shadow-lg border border-gray-100 rounded-r-lg rounded-bl-lg overflow-hidden py-2 hidden group-hover/item:block z-50">
                            <ul className="text-sm text-gray-600">
                              {cat.sub.map((sub, subIndex) => (
                                <li key={subIndex}>
                                  <a
                                    href={`/shop?category=${sub.toLowerCase()}`}
                                    className="block px-5 py-2 hover:bg-emerald-50 hover:text-[#008c44]"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 hidden lg:flex items-center px-8 h-full">
            <ul className="flex items-center gap-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
              <li><a href="/" className="hover:text-[#00A651] transition-colors flex items-center gap-1">Home</a></li>
              <li><a href="/deals" className="hover:text-[#00A651] transition-colors flex items-center gap-1">Special Offers</a></li>
              <li><a href="/contact" className="hover:text-[#00A651] transition-colors flex items-center gap-1">Contact Us</a></li>
            </ul>
          </nav>

          {/* Right Side Offer Text */}
          <div className="hidden xl:flex items-center gap-2 ml-auto">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs animate-pulse">%</div>
            <span className="text-sm font-bold text-gray-900">Special Offer! <span className="text-red-500 font-normal">Flat 50% Off</span></span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);