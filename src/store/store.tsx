import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import mediaReducer from "./mediaSlice";
import navigationSlice from "./navigationSlice";

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    auth: authSlice,
    nav: navigationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
