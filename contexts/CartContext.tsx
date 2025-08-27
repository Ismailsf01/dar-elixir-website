"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (itemToAdd: CartItem) => void; // <-- Changed from Product to CartItem
    updateQuantity: (id: string, newQuantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    recentlyAdded: string[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [recentlyAdded, setRecentlyAdded] = useState<string[]>([]);

    /* const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setRecentlyAdded(prev => [...prev, product._id]);
        setTimeout(() => {
            setRecentlyAdded(prev => prev.filter(id => id !== product._id));
        }, 1500);
    }; */

    const addToCart = (itemToAdd: CartItem) => {
        setCartItems(prevItems => {
            // Check if the exact item (same ID and same size) already exists
            const existingItem = prevItems.find(
                item => item._id === itemToAdd._id && item.selectedSize === itemToAdd.selectedSize
            );

            if (existingItem) {
                // If it exists, update its quantity
                return prevItems.map(item =>
                    item._id === itemToAdd._id && item.selectedSize === itemToAdd.selectedSize
                        ? { ...item, quantity: item.quantity + itemToAdd.quantity }
                        : item
                );
            }
            return [...prevItems, itemToAdd];
        });

        setRecentlyAdded(prev => [...prev, itemToAdd._id]);
        setTimeout(() => {
            setRecentlyAdded(prev => prev.filter(id => id !== itemToAdd._id));
        }, 1500);
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        setCartItems(prevItems => {
            if (newQuantity <= 0) {
                return prevItems.filter((item) => item._id !== id);
            } else {
                return prevItems.map((item) => (item._id === id ? { ...item, quantity: newQuantity } : item));
            }
        });
    };

    const removeItem = (id: string) => {
        setCartItems(prevItems => prevItems.filter((item) => item._id !== id));
    };
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, recentlyAdded }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};