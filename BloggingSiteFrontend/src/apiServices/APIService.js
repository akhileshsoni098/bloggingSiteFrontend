import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR: attach token if exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-api-key");
    if (token) {
      config.headers["x-api-key"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
