import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../hooks/useProducts';

interface WishlistContextType {
    favorites: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string | number) => void;
    isFavorite: (productId: string | number) => boolean;
    toggleFavorite: (product: Product) => void;
    wishlistCount: number;
    isWishlistDrawerOpen: boolean;
    openWishlistDrawer: () => void;
    closeWishlistDrawer: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from local storage if possible, for now just empty array
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(favorites));
    }, [favorites]);

    const addToWishlist = (product: Product) => {
        setFavorites((prev) => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
        openWishlistDrawer();
    };

    const removeFromWishlist = (id: string | number) => {
        setFavorites((prev) => prev.filter((item) => item.id !== id));
    };

    const isFavorite = (id: string | number) => {
        return favorites.some(item => item.id === id);
    };

    const toggleFavorite = (product: Product) => {
        if (isFavorite(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const openWishlistDrawer = () => setIsWishlistDrawerOpen(true);
    const closeWishlistDrawer = () => setIsWishlistDrawerOpen(false);

    const wishlistCount = favorites.length;

    return (
        <WishlistContext.Provider
            value={{
                favorites,
                addToWishlist,
                removeFromWishlist,
                isFavorite,
                toggleFavorite,
                wishlistCount,
                isWishlistDrawerOpen,
                openWishlistDrawer,
                closeWishlistDrawer
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
