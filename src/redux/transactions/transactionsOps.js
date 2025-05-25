import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async (_, thunkAPI) => {
    try {
        const {data} = await axios.get('/transactions');
        return data;
        
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.message)
    }
});

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async(id, thunkAPI) => {
    try {
        const {data} =  await axios.delete(`/transactions/${id}`);
        return data.id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const editeTransaction = createAsyncThunk('transactions/editTransactions', async (body, thunkAPI) => {
    try {
        const {data} = await axios.put(`/transactions/${body.id}`, body)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)   
    }
})
