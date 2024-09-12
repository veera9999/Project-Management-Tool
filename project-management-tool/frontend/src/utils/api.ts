import axios from "axios";
import store from "../redux/store/store";
import { logoutUser } from "../redux/slices/userSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust this to your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

export default api;
