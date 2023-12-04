import { Item } from "@/types/types";
import { useState, useEffect } from "react";

interface Props {
    addItem: (item: Item) => void;
}

export function AddButton ({addItem}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }

    return (
        <>
            <button onClick={handleClick} className="btn btn-primary  text-primary-content">Añadir</button>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box z-50">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={handleClick}>Close</button>
                        </form>
                    </div>
                </div>
                <div className="modal-background absolute w-full h-full bg-black opacity-60"></div>
            </dialog>
        </>
    )
}

