import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthorized: false, userName: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthorized = true;
      state.userName = action.payload;
    },

    logout(state) {
      state.isAuthorized = false;
      state.userName = "";
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
