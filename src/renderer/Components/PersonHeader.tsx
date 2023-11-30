import { Person } from "@/types/api";
import { Dispatch, SetStateAction } from "react";
import { PersonForm } from "./PersonForm";
import { PersonSearch } from "./PersonSearch";

export function PersonHeader({
    persons,
    setFilteredPersons,
    refreshPersons,
}: {
  persons: Person[];
  setFilteredPersons: Dispatch<SetStateAction<Person[]>>;
  refreshPersons: () => void;
}) {
    const handleSearchChange = (search: string) => {
        const filteredPersons = persons.filter((person) =>
            person.name.toLocaleLowerCase().includes(search as string)
        );
        setFilteredPersons(filteredPersons);
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
