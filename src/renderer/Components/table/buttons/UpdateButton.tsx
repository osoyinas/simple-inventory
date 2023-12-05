/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { useModal } from "@/renderer/hooks/useModal";
import { Field, Response } from "@/types/types";

interface Props<T> {
    getItem: (id: number) => Promise<Response<T>>;
    selectedItem: number;
    updateItem: (item: T) => void;
    fields: Field[];
    children?: ReactNode;
}

//TODO
export function UpdateButton<T> ({getItem, selectedItem, updateItem, fields, children}: Props<T>) {
    const [toUpdateItem, settoUpdateItem] = useState<T | undefined>();
    const {isOpen, closeModal, openModal} = useModal();
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    useEffect(() => {
        getItem(selectedItem).then((response) => {
            settoUpdateItem(response.data as T);
        });
    }, [selectedItem])

    useEffect(() => {
        if (toUpdateItem) {
            fields.forEach((field) => {
                if (typeof toUpdateItem === 'object' && field.name in toUpdateItem) {
                    setFormValues((prevValues) => ({
                        ...(prevValues as Record<string, string>),
                        [field.name]: field.value ? field.value : '',
                    }));
                      
                }
            });
        }
    }, [toUpdateItem]);
      
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    const handleAddClick = () => {
        updateItem(formValues as T);
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
                            <button className="btn btn-primary" onClick={handleAddClick}>Modificar</button>
                        </footer>
                    </main>
                </div>
                <div className="modal-background absolute w-full h-full bg-black opacity-60"></div>
            </dialog>
        </>
    )
}