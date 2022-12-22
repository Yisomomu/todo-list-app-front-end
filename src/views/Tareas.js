import { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { CustomModal } from "../components/Modal";
import { CustomForm } from "../components/Form";
import { AlertMessages } from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config";

export const Tareas = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [_id, setId] = useState(null);
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
    categoria: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState(null);

  const inputs = [
    {
      label: "Titulo",
      type: "text",
      id: "titulo",
      name: "titulo",
      value: tarea.titulo,
    },
    {
      label: "Descripcion",
      type: "text",
      id: "descripcion",
      name: "descripcion",
      value: tarea.descripcion,
    },
    {
      label: "Categoria",
      type: "select",
      id: "categoria",
      name: "categoria",
      values: categorias.map((categoria) => {
        return { label: categoria.titulo, value: categoria._id };
      }),
      value: tarea.categoria,
    },
    {
      label: "Estado",
      type: "select",
      id: "estado",
      name: "estado",
      values: [
        {
          label: "Pendiente",
          value: "Pendiente",
        },
        {
          label: "En proceso",
          value: "En proceso",
        },
        {
          label: "Finalizada",
          value: "Finalizada",
        },
      ],
      value: tarea.estado,
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const URL = API_URL+"/tareas" + (_id ? `/${_id}` : "");
    const response = await fetch(URL, {
      method: _id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tarea }),
    });
    setShow(false);
    setUpdated(!updated);
    setData();
    const { message } = await response.json();
    setMessage(message);
  };

  const updateTarea = async (id) => {
    const response = await fetch(`${API_URL}/tareas/${id}`);
    const data = await response.json();
    setId(data._id);
    setTarea(data);
    setShow(true);
  };

  const deleteTarea = async (id) => {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      method: "DELETE",
    });
    const { message } = await response.json();
    setMessage(message);
    setUpdated(!updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea((tarea) => ({
      ...tarea,
      [name]: value,
    }));
  };

  useEffect(() => {
    (() => {
      if (!token) {
        return navigate("/");
      }
    })();
  });

  useEffect(() => {
    (async () => {
      const getTareas = async () => {
        const response = await fetch(`${API_URL}/tareas`);
        const data = await response.json();
        setTareas(data);
      };
      await getTareas();
      const getCategorias = async () => {
        const response = await fetch(`${API_URL}/categorias`);
        const data = await response.json();
        setCategorias(data);
      };
      await getCategorias();
    })();
  }, [updated]);

  const setData = () => {
    setId(null);
    setTarea({
      titulo: "",
      descripcion: "",
      estado: "",
      categoria: "",
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
          Nueva Tarea
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
            <th>Estado</th>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.length !== 0 ? (
            tareas.map((tarea, index) => (
              <tr key={tarea._id}>
                <th>{index + 1}</th>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.estado}</td>
                <td>{tarea.categoria.titulo}</td>
                <td>
                  <Button
                    variant="primary"
                    value={tarea._id}
                    onClick={(e) => updateTarea(e.target.value)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    value={tarea._id}
                    onClick={(e) => deleteTarea(e.target.value)}
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
              <td colSpan="6">No hay tareas :(</td>
            </tr>
          )}
        </tbody>
      </Table>
      <CustomModal
        title={_id ? "Editar Tarea" : "Nueva Tarea"}
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
