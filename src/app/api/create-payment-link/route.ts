import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RZP_KEY_ID!,
    key_secret: process.env.NEXT_PUBLIC_RZP_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    const { amount, customer } = await req.json();

    const payment = await razorpay.paymentLink.create({
        amount: amount * 100,
        currency: "INR",

        customer: {
            name: customer.name,
            email: customer.email,
            contact: customer.contact,
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/test`,
    });
    console.log(payment);

    return NextResponse.json(payment);
}
