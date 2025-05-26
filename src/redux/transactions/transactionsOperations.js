import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transactionData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      console.log("Sending transactionData:", transactionData);

      const response = await api.post("/transactions", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("CreateTransaction data", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create transaction"
      );
    }
  }
);
