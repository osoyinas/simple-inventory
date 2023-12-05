import { PersonDasboard } from "@/renderer/Components/dashboard/PersonDashboard";
import { MaterialDashboard } from "@/renderer/Components/dashboard/MaterialDashboard";
import { MovementDasboard } from "./dashboard/MovementDashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { WorkDashboard } from "@/renderer/Components/dashboard/WorksDashboard";
import { LayoutContainer } from "./layout/LayoutContainer";
import { Navbar } from "./layout/Navbar";
function App() {
    return (
        <main className="text-accent-content items-center">
            <Navbar />
            <LayoutContainer>
                <Routes>
                    <Route path="/" element={<Navigate to="/moves" />} />
                    <Route path="/moves" element={<MovementDasboard />} />
                    <Route path="/persons" element={<PersonDasboard />} />
                    <Route path="/works" element={<WorkDashboard />} />
                    <Route path="/materials" element={<MaterialDashboard />} />
                </Routes>
            </LayoutContainer>
        </main>
    );
}

export default App;
