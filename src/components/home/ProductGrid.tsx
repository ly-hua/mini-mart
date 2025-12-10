// src/components/home/ProductGrid.tsx
// React import removed as not used
import type { EssentialItem } from '../../hooks/useProducts';
import ProductCard from './ProductCard';

interface Props {
  items: EssentialItem[];
}

/**
 * Simple grid that renders a <ProductCard> for every essential item.
 * (You can keep using the raw <img> version if you prefer – both work.)
 */
export default function ProductGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-0 border-t border-l border-gray-100">
      {items.map((item) => (
        <div key={item.id} className="border-r border-b border-gray-100 group">
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  );
}