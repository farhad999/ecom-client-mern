import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";


const initialState = {
  user: "",
  loading: false,
  loginMessage: "",
};

export const login = createAsyncThunk("auth/login", async (data) => {
  let res = await axiosClient.post("/auth/login", data);
  return res.data;
});

export const fetchUser = createAsyncThunk(
  //action type string
  "auth/fetchUser",
  // callback function
  async (data) => {
    let res = await axiosClient.get("/auth/user", data);
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = "";
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
    },
    [fetchUser.rejected]: (state) => {
      state.loading = false;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      let { status, token } = payload;
      state.loading = false;
      if (status !== "success") {
        state.loginMessage = "Email or password is incorrect";
      }
      if (status === "success") {
        localStorage.setItem("token", token);
      }
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
