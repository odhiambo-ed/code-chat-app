import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
