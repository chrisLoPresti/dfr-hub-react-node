import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Login />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
