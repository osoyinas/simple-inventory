/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { useModal } from "@/renderer/hooks/useModal";
import { FormField } from "@/types/types";

interface Props<T> {
    addItem: (item: T) => void;
    fields: FormField[];
    children?: ReactNode;
}


export function AddButton<T> ({addItem, fields, children}: Props<T>) {
    const {isOpen, closeModal, openModal} = useModal();
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    useEffect(() => {
        fields.forEach((field) => {
            setFormValues({
                [field.name]: field.value? field.value : '',
            });
        });
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    const handleAddClick = () => {
        addItem(formValues as T);
        setFormValues({});
        closeModal();
    }
    return (
        <>
            <button onClick={openModal} className="btn btn-primary text-primary-content">{children}</button>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box z-50">
                    <h3 className="font-bold text-xl">{children}</h3>
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