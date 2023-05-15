import { API_URL } from "./apiEndPoint";
import { API_URL_LOCAL } from "./localEndPoint";
// import { API_URL_LOCAL } from "./apiEndPoint";

// Credentials API's
export const getCredentialsList = async () =>
  await API_URL.get("/api/credential");

export const deleteCredential = async (cId) => {
  return await API_URL.delete(`/api/credential/${cId}`);
};

// Project API's
export const getProjectLists = async () => {
  return await API_URL.get(`/api/project`);
};

// Folders API's
export const deleteFolder = async (fId) => {
  console.log("🚀 ~ file: apiMethods.js:18 ~ deleteFolder ~ fId:", fId);
  return await API_URL.delete(`/api/folder/${fId}`);
};
// Form builder json
export const formJsonEditor = async (data) => {
    try {
      const response = await API_URL_LOCAL.post('/api/form-builder/editor', data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
export const formValueSave = async (data) => {
    try {
      const response = await API_URL_LOCAL.post('/api/folder/', data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
