import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    carts: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadcart: (state, action) => {
            state.carts = action.payload;
        },
        addToCart: (state, action) => {
            state.carts = action.payload;
        },
        increment: (state, action) => {
            const product = state.carts.find((item) => item.id === action.payload);
            if (product) {
                product.quantity++;
            }
        },
        decrement: (state, action) => {
            const product = state.carts.find((item) => item.id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity--;
            }
        },
        remove: (state, action) => {
            state.carts = state.carts.filter((item) => item.id !== action.payload);
        },
    },
});

export default cartSlice.reducer;
export const {
    loadcart,
    addToCart,
    increment,
    decrement,
    remove
} = cartSlice.actions;
