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
      const { data } = await api.get("/transactions", {
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
      const token = thunkAPI.getState().auth.token;
      await api.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editeTransaction = createAsyncThunk(
  "transactions/editTransactions",
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { _id, ...bodyWithoutId } = body;

      const { data } = await api.patch(`/transactions/${_id}`, bodyWithoutId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
