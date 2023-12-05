import { useState, useEffect } from "react";
import { STATUS, Work } from "@/types/types";
import { AsideSection } from "./AsideSection";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { deleteWork, getWorks } from "@/api/work";
import { addWork } from "@/api/work";
import {GenericTable} from "@/renderer/Components/table/GenericTable";

export function WorkDashboard() {
    const [works, setWorks] = useState<Work[]>([]);
    const {filteredItems , setFilter} = useFilter<Work>({items: works, key: "name"});
    const {sortedItems, setSort} = useSort(filteredItems);

    useEffect(() => {
        refreshWorks();
    }, []);
    
    const refreshWorks = () => {
        getWorks()
            .then((response) => {
                setWorks(response.data as Work[]);
            })
            .catch((error) => console.error(error));
    };


    const handleAdd = (item: Work) => {
        item.status= STATUS.pending
        addWork(item).catch((error) => console.error(error));
        refreshWorks();
    }

    const handleDelete = (ids:number[]) => {
        ids.forEach((id) => {
            deleteWork(id).catch((error) => console.error(error));
        });
        refreshWorks();

    }
    
    const headers = [
        {name:"ID"},
        {name:"Nombre"},
        {name:"Fecha de inicio"},
        {name:"Estado"},
    ]
    const fields: (keyof Work)[] = ["id", "name", "startDate", "status"];

    const formFields = [
        {label:"Nombre", name:"name", type:"text"},
        {label:"Fecha de inicio", name:"startDate", type:"date"},
    ]
    return (
        <AsideSection>
            <GenericTable
                title="Obras"
                headers={headers}
                fields={fields}
                items={sortedItems}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleSort={setSort}
                handleFilter={setFilter}
                formFields={formFields}
            />
        </AsideSection>
    );
}
