import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const { data } = await api.get("/transactions",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
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
      const { data } = await api.delete(`/transactions/${id}`);
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
      const { data } = await api.put(`/transactions/${body.id}`, body);
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

     

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create transaction"
      );
    }
  }
);

