"use server";

import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { User, Item, Inventory, Order, Menu } from "@/models/models";

export interface incomingOrder {
    name: string;
    items: {
        name: string;
        quantity: number;
    }[];
    price: number;
    orderTime: string;
    orderType: string; // cash or online
}

export async function connectDb() {
    mongoose
        .connect(process.env.NEXT_PUBLIC_MONGO_URI!, {
            dbName: process.env.NEXT_PUBLIC_MONGO_DB,
        })
        .then(() => {
            console.log("Connection successful");
        })
        .catch((error) => {
            console.error(`Error connecting to database: ${error}`);
        });
}

export async function disconnectDb() {
    await mongoose.connection.close();
}

export async function placeOrder(order: incomingOrder) {
    const name = order.name;
    const orderItems = order.items;
    const orderPrice = order.price;
    const orderType = order.orderType;
    const time = order.orderTime;
    const status = "pending";
    const transactionId = `${name}_${time}_${uuidv4()}`;

    const findUserById = async (name: string) => {
        const user = await User.findOne({ name: name });
        const userId = user?._id;
        return userId;
    };

    try {
        const userId = await findUserById(name);
        const newOrder = new Order({
            user: {
                name: name,
                ref: userId,
            },
            items: orderItems,
            price: orderPrice,
            status: status,
            orderType: orderType,
            transactionId: transactionId,
        });

        await newOrder.save();
    } catch (error) {
        console.error(`Error finding user: ${error}`);
    } finally {
        return { success: "true" };
    }
}
