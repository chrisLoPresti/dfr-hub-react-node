import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path={"/"}>
              <Login />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
