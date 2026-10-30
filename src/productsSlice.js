import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fatchProducts = createAsyncThunk("products/fatchProducts", async () => {
    const response = await axios.get("https://dummyjson.com/products")
    return response.data;
})

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fatchProducts.rejected, (state) => { state.products = [] })
        builder.addCase(fatchProducts.fulfilled, (state, action) => { state.products = action.payload.products })
        builder.addCase(fatchProducts.pending, (state) => { state.products = [] })
    }
})

export default productsSlice.reducer;