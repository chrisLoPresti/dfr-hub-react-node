import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
// import { setUser } from "../redux/reducers/user";

const Login = () => {
  const [email, setEmail] = useState("email...");
  const [password, setPassword] = useState("password...");

  const user = useSelector((state) => state.user);
  if (user._id) {
    console.log(user._id);
  }

  const login = async () => {
    const loggedInUser = await axios.post("localhost:500/login");
    console.log(loggedInUser);
  };
  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>login</button>
    </div>
  );
};

export default Login;
