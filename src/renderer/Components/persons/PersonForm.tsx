import { addPerson } from "@/api/person";
import { useRef } from "react";

export function PersonForm({ refreshPersons }: { refreshPersons: () => void }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const personName = formData.get("personName");
        addPerson({ name: personName as string }).then(() => {
            refreshPersons();
            if (inputRef.current)
                inputRef.current.value = "";
        });
    };

    return (
        <form
            className=" rounded-2xl flex items-end join"
            onSubmit={handleSubmit}
        >
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Añadir persona</span>
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Nombre de la persona"
                    className="input input-bordered join-item"
                    name="personName"
                />
            </label>
            <div className="indicator">

                <button className="btn btn-primary text-base-100 join-item">Añadir</button>
      
            </div>
        </form>
    );
}
