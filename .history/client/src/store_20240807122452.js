import { configureStore } from "@reduxjs/toolkit";
import { useDeferredValue } from "react";

export default configureStore({
  reducer: {
    user: useDeferredValue,
  },
});
