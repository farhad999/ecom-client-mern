import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { categoryReducer } from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cat: categoryReducer,
  },
});

export default store;
