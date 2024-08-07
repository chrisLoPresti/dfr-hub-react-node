import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Map from "./components/maps/Map";

const Four0four = () => <div>404</div>;

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Login />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/map" element={<Map />} />
          </Route>
          <Route path="*" exact={true} element={<Four0four />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
