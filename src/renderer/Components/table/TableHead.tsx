import { TableField, header } from "@/types/types";

interface Props<T> {
    headers: header[];
    currentItems: T[];
    selectedItems: T[];
    setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
    resetSelectedItems: () => void;
    fields: TableField<T>[];
    handleSort: (sort: keyof T) => void;
}

export function TableHead<T>({headers, currentItems,setSelectedItems, selectedItems, fields, handleSort}: Props<T>) {

    const toggleSelected = () => {
        if (selectedItems.some((item) => currentItems.includes(item))) {
            setSelectedItems((prevItems)=> prevItems.filter((item) => !currentItems.includes(item)))
        } else {
            setSelectedItems((prevItems)=> [...prevItems, ...currentItems])
        }
    }
    return (
        <thead className="text-lg font-bold text-black opacity-70">
            <tr>
                <th>
                    <button onClick={toggleSelected} title={
                        selectedItems.some((item)=> currentItems.includes(item)) ? "Deseleccionar todo": "Seleccionar todos"}>#
                    </button>
                </th>
                {headers.map((header, index) => (
                    <th key={header.name}><button onClick={()=> {
                        handleSort(fields[index].key)
                    }}>{header.name}</button></th>
                ))}
            </tr>
        </thead>
    )
}