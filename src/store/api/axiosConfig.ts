import axios from "axios";

// Create a base axios instance with common configuration
const API = axios.create({
  baseURL: "http://50.16.57.115:8080",
  timeout: 15000, // Increased timeout for file uploads
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - useful for adding auth tokens
API.interceptors.request.use(
  (config) => {
    // Check if the request is a FormData (file upload) request
    if (config.data instanceof FormData) {
      // Remove Content-Type header so that the browser can set it with the boundary
      config.headers["Content-Type"] = "multipart/form-data";
    }

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
    // Store tokens if they are in the response
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    if (response.data?.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }

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
