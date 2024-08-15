import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("POST request received:\n", req.body);
    return NextResponse.json({ message: "POST request received" });
}

export async function GET(req: NextRequest) {
    console.log("GET request received:");
    const { searchParams } = new URL(req.url);
    const order_id = searchParams.get("razorpay_order_id");
    console.log(searchParams);
    return NextResponse.json({ message: "GET request received" });
}
export async function PUT(req: NextRequest) {
    console.log("PUT request received:\n", req.body);
    return NextResponse.json({ message: "PUT request received" });
}
export async function DELETE(req: NextRequest) {
    console.log("DELETE request received:\n", req.body);
    return NextResponse.json({ message: "DELETE request received" });
}
