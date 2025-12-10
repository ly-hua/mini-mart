import React from 'react';
import { CheckCircle, Send, Package, ShoppingBag } from 'lucide-react';

interface OrderSuccessProps {
    navigate: (path: string) => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ navigate }) => {
    // Extract order ID from URL if present
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('id') || 'ORD-123456';

    // Mock customer ID (in a real app, this would come from auth context)
    const customerId = 'CUST-987654';

    // Telegram Bot URL construction
    // The 'start' parameter can be used by the bot to process deep links
    // Format: orderId_customerId
    const telegramBotName = 'MyLekhaStoreBot'; // Replace with actual bot username found in user request
    const telegramUrl = `https://t.me/${telegramBotName}?start=${orderId}_${customerId}`;

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-[600px] mx-auto px-4 py-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                <CheckCircle size={40} className="text-emerald-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-500 mb-8">Thank you for your purchase. Your order <span className="font-mono font-bold text-gray-700">#{orderId}</span> has been confirmed.</p>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <Package size={20} className="text-blue-500" /> Track Your Order
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                    Get real-time updates on your delivery status directly through our Telegram Bot.
                </p>

                <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#24A1DE] text-white font-bold py-4 rounded-xl hover:bg-[#208bbf] transition-all flex items-center justify-center gap-2"
                >
                    <Send size={18} />
                    Track Delivery on Telegram
                </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                    onClick={() => navigate('/orders')}
                    className="flex-1 bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={18} />
                    View My Orders
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
