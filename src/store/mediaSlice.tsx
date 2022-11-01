import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IMediaElement } from "../Components/Media/ContentContainer";
import { auth } from "../utility/initFirebase";
import { AppThunk } from "./store";
import useHttp from "../hooks/useHttp";

interface Ibookmark {
  title: string;
  value: boolean;
}

export interface IuserData {
  bookmarks: {};
  email: string;
}

export interface IMenuState {
  media: IMediaElement[];
  userData: IuserData;
}

const initialState: IMenuState = {
  media: [],
  userData: { bookmarks: { "0": false }, email: "" },
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    loadMedia(state, action: PayloadAction<any>) {
      state.media = action.payload;
    },

    loadUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },

    toggleBookmark(state, action: PayloadAction<string>) {
      const title = action.payload;
      const userUid = auth.currentUser?.uid;
      console.log(userUid);

      if (!state.userData || !userUid) {
        console.log("toggle returned");
        console.log(state.userData);

        return;
      }
      let userBookmarksArray = Object.entries(state.userData.bookmarks);

      if (title in state.userData.bookmarks) {
        userBookmarksArray = userBookmarksArray.filter((el) => el[0] !== title);
      } else {
        userBookmarksArray.push([title, true]);
      }
      console.log("new bookmarks: ", userBookmarksArray);

      state.userData.bookmarks = Object.fromEntries(userBookmarksArray);
    },
  },
});

export const { toggleBookmark, loadMedia, loadUserData } = mediaSlice.actions;
export default mediaSlice.reducer;
