import { Person } from "@/types/api";

export function PersonTable({ persons }: { persons: Person[] }) {
  return (
    <div className="overflow-x-auto w-2/5 min-w-max relative rounded-2xl flex flex-col items-center">
      <table className="table  bg-white">
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
