import { createSlice } from "@reduxjs/toolkit";
import { userInfo } from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userInfo.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
