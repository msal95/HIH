import { Formik } from "formik";
import React from "react";
import { Layers } from "react-feather";
import { SendGridCreateProjectValidationSchema } from "../../utility/validationSchemas/CredentialsValidationSchema";
import { Button, Form, Spinner } from "reactstrap";
import InputField from "../InputField/InputField";

export default function CreateNewProject(props) {
  const {
    onSubmit,
    onCancel,
    title = "Create Project",
    data,
    isWorkFLow = false,
    projects,
    selectedTab,
    isEditDetail,
    isLoading = false,
    setCustomSelectedOption,
    customSelectedOption,
    setIsActiveMainFolder,
    setIsActiveSubFolder,
    isProjects,
    setSelectedNode,
  } = props;
  console.log(
    "🚀 ~ file: CreateNewProject.js:26 ~ CreateNewProject ~ isProjects:",
    "isProjects:",
    isProjects,
    "isEditDetail: ",
    isEditDetail,
    "isWorkFLow: ",
    isWorkFLow
  );

  // if (isLoading) {
  //   return (
  //     {isLoading && (
  //     <div className="d-flex justify-content-center align-items-center">
  //       <Spinner type="grow" color="primary" />
  //     </div>
  //     )}
  //   );
  // }

  return (
    <>
      <h3 className="new-project">
        <Layers size={24} className="me-1" />
        {title}
      </h3>
      <Formik
        initialValues={{
          projectName: isEditDetail ? data?.name : "",
          description: isEditDetail ? data?.description : "",
          location: selectedTab?.name ?? "",
        }}
        validationSchema={SendGridCreateProjectValidationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          console.log(
            "🚀 ~ file: CreateNewProject.js:55 ~ CreateNewProject ~ values:",
            values?.location
          );
          return (
            <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
              {isLoading && (
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner type="grow" color="primary" />
                </div>
              )}
              <InputField
                label="Name"
                type="text"
                name="projectName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.projectName}
                placeholder={title}
                errorType={errors.projectName && touched.projectName}
                errorMessage={errors.projectName}
                isRequired
              />
              {isWorkFLow && (
                <InputField
                  label="Location"
                  name="location"
                  onChange={(selectedOption) => {
                    setFieldValue("location", selectedOption.id);
                  }}
                  onBlur={handleBlur}
                  value={values.location}
                  optionsData={projects}
                  isOption
                  errorType={errors.location && touched.location}
                  errorMessage={errors.location}
                  isRequired
                  setCustomSelectedOption={setCustomSelectedOption}
                  customSelectedOption={customSelectedOption}
                  setIsActiveMainFolder={setIsActiveMainFolder}
                  setIsActiveSubFolder={setIsActiveSubFolder}
                  setSelectedNode={setSelectedNode}
                />
              )}
              {isProjects && (
                <InputField
                  label="Description"
                  type="textarea"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Project Description"
                  errorType={errors.description && touched.description}
                  errorMessage={errors.description}
                />
              )}
              <div className="d-flex float-end">
                <Button
                  color="primary"
                  outline
                  onClick={onCancel}
                  className="project-btn-cancel"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  block
                  onClick={handleSubmit}
                  className="project-btn-create"
                  disabled={isLoading}
                >
                  {title}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
