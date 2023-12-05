import { FormField } from "@/types/types";
import { AddButton } from "@/renderer/Components/table/buttons/AddButton";
import { DeleteButton } from "@/renderer/Components/table/buttons/DeleteButton";
import { UpdateButton } from "./buttons/UpdateButton";
import { Item } from "@/types/models";

interface Props<T extends Item> {
    handleDelete: (ids:number[]) => void;
    handleAdd: (item: T) => void;
    handleUpdate: (item: T) => void;
    selectedItems: T[];
    resetSelectedItems: () => void;
    totalPages: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
    formFields : FormField<T>[];
}



export function TableFooter<T extends Item> ({handleDelete, handleAdd, handleUpdate, selectedItems, resetSelectedItems, totalPages, currentPage, handlePageChange, formFields: fields}: Props<T>) {
    return (
        <footer className="flex items-center justify-between w-full">
            <aside className="flex gap-8">
                <AddButton 
                    fields={fields}
                    handleAdd={handleAdd}
                > Añadir</AddButton>
                <DeleteButton 
                    resetSelectedItems={resetSelectedItems}
                    handleDelete={handleDelete}
                    selectedItems={selectedItems}
                />
                <UpdateButton 
                    fields={fields}
                    handleUpdate={handleUpdate}
                    selectedItem={selectedItems[0]}
                >Modificar</UpdateButton>
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