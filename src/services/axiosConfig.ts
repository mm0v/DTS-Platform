// import axios from "axios";

// const API = axios.create({
//   // baseURL: "https://industry4.az", // WARNING: need to change during deploy time to production
//   baseURL: "http://50.16.57.115:8080", // WARNING: need to change during deploy time to production
//   timeout: 30000,
// });

// API.interceptors.request.use(
//   (config) => {
//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = "multipart/form-data";
//     }

//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// export default API;

import axios from "axios";

const API = axios.create({
  // baseURL: "https://industry4.az", // WARNING: need to change during deploy time to production
  baseURL: "http://50.16.57.115:8080", // WARNING: need to change during deploy time to production
  timeout: 30000,
});

API.interceptors.request.use(
  (config) => {
    // For FormData requests, let the browser set the Content-Type header automatically
    // This ensures proper boundary is set for multipart/form-data
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
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
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    // Handle specific reCAPTCHA validation errors
    if (error.response?.status === 400 && error.response?.data?.message) {
      const message = error.response.data.message.toLowerCase();
      if (message.includes("recaptcha") || message.includes("captcha")) {
        const captchaError = new Error("reCAPTCHA validation failed");
        captchaError.name = "CaptchaError";
        throw captchaError;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
