import { useState, useEffect } from "react";
import { deletePerson, getPersons } from "@/api/person";
import {PersonTable} from "@/renderer/Components/persons/PersonsTable"
import { Person, SORT_BY } from "@/types/types";
import { AsideSection } from "../AsideSection";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { addPerson } from "@/api/person";


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
                console.log(response);
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
            <PersonTable 
                headers={
                    [
                        {name: "ID"},
                        {name: "Nombre"}
                    ]} 
                items={sortedPersons} 
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleSort={(value:SORT_BY)=>{setSort(value as SORT_BY)}}
                handleFilter={(value:string)=> {setFilter(value)}}/>
        </AsideSection>
    );
}
