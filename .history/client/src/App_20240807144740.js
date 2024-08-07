import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router path={"/"}>
          <Login />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
