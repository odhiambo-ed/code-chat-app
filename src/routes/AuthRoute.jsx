import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";
import { auth } from "../firebase";

const AuthRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthRoute;