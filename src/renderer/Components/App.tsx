import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/electron-vite.animate.svg";
import "./App.css";
import { getPersons, addPerson } from "@/api/person";
import { Person } from "@/types/api";

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState(""); // Inicializar el estado con una cadena vacía
  const [status, setStatus] = useState("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Actualizar el estado con el valor del input
  };
  useEffect(() => {
    getPersons().then((payload) => {
      console.log(payload);
      setPersons(payload.persons);
    });
  }, []);

  const handleAddPerson = () => {
    if (!name) {
      setStatus("El nombre no puede estar vacío");
      return;
    }
    const newPerson = { name };
    addPerson(newPerson).then((payload) => {
      setStatus(payload.message);
    });
  };
  return (
    <>
      <div>
        <a href="https://electron-vite.github.io" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              <h1>{person.name}</h1>
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        name="name"
        id=""
        placeholder="Juan juanito juan"
        onChange={handleNameChange}
      />
      <button onClick={handleAddPerson}>Añadir usuario</button>{" "}
      {/* Botón para añadir un nuevo usuario */}
      <button
        onClick={() => {
          getPersons().then((payload) => {
            console.log(payload);
            setPersons(payload.persons);
            setStatus("");
          });
        }}
      >
        Recargar
      </button>
      {status && <p>{status}</p>} {/* Si hay un error, mostrarlo */}
    </>
  );
}

export default App;
