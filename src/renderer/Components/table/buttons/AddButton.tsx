/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useState, useEffect } from "react";
import { useModal } from "@/renderer/hooks/useModal";
import { FormField } from "@/types/types";

interface Props<T> {
  handleAdd: (item: T) => void;
  fields: FormField<T>[];
  children?: ReactNode;
}

export function AddButton<T>({ handleAdd, fields, children }: Props<T>) {
    const [formData, setFormData] = useState<Partial<T>>({});
    const { isOpen, closeModal, openModal } = useModal();

    const handleChange = (key: keyof T, value: unknown) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };
    const handleAddClick = () => {
        setFormData({});
        handleAdd(formData as T);
        closeModal();
    };

    useEffect(() => {
        fields.forEach((field) => {
            if (field.type === "select" && field.options && field.options.length > 0) {
                setFormData((prevData) => ({ ...prevData, [field.key]: field.options?.[0].value } as Partial<T>));
            }
            else if (field.type === "date") {
                setFormData((prevData) => ({ ...prevData, [field.key]: new Date().toISOString().split('T')[0] } as Partial<T>));
            }
        });
    }, [fields]);

    return (
        <>
            <button
                onClick={openModal}
                className="btn btn-primary"
            >
                {children}
            </button>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box z-50">
                    <h3 className="font-bold text-xl">{children}</h3>
                    <div className="divider"></div>
                    <main className="flex flex-col w-full  gap-4">
                        {fields.map((field) => {
                            const inputName = field.key.toString();
                            const value = formData[field.key] as string ??"";
                            return (
                                <label className="form-control w-full" key={field.key as string}>
                                    <div className="label">
                                        <span className="label-text">{field.label}</span>
                                    </div>
                                    {field.type === 'select' ? (
                                        <select
                                            name={field.key.toString()}
                                            className="input input-bordered input-primary"
                                            value={formData[field.key] as string}
                                            onChange={(e) => handleChange(field.key, e.target.value)}
                                        >
                                            {
                                                field.options && field.options.length > 0 
                                                    ? field.options.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.name}
                                                        </option>
                                                    ))
                                                    : <option value={0}>No hay personas</option>
                                            }
                                        </select>
                                    ) : (
                                        <input
                                            name={inputName}
                                            type={field.type ? field.type : "text"}
                                            placeholder="Type here"
                                            className="input input-bordered input-primary"
                                            value={value}
                                            onChange={(e) => handleChange(field.key, e.target.value)}
                                        />
                                    )}
                                </label>)
                        })}

                        <div className="divider"></div>
                        <footer className="flex justify-between">
                            <button className="btn btn-error" onClick={()=> {
                                closeModal()
                                setFormData({})
                            }}>
                Cancelar
                            </button>
                            <button className="btn btn-primary" onClick={handleAddClick}>
                Añadir
                            </button>
                        </footer>
                    </main>
                </div>
                <div className="modal-background absolute w-full h-full bg-black opacity-60"></div>
            </dialog>
        </>
    );
}