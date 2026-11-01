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
        }
    },
})

export const { calculateTotal, addPurchase } = purchasesSlice.actions;
export default purchasesSlice.reducer;