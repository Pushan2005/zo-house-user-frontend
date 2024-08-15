import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RZP_KEY_ID!,
    key_secret: process.env.NEXT_PUBLIC_RZP_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    const { amount } = await request.json();
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // amount in paise
            currency: "INR",
            receipt: "testreceipt#1",
        });
        return NextResponse.json(
            {
                orderId: order.id,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error creating order:", err);
        return NextResponse.json(
            {
                error: "Error creating order",
            },
            { status: 500 }
        );
    }
}
