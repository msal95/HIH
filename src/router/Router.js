// ** Router imports
import { lazy, useEffect, useState } from "react";

// ** Router imports
import { useRoutes, Navigate } from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "../utility/Utils";

// ** GetRoutes
import { getRoutes } from "./routes";
import Login from "../views/pages/authentication/Login";

// ** Components
const Error = lazy(() => import("../views/pages/misc/Error"));
const LoginBasic = lazy(() =>
  import("../views/pages/authentication/LoginBasic")
);
const NotAuthorized = lazy(() => import("../views/pages/misc/NotAuthorized"));

const Router = () => {
  // ** Hooks
  const { layout } = useLayout();

  const userData = localStorage.getItem("userData");

  const [userDetail, setUserDetail] = useState(userData ?? {});

  useEffect(() => {
    setUserDetail(JSON.parse(userData));
  }, [userData]);

  const allRoutes = getRoutes(layout);
  const getHomeRoute = () => {
    const user = getUserData();
    if (user) {
      return getHomeRouteForLoggedInUser(user.role);
    } else {
      return "/login";
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "/login",
      element: <BlankLayout />,
      // children: [{ path: "/login", element: <Login /> }],
      children: [{ path: "/login", element: <LoginBasic /> }],
    },
    {
      path: "/auth/not-auth",
      element: <BlankLayout />,
      children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }],
    },
    {
      path: "*",
      element: <BlankLayout />,
      children: [{ path: "*", element: <Error /> }],
    },
    ...allRoutes,
  ]);

  return routes;
};

export default Router;
