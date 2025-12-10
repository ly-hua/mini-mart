import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface SearchDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Search Products</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close search"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Search Form */}
                    <div className="p-4 md:p-6">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                autoFocus
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00A651] text-white p-2 rounded-lg hover:bg-[#008c44] transition-colors"
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>
                        </form>

                        {/* Quick Links */}
                        <div className="mt-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Popular Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Beverages', 'Snacks', 'Instant Food', 'Chocolate', 'Milk'].map((category) => (
                                    <a
                                        key={category}
                                        href={`/shop?category=${category.toLowerCase()}`}
                                        className="px-3 py-1.5 bg-gray-100 hover:bg-[#00A651] hover:text-white rounded-full text-sm transition-colors"
                                    >
                                        {category}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchDrawer;
