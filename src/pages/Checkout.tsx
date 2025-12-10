import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, MapPin, Store, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

interface CheckoutPageProps {
    navigate: (path: string) => void;
}

const Checkout: React.FC<CheckoutPageProps> = ({ navigate }) => {
    const { items, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        address: ''
    });

    const shippingCost = deliveryType === 'delivery' ? (cartTotal > 50 ? 0 : 5) : 0;
    const finalTotal = cartTotal + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const newOrderId = "MART-" + Math.floor(100000 + Math.random() * 900000);

            // Create New Order Object with user information
            const newOrder = {
                id: newOrderId,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                total: finalTotal,
                status: 'Processing',
                items: items.map(item => `${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ''}`),
                userEmail: user?.email || 'guest', // Track which user placed the order
                userName: formData.fullName,
                userPhone: formData.phone
            };

            // Save to LocalStorage
            try {
                const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
                localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

                // Dispatch custom event to notify Orders page
                window.dispatchEvent(new Event('orderPlaced'));
            } catch (error) {
                console.error("Failed to save order", error);
            }

            setLoading(false);
            clearCart();
            navigate(`/order-success?id=${newOrderId}`);
        }, 1500);
    };

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    // Previous location of shippingCost/finalTotal definitions - REMOVED


    return (
        <div className="min-h-screen bg-gray-50 pt-4 pb-12 lg:pt-8 lg:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/cart')}
                        className="p-2 -ml-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Checkout</h1>
                </div>

                <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    {/* Left Column: Information & Delivery */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Delivery Method Selection */}
                        <section aria-labelledby="delivery-method-heading">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-6">
                                <div className="grid grid-cols-2 gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setDeliveryType('delivery')}
                                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${deliveryType === 'delivery'
                                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Truck className="w-4 h-4" />
                                        Delivery
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeliveryType('pickup')}
                                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${deliveryType === 'pickup'
                                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Store className="w-4 h-4" />
                                        Pickup
                                    </button>
                                </div>
                            </div>

                            {/* Store Contact Info for Pickup */}
                            {deliveryType === 'pickup' && (
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row gap-4 text-blue-800 text-sm mb-6 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                            <Store className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-blue-900 mb-1">Pickup Information</p>
                                            <p className="mb-2">Please pick up your order at our main store branch.</p>
                                            <div className="space-y-1 font-medium">
                                                <p className="flex items-center gap-2">
                                                    <span className="w-20 text-blue-600">Tel:</span>
                                                    +855 12 345 678
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="w-20 text-blue-600">Telegram:</span>
                                                    @minimart_support
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Customer & Delivery Details */}
                        <section aria-labelledby="contact-info-heading" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 id="contact-info-heading" className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                    {deliveryType === 'delivery' ? 'Shipping Details' : 'Pickup Details'}
                                </h2>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2 md:col-span-1">
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            required
                                            className="w-full rounded-lg border-gray-300 border px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 focus:bg-white outline-none"
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+855 12 345 678"
                                            required
                                            className="w-full rounded-lg border-gray-300 border px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 focus:bg-white outline-none"
                                        />
                                    </div>

                                    {deliveryType === 'delivery' && (
                                        <div className="col-span-2">
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                            <div className="relative">
                                                <div className="absolute top-3 left-3 text-gray-400">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <textarea
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    placeholder="Building, Street, Area..."
                                                    required
                                                    className="w-full rounded-lg border-gray-300 border pl-10 pr-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 focus:bg-white outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center justify-between">
                                Order Summary
                                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                                    {items.reduce((acc, item) => acc + item.quantity, 0)} items
                                </span>
                            </h2>

                            <div className="flow-root">
                                <ul className="-my-6 divide-y divide-gray-100 mb-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                                    {items.map((item) => (
                                        <li key={item.id} className="py-6 flex">
                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3 className="line-clamp-2 text-sm">{item.name}</h3>
                                                        <p className="ml-4 text-emerald-600">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-gray-100 pt-6 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <p className="text-gray-600">Subtotal</p>
                                    <p className="font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <p className="text-gray-600">Shipping</p>
                                    <p className="font-medium text-emerald-600">
                                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                                    </p>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                    <p className="text-base font-bold text-gray-900">Total</p>
                                    <p className="text-2xl font-bold text-gray-900">${finalTotal.toFixed(2)}</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-8 flex items-center justify-center rounded-xl border border-transparent bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Processing...
                                    </div>
                                ) : (
                                    <>
                                        Confirm Order
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e5e7eb;
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
};

export default Checkout;
