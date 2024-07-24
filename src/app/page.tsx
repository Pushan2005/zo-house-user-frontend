import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import FoodCard from "@/components/food-card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CartTotal from "./cart-total";
import { foodItems } from "./temp_data";

export default async function Home() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    const tables: string[] = ["Degen Lounge", "Black Pearl", "Eden Garden"];

    return (
        <>
            <div className="w-full backdrop-blur-lg top-0 sticky pb-2">
                <h1 className="text-2xl font-bold text-center mt-1">
                    Zo House Cafe{" "}
                </h1>
            </div>
            <div className="w-full p-4 pt-8">
                <div className="space-y-4">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Table" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {tables.map((table) => (
                                    <SelectItem value={table} key={table}>
                                        {table}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
            <CartTotal className="p-4 bottom-0 sticky backdrop-blur-lg border-t-2" />
        </>
    );
}
