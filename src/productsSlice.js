import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get("https://dummyjson.com/products?limit=2")
    return response.data;
})

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
        updateProduct: (state, action) => {
            const product = state.products.find(
                p => p.id === action.payload.id);
            if (product) {
                product.title = action.payload.title;
                product.price = action.payload.price;
                product.stock = action.payload.stock;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.rejected, (state) => { state.products = [] })
        builder.addCase(fetchProducts.fulfilled, (state, action) => { state.products = action.payload.products })
        builder.addCase(fetchProducts.pending, (state) => { state.products = [] })
    }
})

export const { updateProduct } = productsSlice.actions;
export default productsSlice.reducer;