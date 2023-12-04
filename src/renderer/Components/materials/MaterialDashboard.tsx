import { useEffect, useState } from "react";
import { Material, SORT_BY } from "@/types/types";
import { AsideSection } from "../AsideSection";
import { getMaterials } from "@/api/material";
import { Table } from "../table/Table";
import { useFilter } from "@/renderer/hooks/useFilter";
import { TableHeader } from "@/renderer/Components/table/TableHeader";

export function MaterialDashboard() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const {filteredItems: filteredMaterials, setFilter} = useFilter(materials);
    const [sort, setSort] = useState<SORT_BY>(SORT_BY.none);
    
    useEffect(() => {
        getMaterials().then((response) => {
            setMaterials(response.data as Material[]);
        });
    }, []);

    const handleDelete = (ids:number[]) => {
        console.log("Delete");
        console.log(ids);
    }

    const sortedMaterials = sort === SORT_BY.none ? filteredMaterials : []
    return (
        <AsideSection>
            <TableHeader
                name="Materiales"
                setFilter={setFilter}
            />
            <Table
                headers={[
                    {name: "Nombre", sortBy: SORT_BY.name},
                    {name: "Cantidad disponible", sortBy: SORT_BY.available_quantity},
                    {name: "Cantidad total", sortBy: SORT_BY.total_quantity},
                    {name: "Unidades", sortBy: SORT_BY.units},
                ]} 
                items={sortedMaterials}
                handleDelete={handleDelete}
                setSort={setSort}
            />
        </AsideSection>
    );
}
