import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

const initialState = {
    loading: true,
    items: [],
};

export const getUserCart = createAsyncThunk("cart/fetch", async () => {
    let res = await axiosClient.get("/carts");
    return res.data;
});

export const addToCart = createAsyncThunk(
    "cart/add",
    async ({product}) => {
        let res = await axiosClient.post("/carts/add", {product: product._id});
        return res.data;
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/remove",
    async ({id}) => {
        let res = await axiosClient.delete("/carts/" + id);
        return res.data;
    }
);

const cartSlice = createSlice({
    name: "Cart",
    initialState: initialState,
    reducers: {
        clearCart: (state, action) => {
            state.items = [];
        }
    },
    extraReducers: {
        [getUserCart.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserCart.fulfilled]: (state, action) => {
            let {items} = action.payload;
            state.loading = false;
            state.items = items;
        },
        [getUserCart.rejected]: (state, action) => {
            state.loading = false;
            console.log("error in category");
        },
        [addToCart.pending]: (state, action) => {

        },
        [addToCart.fulfilled]: (state, action) => {

            const {payload} = action;

            let {product} = action.meta.arg;

            if (payload.status === 'success') {
                console.log("success");
                state.items = [...state.items, {product, quantity: 1}];
            }
        },
        [addToCart.rejected]: (state, action) => {
        },
        [removeFromCart.pending]: (state, action) => {
        },
        [removeFromCart.fulfilled]: (state, action) => {
            let payload = action.payload;
            let {id} = action.meta.arg;
            console.log("payload", payload);
            if (payload.status === "success") {
                state.items = state.items.filter((item) => item._id !== id);
            }
            return state;
        },
        [removeFromCart.rejected]: (state, action) => {
            console.log("error", action);
        },
    },
});

export const {clearCart} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
