// src/pages/Home.tsx
import * as React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import DealSection from '../components/home/DealSection';
import ProductGrid from '../components/home/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const { loading, sections, essentials } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-400 font-medium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A651] mr-3"></div>
        Loading products...
      </div>
    );
  }

  return (
    <main className="flex-grow w-full pb-8 md:pb-16 pt-2 md:pt-4">
      {/* 1. Hero Banner */}
      <div className="mb-6 md:mb-12 px-2 md:px-4">
        <HeroBanner />
      </div>

      {/* 2. Deal Sections */}
      <div className="space-y-3 md:space-y-4">
        {sections.map((section, index) => (
          <DealSection key={index} data={section} />
        ))}
      </div>

      {/* 3. Daily Essentials Grid */}
      <div className="mt-4 max-w-[1400px] mx-auto px-2 md:px-4">
        <div className="w-full border-b border-gray-100 pb-2 mb-4">
          <div className="flex flex-col lg:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-2 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-l-4 border-[#00A651] pl-4">Daily Essentials</h2>
            </div>
          </div>
        </div>
        <ProductGrid items={essentials} />
      </div>
    </main>
  );
};

export default Home;