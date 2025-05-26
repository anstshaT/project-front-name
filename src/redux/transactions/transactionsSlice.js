import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTransaction,
  editeTransaction,
  fetchTransactions,
  createTransaction,
} from "./transactionsOps";
const initialState = {
  items: [],
  loading: false,
  error: null,
};
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editeTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(editeTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editeTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        if (!Array.isArray(state.items)) {
          state.items = [];
        }
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const selectTransactions = (state) => state.transactions.items;
export const selectLoading = (state) => state.transactions.loading;
export const selectError = (state) => state.transactions.error;
export default transactionsSlice.reducer;
