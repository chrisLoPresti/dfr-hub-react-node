import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Login />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route element={<PrivateRoute />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
