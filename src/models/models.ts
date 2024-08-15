import mongoose from "mongoose";

// schemas
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    wallet: String,
    debt: Number,
});

const orderSchema = new mongoose.Schema({
    user: {
        name: String,
        ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    items: [
        {
            name: String,
            quantity: Number,
            special_instructions: String,
        },
    ],

    price: Number,
    status: String, // pending, confirmed, delivered
    orderType: String, // cash or online
    transactionId: String,
});

const itemSchema = new mongoose.Schema({
    name: String,
    sku: String,
    category: String,
});

const inventorySchema = new mongoose.Schema({
    item: {
        name: String,
        sku: String,
        category: String,
    },
    quantity: Number,
    price: Number,
});

const menuSchema = new mongoose.Schema({
    item: String,
    category: String,
});

// models

export const User = mongoose.model("User", userSchema, "users");
export const Item = mongoose.model("Item", itemSchema, "items");
export const Inventory = mongoose.model(
    "Inventory",
    inventorySchema,
    "inventory"
);
export const Menu = mongoose.model("Menu", menuSchema, "menu");
export const Order = mongoose.model("Order", orderSchema, "orders");
