import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    user: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            state.user = action.payload;
        },
        addToCart: (state, action) => {
            if (state.user) {
                state.user.cart = action.payload;
            }
        },
        increment: (state, action) => {
            if (state.user) {
                const product = state.user.cart.find(
                    (item) => item.id === action.payload
                );
                if (product) {
                    product.quantity++;
                }
            }
        },
        decrement: (state, action) => {
            if (state.user) {
                const product = state.user.cart.find(
                    (item) => item.id === action.payload
                );
                if (product && product.quantity > 1) {
                    product.quantity--;
                }
            }
        },
        remove: (state, action) => {
            if (state.user) {
                state.user.cart = state.user.cart.filter(
                    (item) => item.id !== action.payload
                );
            }
        },
    },
});

export default userSlice.reducer;
export const {
    loaduser,
    addToCart,
    increment,
    decrement,
    remove
} =
userSlice.actions;
