import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavBar } from "../components/NavBar";

export const Home = () => {
  return (
    <>
      <NavBar />
      <Container fluid>
        <Outlet />
      </Container>
    </>
  );
};
