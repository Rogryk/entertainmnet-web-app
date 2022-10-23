import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IMediaElement } from "../Components/Media/ContentContainer";

export interface IMenuState {
  media: IMediaElement[];
}

const initialState: IMenuState = {
  media: [],
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    loadMedia(state, action: PayloadAction<any>) {
      state.media = action.payload;
    },

    toggleBookmark(state, action: PayloadAction<string>) {
      state.media = state.media.map((el: IMediaElement) => {
        if (el.title.includes(action.payload)) {
          el.isBookmarked = !el.isBookmarked;
        }
        return el;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleBookmark, loadMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
