import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default instance;
