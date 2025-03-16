// src/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("accessToken") || null,
  user: localStorage.getItem("username") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("username", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setToken, setUser, setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;


