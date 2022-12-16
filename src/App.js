import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Tareas } from "./views/Tareas";
import { Categorias } from "./views/Categorias";
import { NotFound } from "./views/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/categorias" element={<Categorias />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
