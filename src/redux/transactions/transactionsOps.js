import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/transactions");
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/transactions/${id}`);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editeTransaction = createAsyncThunk(
  "transactions/editTransactions",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.put(`/transactions/${body.id}`, body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
