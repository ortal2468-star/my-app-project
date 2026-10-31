import { createSlice } from "@reduxjs/toolkit";

const purchasesSlice = createSlice({
    name: "purchases",
    initialState: {
        purchases: [],
        total: 0
    },
    reducers: {
        calculateTotal: (state, action) => {
            state.total += action.payload;
        }
    },
})

export default purchasesSlice.reducer;