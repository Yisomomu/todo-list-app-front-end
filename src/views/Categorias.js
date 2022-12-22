import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { CustomModal } from "../components/Modal";
import { CustomForm } from "../components/Form";
import { AlertMessages } from "../components/Alert";
import { AuthContext } from "../context/AuthContext";

export const Categorias = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [_id, setId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({
    titulo: "",
    descripcion: "",
  });
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState(null);

  const inputs = [
    {
      label: "Titulo",
      type: "text",
      id: "titulo",
      name: "titulo",
      value: categoria.titulo,
    },
    {
      label: "Descripcion",
      type: "text",
      id: "descripcion",
      name: "descripcion",
      value: categoria.descripcion,
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:8080/categorias" + (_id ? `/${_id}` : "");
    const response = await fetch(URL, {
      method: _id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoria }),
    });
    setShow(false);
    setUpdated(!updated);
    setData();
    const { message } = await response.json();
    setMessage(message);
  };

  const updateCategoria = async (id) => {
    const response = await fetch(`http://localhost:8080/categorias/${id}`);
    const data = await response.json();
    setId(data._id);
    setCategoria(data);
    setShow(true);
  };

  const deleteCategoria = async (id) => {
    const response = await fetch(`http://localhost:8080/categorias/${id}`, {
      method: "DELETE",
    });
    const { message } = await response.json();
    setMessage(message);
    setUpdated(!updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria((categoria) => ({
      ...categoria,
      [name]: value,
    }));
  };

  useEffect(() => {
    (() => {
      if (!token) {
        navigate("/");
      }
    })();
  });

  useEffect(() => {
    (async () => {
      const getCategorias = async () => {
        const response = await fetch("http://localhost:8080/categorias");
        const data = await response.json();
        setCategorias(data);
      };
      await getCategorias();
    })();
  }, [updated]);

  const setData = () => {
    setId(null);
    setCategoria({
      titulo: "",
      descripcion: "",
    });
  };

  return (
    <div>
      <div
        style={{
          margin: "10px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="primary"
          onClick={() => {
            setData();
            setShow(true);
          }}
        >
          Nueva Categoria
        </Button>
      </div>
      {message && (
        <AlertMessages
          variant={!message ? "danger" : "success"}
          setMessage={setMessage}
        >
          {message || "Un error inesperado ha ocurrido"}
        </AlertMessages>
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length !== 0 ? (
            categorias.map((categoria, index) => (
              <tr key={categoria._id}>
                <th>{index + 1}</th>
                <td>{categoria.titulo}</td>
                <td>{categoria.descripcion}</td>
                <td>
                  <Button
                    variant="primary"
                    value={categoria._id}
                    onClick={(e) => updateCategoria(e.target.value)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    value={categoria._id}
                    onClick={(e) => deleteCategoria(e.target.value)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
              key={1}
            >
              <td colSpan="4">No hay categorias :(</td>
            </tr>
          )}
        </tbody>
      </Table>
      <CustomModal
        title={_id ? "Editar Categoria" : "Nueva Categoria"}
        show={show}
        handleClose={() => setShow(false)}
      >
        <CustomForm
          inputs={inputs}
          onSubmit={onSubmit}
          onChange={handleChange}
        />
      </CustomModal>
    </div>
  );
};
