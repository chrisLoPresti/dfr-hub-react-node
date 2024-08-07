import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, redirect }) => {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  console.log(user);
  return user._id ? (
    children
  ) : (
    <Navigate
      to={`/auth/login?redirect=${encodeURIComponent(
        redirect || location.pathname
      )}`}
    />
  );
};

export default PrivateRoute;
