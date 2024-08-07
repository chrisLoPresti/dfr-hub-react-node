import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setUser } from "../redux/reducers/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("email...");
  const [password, setPassword] = useState("password...");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  if (user._id) {
    console.log(user._id);
  }

  const login = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login/",
        {
          email,
          password,
        }
      );
      console.log(data);
      dispatch(setUser(loggedInUser));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      console.log("here!", message);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>login</button>
    </div>
  );
};

export default Login;
