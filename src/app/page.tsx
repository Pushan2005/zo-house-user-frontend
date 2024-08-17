import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import FoodCard from "@/components/food-card";
import CartTotal from "./cart-total";
import { foodItems } from "./temp_data";
import TableSelector from "./table-select";
import LogoutButton from "@/components/logout-button";
import Test from "./test-button";

export default async function Home({
    searchParams,
}: {
    searchParams: URLSearchParams;
}) {
    const supabase = createClient();
    const params = new URLSearchParams(searchParams);
    const table = params.get("table") || "Degen Lounge";

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <>
            <div className="w-full backdrop-blur-lg top-0 sticky pb-2">
                <h1 className="text-2xl font-bold text-center mt-1">Cafe</h1>
            </div>
            <div className="w-full p-4 pt-8">
                <div className="space-y-4"></div>
                <div className="flex items-center justify-between">
                    <TableSelector defaultTable={table} />
                    <LogoutButton />                    
                </div>
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
