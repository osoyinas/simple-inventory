import { SORT_BY } from "@/types/types";

interface header {
    name: string;
    sortBy: SORT_BY;
} 

interface TableHeadProps {
    headers: header[];
}


export function TableHead({headers}: TableHeadProps) {
    return (
        <thead className="text-lg font-bold text-black opacity-70">
            <tr>
                <th  className='cursor-pointer'>#</th>
                {headers.map((header) => (
                    <th key={header.name} 
                        className='cursor-pointer'>{header.name}</th>
                ))}
            </tr>
        </thead>
    )
}