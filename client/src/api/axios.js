import axios from "axios";

const TOKEN_KEY = "token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (err) {
    return null;
  }
};

const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {}
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("API Request Error:", error.message);
    return Promise.reject(error);
  },
);

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      const { status } = err.response;

      switch (status) {
        case 401:
          if (!isRedirecting) {
            isRedirecting = true;
            clearToken();

            window.location.replace("/login");
          }
          break;

        case 403:
          console.warn("API 403: Access forbidden. Insufficient permissions.");
          break;

        case 404:
          // Not Found
          console.warn(`[API 404]: Resource not found — ${err.config?.url}`);
          break;

        case 429:
          // Too Many Requests — rate limited
          console.warn("[API 429]: Rate limit hit. Slow down requests.");
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server-side errors
          console.error(`[API ${status}]: Server error on ${err.config?.url}`);
          break;

        default:
          console.error(`[API Error ${status}]:`, err.message);
      }
    } else if (err.request) {
      console.error("[API Network Error]: No response received.", err.message);
    } else console.error("[API Setup Error]:", err.message);

    return Promise.reject(err);
  }
);

export default api;
