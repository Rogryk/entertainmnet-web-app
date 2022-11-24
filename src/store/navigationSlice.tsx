import { createSlice } from "@reduxjs/toolkit";

interface stateProps {
  searchValue: string;
  currentCategory: "home" | "bookmarks" | "movies" | "tvseries";
  contentToOpen: string;
}

const initialState: stateProps = {
  searchValue: "",
  currentCategory: "home",
  contentToOpen: "",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.currentCategory = action.payload;
      state.searchValue = "";
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    openContent(state, action) {
      state.contentToOpen = action.payload;
    },
  },
});

export default navigationSlice.reducer;
export const { setCategory, setSearchValue, openContent } =
  navigationSlice.actions;
