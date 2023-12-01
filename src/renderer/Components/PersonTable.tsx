import { Person } from "@/types/api";
import { useState } from "react";

interface Props {
  persons: Person[];
  page?: number;
  handleDelete: (ids:number[]) => void;
}
const ITEMS_PER_PAGE = 10;

export function PersonsTable({persons, page = 1, handleDelete}: Props) {

    const [currentPage, setCurrentPage] = useState(page);
    const [selectedPersons, setSelectedPersons] = useState<number[]>([]);

    const totalPages = Math.ceil(persons.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentPersons = persons.slice(startIndex, endIndex);
    if (currentPersons.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const personId = Number(event.target.value);
        if (event.target.checked) {
            event.target.checked = true;
            setSelectedPersons([...selectedPersons, personId]);
        } else {
            setSelectedPersons(prevSelectedPersons =>
                prevSelectedPersons.filter((id) => id !== personId
                ))
            event.target.checked = false;
        }
    };

    
    return (
        <section className="w-full relative flex flex-col gap-8 items-end min-w-0">
            <table className="table bg-white min-w-0 overflow-x-scroll">
                <thead className="text-lg font-bold text-black opacity-70">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Materiales que ha obtenido</th>
                        <th>Obras en las que trabaja</th>
                    </tr>
                </thead>
                <tbody className="text-xl">
                    {currentPersons.map((person) => {
                        return (
                            <tr key={person.id}>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={handleCheckChange}
                                            value={person.id}
                                            checked={selectedPersons.includes(person.id)}
                                        />
                                    </label>
                                </td>
                                <td>{person.id}</td>
                                <td
                                    title={person.name}
                                    className="max-w-[60px] overflow-hidden overflow-ellipsis"
                                >
                                    {person.name}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {persons.length === 0 && (
                <p className="text-center w-full text-xl">No se han encontrado resultados</p>
            )}
            <footer className="flex items-center justify-between w-full">
                <aside className="flex gap-8">
                    <button
                        className={`btn btn-error ${
                            selectedPersons.length === 0 ? "btn-disabled" : ""
                        }`}
                        onClick={()=>{
                            handleDelete(selectedPersons);
                            setSelectedPersons([]);
                        }}
                    >
            Eliminar
                    </button>
                    <button
                        className={`btn btn-info ${
                            selectedPersons.length !== 1 ? "btn-disabled" : ""
                        }`}
                    >
            Modificar
                    </button>
                </aside>
                {totalPages > 1 && (
                    <div className="pagination join">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <input
                                key={index}
                                type="radio"
                                className="join-item btn btn-square btn-outline"
                                aria-label={`${index + 1}`}
                                checked={index + 1 == currentPage}
                                name="options"
                                onChange={() => {
                                    handlePageChange(index + 1);
                                }}
                            />
                        ))}
                    </div>
                )}
            </footer>
        </section>
    );
}
