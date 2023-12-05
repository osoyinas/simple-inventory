import { useState, useEffect } from "react";
import { deletePerson, getPersons } from "@/api/person";
import { Person } from "@/types/types";
import { AsideSection } from "../AsideSection";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { addPerson } from "@/api/person";
import {GenericTable} from "@/renderer/Components/table/GenericTable";

export function PersonDasboard() {
    const [persons, setPersons] = useState<Person[]>([]);
    const {filteredItems : filteredPersons, setFilter} = useFilter(persons);
    const {sortedItems: sortedPersons, setSort} = useSort(filteredPersons);

    useEffect(() => {
        refreshPersons();
    }, []);
    
    const refreshPersons = () => {
        getPersons()
            .then((response) => {
                setPersons(response.data as Person[]);
            })
            .catch((error) => console.error(error));
    };


    const handleAdd = (item: Person) => {
        addPerson(item).catch((error) => console.error(error));
        refreshPersons();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            deletePerson(id)
                .then(() => {
                    setPersons(prevPersons => prevPersons.filter((person) => person.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    const headers = [
        {name:"ID"},
        {name:"Nombre"},
    ]    

    const formFields = [
        {label:"Nombre", name:"name", type:"text"},
    ]
    const fields: (keyof Person)[] = ["id", "name"];
    return (
        <AsideSection>
            <GenericTable
                title="Personas"
                headers={headers}
                fields={fields}
                items={sortedPersons}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleSort={setSort}
                handleFilter={setFilter}
                formFields={formFields}
            />
        </AsideSection>
    );
}
