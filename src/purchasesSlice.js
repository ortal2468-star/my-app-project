import { createSlice } from "@reduxjs/toolkit";

const purchasesSlice = createSlice({
    name: "purchases",
    initialState: {
        purchases: [],
        total: 0
    },
    reducers: {
        addPurchase: (state, action) => {
            state.purchases.push(action.payload);
        },
        calculateTotal: (state, action) => {
            state.total += action.payload;
        },
        deletePurchases: (state, action) => {
            state.purchases = state.purchases.filter(
                p => p.productId !== action.payload.productId);
        }
    },
})

export const { calculateTotal, addPurchase, deletePurchases } = purchasesSlice.actions;
export default purchasesSlice.reducer;