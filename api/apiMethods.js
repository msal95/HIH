import { API_URL } from "./apiEndPoint";

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

export const createProjects = async (pData) => {
  return await API_URL.post("/api/project", pData);
};

export const deleteProject = async (pId) => {
  console.log("🚀 ~ file: apiMethods.js:21 ~ deleteProject ~ pId:", pId);
  return await API_URL.delete(`/api/project/${pId}`);
};

export const editProject = async (pData, pId) => {
  return await API_URL.post(`/api/project/${pId}`, pData);
};

// Folders API's
export const deleteFolder = async (fId) => {
  console.log("🚀 ~ file: apiMethods.js:18 ~ deleteFolder ~ fId:", fId);
  return await API_URL.delete(`/api/folder/${fId}`);
};

export const createFolder = async (fData) => {
  return await API_URL.post("/api/folder", fData);
};

export const createSubFolder = async (fData) => {
  return await API_URL.post("/api/folder", fData);
};

export const editFolder = async (fData, fId) => {
  return await API_URL.post(`/api/folder/${fId}`, fData);
};

// Form builder json
export const formJsonEditor = async (data) => {
  try {
    const response = await API_URL.post("/api/folder/", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const formValueSave = async (data) => {
  try {
    const response = await API_URL.post("/api/folder/", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
