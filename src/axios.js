import axios from "axios";

const host = "localhost";
const port = 8080;

export const api = axios.create({
  baseURL: `http://${host}:${port}/api/v1/`,
  headers: { "Content-Type": "application/json" },
});

export const media = axios.create({
  baseURL: `http://${host}:${port}/api/media`,
  headers: { "Content-Type": "application/json" },
});
