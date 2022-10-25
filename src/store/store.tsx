import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import mediaReducer from "./mediaSlice";

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
