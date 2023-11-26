import { useState, useEffect } from "react";
import { getPersons, addPerson } from "@/api/person";
import { PersonTable } from "./PersonTable";
import { Person } from "@/types/api";
import { AsideSection } from "./AsideSection";
export function PersonDasboard() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    getPersons().then((persons) => setPersons(persons.persons));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPerson = () => {
    if (name === "") return;
    addPerson({ name }).then((response) => {
      setStatus(response.message);
      getPersons().then((persons) => setPersons(persons.persons));
    });
  };
  return (
    <AsideSection>
      <PersonTable persons={persons} />
      <form onSubmit={handleAddPerson} className="flex gap-8 items-end">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Insertar una persona</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Nombre de la persona"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Añadir
        </button>
      </form>
      {status && <p>{status}</p>}
    </AsideSection>
  );
}
