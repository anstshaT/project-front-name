import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

export const userInfo = createAsyncThunk(
  "users/me",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No auth token found");
      }

      const user = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return user.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
