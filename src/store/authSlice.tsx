import { createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import type { AppThunk } from "./store";
import { setCategory } from "./navigationSlice";
import { auth, setNewUserNode } from "../utility/initFirebase";
import { loadUserData } from "./mediaSlice";

export interface UserCredentialsProps {
  email: string;
  password: string;
}

const initialState = {
  isAuthWindowOpen: false,
  isAuthorized: false,
  isAuthorizing: true,
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthWindow(state) {
      state.isAuthWindowOpen = !state.isAuthWindowOpen;
    },

    login(state, action) {
      state.isAuthorized = true;
      state.isAuthorizing = false;
      state.userName = action.payload;
    },

    logout(state) {
      state.isAuthorized = false;
      state.isAuthorizing = false;
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
  dispatch(loadUserData(null));
};

export const loginHandler =
  (EnteredUserCredentials: UserCredentialsProps): AppThunk =>
  async (dispatch) => {
    try {
      let user: User | null = null;
      // login
      if (!auth.currentUser) {
        const response = await signInWithEmailAndPassword(
          getAuth(),
          EnteredUserCredentials.email,
          EnteredUserCredentials.password
        );
        user = response.user;
      }

      if (!auth.currentUser) {
        return console.log("not logged in");
      }

      dispatch(authSlice.actions.login(auth.currentUser.email));
      // close auth window
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
        auth,
        UserRegisterCredentials.email,
        UserRegisterCredentials.password
      );
      const user = response.user;
      setNewUserNode(user.uid, user.email);
      dispatch(authSlice.actions.login(user.email));
      dispatch(toggleAuthWindow());
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
