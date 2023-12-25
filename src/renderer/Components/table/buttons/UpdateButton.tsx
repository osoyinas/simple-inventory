/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useState, ChangeEvent, useEffect } from "react";
import { useModal } from "@/renderer/hooks/useModal";
import { FormField } from "@/types/types";
import { Item } from "@/types/models";

interface Props<T extends Item> {
 disabled?: boolean;
  selectedItem: T | null;
  resetSelectedItems: () => void;
  handleUpdate: (item: T) => void;
  fields: FormField<T>[];
  children?: ReactNode;
}

export function UpdateButton<T extends Item>({
    disabled,
    selectedItem,
    resetSelectedItems,
    handleUpdate,
    fields,
    children,
}: Props<T>) {
    const { isOpen, closeModal, openModal } = useModal();
    const [formValues, setFormValues] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
    );

    useEffect(() => {
        if (selectedItem) {
            const values: Record<keyof T, string> = {} as Record<keyof T, string>;
            fields.forEach((field) => {
                values[field.key] = selectedItem[field.key] as string;
            });
            setFormValues(values);
        } else {
            setFormValues({} as Record<keyof T, string>);
        }
    }, [selectedItem]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name as keyof T]: e.target.value,
        });
    };

    const handleUpdateClick = () => {
        if (selectedItem) {            
            const updatedItem: T = { ...selectedItem, ...formValues };
            handleUpdate(updatedItem);
            setFormValues({} as Record<keyof T, string>);
            resetSelectedItems()
            closeModal();
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                className={`btn btn-primary text-primary-content ${
                    disabled ?  "btn-disabled" :""
                }`}
            >
                {children}
            </button>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box z-50">
                    <h3 className="font-bold text-xl">{children}</h3>
                    <div className="divider"></div>
                    <main className="flex flex-col w-full gap-4">
                        {fields.map((field) => (
                            <label className="form-control w-full" key={field.label}>
                                <div className="label">
                                    <span className="label-text">{field.label}</span>
                                </div>
                                <input
                                    name={field.key.toString()}
                                    type={field.type ? field.type : "text"}
                                    placeholder="Type here"
                                    className="input input-bordered input-primary"
                                    value={
                                        selectedItem
                                            ? formValues[field.key] ||
                        (selectedItem[field.key] as string)
                                            : ""
                                    }
                                    onChange={handleInputChange}
                                    readOnly={field.key === "id"} // Hacer el campo id readonly
                                />
                            </label>
                        ))}

                        <div className="divider"></div>
                        <footer className="flex justify-between">
                            <button className="btn btn-error" onClick={
                                closeModal  
                            }>
                Cancelar
                            </button>
                            <button className="btn btn-primary" onClick={handleUpdateClick}>
                Modificar
                            </button>
                        </footer>
                    </main>
                </div>
                <div className="modal-background absolute w-full h-full bg-black opacity-60"></div>
            </dialog>
        </>
    );
}
