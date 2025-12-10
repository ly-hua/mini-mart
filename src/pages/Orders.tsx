import React, { useEffect, useState } from 'react';
import { Package, ChevronRight, Clock, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: string[];
    userEmail?: string;
    userName?: string;
    userPhone?: string;
}

const Orders: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);

    // Load orders from localStorage
    const loadOrders = () => {
        if (!user) return;

        try {
            const savedOrders = localStorage.getItem('orders');
            const allOrders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];

            // Filter orders to show only current user's orders
            const userOrders = allOrders.filter(order =>
                order.userEmail === user.email
            );

            setOrders(userOrders);
        } catch (e) {
            console.error("Failed to parse orders", e);
            setOrders([]);
        }
    };

    // Load orders on mount and when user changes
    useEffect(() => {
        loadOrders();

        // Listen for storage changes (when orders are added in checkout)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'orders') {
                loadOrders();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom event when order is placed in same tab
        const handleOrderPlaced = () => {
            loadOrders();
        };

        window.addEventListener('orderPlaced', handleOrderPlaced);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('orderPlaced', handleOrderPlaced);
        };
    }, [user]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'Shipped': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    // Don't render anything if not logged in (will redirect)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-4 lg:pt-8">
            <div className="max-w-3xl mx-auto px-4">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back, <span className="font-semibold text-gray-700">{user.name}</span>! Track and view your order history
                    </p>
                </header>

                {/* Search / Filter (Visual only for now) */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search order ID or items..."
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651]/20 focus:border-[#00A651]"
                    />
                </div>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            {/* Order Header */}
                            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{order.id}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={12} /> {order.date}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Order Items Summary */}
                            <div className="p-4 bg-white">
                                <p className="text-sm text-gray-600 line-clamp-1 mb-3">
                                    {order.items.join(', ')}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Total Amount</span>
                                        <span className="text-emerald-600 font-bold">${order.total.toFixed(2)}</span>
                                    </div>
                                    <button className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-[#00A651] transition-colors">
                                        Details <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                            <Package size={48} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
                        <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">Start shopping to see your order history here.</p>
                        <a href="/" className="mt-6 px-6 py-2 bg-[#00A651] text-white rounded-full font-bold text-sm hover:bg-[#008c44] transition-colors">
                            Start Shopping
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
