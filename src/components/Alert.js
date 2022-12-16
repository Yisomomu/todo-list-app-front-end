import { Alert } from "react-bootstrap";

export const AlertMessages = ({ variant, children, setMessage }) => {
  return (
    <Alert
      className={`border-0 bg-${variant} text-white`}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      onClose={() => setMessage(null)}
      dismissible
    >
      {children}
    </Alert>
  );
};
