import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AlertMessages } from "../components/Alert";
import { CustomForm } from "../components/Form";

export const LogIn = () => {
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
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario }),
    });
    const { message } = await response.json();
    setMessage(message);
  };

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
