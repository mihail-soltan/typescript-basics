import "./ToDoList.css";
// import { ToDoItem } from "../ToDoItem/ToDoItem";
import { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import { AddItemModal } from "../AddItemModal/AddItemModal";
import DeleteToast from "../Toast/DeleteToast";
import Form from "react-bootstrap/Form";
import {
  getTasks,
  addNewTask,
  editTask,
  toggleCompletedTask,
  deleteTask,
  getTasksByUser,
  exportData,
} from "../../services/task.service";
import {
  getCategories,
  getCategoriesByUser,
} from "../../services/category.service";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { EditItemModal } from "../EditItemModal/EditItemModal";
import { DeleteItemModal } from "../DeleteItemModal/DeleteItemModal";
import { CategoryType } from "../../types/category";
import { Task } from "../../types/task";
import { User } from "../../types/user";
import { CompleteUser } from "../../types/complete-user";

export function ToDoList() {
  //============================ STATES ===================================================
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [user, setUser] = useState<CompleteUser>({
    _id: "",
    username: "",
    email: "",
    password: "",
  });
  const [task, setTask] = useState<Task>({
    title: "",
    category: "",
    description: "",
    completed: false,
    deadline: new Date(),
    created_at: new Date(),
    created_by: "",
    updated_at: new Date(),
    updated_by: "",
  });
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [cachedUser, setCachedUser] = useState({});
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  //====================================================================================
  const params = useParams();

  const onAddNewItem = () => {
    setShowModal(true);
  };

  async function onGetCategories(userId: string) {
    setIsLoading(true);
    const response = await getCategoriesByUser(userId);
    setCategories([
      { name: "all", _id: Math.floor(Math.random() * 1000000000) },
      ...response,
    ]);
    setIsLoading(false);
  }
  const closeModal = () => {
    setShowModal(false);
  };
  const toggleToast = () => {
    setShowDeleteToast(!showDeleteToast);
  };

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
  };

  const addTask = async (body: Task) => {
    setIsLoading(true);
    const response = await addNewTask(body);

    getUserTasks(user._id, params.category);
    setIsLoading(false);
    return response;
  };

  const editCurrentTask = async (body: Task, taskId: string) => {
    const response = await editTask(body, taskId);
    getUserTasks(user._id, params.category);
    return response;
  };

  const handleFinishedTask = async (taskId: string) => {
    console.log(params);
    const response = await toggleCompletedTask(taskId);
    console.log("CURRENT CATEGORY: ", params.category);
    getUserTasks(user._id, params.category);
    return response;
  };

  const handleDeleteTask = async (taskId: string) => {
    const response = await deleteTask(taskId);
    getUserTasks(user._id, params.category);
    return response;
  };

  const getUserTasks = async (userId: string, category: string | undefined) => {
    console.log(userId);
    const cached = localStorage.getItem("user");
    let cachedUserId;
    if (cached) cachedUserId = JSON.parse(cached)._id;
    setTasks([]);
    setFilteredTasks([]);
    setIsLoading(true);
    console.log("CATEGORY: ", category);
    const response = await getTasksByUser(cachedUserId, category);
    // console.log(response.data)
    setTasks(response.data);
    if (response.data.length) {
      const filtered = response.data.filter((task: Task) => {
        return filter === "" || task.category === filter;
      });
      setFilteredTasks(filtered);
      setIsLoading(false);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const onDeleteTask = (task: Task) => {
    setShowDeleteModal(true);
    setTask(task);
  };

  const onEditTask = (task: Task) => {
    setShowEditModal(true);
    setTask(task);
  };

  const handleFinishTask = async (task: any) => {
    // console.log(task);
    const taskId = task.row.original._id;
    // console.log(task.row.original)
    const response = handleFinishedTask(taskId);
    return response;
  };

  const columns = useMemo<MRT_ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Task Title",
        size: 100,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      {
        accessorFn: (row: any) => row.completed.toString(),
        accessorKey: "completed",
        header: "Completed",
        size: 100,
        Cell: ({ cell }) => {
          const completedValue = cell.getValue() as boolean;
          return completedValue;
        },
      },
      {
        accessorFn: (row: any) => new Date(row.deadline),
        accessorKey: "deadline",
        header: "Deadline",
        size: 100,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as Date;
          return dateValue?.toLocaleDateString();
        },
      },
      {
        accessorFn: (row: any) => new Date(row.created_at),
        accessorKey: "created_at",
        header: "Created At",
        size: 100,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as Date;
          return dateValue?.toLocaleDateString();
        },
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 100,
        Cell: ({ cell }) => {
          const value:any = cell.getValue();
          return value ? `${value.slice(0,6)}...` : "-" 
        },
      },
      {
        accessorFn: (row: any) => new Date(row.updated_at),
        accessorKey: "updated_at",
        header: "Updated At",
        size: 100,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as Date;
          return dateValue?.toLocaleDateString();
        },
      },
      {
        accessorKey: "updated_by",
        header: "Updated By",
        size: 100,
        Cell: ({ cell }) => {
          const value:any = cell.getValue();
          return value ? `${value.slice(0,6)}...` : "-" 
        },
      },
      {
        accessorKey: "complete_task",
        header: "Complete Task",
        size: 100,
        Cell: ({ cell }) => (
          <Button
            variant={`outline-${
              cell.row.original.completed ? "danger" : "success"
            }`}
            onClick={() => handleFinishTask(cell)}
          >
            {cell.row.original.completed ? "Undo" : "Complete task"}
          </Button>
        ),
      },
      {
        accessorKey: "delete_task",
        header: "Delete Task",
        size: 100,
        Cell: ({ cell }) => (
          <Button
            variant="outline-danger"
            onClick={() => onDeleteTask(cell.row.original)}
          >
            Delete
          </Button>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const cached = localStorage.getItem("user");
    console.log("PARAMS CHANGED: ", params);

    if (cached) {
      const cachedJSON = JSON.parse(cached);
      setCachedUser(cachedJSON);
      setUser(cachedJSON);
      onGetCategories(cachedJSON._id);
      getUserTasks(cachedJSON._id, params.category);
    }
  }, [params]);

  useEffect(() => {
    setSortedTasks(
      [...filteredTasks].sort((a: Task, b: Task) => {
        if (sort === "asc") {
          console.log("asc");
          return a.deadline.getTime() - b.deadline.getTime();
        } else if (sort === "desc") {
          console.log("desc");
          return b.deadline.getTime() - a.deadline.getTime();
        } else {
          return 0;
        }
      })
    );
  }, [filteredTasks]);

  return (
    <div className="to-do-list">
      <h1 style={{ color: "#fff" }}>To Do List</h1>
      <div>
        <Button
          className="mx-2"
          variant="outline-warning"
          onClick={onAddNewItem}
        >
          Add New Item
        </Button>
        <Link className="mx-2" to="/categories">
          <Button variant="outline-success">Add New Category</Button>
        </Link>
      </div>
      <AddItemModal
        show={showModal}
        closeModal={closeModal}
        categories={categories}
        addTask={addTask}
        user={user}
      />
      <div className="flex">
        {!isLoading ? (
          categories.map((category) => (
            <Link
              key={Math.floor(Math.random() * 100000000000)}
              className="w-100 m-3"
              to={`/tasks/${category.name}`}
            >
              <Button variant="outline-light">{category.name}</Button>
            </Link>
          ))
        ) : (
          <Spinner animation="border" role="status" variant="warning">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <Form.Select
          style={{ margin: "1rem" }}
          aria-label="sort"
          onChange={handleSortChange}
        >
          <option>Sort by deadline</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </Form.Select>
      </div>
      {!isLoading ? (
        <MaterialReactTable
          enableRowActions
          columns={columns}
          data={sortedTasks}
          editingMode="modal" //default
          renderRowActions={({ row }) => (
            <Button
              variant="outline-primary"
              onClick={() => onEditTask(row.original)}
              key={row.original._id}
            >
              Edit
            </Button>
          )}
          enableEditing
          initialState={{ density: "compact" }}
        />
      ) : (
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <EditItemModal
        show={showEditModal}
        closeModal={closeEditModal}
        categories={categories}
        task={task}
        editCurrentTask={editCurrentTask}
        tasks={tasks}
        setTasks={setTasks}
        user={user}
      />
      <DeleteItemModal
        show={showDeleteModal}
        closeModal={closeDeleteModal}
        task={task}
        setShowDeleteToast={setShowDeleteToast}
        handleDeleteTask={handleDeleteTask}
      />
      <DeleteToast show={showDeleteToast} toggleToast={toggleToast} />
    </div>
  );
}
