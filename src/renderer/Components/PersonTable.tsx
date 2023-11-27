import { Person } from "@/types/api";

export function PersonTable({ persons }: { persons: Person[] }) {
  return (
    <div className="overflow-x-auto w-3/5 min-w-max max-w-[800px] relative rounded-2xl flex flex-col items-center h-auto  max-h-[600px] p-4">
      <table className="table bg-white">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id} className="hover:bg-base-200 cursor-pointer">
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
