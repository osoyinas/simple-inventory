import { useRef } from "react";

interface Props {
    name: string;
    setFilter: (value:string) => void;
  }

export function TableHeader({name, setFilter} : Props ) {
    const handleSearchChange = (search: string) => {
        setFilter(search);
    };
    return (
        <header className="flex w-full justify-between items-end gap-2 flex-wrap">
            <h1 className="text-4xl font-bold text-left">{name}</h1>
            <aside className="flex gap-8">
                <ItemSearch handleSearchChange={handleSearchChange} />
            </aside>
        </header>
    );
}



function ItemSearch({
    handleSearchChange,
}: {
  handleSearchChange: (search: string) => void;
}) {
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
