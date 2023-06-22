import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import Sidebar from "./newLayout/Vertical";
import MainRoutes from "./newLayout/Routes";
import Layout from "./newLayout/Layout";
import LayoutProvider from "./newLayout/LayoutProvider";

const App = () => {
  return (
    <Suspense fallback={null}>
      {/* <Router /> */}
      {/* <MainRoutes /> */}
      {/* <HorizontalMenu /> */}

      <LayoutProvider>
        <Layout />
      </LayoutProvider>

      {/* <Sidebar /> */}
    </Suspense>
  );
};

export default App;
