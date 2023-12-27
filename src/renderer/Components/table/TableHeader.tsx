import { header } from "@/types/types";
import { useMemo, useRef } from "react";
import { DownTriangle, UpTriangle } from "../icons/Triangles";

interface Props<T> {
    name: string;
    handleFilter: (value:string) => void;
    changeSortDirection: () => void;
    handleSort: (value: keyof T | null) => void;
    sortDirection : boolean;
    getCurrentSort: () => header;
  }

export function TableHeader<T>({name, handleFilter, changeSortDirection, sortDirection, getCurrentSort } : Props<T> ) {
    return (
        <header className="flex w-full justify-between items-end gap-2 flex-wrap">
            <h1 className="text-4xl font-bold text-left">{name}</h1>
            <aside className="flex gap-8 items-end">
                <SortInput changeSortDirection={changeSortDirection} sortDirection={sortDirection}  getCurrentSort={getCurrentSort}/>
                <SearchInput handleSearchChange={handleFilter} />
            </aside>
        </header>
    );
}


interface ItemSearchProps {
    handleSearchChange: (search: string) => void;
}

function SearchInput({ handleSearchChange }: ItemSearchProps) {
    const searchRef = useRef<HTMLInputElement>(null);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSearchChange(searchRef.current?.value as string);
            }}
            className="join flex items-end  rounded-2xl"
        >
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Buscar</span>
                </div>
                <input
                    ref={searchRef}
                    name="search"
                    className="input input-bordered join-item"
                    placeholder="Buscar"
                    onChange={() =>
                        handleSearchChange(searchRef.current?.value as string)
                    }
                />
            </label>

            <button className="btn join-item btn-primary">Buscar</button>
        </form>
    );
}
interface SortInputProps {
    sortDirection: boolean;
    changeSortDirection: () => void;
    getCurrentSort: () => header;
}

function SortInput({changeSortDirection, sortDirection,getCurrentSort}: SortInputProps) {
    const currentSort = useMemo(() => getCurrentSort(), [getCurrentSort]);
    return (
        <label className="form-control" >
            <div className="label">
                <span className="label-text">Ordenar por </span>
            </div>
            <button className="btn btn-accent flex justify-between" onClick={()=>{
                changeSortDirection()
            }}>
                {`${currentSort.name}`}{sortDirection ? <UpTriangle / > : <DownTriangle />}

            </button>
        </label>
    )
}