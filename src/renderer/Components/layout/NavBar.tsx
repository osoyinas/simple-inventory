/* eslint-disable react-hooks/rules-of-hooks */
import { NavLink, useMatch } from "react-router-dom";
export function NavBar() {
    const options = [
        { name: "Movimientos", path: "/moves" },
        { name: "Materiales", path: "/materials" },
        { name: "Obras", path: "/works" },
        { name: "Personas", path: "/persons" },
    ];
    return (
        <nav className="navbar bg-base-100 px-40 py-0 items-center justify-between fixed h-[65px] w-full border z-50 border-b-slate-500 border-r-0">
            <ul className="flex justify-start gap-4 relative h-full">
                {options.map((option) => {
                    const match = useMatch(option.path);
                    return (
                        <li key={option.name} className="relative h-full grid items-center">
                            <NavLink
                                key={option.path}
                                to={option.path}
                                className={`btn btn-ghost btn-sm rounded-btn font-bold text-2xl ${
                                    match ? "text-primary opacity-100" : "opacity-70"
                                }`}
                            >
                                {option.name}
                            </NavLink>
                            {match && (
                                <div className="w-full h-[4px] bg-primary rounded-full absolute bottom-0"></div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
