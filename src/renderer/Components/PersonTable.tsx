import { Person } from "@/types/api";

export function PersonTable({ persons }: { persons: Person[] }) {
  return (
    <div className="overflow-x-auto relative rounded-2xl flex flex-col items-center p-4">
      <table className="table min-w-max max-w-xl bg-secondary-content">
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
              <td><button className="btn btn-error"> Eliminar</button></td>
              <td><button className="btn btn-accent"> Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
