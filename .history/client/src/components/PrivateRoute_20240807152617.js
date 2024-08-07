import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, redirect }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  console.log("Here", user);

  return user._id ? (
    children
  ) : (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(
        redirect || location.pathname
      )}`}
    />
  );
};

export default PrivateRoute;
