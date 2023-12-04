import { useState, useEffect } from "react";
import {  SORT_BY, Work } from "@/types/types";
import { AsideSection } from "../AsideSection";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { deleteWork, getWorks } from "@/api/work";
import { addWork } from "@/api/work";
import { WorksTable } from "./WorksTable";

export function WorkDashboard() {
    const [works, setWorks] = useState<Work[]>([]);
    const {filteredItems , setFilter} = useFilter(works);
    const {sortedItems, setSort} = useSort(filteredItems);

    useEffect(() => {
        refreshWorks();
    }, []);
    
    const refreshWorks = () => {
        getWorks()
            .then((response) => {
                console.log(response);
                setWorks(response.data as Work[]);
            })
            .catch((error) => console.error(error));
    };


    const handleAdd = (item: Work) => {
        addWork(item).catch((error) => console.error(error));
        refreshWorks();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            deleteWork(id).catch((error) => console.error(error));
        });
        refreshWorks();

    }

        
    console.log(works);
    return (
        <AsideSection>
            <WorksTable 
                headers={
                    [
                        {name: "ID"},
                        {name: "Nombre"},
                        {name: "Fecha de inicio"},
                        {name: "Estado"},
                        {name: "Descripción"}
                    ]} 
                items={sortedItems as Work[]} 
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleSort={(value:SORT_BY)=>{setSort(value as SORT_BY)}}
                handleFilter={(value:string)=> {setFilter(value)}}/>
        </AsideSection>
    );
}
