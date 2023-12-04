import { SORT_BY, Item} from "@/types/types";
import { Dispatch, useState } from "react";
import { TableFooter } from "./TableFooter";
interface header {
    name: string;
    sortBy: SORT_BY;
}
interface Props {
  headers: header[];
  items: Item[];
  handleDelete: (ids:number[]) => void;
  handleAdd: (item: Item) => void;
  setSort: Dispatch<React.SetStateAction<SORT_BY>>;
}
const ITEMS_PER_PAGE = 10;

export function Table({headers ,items, handleDelete, handleAdd, setSort}: Props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentItems = items.slice(startIndex, endIndex);
    if (currentItems.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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

    
    return (
        <section className="w-full relative flex flex-col gap-8 items-end min-w-0">
            <table className="table bg-white min-w-0 overflow-x-scroll">
                <thead className="text-lg font-bold text-black opacity-70">
                    <tr>
                        <th  className='cursor-pointer' onClick={
                            ()=>{
                                setSort(SORT_BY.none);
                            }
                        }>#</th>
                        {headers.map((header) => (
                            <th key={header.name} 
                                className='cursor-pointer' 
                                onClick={()=>{
                                    setSort(header.sortBy)
                                }}>{header.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-xl">
                    {currentItems.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={handleCheckChange}
                                            value={item.id}
                                            checked={selectedItems.includes(item.id)}
                                        />
                                    </label>
                                </td>
                                <td>{item.id}</td>
                                <td
                                    title={item.name}
                                    className="max-w-[60px] overflow-hidden overflow-ellipsis"
                                >
                                    {item.name}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <TableFooter 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                fields={[
                    {
                        label: "Nombre",
                        name: "name",
                    },
                ]}
            />
        </section>

    );
}
