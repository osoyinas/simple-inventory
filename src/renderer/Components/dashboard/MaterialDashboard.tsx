import { useEffect, useState } from "react";
import { FormField, TableField, UNIT } from "@/types/types";
import { Material } from "@/types/models";
import { LayoutContainer } from "../layout/LayoutContainer";
import { getMaterials, addMaterial, updateMaterial } from "@/api/material";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { deleteMaterial } from "@/api/material";
import { GenericTable } from "../table/GenericTable";

export function MaterialDashboard() {
    const [materials, setMaterials] = useState<Material[]>([])
    const {filteredItems : filteredMaterials, setFilter} = useFilter<Material>({items: materials, key: "name"})
    const {sortedItems: sortedMaterials, setSort, changeSortDirection, sortDirection} = useSort<Material>(filteredMaterials)

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
    }

    const handleUpdate = (item: Material) => {
        updateMaterial(item).catch((error) => console.error(error));
        refreshMaterials();
    }
    const headers = [
        {name: "Nombre"},
        {name: "Cantidad total"},
        {name: "Cantidad disponible"},
        {name: "Descripción"}
    ]
    const fields: TableField<Material>[] = [
        {key: "name"},
        {key: "absolute_amount",
            logic: (item: Material) => {
                return (<span>{item.absolute_amount} <span className="opacity-90 text-lg">{item.units}</span></span>)
            }},
        {key: "available_amount",
            logic: (item: Material) => {
                return (<span>{item.available_amount} <span className="opacity-90 text-lg">{item.units}</span></span>)
            }
        },
        {key: "description"}
    ];

    const formFields: FormField<Material>[] = [
        {label:"Nombre", key:"name", type:"text"},
        {label:"Cantidad total", key:"absolute_amount", type:"number"},
        {label:"Cantidad disponible", key:"available_amount", type:"number"},
        {label: "Medida", key:"units", type:"select", options: Object.values(UNIT).map((unit) => ({value: unit, name: unit}))},
        {label:"Descripción (opcional)", key:"description", type:"textarea"}
    ]
    return (
        <LayoutContainer>
            <GenericTable 
                title="Materiales"
                headers={headers}
                fields={fields}
                items={sortedMaterials}
                changeSortDirection={changeSortDirection}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                sortDirection={sortDirection}
                handleSort={(value:keyof Material| null)=>{setSort(value)}}
                handleFilter={(value:string)=> {setFilter(value)}}
                formFields={formFields}
            />
        </LayoutContainer>
    );
}
