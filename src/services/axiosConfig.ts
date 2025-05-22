import axios from "axios";

const API = axios.create({
  baseURL: "http://50.16.57.115:8080",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
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

API.interceptors.response.use(
  (response) => {
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    if (response.data?.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data,
        config: {
          url: error.config.url,
          method: error.config.method,
          headers: error.config.headers,
        },
      });

      // Handle common error status codes
      if (error.response.status === 401) {
        console.error("Unauthorized access - authentication needed");
      } else if (error.response.status === 403) {
        console.error("Forbidden access - permission denied");
      } else if (error.response.status === 404) {
        console.error("Not found - resource missing");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
