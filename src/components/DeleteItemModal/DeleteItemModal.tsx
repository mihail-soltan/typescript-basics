import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Task } from '../../types/task';


interface DeleteItemModalProps {
    show: boolean, 
    closeModal: any,
    task: Task,
    setShowDeleteToast: any,
    handleDeleteTask: any
}

export const DeleteItemModal: React.FC<DeleteItemModalProps> = ({show, closeModal, task, setShowDeleteToast, handleDeleteTask}) =>{
    const onDeleteTask = (item: Task) => {
        handleDeleteTask(item._id)
        closeModal()
        setShowDeleteToast(true)
    }
  return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} centered={true}>
                <Modal.Header>
                    <Modal.Title>Delete Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   <h2>Are you sure you want to delete this task?</h2>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeModal}>No</Button>
                    <Button variant="success" onClick={()=>{onDeleteTask(task)}}>Yes, pls</Button>
                </Modal.Footer>
            </Modal>
        </div>)
}