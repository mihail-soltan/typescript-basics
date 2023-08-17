import axios from "axios";
import { CategoryType } from "../types/category";
const API_URL =
  "https://fancy-to-do-backend-production.up.railway.app/categories";

// user/:userId
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    throw new Error(`Failed to get categories: ${err}`);
  }
};

export const getCategoriesByUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(`Failed to get categories: ${err}`);
  }
};

export const addNewCategory = async (body: CategoryType) => {
  try {
    const response = await axios.post(API_URL, body);
    return response.data;
  } catch (err) {
    throw new Error(`Failed to add new category: ${err}`);
  }
};
