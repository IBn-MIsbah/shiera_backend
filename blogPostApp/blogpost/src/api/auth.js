// src/api/auth.js
import axios from "./axios";

export async function register(userData) {
  const response = await axios.post("/auth/register", userData);
  return response.data;
}

export async function login(credentials) {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
}
export const logout = async () => {
  const response = await axios.delete("/auth/logout");
  return response.data.success;
};
