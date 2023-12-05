import { ReactNode, useState } from "react";
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
        handleAdd(formData as T);
        closeModal();
    };

    return (
        <>
            <button
                onClick={openModal}
                className="btn btn-primary text-primary-content"
            >
                {children}
            </button>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box z-50">
                    <h3 className="font-bold text-xl">{children}</h3>
                    <div className="divider"></div>
                    <main className="flex flex-col w-full  gap-4">
                        {fields.map((field) => (
                            <label className="form-control w-full" key={field.key as string}>
                                <div className="label">
                                    <span className="label-text">{field.label}</span>
                                </div>
                                <input
                                    name={field.key.toString()}
                                    type={field.type ? field.type : "text"}
                                    placeholder="Type here"
                                    className="input input-bordered input-primary"
                                    value={(formData[field.key] as string) ?? ""}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                />
                            </label>
                        ))}

                        <div className="divider"></div>
                        <footer className="flex justify-between">
                            <button className="btn btn-error" onClick={closeModal}>
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
