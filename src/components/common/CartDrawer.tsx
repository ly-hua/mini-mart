// Force HMR Update
import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft, MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 95.50;

interface CartDrawerProps {
    navigate: (path: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ navigate }) => {
    const {
        isDrawerOpen,
        closeDrawer,
        items,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart
    } = useCart();

    const [view, setView] = useState<'cart' | 'checkout'>('cart');
    const [loading, setLoading] = useState(false);

    // Checkout Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
    });

    // Reset view when drawer closes or opens
    useEffect(() => {
        if (!isDrawerOpen) {
            // Optional: reset view after delay to avoid flicker
            const timer = setTimeout(() => setView('cart'), 300);
            return () => clearTimeout(timer);
        }
    }, [isDrawerOpen]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDrawerOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            clearCart();
            closeDrawer();
            const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
            navigate(`/order-success?id=${orderId}`);
        }, 1500);
    };

    const freeShippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeDrawer}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[51] shadow-2xl transform transition-transform duration-300 ease-in-out sm:rounded-l-3xl overflow-hidden border-l border-gray-100 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full bg-white">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                        <div className="flex items-center gap-3">
                            {view === 'checkout' && (
                                <button
                                    onClick={() => setView('cart')}
                                    className="p-1 -ml-2 text-gray-500 hover:text-emerald-600 transition-colors"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {view === 'cart' ? 'Shopping Cart' : 'Checkout'}
                                {view === 'cart' && items.length > 0 && (
                                    <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {items.length}
                                    </span>
                                )}
                            </h2>
                        </div>
                        <button
                            onClick={closeDrawer}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                            aria-label="Close Cart"
                        >
                            <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5">
                        {view === 'cart' ? (
                            <>
                                {/* Free Shipping Progress */}
                                <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div className="text-sm text-gray-800">
                                            {amountToFreeShipping > 0 ? (
                                                <>
                                                    Add <span className="font-bold text-emerald-700">${amountToFreeShipping.toFixed(2)}</span> more for <span className="font-bold text-gray-900">FREE Delivery!</span>
                                                </>
                                            ) : (
                                                <span className="font-bold text-emerald-700">You've got FREE Delivery!</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${freeShippingProgress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Cart Items */}
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h3>
                                        <p className="text-gray-500 text-sm mb-6">Looks like you haven't added anything yet.</p>
                                        <button
                                            onClick={closeDrawer}
                                            className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold text-sm hover:bg-emerald-700 transition-colors"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group relative border border-gray-100">
                                                {/* Product Image */}
                                                <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg border border-gray-100 overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover object-center"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
                                                            <a href={`/product/${item.id}`} className="hover:text-emerald-600 transition-colors">
                                                                {item.name}
                                                            </a>
                                                        </h4>
                                                        <div className="text-emerald-600 font-bold text-sm">
                                                            ${item.price.toFixed(2)}
                                                        </div>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center border border-gray-200 rounded-full h-8 bg-white">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            // CHECKOUT FORM VIEW
                            <form id="drawer-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
                                {/* Delivery Info */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-bold text-gray-900 text-sm uppercase tracking-wide">
                                        <MapPin size={18} className="text-emerald-600" /> Delivery Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                                            <input
                                                required
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                type="text"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                required
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                type="tel"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                                                placeholder="+855 12 345 678"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Address</label>
                                            <textarea
                                                required
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                                                placeholder="House number, Street name..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>


                            </form>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-5 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-600 font-medium">Subtotal:</span>
                                <span className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                            </div>

                            {view === 'cart' ? (
                                <div className="grid grid-cols-2 gap-3">
                                    <a
                                        href="/cart"
                                        onClick={(e) => { e.preventDefault(); navigate('/cart'); closeDrawer(); }}
                                        className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all text-sm uppercase tracking-wide"
                                    >
                                        View Cart
                                    </a>
                                    <button
                                        onClick={() => setView('checkout')}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all text-sm uppercase tracking-wide shadow-lg shadow-emerald-200"
                                    >
                                        Checkout <ArrowRight size={16} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    form="drawer-checkout-form"
                                    disabled={loading}
                                    className={`w-full bg-emerald-600 text-white font-bold py-4 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Place Order <CheckCircle size={18} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
