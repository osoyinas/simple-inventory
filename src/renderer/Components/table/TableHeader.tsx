import { useRef } from "react";

interface Props<T> {
    name: string;
    handleFilter: (value:string) => void;
    handleSort: (value: keyof T | null) => void;
  }

export function TableHeader<T>({name, handleFilter, handleSort} : Props<T> ) {


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

            <button className="btn join-item btn-primary">Buscar</button>
        </form>
    );
}
interface SortInputProps<T> {
    handleSort: (sort: keyof T | null) => void;
}

function SortInput<T>({handleSort}: SortInputProps<T>) {
    return (
        <button className="btn btn-accent" onClick={()=>{
            handleSort(null);
        }}> Desordenar</button>
    )
}