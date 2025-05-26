import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../auth/authOperations";

// базова адреса API
const BASE_URL = "https://moneyguard-app.onrender.com";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue("No auth token found");
      }

      const response = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
