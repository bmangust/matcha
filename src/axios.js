import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
  headers: { "Content-Type": "application/json" },
});

export const media = axios.create({
  baseURL: "http://localhost:8081/api/media",
  headers: { "Content-Type": "application/json" },
});
