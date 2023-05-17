import { Formik } from "formik";
import React from "react";
import { Layers } from "react-feather";
import { SendGridCreateProjectValidationSchema } from "../../utility/validationSchemas/CredentialsValidationSchema";
import { Button, Form } from "reactstrap";
import InputField from "../InputField/InputField";
const colourOptions = [
  // {
  //   value: "add-new",
  //   label: "Add New Customer",
  //   type: "button",
  //   color: "flat-success",
  // },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

export default function CreateNewProject(props) {
  const {
    onSubmit,
    onCancel,
    title = "Create Project",
    isEdit = false,
    data,
    isWorkFLow = false,
  } = props;
  console.log(
    "🚀 ~ file: CreateNewProject.js:16 ~ CreateNewProject ~ data:",
    data
  );
  return (
    <>
      <h3 className="new-project">
        <Layers size={24} className="me-1" />
        {title}
      </h3>
      <Formik
        initialValues={{
          projectName: data?.name ?? "",
          description: data?.description ?? "",
          location: "",
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
        }) => (
          <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
            <InputField
              label="Name*"
              type="text"
              name="projectName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.projectName}
              placeholder="New Project"
              errorType={errors.projectName && touched.projectName}
              errorMessage={errors.projectName}
            />
            {isWorkFLow ? (
              <InputField
                label="Location"
                name="location"
                onChange={(selectedOption) => {
                  handleChange("location")(selectedOption.value);
                }}
                onBlur={handleBlur}
                value={values.location}
                optionsData={colourOptions}
                isOption
                errorType={errors.location && touched.location}
                errorMessage={errors.location}
              />
            ) : (
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
              >
                {title}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
