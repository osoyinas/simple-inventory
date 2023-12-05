import { useState, useEffect } from "react";
import { Movement } from "@/types/types";
import { AsideSection } from "../layout/AsideSection";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import {GenericTable} from "@/renderer/Components/table/GenericTable";
import { getMovements } from "@/api/movements";

export function MovementDasboard() {
    const [moves, setMoves] = useState<Movement[]>([]);
    const {filteredItems , setFilter} = useFilter<Movement>({items: moves, key: "id"});
    const {sortedItems: sortedPersons, setSort} = useSort(filteredItems);

    useEffect(() => {
        refreshMoves();
    }, []);
    
    const refreshMoves = () => {
        getMovements()
            .then((response) => {
                setMoves(response.data as Movement[]);
            })
            .catch((error) => console.error(error));
    };


    const handleAdd = (item: Movement) => {
        item
        refreshMoves();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            id
            //TODO: deleteMovement(id)
        });
    };

    const headers = [
        {name:"ID"},
        {name:"Fecha"},
        {name:"Cantidad"},
        {name:"Tipo"},
    ]    

    const formFields = [
        {label:"Nombre", name:"name", type:"text"},
    ]
    const fields: (keyof Movement)[] = ["id", "date", "units", "type"];
    return (
        <AsideSection>
            <GenericTable
                title="Movimientos"
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
