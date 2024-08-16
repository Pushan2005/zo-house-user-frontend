"use client";

import { createClient } from "@/utils/supabase/client";
import { generatePaymentLink } from "./test-actions";

export default function Test() {
    const supabase = createClient();
    async function handleClick() {
        const payment = await generatePaymentLink(
            100,
            "Pushan",
            "pushan.sahanaganesh@gmail.com"
        );
        console.log(payment);
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
