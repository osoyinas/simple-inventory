import { useState, useEffect } from "react";
import { deletePerson, getPersons } from "@/api/person";
import { PersonsTable } from "./PersonTable";
import { Person, SORT_BY } from "@/types/api";
import { AsideSection } from "../AsideSection";
import { PersonHeader } from "./PersonHeader";

export function PersonDasboard() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [filter, setFilter] = useState<string|null>(null);
    const [sort, setSort] = useState<SORT_BY>(SORT_BY.none);
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

    const filteredPersons = filter !== null && filter.length > 0 
        ? persons.filter((person:Person) => {
            return person.name.toLowerCase().includes(filter.toLowerCase());
        })
        : persons;

    const compareFunction = (a:Person, b:Person) => {
        if (sort === SORT_BY.name) {
            return a.name.localeCompare(b.name);
        }
        else if (sort === SORT_BY.id) {
            return a.id - b.id;
        }
        return 0;
    }    
    const sortedPersons = sort === SORT_BY.none 
        ? filteredPersons
        : filteredPersons.sort(compareFunction)
        
    return (
        <AsideSection>
            <PersonHeader
                setFilter={setFilter}
                refreshPersons={refreshPersons}
            />
            <PersonsTable persons={sortedPersons} handleDelete={handleDelete} setSort={setSort}/>
        </AsideSection>
    );
}
