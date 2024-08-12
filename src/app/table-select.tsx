"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/cart-context";

export default function TableSelector({
    defaultTable,
}: {
    defaultTable: string;
}) {
    const tables: string[] = ["Degen Lounge", "Black Pearl", "Eden Garden"];

    const { changeTableName, tableName } = useCart();

    const handleChange = (table: string) => {
        changeTableName(table);
    };

    return (
        <Select defaultValue={defaultTable} onValueChange={handleChange}>
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
    );
}
