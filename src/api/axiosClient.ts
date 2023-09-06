import axios from "axios";

const config = {
  baseURL: "",
  headers: { "Content-Type": "application/json" },
};

export const axiosClient = axios.create(config);
