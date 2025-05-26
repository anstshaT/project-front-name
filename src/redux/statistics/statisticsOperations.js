import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStatistics = createAsyncThunk(
  "statistics/fetch",
  async ({ month, year }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(
        `/statistics?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
