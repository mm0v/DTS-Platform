import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

const AXIOS_PRIVATE = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default API;
export const axiosPrivate = AXIOS_PRIVATE;
