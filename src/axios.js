import axios from "axios";

// const host = "aim-love.ga";
// const port = "";
const host = "localhost";
const port = ":8080";

export const api = axios.create({
  // baseURL: `http://${host}${port}/api/main/`,
  baseURL: `/api/main/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const media = axios.create({
  // baseURL: `http://${host}${port}/api/media/`,
  baseURL: `/api/media/`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
