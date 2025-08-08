import { configureStore } from '@reduxjs/toolkit';
// import userSlice  from "./userSlice";
import userSlice from './reducers/userSlice';
import productSlice from './reducers/productsSlice';
import cartSlice from './reducers/cartSlice';

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    productsReducer:productSlice,
    cartReducer:cartSlice,
  },
})
