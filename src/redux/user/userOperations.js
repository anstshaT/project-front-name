import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

export const userInfo = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const user = await api.get("/users/me");
    console.log("User info", user);

    return user.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
