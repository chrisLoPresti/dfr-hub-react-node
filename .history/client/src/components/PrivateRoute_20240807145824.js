import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route {...rest}>{!user._id ? <Redirect to="/login" /> : children}</Route>
  );
};

export default PrivateRoute;
