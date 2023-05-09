import * as Yup from "yup";

export const SendGridValidationSchema = Yup.object({
  name: Yup.string().required("Connection Name is Required"),
  location: Yup.string().required("Location is Required"),
  authType: Yup.string().required("AuthType is Required"),
  authUrl: Yup.string().required("Auth URL is Required"),
  clientId: Yup.string().required("Client ID is Required"),
});

export const SendGridCreateProjectValidationSchema = Yup.object({
  projectName: Yup.string().required("Project name is required"),
  description: Yup.string(),
});
