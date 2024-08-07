import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setUser } from "../redux/reducers/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_ROUTE}/auth/login/`,
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
    console.log(location);
    if (user._id) {
      navigate("/map");
    }
  }, [user, navigate, location]);

  return (
    <div className="text-white bg-tertiary rounded-md p-5 w-96 m-auto">
      <p className="text-xl mb-5 text-left">Login</p>
      <form className="flex flex-col gap-y-2" onSubmit={login}>
        <label htmlFor="email" className="mr-auto">
          Email
        </label>
        <input
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          className="p-2 rounded-md bg-slate-200 text-slate-700"
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="mr-auto">
          Password
        </label>
        <input
          name="password"
          type="password"
          autoComplete="password"
          value={password}
          placeholder="password..."
          className="p-2 rounded-md bg-slate-200 text-slate-700"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 bg-slate-700 rounded-md inline-block w-40 mx-auto mt-5">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
