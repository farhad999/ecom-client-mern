import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

const initialState = {
  loading: true,
  categories: [],
};

export const fetchCategories = createAsyncThunk("cat/fetch", async () => {
  let res = await axiosClient.get("/categories");
  return res.data;
});

export const createOrUpdateCategory = createAsyncThunk(
  "cat/create",
  async (data) => {
    let res = await axiosClient.post("/categories", data);
    return res.data;
  }
);

export const deleteCategories = createAsyncThunk(
  "cat/delete",
  async ({ id }) => {
    let res = await axiosClient.delete("/categories/" + id);
    return res.data;
  }
);

const categorySlice = createSlice({
  name: "Category",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {},
    [fetchCategories.fulfilled]: (state, action) => {
      let { categories } = action.payload;
      state.loading = false;
      state.categories = categories;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      console.log("error in category");
    },
    [createOrUpdateCategory.pending]: (state, action) => {

    },
    [createOrUpdateCategory.fulfilled]: (state, action) => {
      const {payload} = action;
    },
    [createOrUpdateCategory.rejected]: (state, action) => {},
    [deleteCategories.pending]: (state, action) => {},
    [deleteCategories.fulfilled]: (state, action) => {
      let payload = action.payload;
      let { id } = action.meta.arg;

      if (payload.status === "success") {
        state.categories = state.categories.filter((item) => item._id !== id);
      }
    },
    [deleteCategories.rejected]: (state, action) => {
      console.log("error", action);
    },
  },
});

export const categoryReducer = categorySlice.reducer;
