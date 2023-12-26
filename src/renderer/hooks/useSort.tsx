/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';

export function useSort<T>( items: T[] ) {
    const [sort, setSort] = useState<keyof T | null>();
    const [sortDirection, setSortDirection] = useState<boolean>(true); // true = asc, false = desc


    const handleSort = (sort: keyof T | null, sortDirection: boolean) => {
        setSort(sort)
        setSortDirection(sortDirection)
    }

    const sortedItems =  useMemo(() => {
        if (!sort) 
            return items
        
        if (sortDirection) {
            return [...items].sort((a: T, b: T) => {

                if (typeof a[sort as keyof T] === "number") 
                    return (a[sort as keyof T] as number) - (b[sort as keyof T] as number);
                else if (typeof a[sort as keyof T] === "string") 
                    return (a[sort as keyof T] as string).localeCompare(b[sort as keyof T] as string)
                else return 0;
            });
        } else
            return [...items].sort((a: T, b: T) => {
                if (typeof a[sort as keyof T] === "number") 
                    return (b[sort as keyof T] as number) - (a[sort as keyof T] as number);
                else if (typeof a[sort as keyof T] === "string") 
                    return (b[sort as keyof T] as string).localeCompare(a[sort as keyof T] as string)
                else return 0;
            });

    }, [sort, items]);


    return { sortedItems, handleSort, sortDirection };
}