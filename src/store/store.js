import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { categoryReducer } from "./slices/categorySlice";
import {brandReducer} from "./slices/brandSlice";
import {productReducer} from './slices/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cat: categoryReducer,
    brand: brandReducer,
    product: productReducer,
  },
});

export default store;
