import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "./../logo.svg";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const NavBar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            alt="Logo React"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          To Do App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 custom-scroll"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            {token ? (
              <>
                <Nav.Link as={Link} to="/categorias">
                  Categorias
                </Nav.Link>
                <Nav.Link as={Link} to="/tareas">
                  Tareas
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
          {token && (
            <Button variant="secondary" onClick={logout}>
              Cerrar Sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
