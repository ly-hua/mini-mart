// src/components/home/Collections.tsx
import React from 'react';

const COLLECTIONS = [
    {
        id: 1,
        name: 'Grocery',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&auto=format&fit=crop',
        itemCount: '100+ Items',
        color: 'bg-emerald-50',
    },
    {
        id: 2,
        name: 'Beverage',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&auto=format&fit=crop',
        itemCount: '50+ Items',
        color: 'bg-blue-50',
    },
    {
        id: 3,
        name: 'Snacks',
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=300&auto=format&fit=crop',
        itemCount: '80+ Items',
        color: 'bg-orange-50',
    },
    {
        id: 4,
        name: 'Personal Care',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&auto=format&fit=crop',
        itemCount: '40+ Items',
        color: 'bg-pink-50',
    },
    {
        id: 5,
        name: 'Cleaning',
        image: 'https://images.unsplash.com/photo-1585421514738-01798e348bb2?q=80&w=300&auto=format&fit=crop',
        itemCount: '30+ Items',
        color: 'bg-cyan-50',
    },
    {
        id: 6,
        name: 'Baby',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df4?q=80&w=300&auto=format&fit=crop',
        itemCount: '25+ Items',
        color: 'bg-purple-50',
    },
    {
        id: 7,
        name: 'Health',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop',
        itemCount: '20+ Items',
        color: 'bg-green-50',
    },
    {
        id: 8,
        name: 'Frozen',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=300&auto=format&fit=crop',
        itemCount: '35+ Items',
        color: 'bg-sky-50',
    },
    {
        id: 9,
        name: 'Bakery',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop',
        itemCount: '45+ Items',
        color: 'bg-amber-50',
    },
    {
        id: 10,
        name: 'Home Essentials',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop',
        itemCount: '60+ Items',
        color: 'bg-indigo-50',
    },
    {
        id: 11,
        name: 'Alcohol & Cigarette',
        image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=300&auto=format&fit=crop',
        itemCount: '18+ Items',
        color: 'bg-rose-50',
    },
];

const Collections: React.FC = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 mb-4">
            {/* Header */}
            <div className="w-full border-b border-gray-100 pb-2 mb-4">
                <div className="flex flex-col lg:gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-col gap-2 sm:gap-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-l-4 border-[#00A651] pl-4">Our Collections</h2>
                    </div>

                </div>
            </div>

            {/* Collections Grid - Responsive Columns: 2 (mobile) -> 4 (md) -> 6 (xl) */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-0 border-t border-l border-gray-100">
                {COLLECTIONS.map((collection) => (
                    <a
                        key={collection.id}
                        href={`/category/${collection.name.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                        className={`group flex flex-col items-center justify-center p-2 transition-all duration-300 border-r border-b border-gray-100 hover:shadow-lg hover:z-10 bg-white relative ${collection.color} hover:bg-white`}
                    >
                        <div className="w-full aspect-[4/3] mb-2 rounded-xl overflow-hidden shadow-sm group-hover:scale-[1.025] transition-transform duration-300 bg-white">
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-[#00A651] transition-colors text-center text-sm md:text-base whitespace-nowrap">{collection.name}</h3>
                        <span className="text-xs text-gray-500 font-medium mt-1">{collection.itemCount}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Collections);
