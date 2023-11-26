import { NavLink } from "react-router-dom";
export function NavBar({className}: {className?: string}) {
  return (
    <nav className={`${className}`}>
      <h1>Inventario</h1>
      <ul className="menu  w-52 h-full ">
        <li>
          <NavLink to="/persons">Personas</NavLink>
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    </nav>
  );
}
