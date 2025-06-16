import axios from "axios";

const API = axios.create({
  baseURL: "http://50.16.57.115:8080", // WARNING: need to change during deploy time to production
  timeout: 30000,
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
