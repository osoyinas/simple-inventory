import { useState, useEffect } from "react";
import { FormField, TableField } from "@/types/types";
import { Person } from "@/types/models";
import { addPerson , deletePerson, getPersons, updatePerson } from "@/api/person";
import { LayoutContainer } from "../layout/LayoutContainer";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import {GenericTable} from "@/renderer/Components/table/GenericTable";

export function PersonDasboard() {
    const [persons, setPersons] = useState<Person[]>([]);
    const {filteredItems : filteredPersons, setFilter} = useFilter({items: persons, key: "name"});
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

    const handleUpdate = (item: Person) => {
        updatePerson(item).catch((error) => console.error(error));
        refreshPersons();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            deletePerson(id)
                .then(() => {
                    setPersons(prevPersons => prevPersons.filter((person) => person.id !== id));
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    const headers = [
        {name:"ID"},
        {name:"Nombre"},
    ]

    const fields: TableField<Person>[]= [
        {key: "id"},
        {key: "name"},
    ];

    const formFields: FormField<Person>[] = [
        {label:"Nombre", key:"name", type:"text"},
    ]

    return (
        <LayoutContainer>
            <GenericTable
                title="Personas"
                headers={headers}
                fields={fields}
                items={sortedPersons}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                handleSort={setSort}
                handleFilter={setFilter}
                formFields={formFields}
            />
        </LayoutContainer>
    );
}
