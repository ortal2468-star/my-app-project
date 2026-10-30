import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fatchCustomers = createAsyncThunk("customers/fatchCustomers", async () => {
    const response = await axios.get("https://dummyjson.com/users");
    return response.data;
})

const customersSlice = createSlice({
    name: "customers",
    initialState: {
        customers: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fatchCustomers.rejected, (state) => { state.customers = [] })
        builder.addCase(fatchCustomers.fulfilled, (state, action) => { state.customers = action.payload })
        builder.addCase(fatchCustomers.pending, (state) => { state.customers = [] })
    }
})

export default customersSlice.reducer;