import { useRef } from "react";
import { SORT_BY } from "@/types/types";

interface Props {
    name: string;
    handleFilter: (value:string) => void;
    handleSort: (sort: SORT_BY) => void;
  }

export function TableHeader({name, handleFilter, handleSort} : Props ) {


    return (
        <header className="flex w-full justify-between items-end gap-2 flex-wrap">
            <h1 className="text-4xl font-bold text-left">{name}</h1>
            <aside className="flex gap-8 items-end">
                <SortInput handleSort={handleSort} />
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

            <button className="btn join-item btn-secondary">Buscar</button>
        </form>
    );
}
interface SortInputProps {
    handleSort: (sort: SORT_BY) => void;
}

function SortInput ({handleSort}: SortInputProps) {
    return (
        <button className="btn btn-info" onClick={()=>{
            handleSort(SORT_BY.name);
        }}>Ordenar por</button>
    )
}