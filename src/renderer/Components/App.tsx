import { PersonDasboard } from "Components/PersonDashboard";
import { NavBar } from "./NavBar";
import { Routes, Route } from "react-router-dom";
import { AsideSection } from "./AsideSection";

const Home = () => <AsideSection><h1>Home</h1></AsideSection>;
function App() {
  return (
    <>
      <main className="relative h-full text-accent-content items-center bg-base-200">
        <NavBar/>
        <AsideSection>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/persons" element={<PersonDasboard />} />
          </Routes>
        </AsideSection>
      </main>
    </>
  );
}

export default App;
