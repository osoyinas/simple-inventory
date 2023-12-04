import { useState } from "react";

export function useSelection() {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const itemId = Number(event.target.value);
        if (event.target.checked) {
            event.target.checked = true;
            setSelectedItems([...selectedItems, itemId]);
        } else {
            setSelectedItems(prevSelectedItems =>
                prevSelectedItems.filter((id) => id !== itemId
                ))
            event.target.checked = false;
        }
    };
    const resetSelectedItems = () => {
        setSelectedItems([]);
    }
    return { selectedItems, resetSelectedItems, handleCheckChange };
}