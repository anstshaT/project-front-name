import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "./index.js";

export const refreshUser = createAsyncThunk("auth/refresh-session", async (__, thunkAPI) => {
  try {
    const savedToken = thunkAPI.getState().auth.token;
    if (savedToken == "") {
      return thunkAPI.rejectWithValue("No token found");
    }
    setAuthHeader(savedToken);

    const { data } = await api.get("users/me");
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
