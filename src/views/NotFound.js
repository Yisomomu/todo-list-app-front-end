import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export const NotFound = () => {
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
      <h1>
        <span className="text-danger">404</span> |{" "}
        <span className="text-primary">Página no encontrada</span>
        <br />
        <Link className="link-light text-decoration-none" to="/">
          ▶ Volver al inicio
        </Link>
      </h1>
    </Container>
  );
};
