/* eslint-disable react-hooks/rules-of-hooks */
import { NavLink, useMatch } from "react-router-dom";
export function NavBar({ alert }: { alert: string }) {
  const options = [
    { name: "Movimientos", path: "/moves" },
    { name: "Materiales", path: "/materials" },
    { name: "Obras", path: "/works" },
    { name: "Personas", path: "/persons" },
  ];
  return (
    <>
      <nav className="navbar bg-base-100 px-40 py-0 items-center justify-between relative h-[65px]">
        <ul className="flex justify-start gap-4 relative h-full">
          {options.map((option) => {
            const match = useMatch(option.path);
            return (
              <>
                <li
                  key={option.name}
                  className="relative h-full grid items-center"
                >
                  <NavLink
                    to={option.path}
                    className={`btn btn-ghost btn-sm rounded-btn font-bold text-2xl ${match ? "text-primary opacity-100" : "opacity-70"}`}
                  >
                    {option.name}
                  </NavLink>
                  {match && (
                    <div className="w-full h-[4px] bg-primary rounded-full absolute bottom-0"></div>
                  )}
                </li>
              </>
            );
          })}
        </ul>
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
