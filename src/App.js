import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import Sidebar from "./newLayout/Vertical";
import MainRoutes from "./newLayout/Routes";
import Layout from "./newLayout/Layout";

const App = () => {
  return (
    <Suspense fallback={null}>
      {/* <Router /> */}
      {/* <MainRoutes /> */}
      {/* <HorizontalMenu /> */}
      <Layout />

      {/* <Sidebar /> */}
    </Suspense>
  );
};

export default App;
