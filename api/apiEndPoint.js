import axios from "axios";

export const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: "application/json",
  },
});
