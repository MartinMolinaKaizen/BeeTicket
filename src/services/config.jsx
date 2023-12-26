import axios from "axios";
export const version = "Prod 0.1.21";
export const enableErrorLog = false;
export const enableLogin = false;
export const rolesConAcceso = ["55"];
export const adminKey = "al3d3sm4";

const getToken = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user")).token;
  }
};

const apiAxios = axios.create({
  baseURL: "http://localhost:3001/api/v1/"
})

apiAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiAxios;

