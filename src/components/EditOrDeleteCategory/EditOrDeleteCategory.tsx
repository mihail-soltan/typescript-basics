import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { CategoryType } from "../../types/category";

type EditOrDeleteCategoryProps = {
  show: boolean;
  category: CategoryType;
  closeModal: any;
};

export const EditOrDeleteCategory: React.FC<EditOrDeleteCategoryProps> = ({
  show,
  category,
  closeModal,
}) => {
  const [currentCategory, setCurrentCategory] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentCategory((valoareaPrecedenta: any) => ({
      ...valoareaPrecedenta,
      [name]: value,
    }));
  };

  const handleEditCategory = () => {
    console.log("edit");
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} centered={true}>
        <Modal.Header>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Edit category </p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                name="name"
                onChange={handleChange}
                value={category.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleEditCategory}>
            Edit Category
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
