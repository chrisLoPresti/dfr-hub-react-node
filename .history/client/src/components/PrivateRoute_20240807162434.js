import React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ redirect }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["dfr_hub_auth_token"]);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  console.log(cookies);
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
