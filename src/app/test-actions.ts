"use server";

export async function generatePaymentLink(
    amount: number,
    name: string,
    email: string
) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/api/create-payment-link`,
        {
            method: "POST",
            body: JSON.stringify({
                amount: amount * 100,
                customer: { name, email, contact: "+919000090000" },
            }),
        }
    );
    const result = await res.json();
    return result;
}

// export async function placeOrder()
