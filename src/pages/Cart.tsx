import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

interface CartPageProps {
    navigate: (path: string) => void;
}

const Cart: React.FC<CartPageProps> = ({ navigate }) => {
    const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { user } = useAuth();

    const handleCheckout = () => {
        if (!user) {
            // Save intended destination
            sessionStorage.setItem('redirectAfterLogin', '/checkout');
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-emerald-500 pl-3">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain p-2 mix-blend-multiply" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                                    <p className="text-sm text-gray-400">{item.weight}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-emerald-600">${(item.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Order Summary</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-medium">Free</span>
                            </div>
                            <div className="h-px bg-gray-100 my-2"></div>
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {!user && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-800 text-center">
                                    Please login to continue with checkout
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                        >
                            {user ? 'Proceed to Checkout' : 'Login to Checkout'} <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
