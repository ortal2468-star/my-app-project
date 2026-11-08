import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get("https://dummyjson.com/products?limit=2")
    return response.data;
})

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isLoading: false
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
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                p => p.id !== action.payload.id);

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.rejected, (state) => { state.products = [] })
        builder.addCase(fetchProducts.fulfilled, (state, action) => { state.products = action.payload.products ,
             state.isLoading = true })
        builder.addCase(fetchProducts.pending, (state) => { state.products = [] })
    }
})

export const { updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;