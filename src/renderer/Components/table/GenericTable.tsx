import { header, FormField, TableField } from "@/types/types";
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
    handleDelete?: (ids:number[]) => void;
    handleAdd?: (item: T) => void;
    handleSort: (sort: keyof T | null) => void;
    handleFilter: (value:string) => void;
    changeSortDirection: () => void;
    sortDirection: boolean;
    handleUpdate?: (item: T) => void;
    formFields: FormField<T>[];
    getCurrentSort: () => header;
}

export function GenericTable<T extends Item>({title, headers, fields, items, handleDelete, handleAdd, handleUpdate, sortDirection, handleSort, handleFilter, changeSortDirection, formFields, getCurrentSort}: Props<T>) {
    
    const {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange
    } = usePagination<T>({items});

    const {
        selectedItems,
        setSelectedItems,
        resetSelectedItems,
        handleCheckChange
    } = useSelection({items});

    const selectedItemIds = new Set(selectedItems.map(item => item.id));
    return (
        <>
    
            <section className="relative flex flex-col gap-8 items-end min-w-max max-w-7xl w-full">
                <TableHeader
                    name={title}   
                    sortDirection={sortDirection}
                    changeSortDirection={changeSortDirection}
                    handleFilter={handleFilter}
                    handleSort={handleSort}
                    getCurrentSort={getCurrentSort}
                />
                <table className="table bg-white min-w-max">
                    <TableHead headers={headers}                 
                        currentItems={currentItems}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        resetSelectedItems={resetSelectedItems}
                        fields={fields}
                        handleSort={handleSort}
                    />
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
                                            checked={selectedItemIds.has(item.id)}
                                        />
                                    </label>
                                </td>
                                {fields.map((field, colIndex) => (
                                    <td key={colIndex}  className={`overflow-hidden overflow-ellipsis ${field.className}`}>
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
                    handleUpdate={handleUpdate}
                    formFields={formFields}
                />
            </section>

        </>
    );
}
