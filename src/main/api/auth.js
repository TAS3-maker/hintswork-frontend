import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const loginApi = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
  return data;
};
