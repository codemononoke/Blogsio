import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { access_token } = useSelector((state) => state.auth);

  if (access_token !== null) {
    return children;
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default PrivateRoute;
