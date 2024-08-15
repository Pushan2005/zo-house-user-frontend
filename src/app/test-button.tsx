"use client";

import { createClient } from "@/utils/supabase/client";

export default function Test() {
    const supabase = createClient();
    async function handleClick() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const name = user?.user_metadata.name;
        const email = user?.email;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL!}/api/create-payment-link`,
            {
                method: "POST",
                body: JSON.stringify({
                    amount: 100,
                    customer: { name, email, contact: "+919000090000" },
                }),
            }
        );
    }

    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Test Button
        </button>
    );
}
