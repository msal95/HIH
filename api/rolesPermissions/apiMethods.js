import { API_URL } from "../apiEndPoint";

// Roles APIs
export const getRolesListings = async () => {
  return await API_URL.get(`/api/role`);
};

export const createRole = async (rData) => {
  return await API_URL.post("/api/role", rData);
};

export const deleteRole = async (pId) => {
  return await API_URL.delete(`/api/role/${pId}`);
};

export const editRole = async (pData, pId) => {
  return await API_URL.post(`/api/role/${pId}`, pData);
};

// Permissions APIs
export const getPermissionListings = async () => {
  return await API_URL.get(`/api/permission`);
};

export const createPermission = async (pData) => {
  return await API_URL.post("/api/permission", pData);
};

export const deletePermission = async (pId) => {
  return await API_URL.delete(`/api/role/${pId}`);
};

export const editPermission = async (pData, pId) => {
  return await API_URL.post(`/api/role/${pId}`, pData);
};
