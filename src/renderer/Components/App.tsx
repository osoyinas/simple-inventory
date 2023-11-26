import { PersonDasboard } from "Components/PersonDashboard";
import { NavBar } from "./NavBar";

function App() {
  return (
    <main className="grid grid-cols-4 w-full h-full relative">
      <NavBar />
      <section className="col-span-3">
        <PersonDasboard />
      </section>
    </main>
  );
}

export default App;
