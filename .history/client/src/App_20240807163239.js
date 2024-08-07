import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import MapContainer from "./components/maps/MapContainer";
import { withCookies } from "react-cookie";

const Four0four = () => <div>404</div>;

const Loading = () => (
  <div className="w-screen text-center h-screen bg-slate-100 flex flex-col items-center">
    <div className="h-1.5 w-full bg-slate-100 overflow-hidden">
      <div className="animate-progress w-full h-full bg-slate-700 origin-left-right"></div>
    </div>
    <p className="text-xl">Loading...</p>
  </div>
);

function App(props) {
  console.log(props.cookies.get("dfr_hub_refresh_token"));
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistStore(store)}>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Login />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/map" element={<MapContainer />} />
            </Route>
            <Route path="*" exact={true} element={<Four0four />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default withCookies(App);
