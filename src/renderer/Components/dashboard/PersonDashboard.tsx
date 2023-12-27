import { useState, useEffect } from "react";
import { FormField, TableField } from "@/types/types";
import { Person } from "@/types/models";
import { addPerson , deletePerson, getPersons, updatePerson } from "@/api/person";
import { LayoutContainer } from "../layout/LayoutContainer";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import {GenericTable} from "@/renderer/Components/table/GenericTable";

export function PersonDasboard() {
    const HEADERS = [
        {name:"ID"},
        {name:"Nombre"},
    ]

    const FIELDS: TableField<Person>[]= [
        {key: "id"},
        {key: "name"},
    ];

    const FORM_FIELDS: FormField<Person>[] = [
        {label:"Nombre", key:"name", type:"text"},
    ]


    const [persons, setPersons] = useState<Person[]>([]);
    const {filteredItems : filteredPersons, setFilter} = useFilter({items: persons, key: "name"});
    const {sortedItems: sortedPersons, setSort, sortDirection, changeSortDirection, getCurrentSort} = useSort(filteredPersons, HEADERS, FIELDS);

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

    return (
        <LayoutContainer>
            <GenericTable
                title="Personas"
                headers={HEADERS}
                fields={FIELDS}
                items={sortedPersons}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                handleSort={setSort}
                sortDirection={sortDirection}
                changeSortDirection={changeSortDirection}
                handleFilter={setFilter}
                formFields={FORM_FIELDS}
                getCurrentSort={getCurrentSort}
            />
        </LayoutContainer>
    );
}
