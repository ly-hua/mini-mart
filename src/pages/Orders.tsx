import React from 'react';
import { Package, ChevronRight, Clock, Search } from 'lucide-react';

export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: string[];
}

const MOCK_ORDERS: Order[] = [
    {
        id: 'MART-892312',
        date: 'Dec 9, 2025',
        total: 24.50,
        status: 'Processing',
        items: ['Cadbury Dairy Milk', 'Coca-Cola Can (x3)', 'Lays Classic']
    },
    {
        id: 'MART-773412',
        date: 'Dec 1, 2025',
        total: 12.00,
        status: 'Delivered',
        items: ['Nissin Cup Noodle (x2)', 'Evian Water']
    },
    {
        id: 'MART-551293',
        date: 'Nov 24, 2025',
        total: 45.99,
        status: 'Delivered',
        items: ['Huggies Dry Pants', 'Johnson Baby Oil', 'Fresh Milk 1L']
    }
];

const Orders: React.FC = () => {
    // Initialize orders with localStorage data + MOCK_ORDERS
    const [orders] = React.useState<Order[]>(() => {
        try {
            const savedOrders = localStorage.getItem('orders');
            const localOrders = savedOrders ? JSON.parse(savedOrders) : [];
            return [...localOrders, ...MOCK_ORDERS];
        } catch (e) {
            console.error("Failed to parse orders", e);
            return MOCK_ORDERS;
        }
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'Shipped': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-4 lg:pt-8">
            <div className="max-w-3xl mx-auto px-4">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and view your order history</p>
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
                        <a href="/" className="mt-6 px-6 py-2 bg-[#00A651] text-white rounded-full font-bold text-sm shadow-sm hover:bg-[#008c44] transition-colors">
                            Start Shopping
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
