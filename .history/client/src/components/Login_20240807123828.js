import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../redux/reducers/user";

const Login = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <div></div>;
};

export default Login;
