import { useState, useEffect } from "react";
import { getPersons } from "@/api/person";
import { PersonsTable } from "./PersonTable";
import { Person } from "@/types/api";
import { AsideSection } from "./AsideSection";
import { PersonHeader } from "./PersonHeader";

export function PersonDasboard() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [filter, setFilter] = useState<string|null>(null);
    useEffect(() => {
        refreshPersons();
    }, []);
    const refreshPersons = () => {
        getPersons()
            .then((response) => {
                setPersons(response.persons);
            })
            .catch((error) => console.error(error));
    };

    const filteredPersons = filter !== null && filter.length > 0 
        ? persons.filter((person:Person) => {
            console.log(person.name);
            return person.name.toLowerCase().includes(filter.toLowerCase());
        })
        : persons;
    return (
        <AsideSection>
            <PersonHeader
                setFilter={setFilter}
                refreshPersons={refreshPersons}
            />
            <PersonsTable persons={filteredPersons} setPersons={setPersons} />
        </AsideSection>
    );
}
