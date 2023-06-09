import { API_URL } from "./apiEndPoint";
import { API_URL_LOCAL } from "./localEndPoint";
// import { API_URL_LOCAL } from "./apiEndPoint";

// Credentials API's
export const getCredentialsList = async () =>
  await API_URL.get("/api/credential");

export const deleteCredential = async (cId) => {
  return await API_URL.delete(`/api/credential/${cId}`);
};

// Integrations APIs
export const getIntegrationsList = async () =>
  await API_URL.get("/api/integration");

// Project API's
export const getProjectLists = async () => {
  return await API_URL.get(`/api/project`);
};

export const createProjects = async (pData) => {
  return await API_URL.post("/api/project", pData);
};

export const deleteProject = async (pId) => {
  return await API_URL.delete(`/api/project/${pId}`);
};

export const editProject = async (pData, pId) => {
  return await API_URL.post(`/api/project/${pId}`, pData);
};

// Folders API's
export const deleteFolder = async (fId) => {
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

// Workflow API's
export const getWorkflowLists = async () => {
  return await API_URL.get(`/api/workflowManagement`);
};

// export const deleteWorkflow = async (wId) => {
//   console.log(
//     "🚀 ~ file: apiMethods.js:54 ~ deleteWorkflow ~ wId:",
//     wId,
//     typeof wId
//   );
//   const { workflow_ids } = wId;
//   console.log(
//     "🚀 ~ file: apiMethods.js:60 ~ deleteWorkflow ~ workflow_ids:",
//     workflow_ids
//   );
//   return await API_URL.delete(`/api/workflowManagement/delete`, {
//     ids: [1, 2, 3],
//   });
// };

export const deleteWorkflow = async (wId) => {
  try {
    const { workflow_ids } = wId;
    const response = await API_URL.delete(`/api/workflowManagement/delete`, {
      data: {
        workflow_ids, // Pass the workflow_ids obtained from the parameter
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
};

export const createWorkflow = async (wData) => {
  return await API_URL.post(`/api/workflowManagement`, wData);
};

export const editWorkflow = async (wData) => {
  return await API_URL.post(`/api/workflowManagement/update/status`, wData);
};

export const editWorkflowName = async (wData, id) => {
  return await API_URL.post(`/api/workflowManagement/update/name/${id}`, wData);
};

// Workflow Engine APIs
export const createWorkflowEngine = async (wData) => {
  return await API_URL.post(`/api/workflow/save-update`, wData);
};

export const runWorkflowEngine = async (wData) => {
  return await API_URL.get(
    `/api/execute-graph/?workflow_id=${wData?.workflow_id}`
  );
};

export const generateWebhook = async (wData) => {
  return await API_URL.post(`/api/workflow/generated-webhook`, {
    workflow_id: wData?.workflow_id,
  });
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
  console.log("🚀 ~ file: apiMethods.js:154 ~ formValueSave ~ data:", data);
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
