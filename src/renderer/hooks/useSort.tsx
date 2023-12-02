/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { Item, Material, SORT_BY } from "@/types/types";

export function useSort(items: Item[]) {
    const [sort, setSort] = useState<SORT_BY>(SORT_BY.none);



    const sortedItems =  useMemo(()=>{
        if (sort === SORT_BY.none) {
            return items;
        }
        const compareProperties: Record<string,(item: unknown)=> any> ={
            [SORT_BY.name]: item => (item as Item).name,
            [SORT_BY.id]: item => (item as Item).id.toString(),
            [SORT_BY.available_quantity]: item => (item as Material).available_quantity,
            [SORT_BY.total_quantity]: item => (item as Material).total_quantity,
            [SORT_BY.units]: item => (item as Material).total_quantity,
        }
        return items.sort((a: Item, b: Item) => {

            return compareProperties[sort](a).localeCompare(compareProperties[sort](b));
        });
    }, [sort, items]);


    return { sortedItems, setSort };
}