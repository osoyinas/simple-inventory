import { FormField } from "@/types/types";
import { AddButton } from "@/renderer/Components/table/buttons/AddButton";
import { DeleteButton } from "@/renderer/Components/table/buttons/DeleteButton";
import { UpdateButton } from "./buttons/UpdateButton";
import { Item } from "@/types/models";
import { LeftArrow, RightArrow } from "@/renderer/Components/icons/Arrows";
interface Props<T extends Item> {
    handleDelete?: (ids:number[]) => void;
    handleAdd?: (item: T) => void;
    handleUpdate?: (item: T) => void;
    selectedItems: T[];
    resetSelectedItems: () => void;
    totalPages: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
    formFields : FormField<T>[];
}



export function TableFooter<T extends Item> ({handleDelete,
    handleAdd,
    handleUpdate, 
    selectedItems, 
    resetSelectedItems, 
    totalPages, currentPage, 
    handlePageChange, 
    formFields: fields}: Props<T>) {

    const PAGINATION_SIZE = 5;
    const pagesArray =Array(totalPages).fill(0).map((_,index)=> index+1)

    const currentPages = pagesArray.slice(
        PAGINATION_SIZE * Math.floor((currentPage-1)/PAGINATION_SIZE),
        PAGINATION_SIZE* Math.floor((currentPage-1)/PAGINATION_SIZE) + PAGINATION_SIZE);

    return (
        <footer className="flex items-center justify-between w-full">
            <aside className="flex gap-8">
                {handleAdd && 
                <AddButton 
                    fields={fields}
                    handleAdd={handleAdd}
                > Añadir</AddButton>}
                {handleUpdate && 
                <UpdateButton
                    disabled={selectedItems.length !== 1}
                    resetSelectedItems={resetSelectedItems}
                    fields={fields}
                    handleUpdate={handleUpdate}
                    selectedItem={selectedItems[0]}
                >Modificar
                </UpdateButton>}
                {handleDelete && <DeleteButton 
                    resetSelectedItems={resetSelectedItems}
                    handleDelete={handleDelete}
                    selectedItems={selectedItems}
                />}
            </aside>
            <div className="flex items-center gap-4 margin-auto justify-center">
                { selectedItems.length == 1 && <p className="text-lg font-bold text-black opacity-70">{selectedItems.length} elemento seleccionado</p>}
                { selectedItems.length > 1 && <p className="text-lg font-bold text-black opacity-70">{selectedItems.length} elementos seleccionados</p>}
                { selectedItems.length > 0 && <button className="btn btn-neutral" onClick={resetSelectedItems}>Deseleccionar todo</button>}
            </div>
            

            {totalPages > 1 && (
                <div className="pagination join">
                    <button className= {PAGINATION_SIZE - currentPage >= 0  ? "opacity-0 cursor-default": "" } onClick={()=>{
                        if (PAGINATION_SIZE - currentPage < 0 )
                            handlePageChange(currentPage -  PAGINATION_SIZE);
                    }}> <LeftArrow height={30} width={30} /> </button>
                    {currentPages.map( (page, index) => (
                        <input
                            key={index}
                            type="radio"
                            className={"join-item btn btn-square btn-outline"}
                            aria-label={`${page < 0? "..." : page}`}
                            checked={page == currentPage}
                            name="options"
                            onChange={() => {
                                if (page >= 0)
                                    handlePageChange(page);
                                else if (page == -1)
                                    handlePageChange(currentPage - PAGINATION_SIZE)
                                else 
                                    handlePageChange(currentPage + PAGINATION_SIZE)
                            }}
                        />
                    )
                    )}
                    
                    <button  className= {totalPages - currentPage < (totalPages % PAGINATION_SIZE) ? "opacity-0 cursor-default": "" } onClick={()=>{
                        if (totalPages - currentPage >= (totalPages % PAGINATION_SIZE))
                            handlePageChange(currentPage + PAGINATION_SIZE);
                    }}> <RightArrow height={30} width={30} /> 
                    </button>
                        
                    
                    

                </div>
                
            )}
        </footer>
    )
}