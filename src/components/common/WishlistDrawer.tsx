import React, { useEffect } from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface WishlistDrawerProps {
    navigate: (path: string) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ navigate }) => {
    const {
        isWishlistDrawerOpen,
        closeWishlistDrawer,
        favorites,
        removeFromWishlist
    } = useWishlist();

    const { addToCart } = useCart();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isWishlistDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            // Only reset if no other drawers are open (simplification)
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
    }, [isWishlistDrawerOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isWishlistDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeWishlistDrawer}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[51] shadow-2xl transform transition-transform duration-300 ease-in-out sm:rounded-l-3xl overflow-hidden border-l border-gray-100 ${isWishlistDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full bg-white">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            My Wishlist
                            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {favorites.length}
                            </span>
                        </h2>
                        <button
                            onClick={closeWishlistDrawer}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                            aria-label="Close Wishlist"
                        >
                            <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5">
                        {favorites.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center h-full">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Heart className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Your wishlist is empty</h3>
                                <p className="text-gray-500 text-sm mb-6">Save items you love to view later.</p>
                                <button
                                    onClick={closeWishlistDrawer}
                                    className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold text-sm hover:bg-emerald-700 transition-colors"
                                >
                                    Start Exploring
                                </button>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {favorites.map((product) => (
                                    <li key={product.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group relative border border-gray-100">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg border border-gray-100 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
                                                    <a href={`/product/${product.id}`} className="hover:text-emerald-600 transition-colors">
                                                        {product.name}
                                                    </a>
                                                </h4>
                                                <div className="text-emerald-600 font-bold text-sm">
                                                    ${product.price.toFixed(2)}
                                                </div>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={() => {
                                                    addToCart(product);
                                                    removeFromWishlist(product.id);
                                                }}
                                                className="mt-2 flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-emerald-600 transition-colors"
                                            >
                                                <ShoppingCart size={14} /> Move to Cart
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer - Optional action */}
                    {favorites.length > 0 && (
                        <div className="p-5 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={() => navigate('/')}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all text-sm uppercase tracking-wide"
                            >
                                Continue Shopping <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default WishlistDrawer;
