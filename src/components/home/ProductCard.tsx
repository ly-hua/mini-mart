// src/components/home/ProductCard.tsx
import * as React from 'react';
import { Star, Heart, Plus } from 'lucide-react';
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
    <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-4 relative hover:shadow-lg transition-all group h-full flex flex-col overflow-hidden cursor-pointer">

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
        <div className="h-32 md:h-40 w-full bg-gray-50 rounded-lg mb-3 md:mb-4 overflow-hidden relative">
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
      <div className="flex-1 flex flex-col transition-transform duration-300 group-hover:-translate-y-10 md:group-hover:-translate-y-12 bg-white relative">
        <div className="text-[10px] md:text-xs text-gray-500 mb-1">Category</div>

        <a href={`/product/${product.id}`}>
          <h3 className="font-bold text-sm md:text-base text-gray-800 mb-1 md:mb-2 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
            {product.name}
          </h3>
        </a>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1 mb-2 md:mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${i < Math.round(product.rating || 0)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
                  }`}
              />
            ))}
            <span className="text-[10px] md:text-xs text-gray-400 ml-1">({product.rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base md:text-lg font-bold text-[#00A651]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart Button (Slides up on hover) */}
      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#00A651] text-white py-2 md:py-2.5 rounded-lg font-medium hover:bg-[#008c44] transition-colors flex items-center justify-center gap-2 shadow-md text-sm md:text-base"
        >
          <Plus size={16} className="md:w-[18px] md:h-[18px]" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;