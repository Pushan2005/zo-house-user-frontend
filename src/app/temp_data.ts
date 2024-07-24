export type FoodItem = {
    name: string;
    image: string;
    description: string;
    price: number;
    isVeg: boolean;
    category: string;
};
export const foodItems: FoodItem[] = [
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
