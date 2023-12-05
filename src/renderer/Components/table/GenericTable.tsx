import { SORT_BY, header, FormField, TableField} from "@/types/types";
import {Item} from "@/types/models";
import { TableFooter } from  "@/renderer/Components/table/TableFooter";
import {TableHeader} from "@/renderer/Components/table/TableHeader";
import {TableHead} from "@/renderer/Components/table/TableHead";
import { usePagination } from "@/renderer/hooks/usePagination";
import { useSelection } from "@/renderer/hooks/useSelection";

interface Props<T extends Item> {
    title: string;
    headers: header[];
    fields: TableField<T>[];
    items: T[];
    handleDelete: (ids:number[]) => void;
    handleAdd: (item: T) => void;
    handleSort: (sort: SORT_BY) => void;
    handleFilter: (value:string) => void;
    formFields: FormField[];
}

export function GenericTable<T extends Item>({title, headers, fields, items, handleDelete, handleAdd, handleSort, handleFilter, formFields}: Props<T>) {

    const {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange} = usePagination<T>({items});

    const {selectedItems,
        resetSelectedItems,
        handleCheckChange} = useSelection();

    return (
        <>
            <TableHeader
                name={title}
                handleFilter={handleFilter}
                handleSort={handleSort}
            />
            <section className="w-full relative flex flex-col gap-8 items-end min-w-0">
                <table className="table bg-white min-w-0 overflow-x-scroll">
                    <TableHead headers={headers}/>
                    <tbody className="text-xl">
                        {currentItems.map((item, rowIndex) => (
                            <tr key={rowIndex}>
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
                                {fields.map((field, colIndex) => (
                                    <td key={colIndex}  className={`max-w-[60px] overflow-hidden overflow-ellipsis ${field.className}`}>
                                        {field.logic ? field.logic(item) : item[field.key] as string}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                <TableFooter 
                    selectedItems={selectedItems}
                    resetSelectedItems={resetSelectedItems}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    handleDelete={handleDelete}
                    handleAdd={handleAdd}
                    formFields={formFields}
                />
            </section>

        </>
    );
}
