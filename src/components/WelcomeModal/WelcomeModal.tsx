import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from "react-bootstrap/Form";

interface WelcomeModalProps {
  show: boolean;
  setShow: any;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  show,
  setShow,
}) => {
  const [name, setName] = useState<string>("");

  const handleClose = () => {
    localStorage.setItem("username", name);
    setShow(false);
  };

  const getNameValue = (e: any) => {
    setName(e.target.value);
  };
  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>What's your name?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={getNameValue}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
