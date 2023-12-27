/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Item } from '@/types/models';
import { useState, useMemo } from 'react';
import { TableField, header } from '@/types/types';

export function useSort<T extends Item>( items: T[], headers: header[], fields: TableField<T>[] ) {
    const [sort, setSort] = useState<keyof T | null>("id" as keyof T);
    const [sortDirection, setSortDirection] = useState<boolean>(true); // true = asc, false = desc


    const changeSortDirection = () => {
        setSortDirection((prev) => !prev);
    }

    const getCurrentSort = () => {
        console.log(fields);
        const index = fields.indexOf(fields.find((field) => field.key === sort) as TableField<T>);
        console.log(index);
        return headers[index];
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
        } 
        else
            return [...items].sort((a: T, b: T) => {
                if (typeof a[sort as keyof T] === "number") 
                    return (b[sort as keyof T] as number) - (a[sort as keyof T] as number);
                else if (typeof a[sort as keyof T] === "string") 
                    return (b[sort as keyof T] as string).localeCompare(a[sort as keyof T] as string)
                else return 0;
            });

    }, [sort, items, sortDirection]);
    return { sortedItems, setSort, sortDirection, changeSortDirection, getCurrentSort };
}