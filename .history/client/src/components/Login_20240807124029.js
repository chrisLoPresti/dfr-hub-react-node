import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../redux/reducers/user";

const Login = () => {
  const [email, setEmail] = useState("email...");
  const [password, setPassword] = useState("password...");

  const user = useSelector((state) => state.user);
  if (user._id) {
    console.log(user._id);
  }
  return <div>
    <input value={email} onChange={(e)=>setEmail={(e.target.value)}}/>
  </div>;
};

export default Login;
