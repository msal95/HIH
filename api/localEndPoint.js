
import axios from "axios";
export const API_URL_LOCAL = axios.create({
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    headers: {
      Accept: "application/json",
    },
  });
