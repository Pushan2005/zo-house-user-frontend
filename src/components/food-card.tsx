import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import exp from "constants";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface FoodCardProps {
    name: string;
    image: string;
    description: string;
    price: number;
    category: string;
    isVeg: boolean;
    className?: string;
}

function FoodCard({
    name,
    image,
    description,
    price,
    category,
    isVeg,
    className,
}: FoodCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <Image
                    src={image}
                    alt={name}
                    className="w-full h-40 object-cover"
                    width={400}
                    height={300}
                />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <CardTitle className="text-lg font-bold">{name}</CardTitle>
                    <VegIcon isVeg={isVeg} />
                </div>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
                <span className="font-bold">₹{price}</span>
                <Badge className="text-xs">{category}</Badge>
            </CardFooter>
        </Card>
    );
}

function VegIcon({ isVeg }: { isVeg: boolean }) {
    return (
        <div
            className={cn(
                "h-6 w-6 border-[3px] flex justify-center items-center bg-white border-green-700 rounded-sm",
                {
                    "border-red-900": !isVeg,
                }
            )}
        >
            <div
                className={cn("h-4 w-4 bg-green-700 rounded-full", {
                    "bg-red-900": !isVeg,
                })}
            ></div>
        </div>
    );
}

export default FoodCard;
