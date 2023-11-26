
import { useState, useEffect } from "react";
import { getPersons } from "@/api/person";
import { PersonTable } from "./PersonTable";
import { Person } from "@/types/api";

export function PersonDasboard() {
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
      getPersons().then((persons) => setPersons(persons.persons));
      console.log(persons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <>
        <PersonTable persons={persons}/>

      </>
    );
  }