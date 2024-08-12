import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import FoodCard from "@/components/food-card";
import CartTotal from "./cart-total";
import { foodItems } from "./temp_data";
import TableSelector from "./table-select";
import { formatTableName } from "./actions";
import { useCart } from "@/context/cart-context";
import { use } from "react";

export default async function Home({
    searchParams,
}: {
    searchParams: URLSearchParams;
}) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    const params = new URLSearchParams(searchParams);
    const table = formatTableName(params.get("table") || "Eden Garden");
    console.log(table);

    return (
        <>
            <div className="w-full backdrop-blur-lg top-0 sticky pb-2">
                <h1 className="text-2xl font-bold text-center mt-1">Cafe </h1>
            </div>
            <div className="w-full p-4 pt-8">
                <div className="space-y-4"></div>
                <TableSelector defaultTable={table} />
                <div className="mt-4">
                    {foodItems.map((foodItem) => (
                        <FoodCard
                            className="my-2"
                            key={foodItem.name}
                            name={foodItem.name}
                            image={foodItem.image}
                            description={foodItem.description}
                            price={foodItem.price}
                            category={foodItem.category}
                            isVeg={foodItem.isVeg}
                        />
                    ))}
                </div>
            </div>
            <CartTotal className="p-4 bottom-0 sticky backdrop-blur-lg  border-t-2" />
        </>
    );
}
