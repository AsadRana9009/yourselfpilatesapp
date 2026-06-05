import axios from "axios";
import { getAccessToken, clearAuthData } from "./auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.yourselfpilates.pt";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      clearAuthData();
      // Fallback: Try without token, allows public endpoints to work
      delete originalRequest.headers.Authorization;
      return api(originalRequest);
    }

    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";

    // Don't log 401s as they are often handled/expected
    if (error.response?.status !== 401) {
      console.warn(`API Error (${error.response?.status}): ${message}`);
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
