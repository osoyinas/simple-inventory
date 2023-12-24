import { addMovement, getMovements } from "@/api/movements";
import { MOVEMENT_TYPE, Movement } from "@/types/models";
import { useState, useEffect } from "react";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { LayoutContainer } from "../layout/LayoutContainer";
import {GenericTable} from "@/renderer/Components/table/GenericTable";
import { FormField, TableField } from "@/types/types";
import { usePersonOptions } from "@/renderer/hooks/usePersonOptions";
import { useMaterialOptions } from "@/renderer/hooks/useMaterialOptions";
import { UseWorkOptions } from "@/renderer/hooks/useWorkOptions";

export function MovementDasboard() {
    const [moves, setMoves] = useState<Movement[]>([]);
    const {filteredItems , setFilter} = useFilter<Movement>({items: moves, key: "id"});
    const {sortedItems: sortedPersons, setSort} = useSort(filteredItems);

    const {personsAsOptions} = usePersonOptions();
    const {materialsAsOptions} = useMaterialOptions();
    const {worksAsOptions} = UseWorkOptions();

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


    const handleAdd = async (item: Movement) => {
        await addMovement(item).catch((error) => console.error(error));
        refreshMoves();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            id
            //TODO: deleteMovement(id)
        });
    };

    const handleUpdate = (item: Movement) => {
        console.log(item);
    }


    const headers = [
        {name:"ID"},
        {name:"Persona que lo realizó"},
        {name:"Obra relacionada"},
        {name:"Material"},
        {name:"Cantidad"},
        {name:"Fecha"},
        {name:"Tipo"},
    ]    

    const fields: TableField<Movement>[]= [
        {key: "id"},
        {key: "person_name"},
        {key: "work_name"},
        {key: "material_name"},
        {key: "amount"},
        {key: "date", logic: (item: Movement) => {
            const date = new Date(item.date);
            return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });}
        },
        {key: "type"}
    ];

    const formFields: FormField<Movement>[]= [
        {label:"Material", key:"material_id", type:"select", options: materialsAsOptions},
        {label:"Obra", key:"work_id", type:"select", options: worksAsOptions},
        {label:"Persona", key:"person_id", type:"select", options: personsAsOptions},
        {label:"Cantidad", key:"amount", type:"number"},
        {label:"Fecha", key:"date", type:"date"},
        {label:"Tipo", key:"type", type:"select", options: [{value: MOVEMENT_TYPE.in, name: "Entrada"}, {value: MOVEMENT_TYPE.out, name: "Salida"}]},
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
                handleUpdate={handleUpdate}
                handleSort={setSort}
                handleFilter={setFilter}
                formFields={formFields}
            />
        </LayoutContainer>
    );
}
