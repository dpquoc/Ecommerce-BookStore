import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import cartSlice from "./cartSlice"
import productSlice from "./productSlice";
import authorSlice from './authorSlice';
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    author: authorSlice.reducer,
    
  },
})

export default store