import React from 'react';
import { Home, Heart, ClipboardList, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

interface MobileBottomNavProps {
    navigate: (path: string) => void;
    currentPath?: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ navigate }) => {
    const { wishlistCount, openWishlistDrawer } = useWishlist();
    const currentPath = window.location.pathname;

    const navItems = [
        { label: 'Home', icon: Home, path: '/' },
        { label: 'Wishlist', icon: Heart, path: '/wishlist', badge: wishlistCount },
        { label: 'Order', icon: ClipboardList, path: '/orders' },
        { label: 'Account', icon: User, path: '/login' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50 lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                    <button
                        key={item.label}
                        onClick={() => {
                            if (item.label === 'Wishlist') {
                                openWishlistDrawer();
                            } else {
                                navigate(item.path);
                            }
                        }}
                        className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#00A651]' : 'text-gray-400'}`}
                    >
                        <div className="relative">
                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            {item.badge ? (
                                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center">
                                    {item.badge}
                                </span>
                            ) : null}
                        </div>
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default MobileBottomNav;
