// src/components/home/ProductGrid.tsx
// React import removed as not used
import type { EssentialItem } from '../../hooks/useProducts';
import ProductCard from './ProductCard';

interface Props {
  items: EssentialItem[];
}

/**
 * Simple grid that renders a <ProductCard> for every essential item.
 */
export default function ProductGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2">
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}