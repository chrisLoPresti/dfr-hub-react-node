import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setUser } from "../redux/reducers/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("email...");
  const [password, setPassword] = useState("password...");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const login = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.API_ROUTE}/auth/login/`,
        {
          email,
          password,
        }
      );
      dispatch(setUser(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      console.log(message);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="text-white flex bg-tertiary rounded-md flex-col p-5 w-96 m-auto">
      <p className="text-xl mr-auto mb-5">Login</p>
      <label for="email">Email</label>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label for="password">Password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={login}
        className="bg-slate-700 rounded-md inline-block w-20"
      >
        login
      </button>
    </div>
  );
};

export default Login;
