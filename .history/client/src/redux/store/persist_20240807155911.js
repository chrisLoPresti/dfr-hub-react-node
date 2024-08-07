import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../reducers/user/userSlice";

const authPersistConfig = {
  key: "user",
  storage,
  // blacklist: ["somethingTemporary"],
};

const persistedReducer = persistReducer(authPersistConfig, userReducer);
