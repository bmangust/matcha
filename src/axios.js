import axios from "axios";

const host = "localhost";
const port = 8080;

export const api = axios.create({
  baseURL: `http://${host}:${port}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
  },
});

export const media = axios.create({
  baseURL: `http://${host}:${port}/api/media`,
  headers: { "Content-Type": "application/json" },
});
