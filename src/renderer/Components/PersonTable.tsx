import { Person } from "@/types/api";
import { DeleteModal } from "./DeleteModal";
import { deletePerson } from "@/api/person";

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
            <tr key={person.id} className="">
              <th></th>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td><DeleteModal deleteFunction={()=>{
                deletePerson(person);
              }}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
