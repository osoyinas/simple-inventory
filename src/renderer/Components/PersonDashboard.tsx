import { useState, useEffect } from "react";
import { getPersons } from "@/api/person";
import { PersonsTable } from "./PersonTable";
import { Person } from "@/types/api";
import { AsideSection } from "./AsideSection";
import { PersonForm } from "./PersonForm";

export function PersonDasboard() {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    refreshPersons();
  }, []);

  const refreshPersons = () => {
    getPersons()
    .then((response) => setPersons(response.persons))
    .catch((error) => console.error(error));
    }
  return (
    <AsideSection>
      <PersonsTable persons={persons} />
      <PersonForm refreshPersons={refreshPersons} />
    </AsideSection>
  );
}
