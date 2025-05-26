import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/transactions", transactionData);

      console.log("CreateTransaction data", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create transaction"
      );
    }
  }
);
