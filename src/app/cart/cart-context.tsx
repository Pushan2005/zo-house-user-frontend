import { createContext } from "react";

type cartContext = {
    cart: {
        name: string;
        quantity: number;
    }[];
    cartTotal: number;
};

export const CartContext = createContext<cartContext>({
    cart: [],
    cartTotal: 0,
});
