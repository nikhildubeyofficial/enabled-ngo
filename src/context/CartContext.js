'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Key depends on the logged-in user
    const [cartKey, setCartKey] = useState('enabled_cart_guest');

    // Update cart key when user changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('enabled_user');
            if (savedUser) {
                try {
                    const user = JSON.parse(savedUser);
                    const userId = user.id || user._id;
                    setCartKey(`enabled_cart_${userId}`);
                } catch (e) {
                    setCartKey('enabled_cart_guest');
                }
            } else {
                setCartKey('enabled_cart_guest');
            }
        }
    }, []);

    // Load cart from localStorage when the key changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem(cartKey);
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (e) {
                    console.error('Failed to parse cart:', e);
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
            setIsInitialized(true);
        }
    }, [cartKey]);

    // Sync cart to localStorage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(cartKey, JSON.stringify(cartItems));
        }
    }, [cartItems, isInitialized, cartKey]);

    const addToCart = (product) => {
        // Normalize MongoDB _id → id so deduplication always works
        const normalizedId = product._id || product.id || String(Math.random());
        const normalizedProduct = {
            ...product,
            id: normalizedId,
            name: product.name || product.title || 'Product',
            price: Number(product.price) || 0,
            image: product.image || product.imageUrl || '/Girly.png',
        };
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === normalizedId);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === normalizedId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prevItems, { ...normalizedProduct, quantity: 1 }];
        });
    };


    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
    );

    const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
