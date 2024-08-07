import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/reducers/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
