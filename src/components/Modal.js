import { Modal } from "react-bootstrap";

export const CustomModal = ({ title, show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light border-dark">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark bg-gradient text-light border-0">
        {children}
      </Modal.Body>
    </Modal>
  );
};
