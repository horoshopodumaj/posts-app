import axios, { type AxiosInstance } from "axios";

// Базовый URL API
export const API_URL = "https://jsonplaceholder.typicode.com";

// Создаём инстанс axios с базовым URL
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
