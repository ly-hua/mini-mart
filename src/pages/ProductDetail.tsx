import * as React from 'react';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Check, Shield, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/home/ProductCard';

const ProductDetail: React.FC = () => {
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useWishlist();
    const { sections } = useProducts();

    const [quantity, setQuantity] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState('description');
    const [isAdded, setIsAdded] = React.useState(false);
    const [productId, setProductId] = React.useState(window.location.pathname.split('/product/')[1]);

    // Listen for URL changes
    React.useEffect(() => {
        const handleLocationChange = () => {
            const newId = window.location.pathname.split('/product/')[1];
            setProductId(newId);
            setQuantity(1);
            setActiveTab('description');
            setIsAdded(false);
        };

        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    // Find product from all sections
    const product = React.useMemo(() => {
        for (const section of sections) {
            const found = section.items.find(item => item.id.toString() === productId);
            if (found) return found;
        }
        return null;
    }, [sections, productId]);

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const isFav = isFavorite(product.id);
    const discount = product.discount || (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <main className="flex-grow w-full pb-8 md:pb-16 pt-4 md:pt-8">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Product Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square">
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                                    -{discount}%
                                </div>
                            )}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Service Icons */}
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-4 bg-emerald-50 rounded-lg">
                                <Shield className="text-emerald-600" size={20} />
                                <div>
                                    <p className="text-[10px] md:text-xs font-bold text-gray-900 text-center md:text-left">100% Original</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-4 bg-emerald-50 rounded-lg">
                                <Truck className="text-emerald-600" size={20} />
                                <div>
                                    <p className="text-[10px] md:text-xs font-bold text-gray-900 text-center md:text-left">Free Shipping</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-4 bg-emerald-50 rounded-lg">
                                <RefreshCw className="text-emerald-600" size={20} />
                                <div>
                                    <p className="text-[10px] md:text-xs font-bold text-gray-900 text-center md:text-left">Easy Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                            {/* Rating */}
                            {product.rating && (
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < Math.round(product.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">({product.rating} out of 5)</span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="flex items-end gap-2 md:gap-3 mb-4 md:mb-6">
                                <span className="text-3xl md:text-4xl font-bold text-emerald-700">${product.price.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="text-lg md:text-xl text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                                )}
                            </div>

                            {/* Weight */}
                            {product.weight && (
                                <p className="text-gray-600 mb-6">Weight: {product.weight}</p>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-gray-900">Quantity</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="p-3 hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 text-center border-x-2 border-gray-200 py-3 focus:outline-none"
                                        min="1"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="p-3 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 md:gap-4">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 h-12 md:h-14 font-bold text-base md:text-lg rounded-lg flex items-center justify-center gap-2 transition-all ${isAdded ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    }`}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={20} />
                                        <span>Added to Cart</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        <span>Add to Cart</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => toggleFavorite(product)}
                                className={`h-12 w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center transition-all ${isFav ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                                    }`}
                            >
                                <Heart size={20} className={isFav ? 'fill-current' : ''} />
                            </button>

                            <button className="h-12 w-12 md:h-14 md:w-14 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* Product Features */}
                        <div className="border-t border-gray-200 pt-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <Check className="text-emerald-600" size={20} />
                                <span className="text-sm text-gray-700">Estimated Delivery: Up to 4 business days</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-emerald-600" size={20} />
                                <span className="text-sm text-gray-700">Free Shipping & Returns: On all orders over $200</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-16">
                    <div className="border-b border-gray-200 mb-8">
                        <div className="flex gap-4 md:gap-8 overflow-x-auto">
                            {['description', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 px-2 font-bold capitalize transition-colors ${activeTab === tab
                                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                                        : 'text-gray-600 hover:text-emerald-600'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="prose max-w-none">
                        {activeTab === 'description' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    This premium product is carefully selected to meet the highest quality standards.
                                    Perfect for daily use and designed to provide excellent value for your money.
                                </p>
                                <h4 className="text-lg font-bold text-gray-900 mb-3">Key Features:</h4>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>High quality ingredients</li>
                                    <li>Carefully packaged for freshness</li>
                                    <li>Suitable for all family members</li>
                                    <li>Great taste and nutrition</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-4xl font-bold text-gray-900">{product.rating || 5.0}</div>
                                        <div>
                                            <div className="flex mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        className={`${i < Math.round(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600">Based on customer reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                            </div>
                        )}
                    </div>
                </div>


                {/* Related Products */}
                {/* Related Products - Same Category */}
                {/* Related Products - Same Category */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-0 border-t border-l border-gray-100">
                        {sections
                            .find(section => section.items.some(item => item.id === product.id))
                            ?.items.filter(item => item.id !== product.id)
                            .slice(0, 6)
                            .map(relatedProduct => (
                                <div key={relatedProduct.id} className="border-r border-b border-gray-100 group">
                                    <ProductCard product={relatedProduct} />
                                </div>
                            )) || <div className="p-4 text-gray-500 col-span-full">No related products found.</div>
                        }
                    </div>
                </div>

                {/* Recommended Products - Random Selection */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-0 border-t border-l border-gray-100">
                        {sections
                            .flatMap(section => section.items)
                            .filter(item => item.id !== product.id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 6)
                            .map(recommendedProduct => (
                                <div key={recommendedProduct.id} className="border-r border-b border-gray-100 group">
                                    <ProductCard product={recommendedProduct} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </main >
    );
};

export default ProductDetail;
