import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

export default function MainRoutes() {
  const location = useLocation();
  const iscopyLinkPath = location.pathname.includes("/asset/detail/");

  useEffect(() => {
    if (localStorage.getItem("login_response") === null) {
      let loginUrl = `${API_URL}/user/login?_format=json`;
      if (loginUrl.includes("undefined")) {
        loginUrl = loginUrl.replace("undefined/", "");
      }

      fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "restclient",
          pass: "FcqLxjZcJCD8ncH",
        }),
      })
        .then((data) => data.json())
        .then((json) =>
          localStorage.setItem("login_response", JSON.stringify(json))
        );
    }
  }, []);

  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri, window.location.origin), {
      replace: true,
    });
  };

  const newToken = () => {
    if (JSON.parse(localStorage.getItem("okta-token-storage")) === null) {
      const idToken = null;
      return idToken;
    }
    const { idToken } = JSON.parse(localStorage.getItem("okta-token-storage"));
    return idToken;
  };

  const token = newToken();

  return (
    <div>
      {/* <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}> */}
      {/* {!!token && !iscopyLinkPath && <Header />} */}
      <Routes>
        <Route path="/" element={<LoginLanding />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/asset/detail/:copyLinkId" element={<CopyLinkPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/get-started" element={<Getstarted />} />
          <Route path="/home" element={<Activeassets />} />
          <Route path="/completed-assets" element={<Completedassets />} />
          <Route
            path="/completed-assets/assetdetail"
            element={<CompletedAssetsDetail />}
          />
          <Route path="/home/assetdetail" element={<CompletedAssetsDetail />} />
          <Route path="/request-sop" element={<Requestsop />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      {/* </Security> */}
    </div>
  );
}
