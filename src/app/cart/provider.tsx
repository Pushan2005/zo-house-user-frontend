"use client";

import { useState } from "react";
import { CartContext } from "./cart-context";

function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    return (
        <CartContext.Provider value={{ cart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
