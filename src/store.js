import { configureStore } from "@reduxjs/toolkit";
import purchasesReducer from './purchasesSlice'

export const store = configureStore({
    reducer:{
        purchases: purchasesReducer,
    }
})