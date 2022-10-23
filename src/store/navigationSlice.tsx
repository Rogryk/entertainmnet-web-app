import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  menuDisplay: "home",
  contentToOpen: "",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    openContent(state, action) {
      state.contentToOpen = action.payload;
    },
  },
});

export default navigationSlice.reducer;
export const { openContent } = navigationSlice.actions;
