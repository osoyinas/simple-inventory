import { useState, useEffect } from "react";
import { getPersons, addPerson } from "@/api/person";
import { PersonTable } from "./PersonTable";
import { Person } from "@/types/api";
import { AsideSection } from "./AsideSection";
import { DeleteModal } from "./DeleteModal";
export function PersonDasboard({alertFunction}: {alertFunction: (alert: string) => void}) {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);

  useEffect(() => {
    getPersons().then((persons) => {
      setPersons(persons.persons);
      setFilteredPersons(persons.persons);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPerson = () => {
    if (name === "") return;
    addPerson({ name }).then((response) => {
      alertFunction(response.message);
      const person = response.data as Person;
      setPersons((prevPersons) => [...prevPersons, person]);
    }).catch((error) => {
      alertFunction(error.message);
    });
  };


  useEffect(() => {
    const newPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredPersons(newPersons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <AsideSection>
      <header className="bg-white flex p-4 rounded-2xl items-center w-2/5 min-w-max justify-around">
        <h1 className="text-2xl font-bold opacity-75">Personas</h1>
        <div className="join">
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="indicator">
            <button className="btn join-item bg-primary-content">Search</button>
          </div>
        </div>
      </header>

      <PersonTable persons={filteredPersons} />
      <DeleteModal />
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
          <button
            type="submit"
            className="btn bg-primary text-primary-content join-item"
          >
            Añadir
          </button>
        </div>
        <button
          type="submit"
          className="btn bg-accent text-accent-content join-item"
        >
          Modificar
        </button>
        <button
          type="submit"
          className="btn bg-error join-item text-error-content"
        >
          Eliminar
        </button>
      </form>
      {status && (
        <div role="alert" className="alert alert-success w-52">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Persona añadida!</span>
        </div>
      )}
    </AsideSection>
  );
}
