export type Order = {
    user: {
        name: string;
        email?: string;
        phone?: string;
    };
    items: {
        name: string;
        quantity: number;
    }[];
    price: number;
    orderType: string; // cash or online
    table: string;
};
