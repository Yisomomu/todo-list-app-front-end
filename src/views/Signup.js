import { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AlertMessages } from "../components/Alert";
import { CustomForm } from "../components/Form";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

export const SignUp = () => {
  const { token, setCookie } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const inputs = [
    {
      label: "Nombres",
      type: "text",
      id: "nombres",
      name: "nombres",
      value: usuario.nombres,
    },
    {
      label: "Apellidos",
      type: "text",
      id: "apellidos",
      name: "apellidos",
      value: usuario.apellidos,
    },
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
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario }),
    });
    const { message, token } = await response.json();
    if (message !== "Usuario creado") {
      setMessage(message);
      return;
    }
    if (token) {
      setCookie("token", token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
      redirectHome();
    }
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
      <Card className="bg-transparent border border-primary border-1 ">
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
            submitText="Registrarse"
          />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <p>¿Ya tienes cuenta?</p>
          <Link to="/login" className="text-decoration-none mx-3">
            Inicia Sesión
          </Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};
