import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomers = createAsyncThunk("customers/fetchCustomers", async () => {
    const response = await axios.get("https://dummyjson.com/users?limit=2");
    return response.data.users;
})

const customersSlice = createSlice({
    name: "customers",
    initialState: {
        customers: [],
        isLoaded: false
    },
    reducers: {
        updateCustomer: (state, action) => {
            const customer = state.customers.find(
                c => c.id === action.payload.id);
            if (customer) {
                customer.firstName = action.payload.firstName;
                customer.lastName = action.payload.lastName;
                customer.email = action.payload.email;
                customer.phone = action.payload.phone;
            }
        },
        deleteCustomer: (state, action) => {
            state.customers = state.customers.filter(
                c => c.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.rejected, (state) => { state.customers = [] })
        builder.addCase(fetchCustomers.fulfilled, (state, action) => { state.customers = action.payload ;
            state.isLoaded = true;
         })
        builder.addCase(fetchCustomers.pending, (state) => { state.customers = [] })
    }
})

export const { updateCustomer, deleteCustomer } = customersSlice.actions;
export default customersSlice.reducer;