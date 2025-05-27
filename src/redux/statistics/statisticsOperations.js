import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

export const fetchStatistics = createAsyncThunk(
  "statistics/fetch",
  async ({ month, year }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await api.get(`/summary/${year}-${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Month", month);

      console.log("Statistic redux", response.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
