import FoodCard from "@/components/food-card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Home() {
    type FoodItem = {
        name: string;
        image: string;
        description: string;
        price: number;
        isVeg: boolean;
        category: string;
    };

    const tables: string[] = ["Degen Lounge", "Black Pearl", "Eden Garden"];

    const foodItems: FoodItem[] = [
        {
            name: "Veg Sandwich",
            image: "https://2.bp.blogspot.com/-VDlK83TTN04/VgEVZa6XZfI/AAAAAAAAH6k/V7jLCOWXaHU/s1600/spicy%20vegetable%20sandwich.JPG",
            description:
                "A delicious sandwich with fresh vegetables with a side of fries",
            price: 150,
            isVeg: true,
            category: "Munchies",
        },
        {
            name: "Cold Coffee",
            image: "https://rachnas-kitchen.com/wp-content/uploads/2017/07/cold-coffee-2.jpg",
            description: "A refreshing cold coffee with a hint of chocolate",
            price: 100,
            isVeg: true,
            category: "Bevarages",
        },
        {
            name: "Chicken Alfredo Pasta",
            image: "https://www.foodwerk-blog.de/wp-content/uploads/2022/03/IMG_3657-1-980x1225.jpg",
            description: "A creamy pasta with coocked chicken",
            price: 200,
            isVeg: false,
            category: "Meal",
        },
    ];

    return (
        <>
            <div className="w-full p-4 pt-8">
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">
                        Zo House Secret Menu{" "}
                    </h1>
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
        </>
    );
}
