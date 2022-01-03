import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

const initialState = {
    loading: true,
    products: [],
    //
    productDetails: '',
};

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
    let res = await axiosClient.get("/products");
    return res.data;
});

export const createOrUpdateProduct = createAsyncThunk(
    "product/create",
    async (data) => {
        let res = await axiosClient.post("/products", data);
        return res.data;
    }
);

export const deleteProducts = createAsyncThunk(
    "product/delete",
    async ({ id }) => {
        let res = await axiosClient.delete("/products/" + id);
        return res.data;
    }
);

export const viewProduct = createAsyncThunk(
    "product/view",
    async ({ id }) => {
        let res = await axiosClient.get("/products/" + id);
        return res.data;
    }
);

const productSlice = createSlice({
    name: "Product",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {},
        [fetchProducts.fulfilled]: (state, action) => {
            let { products } = action.payload;
            state.loading = false;
            state.products = products;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.loading = false;
            console.log("error in category");
        },
        [createOrUpdateProduct.pending]: (state, action) => {

        },
        [createOrUpdateProduct.fulfilled]: (state, action) => {
            const {payload} = action;
        },
        [createOrUpdateProduct.rejected]: (state, action) => {},
        [deleteProducts.pending]: (state, action) => {},
        [deleteProducts.fulfilled]: (state, action) => {
            let payload = action.payload;
            let { id } = action.meta.arg;

            if (payload.status === "success") {
                state.products = state.products.filter((item) => item._id !== id);
            }
        },
        [deleteProducts.rejected]: (state, action) => {
            console.log("error", action);
        },
        [viewProduct.pending]: (state, action) => {

        },
        [viewProduct.fulfilled]: (state, action) => {
            state.productDetails = action.payload.product;
        },
        [viewProduct.rejected]: (state, action) => {

        }
    },
});

export const productReducer = productSlice.reducer;
