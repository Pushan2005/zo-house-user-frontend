"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useCart } from "@/context/cart-context";
import { foodItems } from "./temp_data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function CartTotal({ className }: { className?: string }) {
    const { cartItems } = useCart();
    const total = cartItems.reduce((acc, item) => {
        const foodItem = foodItems.find((food) => food.name === item.name);
        return acc + ((foodItem && foodItem.price) || 0) * item.quantity;
    }, 0);

    return (
        <div className={cn(`${className} `, { "hidden ": total === 0 })}>
            <Sheet>
                <SheetTrigger className={"w-full flex px-4 justify-between"}>
                    <h1>₹{total}</h1>
                    <h1>Checkout -{">"}</h1>
                </SheetTrigger>
                <SheetContent side={"bottom"}>
                    <SheetHeader>
                        <SheetTitle>Items in Cart</SheetTitle>
                        <SheetDescription>
                            {cartItems.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex justify-between"
                                >
                                    <h1>{item.name}</h1>
                                    <h1>{item.quantity}</h1>
                                </div>
                            ))}
                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter className="flex flex-col mt-2 space-y-2">
                        <div className="flex justify-between">
                            <h1>Total:</h1>
                            <h1>₹{total}</h1>
                        </div>
                        <Button
                            onClick={async () => {
                                const url =
                                    process.env
                                        .NEXT_PUBLIC_ORDER_PLACEMENT_API || "";
                                const payload = {
                                    user: {
                                        name: "Placeholder User",
                                        email: "Placeholder Email",
                                        phone: "Placeholder Phone",
                                    },
                                    items: cartItems,
                                    price: total,
                                    orderType: "Placeholder Cash",
                                };
                                try {
                                    await fetch(url, {
                                        method: "POST",
                                        cache: "no-cache",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(payload),
                                    });
                                } catch (error) {
                                    console.error(
                                        "Error occurred during checkout: ",
                                        error
                                    );
                                }
                            }}
                        >
                            Checkout
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default CartTotal;
