import axios from "axios";

const config = {
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
};

export const axiosClient = axios.create(config);
