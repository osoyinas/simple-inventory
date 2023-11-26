import { PersonDasboard } from "Components/PersonDashboard";
import { NavBar } from "./NavBar";
import { Routes, Route } from "react-router-dom";

const Home = () => <h1>Home</h1>;
function App() {
  return (
    <>
      <main className="flex  relative h-full text-accent-content">
        <NavBar className=""/>
        <aside className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/persons" element={<PersonDasboard />} />
          </Routes>
        </aside>
      </main>
    </>
  );
}

export default App;
