import { useState, useEffect } from "react";
import { deletePerson, getPersons } from "@/api/person";
import {Table} from "@/renderer/Components/Table"
import { Person, SORT_BY } from "@/types/types";
import { AsideSection } from "../AsideSection";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import {TableHeader} from "@/renderer/Components/TableHeader";

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
            <TableHeader
                name="Personas"
                setFilter={setFilter}
            />
            <Table 
                headers={
                    [
                        {name: "ID", sortBy: SORT_BY.id},
                        {name: "Nombre", sortBy: SORT_BY.name}
                    ]} 
                items={sortedPersons} 
                handleDelete={handleDelete}
                setSort={setSort}/>
        </AsideSection>
    );
}
