import { SORT_BY, Person, header} from "@/types/types";
import { TableFooter } from  "@/renderer/Components/table/TableFooter";
import {TableHeader} from "@/renderer/Components/table/TableHeader";
import {TableHead} from "@/renderer/Components/table/TableHead";
import { usePagination } from "@/renderer/hooks/usePagination";
import { useSelection } from "@/renderer/hooks/useSelection";
import { getPerson, updatePerson } from "@/api/person";

interface Props {
  headers: header[];
  items: Person[];
  handleDelete: (ids:number[]) => void;
  handleAdd: (item: Person) => void;
  handleSort: (sort: SORT_BY) => void;
  handleFilter: (value:string) => void;
}
export function PersonTable({headers ,items, handleDelete, handleAdd, handleSort, handleFilter}: Props) {

    const {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange} = usePagination<Person>({items});
        
    const {selectedItems,
        resetSelectedItems,
        handleCheckChange} = useSelection();

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
                    getItem={getPerson}
                    updateItem={updatePerson}
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
interface TableBodyProps {
    currentItems: Person[];
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