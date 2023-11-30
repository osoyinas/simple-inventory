import { useState, useEffect } from "react";
import { getPersons } from "@/api/person";
import { PersonsTable } from "./PersonTable";
import { Person } from "@/types/api";
import { AsideSection } from "./AsideSection";
import { PersonHeader } from "./PersonHeader";

export function PersonDasboard() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);

    useEffect(() => {
        refreshPersons();
    }, []);
    useEffect(() => {
        setFilteredPersons(persons);
    }, [persons]);

    const refreshPersons = () => {
        getPersons()
            .then((response) => {
                setPersons(response.persons);
                setFilteredPersons(response.persons);
            })
            .catch((error) => console.error(error));
    };
    return (
        <AsideSection>
            <PersonHeader
                persons={persons}
                setFilteredPersons={setFilteredPersons}
                refreshPersons={refreshPersons}
            />
            <PersonsTable persons={filteredPersons} setPersons={setPersons} />
        </AsideSection>
    );
}
