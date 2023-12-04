import { SORT_BY, Item, Material} from "@/types/types";
import { TableFooter } from  "@/renderer/Components/table/TableFooter";
import {TableHeader} from "@/renderer/Components/table/TableHeader";
import { usePagination } from "@/renderer/hooks/usePagination";
import { useSelection } from "@/renderer/hooks/useSelection";
import { TableHead } from "../table/TableHead";

interface header {
    name: string;
}
interface Props {
  headers: header[];
  items: Material[];
  handleDelete: (ids:number[]) => void;
  handleAdd: (item: Item) => void;
  handleSort: (sort: SORT_BY) => void;
  handleFilter: (value:string) => void;
}
export function MaterialsTable({headers ,items, handleDelete, handleAdd, handleSort, handleFilter}: Props) {

    const {currentItems, totalPages, currentPage, handlePageChange} = usePagination<Material>({items});
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
                        {
                            label: "Cantidad total",
                            name: "absolute_amount",
                        },
                        {
                            label: "Unidades",
                            name: "units",
                        },
                    ]}
                />
            </section>

        </>
    );
}


interface TableBodyProps {
    currentItems: Material[];
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
                        <td
                            title={item.absolute_amount.toString()}
                            className="max-w-[60px] overflow-hidden overflow-ellipsis"
                        >
                            {item.absolute_amount} <span className="opacity-70 text-lg">{item.units}</span>
                        </td>
                        <td title={item.absolute_amount.toString()}
                            className="max-w-[60px] overflow-hidden overflow-ellipsis">
                            {item.available_amount} <span className="opacity-70 text-lg">{item.units}</span>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    )
}