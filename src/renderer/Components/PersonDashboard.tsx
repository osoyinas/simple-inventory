import { useState, useEffect } from "react";
import { deletePerson, getPersons } from "@/api/person";
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

    useEffect(() => {

    }, [filter]);
    const refreshPersons = () => {
        getPersons()
            .then((response) => {
                setPersons(response.persons);
            })
            .catch((error) => console.error(error));
    };

    const filteredPersons = filter !== null && filter.length > 0 
        ? persons.filter((person:Person) => {
            return person.name.toLowerCase().includes(filter.toLowerCase());
        })
        : persons;

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            deletePerson(id)
                .then(() => {
                    console.log("eliminado", id);
                    setPersons(prevPersons => prevPersons.filter((person) => person.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    return (
        <AsideSection>
            <PersonHeader
                setFilter={setFilter}
                refreshPersons={refreshPersons}
            />
            <PersonsTable persons={filteredPersons} handleDelete={handleDelete} />
        </AsideSection>
    );
}
