import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../redux/reducers/user";

const Login = () => {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  return <div></div>;
};

export default Login;
