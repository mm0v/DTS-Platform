import axios from "axios";

// Create a base axios instance with common configuration
const API = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - useful for adding auth tokens
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage if you have authentication
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - useful for handling errors globally
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error("API Error:", error.response.data);

      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - redirect to login or refresh token
        console.log("Unauthorized access");
        // localStorage.removeItem('token');
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;
