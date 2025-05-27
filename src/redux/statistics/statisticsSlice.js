import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./statisticsOperations";

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    /* income: [],
    expense: [],
    totalIncome: 0,
    totalExpense: 0,
    balance: 0, */
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        /* state.income = action.payload.income;
        state.expense = action.payload.expense;
        state.totalIncome = action.payload.totalIncome;
        state.totalExpense = action.payload.totalExpense;
        state.balance = action.payload.balance; */
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
