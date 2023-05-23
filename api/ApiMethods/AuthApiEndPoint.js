import { API_URL_LOCAL } from "../localEndPoint";

export const AuthLogin = async (data) => {
    try {
      const response = await API_URL_LOCAL.post('/api/auth/login', data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
export const AuthSignUp = async (data) => {
    try {
      const response = await API_URL_LOCAL.post('/api/auth/sign-up', data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
export const AuthLogOut = async (data) => {
    try {
      const response = await API_URL_LOCAL.post('/api/auth/log-out', data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
