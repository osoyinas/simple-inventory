import { Field } from "@/types/types";
import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";
import { UpdateButton } from "./UpdateButton";
import { Response } from "@/types/types";

interface Props<T> {
    handleDelete: (ids:number[]) => void;
    handleAdd: (item: T) => void;
    getItem: (id: number) => Promise<Response<T>>;
    updateItem: (item: T) => void;
    selectedItems: number[];
    resetSelectedItems: () => void;
    totalPages: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
    formFields : Field[];
}



export function TableFooter<T> ({handleDelete,getItem, updateItem, handleAdd, selectedItems, resetSelectedItems, totalPages, currentPage, handlePageChange, formFields: fields}: Props<T>) {
    console.log("SELECTED ITEM IN TABLE FOOTER", selectedItems[0]);
    return (
        <footer className="flex items-center justify-between w-full">
            <aside className="flex gap-8">
                <AddButton 
                    fields={fields}
                    addItem={handleAdd}
                > Añadir</AddButton>
                <DeleteButton 
                    resetSelectedItems={resetSelectedItems}
                    handleDelete={handleDelete}
                    selectedItems={selectedItems}
                />
                <UpdateButton 
                    getItem={getItem}
                    selectedItem={selectedItems[0]}
                    updateItem={updateItem}
                    fields={fields}
                >
                    Modificar
                </UpdateButton>
            </aside>
            {totalPages > 1 && (
                <div className="pagination join">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <input
                            key={index}
                            type="radio"
                            className="join-item btn btn-square btn-outline"
                            aria-label={`${index + 1}`}
                            checked={index + 1 == currentPage}
                            name="options"
                            onChange={() => {
                                handlePageChange(index + 1);
                            }}
                        />
                    ))}
                </div>
            )}
        </footer>
    )
}