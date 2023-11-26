import { Person } from "@/types/api";

export function PersonTable({ persons }: { persons: Person[] }) {
  return (
    <div className="overflow-x-auto relative">
      <table className="table min-w-max max-w-xl w-1/2">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <th></th>
              <td>{person.id}</td>
              <td>{person.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
