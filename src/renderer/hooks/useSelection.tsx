import { Item } from "@/types/models";
import { useState } from "react";

interface Props<T extends Item> {
    items: T[];
}
export function useSelection<T extends Item>({items}:Props<T>) {
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const itemId = Number(event.target.value);
        const item = items.find((item) => item.id === itemId);
        if (event.target.checked) {
            event.target.checked = true;
            if (item)
                setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(prevSelectedItems =>
                prevSelectedItems.filter((item) => item.id !== itemId
                ))
            event.target.checked = false;
        }
    };
    const resetSelectedItems = () => {
        setSelectedItems([]);
    }
    return { selectedItems, resetSelectedItems, handleCheckChange };
}