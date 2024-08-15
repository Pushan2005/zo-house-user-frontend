"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type CartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    name: string;
    quantity: number;
    special_instructions?: string;
};

type CartContext = {
    getQuantity: (name: string) => number;
    increaseCartQuantity: (name: string) => void;
    decreaseCartQuantity: (name: string) => void;
    removeCartItem: (name: string) => void;
    changeTableName: (name: string) => void;
    setSpecialInstructions: (instructions: string) => void;
    cartItems: CartItem[];
    tableName: string;
    special_Instructions: string;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [tableName, setTableName] = useState("Eden Garden"); // change default as needed
    const [special_Instructions, setspecial_Instructions] = useState("");

    const contextValue = {
        getQuantity: (name: string) => {
            const item = cartItems.find((item) => item.name === name);
            return item ? item.quantity : 0;
        },
        increaseCartQuantity: (name: string) => {
            setCartItems((prevItems) => {
                const item = prevItems.find((item) => item.name === name);
                if (item) {
                    return prevItems.map((item) =>
                        item.name === name
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    return [...prevItems, { name, quantity: 1 }];
                }
            });
        },
        decreaseCartQuantity: (name: string) => {
            setCartItems((prevItems) => {
                const item = prevItems.find((item) => item.name === name);
                if (item) {
                    if (item.quantity === 1) {
                        return prevItems.filter((item) => item.name !== name);
                    } else {
                        return prevItems.map((item) =>
                            item.name === name
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        );
                    }
                }
                return prevItems;
            });
        },
        removeCartItem: (name: string) => {
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.name !== name)
            );
        },
        changeTableName: (name: string) => {
            setTableName(name);
            console.log(`Table changed to ${name}`);
        },
        setSpecialInstructions: (instructions: string) => {
            setspecial_Instructions(instructions);
        },
        cartItems,
        tableName,
        special_Instructions,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
