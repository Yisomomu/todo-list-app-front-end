import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Tareas } from "./views/Tareas";
import { LogIn } from "./views/Login";
import { SignUp } from "./views/Signup";
import { Categorias } from "./views/Categorias";
import { NotFound } from "./views/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
