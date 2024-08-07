import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./persist";

export default configureStore({
  reducer: {
    user: persistedReducer,
  },
});
