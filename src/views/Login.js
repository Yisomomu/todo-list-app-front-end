import { useState, useContext, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AlertMessages } from "../components/Alert";
import { CustomForm } from "../components/Form";
import { API_URL } from "../config";

import { AuthContext } from "../context/AuthContext";

export const LogIn = () => {
  const { token, setCookie } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const inputs = [
    {
      label: "Correo Electrónico",
      type: "text",
      id: "email",
      name: "email",
      value: usuario.email,
    },
    {
      label: "Contraseña",
      type: "password",
      id: "password",
      name: "password",
      value: usuario.password,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((usuario) => ({
      ...usuario,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario }),
    });
    const { message, token } = await response.json();
    if (message !== "Bienvenido") {
      setMessage(message);
      return;
    }
    setCookie("token", token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
    redirectHome();
  };

  const redirectHome = () => {
    navigate("/");
  };

  useEffect(() => {
    (() => {
      if (token) {
        redirectHome();
      }
    })();
  });

  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card className="bg-transparent">
        {message && (
          <AlertMessages
            variant={!message ? "danger" : "success"}
            setMessage={setMessage}
          >
            {message || "Un error inesperado ha ocurrido"}
          </AlertMessages>
        )}
        <Card.Body>
          <CustomForm
            inputs={inputs}
            onChange={handleChange}
            onSubmit={onSubmit}
            buttonText="Iniciar Sesión"
          />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <p>¿Aún no tienes cuenta?</p>
          <Link to="/signup" className="text-decoration-none mx-3">
            Registrate
          </Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};
