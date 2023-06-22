import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import BlankLayout from "@layouts/BlankLayout";
import navigation from "@src/navigation/vertical";

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
import Error from "../views/pages/misc/Error";
import Layout from "@layouts/VerticalLayout";

export default function MainRoutes(props) {
  const location = useLocation();

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

  return (
    <div>
      <Routes>
        <div className="layout-container">
          <Header />
          <div className="sidebar-and-content">
            <Sidebar />

            <div className="content">
              <Route path="/" element={<LoginBasic />} />
              <Route path="/pages/register-basic" element={<RegisterBasic />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/apps/flows" element={<WorkFlows />} />
                <Route path="/apps/credentials" element={<Credentials />} />
                <Route path="/apps/integration" element={<Integration />} />
                <Route path="/apps/import" element={<IntegrationImport />} />
                <Route
                  path="/apps/form/generated"
                  element={<FormsGenerated />}
                />
                <Route path="/apps/form/listing" element={<FormListing />} />
                <Route path="/apps/user/list" element={<UsersList />} />
                <Route path="/apps/flows-builder" element={<FLowsBuilder />} />
                <Route path="/apps/settings" element={<Settings />} />
                <Route path="/apps/email" element={<EmailApp />} />
                {/* <Route
            path="*"
            element={<BlankLayout />}
            children={[{ path: "*", element: <Error /> }]}
          /> */}
              </Route>
            </div>
          </div>
        </div>
      </Routes>
    </div>
  );
}
