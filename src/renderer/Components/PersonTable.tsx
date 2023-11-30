import { Person } from "@/types/api";
import { useState } from "react";

export function PersonsTable({ persons }: { persons: Person[] }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(persons.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPersons = persons.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <table className="table bg-white h-auto max-w-6xl min-w-max">
        <thead className="text-lg font-bold text-black opacity-70">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Materiales que ha obtenido</th>
            <th>Obras en las que trabaja</th>
          </tr>
        </thead>
        <tbody className="text-xl">
          {currentPersons.map((person) => (
            <tr key={person.id}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>{person.id}</td>
              <td title={person.name} className="max-w-[60px] overflow-hidden overflow-ellipsis">
                {person.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {persons.length === 0 && (
        <p className="text-center">No hay personas registradas</p>
      )}

      {totalPages > 1 && (
        <div className="pagination join">
          {Array.from({ length: totalPages }, (_, index) => (
            <input
              key={index}
              type="radio"
              className="join-item btn btn-square"
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
    </>
  );
}
