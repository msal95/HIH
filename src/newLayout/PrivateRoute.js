import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react"; // ** Core Layout Import
import { toast } from "react-hot-toast";
// ** Hooks Imports
// ** Menu Items Array

function PrivateRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const newToken = () => {
    if (localStorage.getItem("myToken") === null) {
      const token = null;
      return token;
    }
    const token = localStorage.getItem("myToken");
    return token;
  };

  const token = newToken();

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
      toast.error("Protected Route are not Accessible without Authorization.");
    }
  }, [token, navigate, location]);

  if (token === undefined || token === null) {
    return (
      <Navigate
        to={{ pathname: "/login", state: { from: location } }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
