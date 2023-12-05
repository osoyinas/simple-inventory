import { getMovements } from "@/api/movements";
import { Movement } from "@/types/models";
import { useState, useEffect } from "react";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { LayoutContainer } from "../layout/LayoutContainer";
import {GenericTable} from "@/renderer/Components/table/GenericTable";

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
    // ["id", "date", "units", "type"]
    const fields: {key:(keyof Movement), className?:string}[] = [
        {key: "id"},
        {key: "date"},
        {key: "units"},
        {key: "type"}
    ];

    const formFields = [
        {label:"Nombre", name:"name", type:"text"},
    ]
    return (
        <LayoutContainer>
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
        </LayoutContainer>
    );
}
