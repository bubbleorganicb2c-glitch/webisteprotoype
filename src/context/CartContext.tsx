import React, { createContext, useContext, useState } from "react";

export type CartItem = { id: string; name?: string; price?: number; qty: number };

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clear: () => void;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setOpen] = useState(false);

    const addItem = (item: CartItem) => {
        setItems((prev) => {
            const found = prev.find(p => p.id === item.id);
            if (found) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + item.qty } : p);
            return [...prev, item];
        });
    };
    const removeItem = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
    const clear = () => setItems([]);
    const openCart = () => setOpen(true);
    const closeCart = () => setOpen(false);
    const toggleCart = () => setOpen(v => !v);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clear, isOpen, openCart, closeCart, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};