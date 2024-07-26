import React from "react";
import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

const AuthGuard: React.FC = () => {
  const token = Cookies.get("auth_token");
  const attemptedUrl = sessionStorage.getItem("attemptedUrl");

  if (!token) {
    // Store the attempted URL in the session storage
    sessionStorage.setItem("attemptedUrl", window.location.pathname);
    return <Navigate replace to="/u/login" />;
  }

  // If authenticated and attempting to access the login page, redirect to another page
  if (token && attemptedUrl === "/u/login") {
    return <Navigate replace to="/dashboard" />;
  }

  // If authenticated, clear the attempted URL
  sessionStorage.removeItem("attemptedUrl");
  return <Outlet />;
};

export default AuthGuard;
