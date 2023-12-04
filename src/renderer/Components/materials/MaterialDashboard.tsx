import { useEffect, useState } from "react";
import { Item, Material, SORT_BY } from "@/types/types";
import { AsideSection } from "../AsideSection";
import { getMaterials } from "@/api/material";
import { MaterialsTable } from "./MaterialsTable";
import { addMaterial } from "@/api/material";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { deleteMaterial } from "@/api/material";

export function MaterialDashboard() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const {filteredItems : filteredMaterials, setFilter} = useFilter(materials);
    const {sortedItems: sortedMaterials, setSort} = useSort(filteredMaterials);
    
    useEffect(() => {
        getMaterials().then((response) => {
            console.log(response);
            setMaterials(response.data as Material[]);
        });
    }, []);

    const refreshMaterials = () => {
        getMaterials()
            .then((response) => {
                console.log(response);
                setMaterials(response.data as Material[]);
            })
            .catch((error) => console.error(error));
    };

    const handleAdd = (item: Item) => {
        addMaterial(item as Material).catch((error) => console.error(error));
        refreshMaterials();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            deleteMaterial(id)
                .then(() => {
                    console.log("eliminado", id);
                    setMaterials(prevMaterials => prevMaterials.filter((material) => material.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        refreshMaterials();
    }

    return (
        <AsideSection>

            <MaterialsTable 
                handleAdd={handleAdd}
                headers={[
                    {name: "ID"},
                    {name: "Nombre"},
                    {name: "Cantidad total"},
                    {name: "Cantidad disponible"},
                ]}
                items={sortedMaterials as Material[]}
                handleDelete={handleDelete}
                handleSort={(value:SORT_BY)=>{setSort(value as SORT_BY)}}
                handleFilter={(value:string)=> {setFilter(value)}}
            />
        </AsideSection>
    );
}
