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
    addPerson({name}).then((response) => {
        setStatus(response.message);
        getPersons().then((persons) => setPersons(persons.persons));
    });
};
  return (
    <AsideSection>
      <h1 className="text-6xl font-semibold">Personas</h1>
      <PersonTable persons={persons}/>
      <form onSubmit={handleAddPerson}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 rounded-md p-2"
          placeholder="Nombre de la persona"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2">
          Añadir
        </button>
      </form>
      {status && (<p>{status}</p>)}
    </AsideSection>

    
    
  );
}
