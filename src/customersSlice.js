import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomers = createAsyncThunk("customers/fetchCustomers", async () => {
    const response = await axios.get("https://dummyjson.com/users?limit=2");
    return response.data;
})

const customersSlice = createSlice({
    name: "customers",
    initialState: {
        customers: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.rejected, (state) => { state.customers = [] })
        builder.addCase(fetchCustomers.fulfilled, (state, action) => { state.customers = action.payload })
        builder.addCase(fetchCustomers.pending, (state) => { state.customers = [] })
    }
})

export default customersSlice.reducer;