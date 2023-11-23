import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/electron-vite.animate.svg";
import "./App.css";

type User = {id: number; name: string}

function App() {
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    window.ipcRenderer.send("getUsers");
    window.ipcRenderer.on("usersResponse", (_event, users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

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
          {users.map((user) => (
            <li key={user.id}><h1>{user.name}</h1></li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
