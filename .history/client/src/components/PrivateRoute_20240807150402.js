import { useSelector } from "react-redux";
import { Route, redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  if (user._id) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return redirect("/login");
  }
};

export default PrivateRoute;
