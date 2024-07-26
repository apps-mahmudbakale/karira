import React from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirect: string;
  path: string;
  // You can add more props as needed
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirect,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to={redirect} replace />}
    />
  );
};

export default PrivateRoute;
