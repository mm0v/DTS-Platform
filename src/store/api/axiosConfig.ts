import axios from "axios";

// Create a base axios instance with common configuration
const API = axios.create({
  baseURL: "http://50.16.57.115:8080", // Base URL without /api
  timeout: 30000, // Increased timeout for slow connections
  // headers: {
  //   "Content-Type": "application/json",
  //   // Enable CORS headers for development
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //   "Access-Control-Allow-Headers":
  //     "Origin, Content-Type, Accept, Authorization",
  // },
});

// Request interceptor for handling requests
API.interceptors.request.use(
  (config) => {
    // For FormData requests, let the browser set the Content-Type
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    // Get token from localStorage if needed for authentication
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Debug request information
    console.log(`🚀 Request to ${config.url}:`, {
      method: config.method,
      headers: config.headers,
      data:
        config.data instanceof FormData
          ? "FormData (contains files)"
          : config.data,
    });

    return config;
  },
  (error) => {
    console.error("⚠️ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle various error responses
    if (error.response) {
      // Server responded with an error status code
      console.error(`❌ Error response from ${error.config?.url}:`, {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });

      // Special handling for specific error codes
      if (error.response.status === 401) {
        console.error("Unauthorized: Authentication required");
        // You could redirect to login page here
      } else if (error.response.status === 403) {
        console.error("Forbidden: You don't have permission");
      } else if (error.response.status === 422) {
        console.error("Validation error:", error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("⚠️ No response received:", error.request);

      // Try to detect common networking issues
      if (error.code === "ECONNABORTED") {
        console.error(
          "Request timeout - server might be down or network is slow"
        );
      } else {
        console.error("Network error - check your connection or server status");
      }
    } else {
      // Something else happened while setting up the request
      console.error("⚠️ Error setting up request:", error.message);
    }

    // Create a more informative error message for the UI
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Unknown error occurred";

    // Add the enhanced error message to the error object
    error.displayMessage = errorMessage;

    return Promise.reject(error);
  }
);

// Alternative fallback request method using fetch
export const fetchAPI = async (endpoint: string, options = {}) => {
  const url = `http://50.16.57.115:8080${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    // If response has no content, return empty object
    if (response.status === 204) {
      return {};
    }

    // Try to parse as JSON, fall back to text if fails
    try {
      return await response.json();
    } catch (parseError) {
      console.warn("Failed to parse JSON response:", parseError);
      return await response.text();
    }
  } catch (error) {
    console.error(`Fetch API error for ${url}:`, error);
    throw error;
  }
};

export default API;
