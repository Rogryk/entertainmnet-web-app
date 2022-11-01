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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
