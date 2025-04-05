import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom"


function PrivateRoute({ role }) {

  const storedRole = localStorage.getItem("role");

  if (!storedRole) {
    return <Navigate to="/" replace />;
  }
  if (!role.includes(storedRole)) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />
};

export default PrivateRoute;
