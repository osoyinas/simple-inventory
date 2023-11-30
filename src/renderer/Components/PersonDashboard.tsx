import { useState, useEffect } from "react";
import { getPersons, addPerson } from "@/api/person";
import { PersonsTable } from "./PersonTable";
import { Person } from "@/types/api";
import { AsideSection } from "./AsideSection";

export function PersonDasboard() {
  {
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
      getPersons().then((response) => setPersons(response.persons));
    }, []);

    return (
      <AsideSection>
        <PersonsTable
          persons={persons}
        />
      </AsideSection>
    );
  }
}
