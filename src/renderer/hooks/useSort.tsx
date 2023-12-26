/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';


export function useSort<T>( items: T[] ) {
    const [sort, setSort] = useState<keyof T | null>();


    const sortedItems =  useMemo(() => {
        if (!sort) {
            return items
        }
        return [...items].sort((a: T, b: T) => {
            if (typeof a[sort as keyof T] === "number") 
                return (b[sort as keyof T] as number) - (a[sort as keyof T] as number);
            else if (typeof a[sort as keyof T] === "string") 
                return (a[sort as keyof T] as string).localeCompare(b[sort as keyof T] as string)
            else return 0;
        });

    }, [sort, items]);


    return { sortedItems, setSort };
}