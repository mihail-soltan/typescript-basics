import axios from "axios";
import { Task } from "../types/task";
import { CategoryType} from "../types/category";
const API_URL = "https://fancy-to-do-backend-production.up.railway.app/tasks";

export const getTasks = async (category: string) => {
  try {
    if (category === "all") {
      const response = await axios.get(API_URL);
      return response.data;
    } else {
      const response = await axios.get(`${API_URL}/category/${category}`);
      return response.data;
    }
  } catch (err) {
    throw new Error(`Failed to get tasks: ${err}`);
  }
};

export const getTasksByUser = async (userId: string, category: string | undefined) => {
  console.log("GET TASKS BY USER ID: ", userId)
  console.log("GET TASKS WITH CATEGORY : ", category)
  try {
    if (category === "all") {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response;
    }
    const response = await axios.get(
      `${API_URL}/user/${userId}/category/${category}`
    );
    return response;
  } catch (err) {
    throw new Error(`Failed to get tasks by ${userId}: ${err}`);
  }
};

// export const getUserTasksByCategory = async(userId, category) => {
//     try {
//         const response = await axios.get(`${API_URL}/user/${userId}/category/${category}`)
//         return response
//     }
//     catch (err) {
//         throw new Error(`Failed to get tasks by ${userId} with category ${category}: ${err}`)
//     }
// }

export const addNewTask = async (body: Task) => {
  try {
    const response = await axios.post(API_URL, body);
    return response.data;
  } catch (err) {
    throw new Error(`Failed to add new task: ${err}`);
  }
};

export const editTask = async (body: Task, taskId: string) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, body);
    return response.data;
  } catch (err) {
    throw new Error(`Failed to edit task: ${err}`);
  }
};

export const toggleCompletedTask = async (taskId: string) => {
  try {
    const response = await axios.put(`${API_URL}/completed/${taskId}`, {});
    return response;
  } catch (err) {
    throw new Error(`Failed to toggle complete task: ${err}`);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response;
  } catch (err) {
    throw new Error(`Failed to delete task: ${err}`);
  }
};

export const exportData = (
  data: Array<Task> | CategoryType[],
  fileName: string
) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${fileName}.json`;
  link.click();
};