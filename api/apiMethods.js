import { API_URL } from "./apiEndPoint";

// Credentials API's
export const getCredentialsList = async () =>
  await API_URL.get("/api/credential");

export const deleteCredential = async (cId) => {
  console.log("🚀 ~ file: apiMethods.js:8 ~ cId:", cId);
  return await API_URL.delete(`/api/credential/${cId}`);
};
