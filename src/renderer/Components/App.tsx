import { PersonDasboard } from "Components/PersonDashboard";
import { NavBar } from "./NavBar";
import { Routes, Route } from "react-router-dom";
import { AsideSection } from "./AsideSection";
import { useState } from "react";
const Home = () => <AsideSection><h1>Home</h1></AsideSection>;
function App() {

  const [alert, setAlert] = useState('')
  return (
    <>
      <main className="relative h-full text-accent-content items-center bg-base-200">
        <NavBar alert={alert}/>
        <AsideSection>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/persons" element={<PersonDasboard alertFunction={setAlert}/>} />
          </Routes>
        </AsideSection>
      </main>
    </>
  );
}

export default App;
