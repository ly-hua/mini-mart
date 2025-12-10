// src/components/home/ProductCard.tsx
import * as React from 'react';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(product);
  };

  const isFav = isFavorite(product.id);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-2 md:p-3 relative hover:shadow-lg transition-all group h-full flex flex-col overflow-hidden cursor-pointer">

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 rounded-full transition-colors z-10 ${isFav ? 'bg-red-50 text-red-500' : 'bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-red-500'
          }`}
      >
        <Heart size={16} className={`md:w-[18px] md:h-[18px] ${isFav ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image */}
      <a href={`/product/${product.id}`}>
        <div className="h-28 md:h-36 w-full bg-gray-50 rounded-lg mb-2 md:mb-3 overflow-hidden relative">
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            src={product.image}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = 'https://placehold.co/400x400/e5e7eb/6b7280?text=Product';
            }}
          />
        </div>
      </a>

      {/* Product Info */}
      <div className="flex-1 flex flex-col transition-transform duration-300 md:group-hover:-translate-y-10 bg-white relative">
        <div className="text-[10px] md:text-xs text-gray-500 mb-1">Category</div>

        <a href={`/product/${product.id}`}>
          <h3 className="font-bold text-sm md:text-base text-gray-800 mb-1 md:mb-2 line-clamp-2 md:min-h-[3rem]">
            {product.name}
          </h3>
        </a>

        {/* Rating - Hidden */}

        {/* Price and Add Button Row */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex flex-col md:flex-row md:items-center md:gap-2">
            <span className="text-base md:text-lg font-bold text-[#00A651]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Icon-only button on mobile, full button on desktop */}
          <button
            onClick={handleAddToCart}
            className="md:hidden bg-[#00A651] text-white p-2 rounded-lg hover:bg-[#008c44] transition-colors flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button (Desktop - Slides up on hover) */}
      <div className="hidden md:block absolute bottom-3 left-3 right-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#00A651] text-white py-2.5 rounded-lg font-medium hover:bg-[#008c44] transition-colors flex items-center justify-center gap-2 text-base"
        >
          <Plus size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;