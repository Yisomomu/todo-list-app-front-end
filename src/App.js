import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Tareas } from "./views/Tareas";
import { LogIn } from "./views/Login";
import { SignUp } from "./views/Signup";
import { Categorias } from "./views/Categorias";
import { NotFound } from "./views/NotFound";
import { LandingComponent } from "./components/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<LandingComponent />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
