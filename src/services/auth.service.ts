import axios from "axios";
import { Auth } from "../types/auth";
import { User } from "../types/user";

const API_URL: string =
  "https://fancy-to-do-backend-production.up.railway.app/auth/";

export async function signUp(body: User) {
  try {
    const response = await axios.post(`${API_URL}/signup`, body);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to sign up user: ${error}`);
  }
}

export async function signIn(body: Auth) {
  try {
    const response = await axios.post(`${API_URL}/signin`, body);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to sign in user: ${error}`);
  }
}

export function logout() {
  localStorage.clear();
}
