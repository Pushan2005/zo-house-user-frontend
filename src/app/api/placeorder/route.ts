import { NextRequest, NextResponse } from "next/server";
import { placeOrder } from "./actions";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const order = await placeOrder(body);
    return NextResponse.json({ success: "true" });
}
