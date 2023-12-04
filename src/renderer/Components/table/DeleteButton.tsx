import { useModal } from "@/renderer/hooks/useModal";
interface Props {
    selectedItems: number[];
    setSelectedItems: (ids: number[]) => void;
    handleDelete: (ids:number[]) => void;

}
export function DeleteButton({selectedItems, setSelectedItems, handleDelete}: Props) {
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
                    <h3 className="font-bold text-xl">¿Estás seguro de que quieres eliminar {selectedItems.length}?</h3>
                    <div className="divider"></div>
                    <footer className="flex justify-between">

                        <button className="btn" onClick={closeModal}>No, cancelar</button>
                        <button className="btn btn-error" onClick={()=>{
                            handleDelete(selectedItems);
                            console.log(selectedItems);
                            setSelectedItems([]);
                            closeModal();
                        }}>Sí, eliminar</button>
                    </footer>

                </div>
                <div className="modal-background absolute w-full h-full bg-black opacity-60"></div>
            </dialog>
        </>
    )
}