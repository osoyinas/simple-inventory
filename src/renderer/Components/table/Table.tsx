import { SORT_BY, Item} from "@/types/types";
import { TableFooter } from "./TableFooter";
import { usePagination } from "@/renderer/hooks/usePagination";
import { useSelection } from "@/renderer/hooks/useSelection";
import {TableHeader} from "@/renderer/Components/table/TableHeader";

interface header {
    name: string;
    sortBy: SORT_BY;
}
interface Props {
  headers: header[];
  items: Item[];
  handleDelete: (ids:number[]) => void;
  handleAdd: (item: Item) => void;
  handleSort: (sort: SORT_BY) => void;
  handleFilter: (value:string) => void;
}


export function Table({headers ,items, handleDelete, handleAdd, handleSort, handleFilter}: Props) {

    const {currentItems, totalPages, currentPage, handlePageChange} = usePagination({items});
    const {selectedItems, resetSelectedItems, handleCheckChange} = useSelection();

    return (
        <>
            <TableHeader
                name="Personas"
                handleFilter={handleFilter}
                handleSort={handleSort}
            />
            <section className="w-full relative flex flex-col gap-8 items-end min-w-0">
                <table className="table bg-white min-w-0 overflow-x-scroll">
                    <TableHead headers={headers}/>
                    <TableBody currentItems={currentItems} selectedItems={selectedItems} handleCheckChange={handleCheckChange} />
                </table>
                <TableFooter 
                    selectedItems={selectedItems}
                    resetSelectedItems={resetSelectedItems}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    handleDelete={handleDelete}
                    handleAdd={handleAdd}
                    formFields={[
                        {
                            label: "Nombre",
                            name: "name",
                        },
                    ]}
                />
            </section>

        </>
    );
}

interface TableHeadProps {
    headers: header[];
}

function TableHead({headers}: TableHeadProps) {
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


interface TableBodyProps {
    currentItems: Item[];
    handleCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedItems: number[];
}

function TableBody ({currentItems, handleCheckChange, selectedItems}: TableBodyProps) {
    return (
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
    )
}