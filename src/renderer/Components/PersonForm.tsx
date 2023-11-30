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
      className="bg-base-100 p-4 rounded-2xl flex items-end gap-4"
      onSubmit={handleSubmit}
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Añadir persona</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nombre de la persona"
          className="input input-bordered w-full max-w-xs"
          name="personName"
        />
      </label>
      <button className="btn btn-primary text-base-100">Añadir</button>
    </form>
  );
}
