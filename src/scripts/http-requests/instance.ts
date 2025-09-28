import axios from "axios";

const axiosConfig: {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
} = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
};

const token = localStorage.getItem("token");
if (token) {
  axiosConfig.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

const apiClient = axios.create(axiosConfig);

export default apiClient;
