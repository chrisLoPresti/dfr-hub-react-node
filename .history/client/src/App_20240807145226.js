import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path={["/", "/login"]} element={<Login />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
