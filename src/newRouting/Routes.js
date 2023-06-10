import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginBasic from "../views/pages/authentication/LoginBasic";
import RegisterBasic from "../views/pages/authentication/RegisterBasic";
import Dashboard from "../views/dashboard/dashboard";
import WorkFlows from "../views/flows";
import PrivateRoute from "./PrivateRoute";
import Credentials from "../views/credentials";
import Integration from "../views/integrations/Integration";
import IntegrationImport from "../views/integrations/IntegrationImport";
import FormsGenerated from "../views/builder/FormsGenerated";
import FormListing from "../views/builder/FormListing";
import UsersList from "../views/user/list";
import FLowsBuilder from "../views/flows/FlowsBuilder";
import Settings from "../views/settings";
import EmailApp from "../views/apps/email";

export default function MainRoutes() {
  const location = useLocation();

  // useEffect(() => {
  //   if (localStorage.getItem("login_response") === null) {
  //     let loginUrl = `${API_URL}/user/login?_format=json`;
  //     if (loginUrl.includes("undefined")) {
  //       loginUrl = loginUrl.replace("undefined/", "");
  //     }
  //   }
  // }, []);

  const navigate = useNavigate();

  const newToken = () => {
    if (localStorage.getItem("myToken") === null) {
      const idToken = null;
      return idToken;
    }
    const idToken = localStorage.getItem("myToken");
    return idToken;
  };

  const token = newToken();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri, window.location.origin, {
      replace: true,
    });
  };

  useEffect(() => {
    restoreOriginalUri();
  }, []);

  console.log("🚀 ~ file: Routes.js:49 ~ MainRoutes ~ token:", token);

  return (
    <div>
      {/* <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}> */}
      {/* {!!token &&  <Header />} */}
      <Routes>
        <Route path="/login" element={<LoginBasic />} />
        <Route path="/pages/register-basic" element={<RegisterBasic />} />
        {/* <Route path="/asset/detail/:copyLinkId" element={<CopyLinkPage />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apps/flows" element={<WorkFlows />} />
          <Route path="/apps/credentials" element={<Credentials />} />
          <Route path="/apps/integration" element={<Integration />} />
          <Route path="/apps/import" element={<IntegrationImport />} />
          <Route path="/apps/form/generated" element={<FormsGenerated />} />
          <Route path="/apps/form/listing" element={<FormListing />} />
          <Route path="/apps/user/list" element={<UsersList />} />
          <Route path="/apps/flows-builder" element={<FLowsBuilder />} />
          <Route path="/apps/settings" element={<Settings />} />
          <Route path="/apps/email" element={<EmailApp />} />
          {/* <Route path="/completed-assets" element={<Completedassets />} />
          <Route
            path="/completed-assets/assetdetail"
            element={<CompletedAssetsDetail />}
          />
          <Route path="/home/assetdetail" element={<CompletedAssetsDetail />} />
          <Route path="/request-sop" element={<Requestsop />} />
          <Route path="*" element={<PageNotFound />} /> */}
        </Route>
      </Routes>
      {/* </Security> */}
    </div>
  );
}
