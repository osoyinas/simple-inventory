import { useState, useMemo } from 'react';

interface params<T> {
    key: keyof T;
    items: T[]
}

export function useFilter<T>({items, key}: params<T>) {
    const [filter, setFilter] = useState<string | null>(null);

    const filteredItems = useMemo(()=>{
        if (filter !== null && filter.length > 0) {
            return items.filter((item: T) => {
                return (item[key] as string).toLowerCase().includes(filter.toLowerCase().trim());
            })
        }
        return items;
    },[filter, items, key]) 

    return { filteredItems, setFilter };
}