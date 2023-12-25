import { header } from "@/types/types";

interface Props<T> {
    headers: header[];
    currentItems: T[];
    selectedItems: T[];
    setSelectedItems: (items: T[]) => void;
    resetSelectedItems: () => void;
}


export function TableHead<T>({headers, currentItems,setSelectedItems, selectedItems, resetSelectedItems}: Props<T>) {

    const toggleSelected = () => {
        if (selectedItems.length > 0) {
            resetSelectedItems()
        } else {
            console.log(currentItems);
            setSelectedItems(currentItems)
        }
    }
    return (
        <thead className="text-lg font-bold text-black opacity-70">
            <tr>
                <th  className='cursor-pointer' onClick={toggleSelected}>#</th>
                {headers.map((header) => (
                    <th key={header.name} 
                        className='cursor-pointer'>{header.name}</th>
                ))}
            </tr>
        </thead>
    )
}