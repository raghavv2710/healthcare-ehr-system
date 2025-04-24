import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If not authenticated or role does not match, redirect to login
  if (!token) return <Navigate to="/login" />;
  if (roleRequired && userRole !== roleRequired) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
