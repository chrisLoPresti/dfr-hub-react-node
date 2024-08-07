import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, redirect }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  console.log("Here", user);

  if (user._id) {
    return children;
  } else {
    navigate(
      `/auth/login?redirect=${encodeURIComponent(
        redirect || location.pathname
      )}`
    );
  }
};

export default PrivateRoute;
