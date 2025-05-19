import axios from "axios";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com/",
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
