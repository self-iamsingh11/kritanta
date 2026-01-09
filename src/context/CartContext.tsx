"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "@/lib/data";
import { generateId } from "@/lib/utils";

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    size: string;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    cartCount: number;
    subtotal: number;
    discount: number;
    total: number;
    freeItemsCount: number;
    itemsNeededForOffer: number;
    offerUnlocked: boolean;
    addToCart: (product: Product, size: string, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Calculate cart count
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate subtotal
    const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    // Gamification: Buy 4 Get 3 Free
    const offerThreshold = 4;
    const freeItemsPerOffer = 3;
    const offerUnlocked = cartCount >= offerThreshold;
    const freeItemsCount = offerUnlocked
        ? Math.floor(cartCount / offerThreshold) * freeItemsPerOffer
        : 0;
    const itemsNeededForOffer = offerUnlocked
        ? 0
        : offerThreshold - cartCount;

    // Calculate discount (value of free items - lowest priced items are free)
    const calculateDiscount = () => {
        if (!offerUnlocked) return 0;

        // Sort items by price to find cheapest items
        const allItems = items.flatMap((item) =>
            Array(item.quantity).fill(item.product.price)
        );
        allItems.sort((a, b) => a - b);

        // Sum of cheapest items up to freeItemsCount
        return allItems.slice(0, freeItemsCount).reduce((sum, price) => sum + price, 0);
    };

    const discount = calculateDiscount();
    const total = subtotal - discount;

    const addToCart = useCallback(
        (product: Product, size: string, quantity = 1) => {
            setItems((prev) => {
                // Check if item already exists with same product and size
                const existingIndex = prev.findIndex(
                    (item) => item.product.id === product.id && item.size === size
                );

                if (existingIndex > -1) {
                    // Update quantity
                    const updated = [...prev];
                    updated[existingIndex].quantity += quantity;
                    return updated;
                }

                // Add new item
                return [
                    ...prev,
                    {
                        id: generateId(),
                        product,
                        quantity,
                        size,
                    },
                ];
            });

            // Open cart drawer
            setIsOpen(true);
        },
        []
    );

    const removeFromCart = useCallback((itemId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
    }, []);

    const updateQuantity = useCallback((itemId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        );
    }, []);

    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const clearCart = useCallback(() => setItems([]), []);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                cartCount,
                subtotal,
                discount,
                total,
                freeItemsCount,
                itemsNeededForOffer,
                offerUnlocked,
                addToCart,
                removeFromCart,
                updateQuantity,
                openCart,
                closeCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
