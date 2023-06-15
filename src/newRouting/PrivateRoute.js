import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react"; // ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Hooks Imports
// ** Menu Items Array
import navigation from "@src/navigation/vertical";

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
      <Navigate to={{ pathname: "/", state: { from: location } }} replace />
    );
  }

  return (
    // <Layout menuData={navigation} {...props}>
    <Outlet />
    // </Layout>
  );
}

export default PrivateRoute;
