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

export const editCategory = async (
  categoryId: string | undefined,
  body: CategoryType
) => {
  try {
    const response = await axios.put(`${API_URL}/${categoryId}`, body);
    return response.data;
  } catch (err) {
    throw new Error(`Failed to edit category: ${err}`);
  }
};

export const deleteCategory = async (categoryId: string | undefined) => {
  try {
    const response = await axios.delete(`${API_URL}/${categoryId}`);
    return response.data;
  } catch (err) {
    throw new Error(`Failed to delete category: ${err}`);
  }
};
