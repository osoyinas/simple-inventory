import { useState } from "react";
import { useModal } from "@/renderer/hooks/useModal";
interface Props<T> {
    addItem: (item: T) => void;
    fields: Field[];
}

interface Field {
    label: string;
    name: string;
    type?: string;
}

export function AddButton<T> ({addItem, fields}: Props<T>) {
    const {isOpen, closeModal, openModal} = useModal();
    const [formValues, setFormValues] = useState<Record<string, string>>({});


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    const handleAddClick = () => {
        addItem(formValues as T);
        console.log(formValues as T);
        setFormValues({});
        closeModal();
    }
    console.log(fields);
    return (
        <>
            <button onClick={openModal} className="btn btn-primary text-primary-content">Añadir</button>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box z-50">
                    <h3 className="font-bold text-xl">Añadir</h3>
                    <div className="divider"></div>
                    <main className="flex flex-col w-full  gap-4">

                        {fields.map((field) => (
                            <label className="form-control w-full" key={field.name}>
                                <div className="label">
                                    <span className="label-text">{field.label}</span>
                                </div>
                                <input 
                                    name={field.name} 
                                    type={field.type? field.type : "text"}
                                    placeholder="Type here" 
                                    className="input input-bordered input-primary" 
                                    value={formValues[field.name] || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                        ))}

                        <div className="divider"></div>
                        <footer className="flex justify-between">

                            <button className="btn btn-error" onClick={closeModal}>Cancelar</button>
                            <button className="btn btn-primary" onClick={handleAddClick}>Añadir</button>
                        </footer>
                    </main>
                </div>
                <div className="modal-background absolute w-full h-full bg-black opacity-60"></div>
            </dialog>
        </>
    )
}