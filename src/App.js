import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
      {/* <MainRoutes /> */}
    </Suspense>
  );
};

export default App;
