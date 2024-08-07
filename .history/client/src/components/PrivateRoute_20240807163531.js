import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = ({ redirect }) => {
  const cookies = new Cookies(null, { path: "/" });
  console.log(cookies.get("dfr_hub_auth_token"));
  const user = useSelector((state) => state.user);
  const location = useLocation();
  return user._id ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(
        redirect || location.pathname
      )}`}
    />
  );
};

export default PrivateRoute;
