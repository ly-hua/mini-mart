import React, { useMemo } from 'react';
import ProductGrid from '../components/home/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const Category: React.FC = () => {
    const { sections, essentials } = useProducts();
    const pathname = window.location.pathname;
    // Extract the last part of the URL to handle sub-categories (e.g., /category/beverages/water -> water)
    const pathSegments = pathname.split('/').filter(Boolean);
    const categorySlug = pathSegments[pathSegments.length - 1];

    // Check for search query params
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('q') || '';
    const searchCategory = searchParams.get('category') || 'All Categories';

    const displayProducts = useMemo(() => {
        // Flatten all available products first
        // Flatten all available products
        const drinks = sections.find(s => s.title === 'Drinks Corner')?.items || [];
        const water = sections.find(s => s.title === 'Hydration Station')?.items || [];
        const snacks = sections.find(s => s.title === 'Trending Snacks')?.items || [];
        const baby = sections.find(s => s.title === 'Baby Essentials')?.items || [];
        const hotpots = sections.find(s => s.title === 'Self-Heating Hot Pots')?.items || [];
        const bestSellers = sections.find(s => s.title === 'Best Sellers')?.items || [];
        const dairy = sections.find(s => s.title === 'Dairy Favorites')?.items || [];
        const softDrinks = sections.find(s => s.title === 'Refreshing Soft Drinks')?.items || [];
        const quickMeals = sections.find(s => s.title === 'Quick & Easy Meals')?.items || [];
        const pantry = sections.find(s => s.title === 'Pantry & Ready Meals')?.items || [];

        // Combine all for general searching (ensure unique by ID)
        const allDocs = [...drinks, ...water, ...snacks, ...baby, ...hotpots, ...bestSellers, ...dairy, ...softDrinks, ...quickMeals, ...pantry, ...essentials];
        const uniqueDocs = Array.from(new Map(allDocs.map(item => [item.id, item])).values());

        // Determine effective category to filter by
        // If we have a search category, use it. Otherwise use the URL slug.
        // If the URL slug is missing (e.g. root), defaults to empty.
        let targetSlug = categorySlug ? categorySlug.toLowerCase() : '';

        if (searchCategory && searchCategory !== 'All Categories') {
            targetSlug = searchCategory.toLowerCase().replace(/\s+/g, '-');
        }

        // Apply Category Filter
        let filteredByCategory = uniqueDocs;

        // Helper to match logic
        const getCategoryItems = (slug: string) => {
            if (slug === 'baby-products') return baby;
            if (slug === 'water') return water;
            if (slug === 'snacks') return snacks;
            if (slug === 'instant-food') return [...hotpots, ...quickMeals, ...pantry]; // Combine all instant types
            if (slug === 'canned-food') {
                return pantry.filter(item =>
                    item.name.toLowerCase().includes('canned') ||
                    item.name.toLowerCase().includes('beans') ||
                    item.name.toLowerCase().includes('sardines') ||
                    item.name.toLowerCase().includes('spam') ||
                    item.name.toLowerCase().includes('tuna')
                );
            }
            if (slug === 'ready-to-eat-meals') {
                return [...hotpots, ...quickMeals, ...pantry].filter(item =>
                    item.name.toLowerCase().includes('ready meal') ||
                    item.name.toLowerCase().includes('curry') || // Pouch/Instant meal
                    item.name.toLowerCase().includes('stew') ||
                    item.name.toLowerCase().includes('hot pot') ||
                    item.name.toLowerCase().includes('instant')
                );
            }
            if (slug === 'collections' || slug === 'shop') return uniqueDocs;

            // Beverages & Sub-categories
            const allBeverages = uniqueDocs.filter(item =>
                drinks.some(d => d.id === item.id) ||
                water.some(w => w.id === item.id) ||
                dairy.some(m => m.id === item.id) ||
                softDrinks.some(s => s.id === item.id) ||
                item.name.toLowerCase().includes('tea') ||
                item.name.toLowerCase().includes('coffee') ||
                item.name.toLowerCase().includes('drink') ||
                item.name.toLowerCase().includes('juice') ||
                item.name.toLowerCase().includes('milk') ||
                item.name.toLowerCase().includes('mogu')
            );

            if (slug === 'beverages') return allBeverages;
            if (slug === 'soft-drinks') {
                return uniqueDocs.filter(item =>
                    softDrinks.some(s => s.id === item.id) ||
                    (allBeverages.includes(item) &&
                        !item.name.toLowerCase().includes('water') &&
                        !item.name.toLowerCase().includes('tea') &&
                        !item.name.toLowerCase().includes('coffee') &&
                        !item.name.toLowerCase().includes('milk'))
                );
            }
            if (slug === 'milk') return dairy;
            if (slug === 'coffee-tea') {
                return allBeverages.filter(item =>
                    item.name.toLowerCase().includes('tea') ||
                    item.name.toLowerCase().includes('coffee')
                );
            }
            if (slug === 'juice') {
                return allBeverages.filter(item =>
                    item.name.toLowerCase().includes('juice') ||
                    item.name.toLowerCase().includes('nectar') ||
                    item.name.toLowerCase().includes('orange')
                );
            }

            // Check if "grocery" or other missed categories match partial text in slug
            // If known special categories didn't match, try generic search on the slug
            if (slug) {
                const term = slug.replace(/-/g, ' ');
                const textFiltered = uniqueDocs.filter(p =>
                    p.name.toLowerCase().includes(term) ||
                    p.name.toLowerCase().includes(slug.split('-')[0]) || // Try partial match
                    (p.weight && p.weight.toLowerCase().includes(term))
                );
                // Only return textFiltered if it found something, otherwise strictly empty?
                // The original logic returned this filter result directly.
                return textFiltered;
            }

            return uniqueDocs; // Default catch-all if no slug provided? Or logic for 'shop'
        };

        if (targetSlug && targetSlug !== '') {
            filteredByCategory = getCategoryItems(targetSlug);
        } else if (!targetSlug && !searchQuery) {
            // No slug, no search query -> likely empty state or home? 
            // Actually 'shop' logic above handles 'shop' slug.
            // If completely empty path and no params?
            filteredByCategory = [];
        }

        // 2. Apply explicit Text Search on top of the Category Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return filteredByCategory.filter(item =>
                item.name.toLowerCase().includes(query)
            );
        }

        return filteredByCategory;
    }, [categorySlug, sections, essentials, searchQuery, searchCategory]);

    const formattedTitle = searchQuery
        ? `Search Results for "${searchQuery}"`
        : (categorySlug === 'collections' || categorySlug === 'shop')
            ? 'All Products'
            : (categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Category');

    return (
        <main className="flex-grow w-full pb-8 md:pb-16 pt-6">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="w-full border-b border-gray-100 pb-2 mb-4">
                    <div className="flex flex-col lg:gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex flex-col gap-2 sm:gap-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-l-4 border-[#00A651] pl-4">{formattedTitle}</h2>
                        </div>
                    </div>
                </div>
                {displayProducts.length > 0 ? (
                    <ProductGrid items={displayProducts} />
                ) : (

                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg">No products found for "{formattedTitle}"</p>
                        <p className="text-sm text-gray-400 mt-2">Try "Snacks", "Baby Products", "Beverages", "Instant Food"</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Category;
