import { configureStore } from "@reduxjs/toolkit";
import purchasesReducer from './purchasesSlice'
import productsSlice from './productsSlice'
import customersSlice from './customersSlice'

export const store = configureStore({
    reducer:{
        products: productsSlice,
        customers: customersSlice,
        purchases: purchasesReducer,
    }
})