import { Person } from "@/types/api";

export function PersonsTable({ persons }: { persons: Person[] }) {
  return (
    <table className="table bg-white h-[300px] max-w-6xl min-w-max">
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
        {persons.map((person) => (
          <tr key={person.id}>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>{person.id}</td>
            <td>{person.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
