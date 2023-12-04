import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";

interface Props<T> {
    handleDelete: (ids:number[]) => void;
    handleAdd: (item: T) => void;
    selectedItems: number[];
    resetSelectedItems: () => void;
    totalPages: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
    formFields : Field[];
}

interface Field {
    label: string;
    name: string;
}

export function TableFooter<T> ({handleDelete, handleAdd, selectedItems, resetSelectedItems, totalPages, currentPage, handlePageChange, formFields: fields}: Props<T>) {
    return (
        <footer className="flex items-center justify-between w-full">
            <aside className="flex gap-8">
                <AddButton 
                    fields={fields}
                    addItem={handleAdd}
                />
                <DeleteButton 
                    resetSelectedItems={resetSelectedItems}
                    handleDelete={handleDelete}
                    selectedItems={selectedItems}
                />
                <button
                    className={`btn btn-info ${
                        selectedItems.length !== 1 ? "btn-disabled" : ""
                    }`}
                >
                Modificar
                </button>
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