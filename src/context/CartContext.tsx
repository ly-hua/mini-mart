import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../hooks/useProducts';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    updateQuantity: (productId: string | number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const addToCart = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        openDrawer(); // Open drawer when adding item
    };

    const removeFromCart = (id: string | number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isDrawerOpen,
                openDrawer,
                closeDrawer
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
