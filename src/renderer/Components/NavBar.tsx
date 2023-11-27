import { NavLink } from "react-router-dom";
export function NavBar() {
  return (
    <nav className="navbar bg-base-100 px-40 items-center justify-between">
      <aside className="flex gap-6">
        <div>
          <NavLink to="/home" className="btn btn-ghost text-xl">
            Inventario
          </NavLink>
        </div>
        <div className="">
          <NavLink to="/persons" className="btn btn-ghost text-xl">
            Personas
          </NavLink>
        </div>
      </aside>
    </nav>
  );
}
