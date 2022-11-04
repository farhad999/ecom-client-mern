import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { categoryReducer } from "./slices/categorySlice";
import {brandReducer} from "./slices/brandSlice";
import {productReducer} from './slices/productSlice'
import {cartReducer} from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cat: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
