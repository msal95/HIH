// src/AuthProvider.js

import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem("myToken");

  const [accessToken, setAccessToken] = useState(userToken || null);

  useEffect(() => {
    if (!!userToken) {
      setAccessToken(userToken);
    }
  }, [userToken]);

  const isAuthenticated = () => {
    return !!accessToken;
  };
  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
