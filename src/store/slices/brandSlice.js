import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

const initialState = {
    loading: true,
    brands: [],
};

export const fetchBrands = createAsyncThunk("brand/fetch", async () => {
    let res = await axiosClient.get("/brands");
    return res.data;
});

export const createOrUpdateBrand = createAsyncThunk(
    "brand/create",
    async (data) => {
        let res = await axiosClient.post("/brands", data, {
            'content-type': 'multipart/form-data',
        });
        return res.data;
    }
);

export const deleteBrands = createAsyncThunk(
    "brand/delete",
    async ({id}) => {
        let res = await axiosClient.delete("/brands/" + id);
        return res.data;
    }
);

const categorySlice = createSlice({
    name: "Brand",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchBrands.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchBrands.fulfilled]: (state, action) => {
            let {brands} = action.payload;
            state.loading = false;
            state.brands = brands;
        },
        [fetchBrands.rejected]: (state, action) => {
            state.loading = false;
            console.log("error in category");
        },
        [createOrUpdateBrand.pending]: (state, action) => {

        },
        [createOrUpdateBrand.fulfilled]: (state, action) => {
            const {payload} = action;
        },
        [createOrUpdateBrand.rejected]: (state, action) => {
        },
        [deleteBrands.pending]: (state, action) => {
        },
        [deleteBrands.fulfilled]: (state, action) => {
            let payload = action.payload;
            let {id} = action.meta.arg;

            if (payload.status === "success") {
                state.brands = state.brands.filter((item) => item._id !== id);
            }
        },
        [deleteBrands.rejected]: (state, action) => {
            console.log("error", action);
        },
    },
});

export const brandReducer = categorySlice.reducer;
