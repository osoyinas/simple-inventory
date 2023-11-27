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
      <header className="bg-white flex py-4 rounded-2xl items-center w-2/5 min-w-max justify-around">
        <h1 className="text-2xl font-bold opacity-75">Personas</h1>
        <div className="join">
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
            />
          </div>

          <div className="indicator">
            <button className="btn join-item bg-primary-content">Search</button>
          </div>
        </div>
      </header>

      <PersonTable persons={persons} />
      <form
        onSubmit={handleAddPerson}
        className="flex gap-8 rounded-2xl bg-white  p-4  w-2/5 min-w-max justify-around items-center"
      >
        <div className="join">
          <div className="form-control w-full max-w-xs join-item">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered  join-item"
              placeholder="Nombre de la persona"
            />
          </div>
          <button type="submit" className="btn bg-primary text-primary-content join-item">
            Añadir
          </button>
        </div>
        <button type="submit" className="btn bg-accent text-accent-content join-item">
          Modificar
        </button>
        <button type="submit" className="btn bg-error join-item text-error-content">
          Eliminar
        </button>
      </form>
      {status && <p>{status}</p>}
    </AsideSection>
  );
}
