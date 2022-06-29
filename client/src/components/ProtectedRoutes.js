import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let token = false;
  token = JSON.parse(localStorage.getItem("token"));
  const user = { loggedIn: token };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
