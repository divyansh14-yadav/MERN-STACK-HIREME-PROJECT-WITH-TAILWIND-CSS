import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = (props) => {
  const user = localStorage.getItem("token");
  console.log(user, "8989898989897777");
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return props.children;
};

export default ProtectedRoute;