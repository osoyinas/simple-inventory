import { PersonForm } from "./MaterialForm";
import { PersonSearch } from "./MaterialSearch";

interface Props {
    setFilter: (value:string) => void;
    refreshPersons: () => void;
  }

export function MaterialHeader({
    setFilter,
    refreshPersons,
}:Props ) {
    const handleSearchChange = (search: string) => {
        setFilter(search);
    };
    return (
        <header className="flex w-full justify-between items-end gap-2 flex-wrap">
            <h1 className="text-4xl font-bold text-left">Personas</h1>
            <aside className="flex gap-8">
                <PersonForm refreshPersons={refreshPersons} />
                <PersonSearch handleSearchChange={handleSearchChange} />
            </aside>
        </header>
    );
}
