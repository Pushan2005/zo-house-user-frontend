"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart-context";
import { useState } from "react";

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
    const {
        getQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
    } = useCart();

    const quantity = getQuantity(name);

    return (
        <Card className={`${className} `}>
            <CardHeader>
                <Image
                    src={image}
                    alt={name}
                    className="w-full h-40 object-cover"
                    width={400}
                    height={300}
                />
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between">
                    <CardTitle className="text-lg font-bold">{name}</CardTitle>
                    <VegIcon isVeg={isVeg} />
                </div>
                <CardDescription>{description}</CardDescription>
                <div className="flex justify-between">
                    <Badge variant={"outline"} className="text-xs">
                        {category}
                    </Badge>
                    <span className="font-bold text-muted-foreground">
                        ₹{price}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="justify-center">
                {quantity === 0 ? (
                    <Button
                        className="w-full"
                        onClick={() => {
                            increaseCartQuantity(name);

                            console.log(`${name} : ${quantity} `);
                        }}
                    >
                        Add
                    </Button>
                ) : (
                    <div className="">
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                decreaseCartQuantity(name);
                            }}
                        >
                            -
                        </Button>
                        <span className="px-2">{quantity}</span>
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                increaseCartQuantity(name);
                            }}
                        >
                            +
                        </Button>
                    </div>
                )}
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
