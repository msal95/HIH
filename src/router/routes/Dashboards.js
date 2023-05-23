import { lazy } from "react";

const DashboardAnalytics = lazy(() =>
  import("../../views/dashboard/analytics")
);
const DashboardEcommerce = lazy(() =>
  import("../../views/dashboard/ecommerce")
);
const Dashboard = lazy(() => import("../../views/dashboard/dashboard"));

const DashboardRoutes = [
  // {
  //   path: '/dashboard/analytics',
  //   element: <DashboardAnalytics />
  // },
  // {
  //   path: '/dashboard/ecommerce',
  //   element: <DashboardEcommerce />
  // }
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default DashboardRoutes;
