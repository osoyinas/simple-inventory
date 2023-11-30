import { Person } from "@/types/api";
import { useState } from "react";

export function PersonsTable({
  persons,
  page = 1,
}: {
  persons: Person[];
  page?: number;
}) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(page);

  const totalPages = Math.ceil(persons.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPersons = persons.slice(startIndex, endIndex);

  const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  console.log(selectedPersons);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const person = persons[Number(event.target.value)];
    console.log(event.target.checked);
    if (event.target.checked) {
      event.target.checked = true;

      setSelectedPersons([...selectedPersons, person]);
    } else {
      console.log("ENTRANDO EN ELSE");
      const newSelectedPersons = [...selectedPersons];
      setSelectedPersons(
        newSelectedPersons.filter(
          (selectedPerson) => selectedPerson.id !== person.id
        )
      );
      event.target.checked = false;
    }
  };
  return (
    <section className="w-full relative flex flex-col gap-8 items-end min-w-0">
      <table className="table bg-white min-w-0 overflow-x-scroll">
        <thead className="text-lg font-bold text-black opacity-70">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Materiales que ha obtenido</th>
            <th>Obras en las que trabaja</th>
          </tr>
        </thead>
        <tbody className="text-xl">
          {currentPersons.map((person) => {
            const personIndex = persons.indexOf(person);
            return (
              <tr key={person.id}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={handleCheckChange}
                      value={personIndex}
                      checked={selectedPersons.includes(persons[personIndex])}
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
        <p className="text-center">No hay personas registradas</p>
      )}
      <footer className="flex items-center justify-between w-full">
        <aside className="flex gap-8">
          <button
            className={`btn btn-error ${selectedPersons.length === 0 ? "btn-disabled" :""}`}
            onClick={() => {
              console.log("Eliminar");
            }}
          >
            Eliminar
          </button>
          <button className={`btn btn-info ${selectedPersons.length !== 1  ? "btn-disabled" :""}`}>Modificar</button>
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
