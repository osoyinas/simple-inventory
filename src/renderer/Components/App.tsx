import { PersonDasboard } from "Components/PersonDashboard";
import { NavBar } from "./NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import { AsideSection } from "./AsideSection";

const Home = () => <AsideSection><h1 className="h-[2000px]">HOMEEEEEEEEEEEEEEEEE</h1></AsideSection>;
function App() {

  return (
    <>
      <main className="relative h-full w-[100vw] text-accent-content items-center bg-base-200">
        <NavBar />
        <AsideSection>
          <Routes>
            <Route path="/" element={<Navigate to="/moves" />} /> {/* Agrega esta línea */}
            <Route path="/moves" element={<Home />} />
            <Route path="/persons" element={<PersonDasboard/>} />
            <Route path="/works" element={<PersonDasboard />} />
            <Route path="/materials" element={<PersonDasboard />} />
          </Routes>
        </AsideSection>
      </main>
    </>
  );
}

export default App;
