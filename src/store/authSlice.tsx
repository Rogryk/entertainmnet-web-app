import { createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import type { AppThunk } from "./store";
import { setCategory } from "./navigationSlice";

export interface UserCredentialsProps {
  email: string;
  password: string;
}

const initialState = {
  isAuthWindowOpen: false,
  isAuthorized: false,
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthWindow(state) {
      console.log("toggle");

      state.isAuthWindowOpen = !state.isAuthWindowOpen;
    },

    login(state, action) {
      console.log("Logged in as: ", action.payload);
      state.isAuthorized = true;
      state.userName = action.payload;
    },

    logout(state) {
      state.isAuthorized = false;
      state.userName = "";
      state.isAuthWindowOpen = false;
    },
  },
});

export const logoutHandler = (): AppThunk => async (dispatch, getState) => {
  const state = getState();

  await getAuth().signOut();
  state.nav.currentCategory === "bookmarks" && dispatch(setCategory("home"));
  dispatch(authSlice.actions.logout());
};

export const loginHandler =
  (EnteredUserCredentials: UserCredentialsProps): AppThunk =>
  async (dispatch) => {
    try {
      const response = await signInWithEmailAndPassword(
        getAuth(),
        EnteredUserCredentials.email,
        EnteredUserCredentials.password
      );
      const user = response.user;
      dispatch(authSlice.actions.login(user.email));
      dispatch(authSlice.actions.toggleAuthWindow());
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message || "Something went wrong.");
      } else {
        console.log("Something went wrong.");
      }
    }
  };

export const registerHandler =
  (UserRegisterCredentials: UserCredentialsProps): AppThunk =>
  async (dispatch) => {
    try {
      const response = await createUserWithEmailAndPassword(
        getAuth(),
        UserRegisterCredentials.email,
        UserRegisterCredentials.password
      );
      const user = response.user;
      dispatch(authSlice.actions.login(user.email));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message || "Error: account NOT created");
      } else {
        console.log("Error: account NOT created");
      }
    }
  };

export default authSlice.reducer;
export const { toggleAuthWindow, login } = authSlice.actions;
