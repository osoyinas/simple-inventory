import { PersonDasboard } from "@/renderer/Components/persons/PersonDashboard";
import { MaterialDashboard } from "@/renderer/Components/materials/MaterialDashboard";
import { NavBar } from "./NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import { AsideSection } from "./AsideSection";
import { WorkDashboard } from "./works/WorksDashboard";

const Home = () => (
    <AsideSection>
        <h1 className="h-[2000px]">HOMEEEEEEEEEEEEEEEEE</h1>
    </AsideSection>
);
function App() {
    return (
        <main className="text-accent-content items-center">
            <NavBar />
            <AsideSection>
                <Routes>
                    <Route path="/" element={<Navigate to="/moves" />} />{" "}
                    {/* Agrega esta línea */}
                    <Route path="/moves" element={<Home />} />
                    <Route path="/persons" element={<PersonDasboard />} />
                    <Route path="/works" element={<WorkDashboard />} />
                    <Route path="/materials" element={<MaterialDashboard />} />
                </Routes>
            </AsideSection>
        </main>
    );
}

export default App;
