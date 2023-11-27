import { NavLink } from "react-router-dom";
export function NavBar({ alert }: { alert: string }) {
  return (
    <>
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
      {alert && (
        <div className="alert alert-success w-60 text-success-content font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{alert}</span>
        </div>
      )}
    </>
  );
}
