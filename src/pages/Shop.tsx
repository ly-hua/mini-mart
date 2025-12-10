import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/home/ProductCard';

const Shop: React.FC = () => {
    const { sections, loading } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Get URL parameters
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        const query = params.get('q');
        if (category) {
            setSelectedCategory(category.toLowerCase());
        }
        if (query) {
            setSearchQuery(query.toLowerCase());
        }
    }, []);

    // Get all products
    const allProducts = useMemo(() => {
        return sections.flatMap(section => section.items);
    }, [sections]);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set<string>();
        sections.forEach(section => {
            cats.add(section.title);
        });
        return Array.from(cats);
    }, [sections]);

    // Filter products
    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery)
            );
        }

        // Filter by category
        if (selectedCategory) {
            const section = sections.find(s =>
                s.title.toLowerCase().includes(selectedCategory) ||
                selectedCategory.includes(s.title.toLowerCase())
            );
            if (section) {
                filtered = section.items.filter(item =>
                    !searchQuery || item.name.toLowerCase().includes(searchQuery)
                );
            }
        }

        // Filter by price range
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(p => {
                if (max) {
                    return p.price >= min && p.price <= max;
                }
                return p.price >= min;
            });
        }

        return filtered;
    }, [allProducts, sections, selectedCategory, priceRange, searchQuery]);

    const FilterSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedCategory('')}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-[#00A651] text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        All Products
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat.toLowerCase())}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat.toLowerCase() ? 'bg-[#00A651] text-white' : 'hover:bg-gray-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                    {[
                        { label: 'All Prices', value: '' },
                        { label: 'Under $5', value: '0-5' },
                        { label: '$5 - $10', value: '5-10' },
                        { label: '$10 - $20', value: '10-20' },
                        { label: 'Over $20', value: '20-' },
                    ].map((range) => (
                        <button
                            key={range.value}
                            onClick={() => setPriceRange(range.value)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${priceRange === range.value ? 'bg-[#00A651] text-white' : 'hover:bg-gray-100'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <main className="flex-grow w-full pb-8 md:pb-16 pt-4 md:pt-8">
            <div className="max-w-[1400px] mx-auto px-3">
                {/* Page Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Shop</h1>
                    <p className="text-sm md:text-base text-gray-600">
                        {filteredProducts.length} products found
                    </p>
                </div>

                <div className="flex gap-6">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-xl border border-gray-100 p-6">
                            <FilterSection />
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden fixed bottom-6 right-6 bg-[#00A651] text-white p-4 rounded-full z-30 flex items-center gap-2"
                    >
                        <Filter size={20} />
                        <span className="font-medium">Filters</span>
                    </button>

                    {/* Mobile Filter Drawer */}
                    {isMobileFilterOpen && (
                        <>
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                                onClick={() => setIsMobileFilterOpen(false)}
                            />
                            <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto transform transition-transform duration-300">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold">Filters</h2>
                                        <button
                                            onClick={() => setIsMobileFilterOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                    <FilterSection />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">No products found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Shop;
