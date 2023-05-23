import axios from "axios";

const token = localStorage.getItem("accessToken");
const result = token.replace(/"/g, "");

console.log(result);

export const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${result}`,

    Accept: "application/json",

    "Access-Control-Allow-Origin": "*",
  },
});

// Set the default headers for the instance

axios.defaults.headers.common = {
  Authorization: `Bearer ${token}`,

  Accept: "application/json",

  "Access-Control-Allow-Origin": "*",
};
