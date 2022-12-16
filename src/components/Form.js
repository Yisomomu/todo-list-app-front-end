import { Form, FloatingLabel, Button } from "react-bootstrap";

export const CustomForm = ({ inputs, onSubmit, onChange }) => {
  return (
    <Form
      style={{
        color: "#FFF",
      }}
      onSubmit={onSubmit}
    >
      {inputs.map((input, index) => (
        <FloatingLabel label={input.label} className="mb-3" key={index + 1}>
          {input.type !== "select" ? (
            <Form.Control
              type={input.type}
              placeholder={input.label}
              id={input.id}
              name={input.name}
              className="bg-dark text-light border-dark"
              onChange={onChange}
              value={input.value}
            />
          ) : (
            <Form.Select
              aria-label={input.label}
              id={input.id}
              name={input.name}
              className="bg-dark text-light border-dark"
              onChange={onChange}
              value={input.value}
            >
              <option>Selecciona una opción</option>
              {input.values.map((value, index) => (
                <option value={value.value} key={index + 1}>
                  {value.label}
                </option>
              ))}
            </Form.Select>
          )}
        </FloatingLabel>
      ))}
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};
