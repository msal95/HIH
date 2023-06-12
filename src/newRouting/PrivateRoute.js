import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react"; // ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";
// ** Menu Items Array
import navigation from "@src/navigation/vertical";
import { getRoutes } from "../router/routes";

function PrivateRoute(props) {
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

  if (token === undefined || token === null) {
    return (
      <Navigate
        to={{ pathname: "/login", state: { from: location } }}
        replace
      />
    );
  }

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  );
}

export default PrivateRoute;
