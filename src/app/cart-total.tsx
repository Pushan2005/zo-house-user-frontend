// ! Razorpay Documentation incomplete, orders are directly inserted into the database without payment for demo purposes.
// ! Always verify payment signature before inserting order into the database.

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
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { table } from "console";
import { spec } from "node:test/reporters";

declare global {
    interface Window {
        Razorpay: any;
    }
}
// const loadScript = () => {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = "checkout.razorpay.com/v1/checkout.js";
//         script.onload = () => {
//             resolve(true);
//         };
//         script.onerror = () => {
//             resolve(false);
//         };
//         document.body.appendChild(script);
//     });
// };

function CartTotal({ className }: { className?: string }) {
    const [orderPending, setOrderPending] = useState(false);
    const {
        cartItems,
        setSpecialInstructions,
        special_Instructions,
        tableName,
    } = useCart();
    const total = cartItems.reduce((acc, item) => {
        const foodItem = foodItems.find((food) => food.name === item.name);
        return acc + ((foodItem && foodItem.price) || 0) * item.quantity;
    }, 0);

    const supabase = createClient();

    const handleChange = (e: any) => {
        setSpecialInstructions(e.target.value);
    };

    const handleCheckout = async () => {
        setOrderPending(true);
        // const res = await loadScript();
        // if (!res) {
        //     alert("Razorpay SDK failed to load");
        //     setOrderPending(false);
        //     return;
        // }
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const name: string = user!.user_metadata.name;
        const email: string = user?.email!;
        // try {
        //     const response = await fetch("/api/create-order", {
        //         method: "POST",
        //         body: JSON.stringify({ amount: total }),
        //     });
        //     const data = await response.json();
        //     const options = {
        //         key: process.env.NEXT_PUBLIC_RZP_KEY_ID!,
        //         amount: total * 100, // converts to paise
        //         currency: "INR",
        //         name: "Zo Cafe",
        //         description: "Order Payment Test Transaction",
        //         order_id: data.orderId,
        //         handler: async function (response: any) {
        //             console.log("Payment Successful: ", response);
        //             // write code to add order to database
        //         },
        //         prefill: {
        //             name: name,
        //             email: email,
        //             contact: "9999999999",
        //         },
        //         theme: {
        //             color: "#3399cc",
        //         },
        //     };
        //     const rzp = new window.Razorpay(options);
        //     rzp.open();
        // } catch (err) {
        //     console.log("Payment failed: ", err);
        // } finally {
        //     setOrderPending(false);
        // }

        // const payment = await generatePaymentLink(100, name, email);

        const currentTime = new Date().toISOString();
        const { error } = await supabase.from("orders").insert({
            customer: { name: name, email: email },
            items: cartItems,
            price: total,
            ordertype: "Online Payment",
            status: "Pending",
            order_time: currentTime,
            special_instructions: special_Instructions,
            table_name: tableName,
        });
        if (error) {
            alert(`Something went wrong: ${error}`);
        } else {
            alert("Order placed successfully");
        }
        // const payload = {
        //     Customer: "Placeholder Name",
        //     items: cartItems,
        //     amount: total,
        //     orderType: "Placeholder Cash",
        //     table: "Placeholder Table",
        //     specialInstructions: special_Instructions,
        // };
    };

    return (
        <div className={cn(`${className} `, { "hidden ": total === 0 })}>
            <Sheet>
                <SheetTrigger className={"w-full flex px-4 justify-between"}>
                    <h1>₹{total}</h1>
                    <h1>Checkout {""}</h1>
                </SheetTrigger>
                <SheetContent side={"bottom"}>
                    <SheetHeader>
                        <SheetTitle>Items in Cart</SheetTitle>
                        <SheetDescription>
                            {cartItems.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex mt-2 justify-between"
                                >
                                    <h1>{item.name}</h1>
                                    <h1>{item.quantity}</h1>
                                </div>
                            ))}
                            <Separator className="mt-1" />
                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter className="flex flex-col mt-2 space-y-2">
                        <div className="mt-1">
                            <Label
                                htmlFor="special-instructions"
                                className="ml-1"
                            >
                                Special Instructions
                            </Label>
                            <Textarea
                                className="h-20 w-full"
                                placeholder="Leave blank if none..."
                                id="special-instructions"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-between">
                            <h1>Total:</h1>
                            <h1>₹{total}</h1>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            disabled={orderPending}
                        >
                            {orderPending ? "Processing..." : "Checkout"}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default CartTotal;
