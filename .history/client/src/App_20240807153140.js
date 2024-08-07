import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Map from "./components/maps/Map";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Login />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <PrivateRoute>
            <Route path="/map" element={<Map />} />
          </PrivateRoute>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
