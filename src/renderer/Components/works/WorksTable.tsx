import { SORT_BY, header, Work, STATUS} from "@/types/types";
import { TableFooter } from  "@/renderer/Components/table/TableFooter";
import {TableHeader} from "@/renderer/Components/table/TableHeader";
import {TableHead} from "@/renderer/Components/table/TableHead";
import { usePagination } from "@/renderer/hooks/usePagination";
import { useSelection } from "@/renderer/hooks/useSelection";


interface Props {
  headers: header[];
  items: Work[];
  handleDelete: (ids:number[]) => void;
  handleAdd: (item: Work) => void;
  handleSort: (sort: SORT_BY) => void;
  handleFilter: (value:string) => void;
}
export function WorksTable({headers ,items, handleDelete, handleAdd, handleSort, handleFilter}: Props) {

    const {currentItems, totalPages, currentPage, handlePageChange} = usePagination<Work>({items});
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
                            label: "Fecha de inicio",
                            type: "date",
                            name: "start_date",
                        },
                        {
                            label: "Descripción",
                            name: "description",
                        },
                    ]}
                />
            </section>

        </>
    );
}
interface TableBodyProps {
    currentItems: Work[];
    handleCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedItems: number[];
}

function TableBody ({currentItems, handleCheckChange, selectedItems}: TableBodyProps) {
    return (
        <tbody className="text-xl">
            {currentItems.map((item) => {
                const dateFormat = new Intl.DateTimeFormat('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const formatedDate = dateFormat.format(new Date(item.start_date));
                console.log(formatedDate);
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
                        <td
                            title={item.name}
                            className="max-w-[60px] overflow-hidden overflow-ellipsis"
                        >
                            {item.name}
                        </td>
                        <td
                            title={formatedDate}
                            className="max-w-[60px] overflow-hidden overflow-ellipsis"
                        >
                            {formatedDate}
                        </td>
                        {item.status === STATUS.done ? (
                            <td className="max-w-[60px] overflow-hidden overflow-ellipsis" ><button className="btn btn-success">Terminada</button></td>)
                            : (<td className="max-w-[60px] overflow-hidden overflow-ellipsis" ><button className="btn btn-warning">Pendiente</button></td>)}
                    
                        <td
                            title={item.description}
                            className="max-w-[60px] overflow-hidden overflow-ellipsis"
                        >
                            {item.description}
                        </td>
                    </tr>
                );
            })}
        </tbody>
    )
}