import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

function PrivateRoute() {
  const location = useLocation();

  const newToken = () => {
    if (JSON.parse(localStorage.getItem("myToken")) === null) {
      const token = null;
      return token;
    }
    const token = JSON.parse(localStorage.getItem("myToken"));
    console.log("🚀 ~ file: PrivateRoute.js:13 ~ newToken ~ token:", token);
    return token;
  };

  const token = newToken();

  if (token === undefined || token === null) {
    return (
      <Navigate to={{ pathname: "/", state: { from: location } }} replace />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
