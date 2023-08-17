import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import { CategoryType } from '../../types/category';
import { CompleteUser } from '../../types/complete-user';

interface EditItemModalProps {
    task: Task,
    tasks: Task[],
    closeModal: any,
    show: boolean,
    categories: CategoryType[],
    editCurrentTask: any,
    setTasks: any,
    user: CompleteUser
}

export const EditItemModal: React.FC<EditItemModalProps> = ({ task, closeModal, show, categories, editCurrentTask, user }) => {

    const [currentTask, setCurrentTask] = useState<Task>({
        _id: "",
        title: "",
        category: "",
        description: "",
        completed: false,
        deadline: new Date(),
        created_at: new Date(),
        created_by: "",
        updated_at: new Date(),
        updated_by: "",
    })
    const handleChange = (e:any) => {
        const { name, value } = e.target
        setCurrentTask((valoareaPrecedenta) => ({ ...valoareaPrecedenta, [name]: value }))
    }

    const handleEditTask = async (taskId: string | undefined, editedTask: Task) => {
        console.log(editedTask)
        currentTask.deadline = new Date(currentTask.deadline)
        currentTask.updated_by = user._id || "Guest"
        currentTask.updated_at = new Date()
        editCurrentTask(editedTask, taskId)
        closeModal()
    }


    useEffect(() => {
        setCurrentTask(task)
    }, [task])
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} centered={true}>
                <Modal.Header>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Edit task </p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title..." name="title" onChange={handleChange} value={currentTask.title} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} value={currentTask.description} />
                        </Form.Group>
                        <Form.Select onChange={handleChange} name="category" aria-label="Default select example">
                            <option>Select Category</option>
                            {
                                categories.map((category) =>
                                    <option key={Math.floor(Math.random()*100000000000)} value={category.name}>{category.name}</option>
                                )
                            }
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control onChange={handleChange} name="deadline" type="date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeModal}>Close</Button>
                    <Button variant="success" onClick={() => { handleEditTask(task._id, currentTask) }}>Edit Task</Button>
                </Modal.Footer>
            </Modal>
        </div>)
}