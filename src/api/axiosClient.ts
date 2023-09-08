import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
  headers: { "Content-Type": "application/json" },
};

export const axiosClient = axios.create(config);
