import axios from "axios";

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
};

const apiClient = axios.create(axiosConfig);

export default apiClient;
