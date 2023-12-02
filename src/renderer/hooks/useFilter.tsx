import { useState, useMemo } from 'react';
import { Item } from "@/types/types";

export function useFilter(items: Item[]) {
    const [filter, setFilter] = useState<string | null>(null);

    const filteredItems = useMemo(()=>{
        if (filter !== null && filter.length > 0) {
            return items.filter((item: Item) => {
                return item.name.toLowerCase().includes(filter.toLowerCase().trim());
            })
        }
        return items;
    },[filter, items]) 

    return { filteredItems, setFilter };
}