import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../reducers/user/userSlice";

const authPersistConfig = {
  timeout: 3000,
  key: "user",
  storage,
  // blacklist: ["somethingTemporary"],
};

const persistedReducer = persistReducer(authPersistConfig, userReducer);

export default persistedReducer;
