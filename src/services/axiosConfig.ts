import axios from "axios";

// Create a base axios instance with common configuration
const API = axios.create({
  baseURL: "http://50.16.57.115:8080", // Removed /api to handle URLs consistently
  timeout: 30000, // Increased timeout for debugging
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - useful for adding auth tokens and debugging
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

    // Debug request
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data instanceof FormData ? "FormData (files)" : config.data,
    });

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - useful for handling errors globally
API.interceptors.response.use(
  (response) => {
    // Debug response
    console.log("API Response:", {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });

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
    // Handle common errors here with detailed logging
    if (error.response) {
      // Server responded with a status code outside of 2xx range
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

      // Handle specific status codes
      if (error.response.status === 401) {
        console.error("Unauthorized access - you need to authenticate");
      } else if (error.response.status === 403) {
        console.error(
          "Forbidden access - you don't have permission to access this resource"
        );
      } else if (error.response.status === 404) {
        console.error("Not found - the requested resource doesn't exist");
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;




// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance; 