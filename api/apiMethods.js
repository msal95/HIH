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
  console.log("🚀 ~ file: apiMethods.js:38 ~ createFolder ~ fData:", fData);
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
    const response = await API_URL_LOCAL.post("/api/form-builder/editor", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const formJsonEditorDelete = async (id) => {
  try {
    const response = await API_URL_LOCAL.delete(
      `/api/form-builder/editor/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getEditorJsonById = async (form_json_editor_id) => {
  try {
    const response = await API_URL_LOCAL.get(
      `/api/form-builder/get-editor-json/${form_json_editor_id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getEditorAllForm = async () => {
  try {
    const response = await API_URL_LOCAL.get(
      `/api/form-builder/get-editor-all-form`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const formValueSave = async (data) => {
  try {
    const response = await API_URL_LOCAL.post(
      "/api/form-builder/form-value-save/",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
