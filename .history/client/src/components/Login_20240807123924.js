import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../redux/reducers/user";

const Login = () => {
  const user = useSelector((state) => state.user);
  if (user._id) {
    console.log(user._id);
  }
  return <div></div>;
};

export default Login;
