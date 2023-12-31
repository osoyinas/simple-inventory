import { useModal } from "@/renderer/hooks/useModal";
import { Item } from "@/types/models";

interface Props<T extends Item> {
    selectedItems: T[];
    resetSelectedItems: () => void;
    handleDelete: (ids:number[]) => void;

}
export function DeleteButton<T extends Item>({selectedItems, resetSelectedItems, handleDelete}: Props<T>) {
    const {isOpen, closeModal, openModal} = useModal();
    return (
        <>
            <button
                className={`btn btn-error ${
                    selectedItems.length === 0 ? "btn-disabled" : ""
                }`}
                onClick={openModal}
            >
Eliminar
            </button>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box z-50">
                    { selectedItems.length == 1 && <p className="text-lg font-bold text-black opacity-70">Estás seguro de que quieres eliminar el elemento seleccionado?</p>}
                    { selectedItems.length > 1 && <p className="text-lg font-bold text-black opacity-70">¿Estás seguro de que quieres eliminar los {selectedItems.length} elementos seleccionados?</p>}
                    <div className="divider"></div>
                    <footer className="flex justify-between">

                        <button className="btn" onClick={closeModal}>No, cancelar</button>
                        <button className="btn btn-error" onClick={()=>{
                            handleDelete(selectedItems.map(item => item.id));
                            resetSelectedItems()
                            closeModal();
                        }}>Sí, eliminar</button>
                    </footer>

                </div>
                <div className="modal-background absolute w-full h-full bg-black opacity-60"></div>
            </dialog>
        </>
    )
}