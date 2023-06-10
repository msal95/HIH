// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

// ** UseJWT import to get config
import useJwt from "@src/auth/jwt/useJwt";

// const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem("userData");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: {},
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload;
      // state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      // state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
      // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("myToken", action.payload.accessToken);
    },
    handleUpdateProfile: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload?.data));
    },
    handleLogout: (state) => {
      state.userData = {};
      // state[config.storageTokenKeyName] = null
      // state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem("myToken");
      // localStorage.removeItem(config.storageTokenKeyName)
      // localStorage.removeItem(config.storageRefreshTokenKeyName)
    },
  },
});

export const { handleLogin, handleLogout, handleUpdateProfile } =
  authSlice.actions;

export default authSlice.reducer;
