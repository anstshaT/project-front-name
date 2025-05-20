import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
// const clearAuthHeader = () => {
//   api.defaults.headers.common.Authorization = ``;
// };

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/register", body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      const res = error.response;
      if (res) {
        const status = res.status;
        if (status === 400) {
          return thunkAPI.rejectWithValue("Incorrect data. Check the form.");
        } else if (status === 401) {
          return thunkAPI.rejectWithValue("Please log in.");
        } else if (status === 403) {
          return thunkAPI.rejectWithValue("Access denied.");
        } else if (status === 404) {
          return thunkAPI.rejectWithValue("Resource not found.");
        } else if (status === 409) {
          return thunkAPI.rejectWithValue("User with this email already exis.");
        } else if (status >= 500) {
          return thunkAPI.rejectWithValue("Server error. Try again later.");
        }
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
