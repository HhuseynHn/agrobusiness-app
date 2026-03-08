import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const p = action.payload;
      if (p) {
        if (p.user !== undefined) state.user = p.user;
        if (p.token !== undefined) state.token = p.token;
        if (p.token) state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
