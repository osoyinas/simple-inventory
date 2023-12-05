import { useEffect, useState } from "react";
import { SORT_BY, TableField } from "@/types/types";
import { Material } from "@/types/models";
import { AsideSection } from "../layout/AsideSection";
import { getMaterials } from "@/api/material";
import { addMaterial } from "@/api/material";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { deleteMaterial } from "@/api/material";
import { GenericTable } from "../table/GenericTable";

export function MaterialDashboard() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const {filteredItems : filteredMaterials, setFilter} = useFilter<Material>({items: materials, key: "name"});
    const {sortedItems: sortedMaterials, setSort} = useSort(filteredMaterials);
    
    useEffect(() => {
        getMaterials().then((response) => {
            setMaterials(response.data as Material[]);
        });
    }, []);

    const refreshMaterials = () => {
        getMaterials()
            .then((response) => {
                setMaterials(response.data as Material[]);
            })
            .catch((error) => console.error(error));
    };

    const handleAdd = (item: Material) => {
        addMaterial(item).catch((error) => console.error(error));
        refreshMaterials();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            deleteMaterial(id)
                .then(() => {
                    setMaterials(prevMaterials => prevMaterials.filter((material) => material.id !== id));
                })
                .catch((error) => {
                    console.error(error);
                });
        });
        refreshMaterials();
    }

    const headers = [
        {name: "ID"},
        {name: "Nombre"},
        {name: "Cantidad total"},
        {name: "Cantidad disponible"},
    ]
    const fields: TableField<Material>[] = [
        {key: "id"}, 
        {key: "name"},
        {key: "available_amount",
            logic: (item: Material) => {
                return (<span>{item.absolute_amount} <span className="opacity-90 text-lg">{item.units}</span></span>)
            }
        },
        {key: "absolute_amount",
            logic: (item: Material) => {
                return (<span>{item.absolute_amount} <span className="opacity-90 text-lg">{item.units}</span></span>)
            }}
    ];

    const formFields = [
        {label:"Nombre", name:"name", type:"text"},
        {label:"Cantidad total", name:"absolute_amount", type:"number"},
        {label: "Unidades de medida", name:"units", type:"text"}
    ]
    return (
        <AsideSection>

            <GenericTable 
                title="Materiales"
                headers={headers}
                fields={fields}
                items={sortedMaterials}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleSort={(value:SORT_BY)=>{setSort(value as SORT_BY)}}
                handleFilter={(value:string)=> {setFilter(value)}}
                formFields={formFields}
            />
        </AsideSection>
    );
}
