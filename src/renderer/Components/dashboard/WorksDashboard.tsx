import { useState, useEffect } from "react";
import { FormField, TableField } from "@/types/types";
import { Work, STATUS } from "@/types/models";
import { LayoutContainer } from "../layout/LayoutContainer";
import { useFilter } from "@/renderer/hooks/useFilter";
import { useSort } from "@/renderer/hooks/useSort";
import { deleteWork, getWorks, updateWork } from "@/api/work";
import { addWork } from "@/api/work";
import {GenericTable} from "@/renderer/Components/table/GenericTable";

export function WorkDashboard() {
    const HEADERS = [
        {name:"ID"},
        {name:"Nombre"},
        {name:"Fecha de inicio"},
        {name:"Estado"},
        {name:"Descripción"}
    ]
    const FIELDS: TableField<Work>[] = [
        {key: "id"},
        {key: "name"},
        {key: "start_date", logic: (item: Work) => {
            const date = new Date(item.start_date);
            return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        }},
        {key: "status", logic: (item: Work) => item.status === STATUS.pending 
            ? <button className="btn btn-alert rounded-full" onClick={()=> {
                item.status = STATUS.done
                handleUpdate(item)
                refreshWorks()
            }}>Pendiente</button>
            : <button className="btn btn-success rounded-full" onClick={()=> {
                item.status = STATUS.pending
                handleUpdate(item)
                refreshWorks()
            }}>Finalizada</button>
        },
        {key: "description"},
    ]; 

    const FORM_FIELDS: FormField<Work>[] = [
        {label:"Nombre", key:"name", type:"text"},
        {label:"Fecha de inicio", key:"start_date", type:"date"},
        {label:"Descripción (opcional)", key:"description", type:"textarea"},
    ]

    const [works, setWorks] = useState<Work[]>([]);
    const {filteredItems , setFilter} = useFilter<Work>({items: works, key: "name"});
    const {sortedItems, setSort, changeSortDirection, sortDirection, getCurrentSort} = useSort(filteredItems, HEADERS, FIELDS);

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
    
    const handleUpdate = (item: Work) => {
        updateWork(item).catch((error) => console.error(error));
        refreshWorks();
    }

    
    return (
        <LayoutContainer>
            <GenericTable
                title="Obras"
                headers={HEADERS}
                fields={FIELDS}
                items={sortedItems}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                sortDirection={sortDirection}
                changeSortDirection={changeSortDirection}
                handleSort={setSort}
                handleFilter={setFilter}
                formFields={FORM_FIELDS}
                getCurrentSort={getCurrentSort}
            />
        </LayoutContainer>
    );
}
