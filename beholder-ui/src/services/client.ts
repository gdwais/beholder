import axios from "axios";

const env = process.env.NODE_ENV;
const baseURL = env === "development" ? "http://localhost:3005/api" : "/api";

const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
