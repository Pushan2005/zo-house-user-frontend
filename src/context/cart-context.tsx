"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type CartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    name: string;
    quantity: number;
};

type CartContext = {
    getQuantity: (name: string) => number;
    increaseCartQuantity: (name: string) => void;
    decreaseCartQuantity: (name: string) => void;
    removeCartItem: (name: string) => void;
    cartItems: CartItem[];
};

const CartContext = createContext({} as CartContext);

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setcartItems] = useState<CartItem[]>([]);

    function getQuantity(name: string) {
        return cartItems.find((item) => item.name === name)?.quantity || 0;
    }

    function increaseCartQuantity(name: string) {
        setcartItems((currItems) => {
            if (currItems.find((item) => item.name === name) == null) {
                return [...currItems, { name, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.name === name) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(name: string) {
        setcartItems((currItems) => {
            if (currItems.find((item) => item.name === name)?.quantity == 1) {
                return currItems.filter((item) => item.name !== name);
            } else {
                return currItems.map((item) => {
                    if (item.name === name) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeCartItem(name: string) {
        setcartItems((currItems) => {
            return currItems.filter((item) => item.name !== name);
        });
    }

    return (
        <CartContext.Provider
            value={{
                getQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeCartItem,
                cartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
