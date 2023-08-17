import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect, MouseEventHandler } from "react";
import { CategoryType } from "../../types/category";
import { CompleteUser } from "../../types/complete-user";
import { Task } from "../../types/task";
import * as formik from "formik";
import * as yup from "yup";
import { Row, Col, InputGroup } from "react-bootstrap";

interface AddItemModalProps {
  show: boolean;
  closeModal: any;
  categories: CategoryType[];
  addTask: Function;
  user: CompleteUser;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  show,
  closeModal,
  categories,
  addTask,
  user,
}) => {
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    category: "",
    description: "",
    completed: false,
    deadline: new Date(),
    created_at: new Date(),
    created_by: "",
    updated_at: new Date(),
  });
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setNewTask((valoareaPrecedenta) => ({
      ...valoareaPrecedenta,
      [name]: value,
    }));
  };

  const onConfirmAddTask = (userId: string, body: any) => {
    const taskBody = {
      ...body,
      created_at: new Date(),
      completed: false,
      created_by: userId,
    };
    taskBody.deadline = new Date(taskBody.deadline);
    addTask(taskBody);
    closeModal();
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().required(),
    deadline: yup.string().required(),
  });

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} centered={true}>
        <Modal.Header>
          <Modal.Title>Add New Task, boss</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="black">Add a new task so you can be more productive.</p>
          <Formik
            validationSchema={schema}
            // onSubmit={()=>onConfirmAddTask(user._id)}
            onSubmit={(e) => onConfirmAddTask(user._id, e)}
            initialValues={{
              title: "",
              category: "",
              description: "",
              deadline: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik101"
                    className="position-relative"
                  >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      isValid={touched.category && !errors.category}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group> */}
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                      <Form.Label>Category</Form.Label>
                    <Form.Select
                      onChange={handleChange}
                      value={values.category}
                      isValid={touched.category && !errors.category}
                      name="category"
                    >
                      <option>Select Category</option>
                      {categories
                        .filter((cat) => !cat.name.includes("all"))
                        .map((category) => (
                          <option
                            key={Math.floor(Math.random() * 100000000000)}
                            value={category.name}
                          >
                            {category.name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormikUsername2"
                  >
                    <Form.Label>Description</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="textarea"
                        placeholder="Description"
                        aria-describedby="inputGroupPrepend"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.description}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      name="deadline"
                      value={values.deadline}
                      onChange={handleChange}
                      isInvalid={!!errors.deadline}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.deadline}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button variant="outline-danger" onClick={closeModal}>
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  className="mx-2"
                  disabled={Object.keys(errors).length > 0}
                >
                  Add task
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
