// src/components/home/DealSection.tsx
import * as React from 'react';
import type { ProductSectionData, Product } from '../../hooks/useProducts';
import ProductCard from './ProductCard';


interface DealSectionProps {
  data: ProductSectionData;
}

const DealSection: React.FC<DealSectionProps> = ({ data }) => {
  return (
    <div className="mb-4 max-w-[1400px] mx-auto px-4">
      {/* Header */}
      {/* Header */}
      <div className="w-full border-b border-gray-100 pb-2 mb-4">
        <div className="flex flex-col lg:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-l-4 border-[#00A651] pl-4">
              {data.title}
            </h2>

          </div>
        </div>
      </div>

      {/* Product Grid - Responsive Columns: 2 (mobile) -> 4 (md) -> 6 (xl) */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-0 border-t border-l border-gray-100">
        {data.items.slice(0, 6).map((item: Product) => (
          <div key={item.id} className="border-r border-b border-gray-100 group">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DealSection);