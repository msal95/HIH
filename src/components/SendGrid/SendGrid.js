import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ZapOff } from "react-feather";
import { Button, Col, Form, Row } from "reactstrap";

// Local Imports
import avatar from "@src/assets/images/icons/file-icons/Avtar.png";
import groupIcon from "@src/assets/images/icons/file-icons/Group.png";
import edit from "@src/assets/images/icons/file-icons/edit.png";
import folderIcon from "@src/assets/images/icons/file-icons/folder-icon.png";
import infoIcon from "@src/assets/images/icons/file-icons/info-icon.png";
import projectIcon from "@src/assets/images/icons/file-icons/project-icon.png";
import { SendGridValidationSchema } from "../../utility/validationSchemas/CredentialsValidationSchema";
import CreateNewProject from "../CreateNewProject/CreateNewProject";
import CustomHeading from "../CustomHeading/CustomHeading";
import InputField from "../InputField/InputField";

const authOptions = [
  { id: 1, name: "Auth 2.0", value: "auth 2.0" },
  { id: 2, name: "Api key", value: "api key" },
  { id: 3, name: "JWT", value: "jwt" },
  { id: 4, name: "Bearer token", value: "bearer token" },
];

export default function SendGrid(props) {
  const {
    isEdit,
    onPressNewProject,
    onPressCredentials,
    item,
    isNewProject = false,
    handleOnCreateNewProject,
    optionsData,
  } = props;

  const { id, name, data, type } = item ?? {};

  return (
    <>
      <CustomHeading
        image={item.image}
        title={item.name}
        subTitle={`Connect to ${item.name}`}
        isDivider
      />
      <Row className="px-2">
        <Col md={7}>
          <Formik
            initialValues={{
              name: name ?? "",
              location: "",
              authType: "",
              authUrl: data?.auth_url ?? "",
              clientId: data?.client_id ?? "",
            }}
            validationSchema={SendGridValidationSchema}
            onSubmit={onPressCredentials}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form className="auth-login-form" onSubmit={handleSubmit}>
                <InputField
                  label="Connection Name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoFocus
                  placeholder="My Workday Account"
                  errorType={errors.name && touched.name}
                  errorMessage={errors.name}
                />
                <InputField
                  label="Location"
                  name="location"
                  onChange={(selectedOption) => {
                    handleChange("location")(selectedOption.value);
                  }}
                  onBlur={handleBlur}
                  value={values.location}
                  optionsData={optionsData}
                  isOption
                  errorType={errors.location && touched.location}
                  errorMessage={errors.location}
                  handleOnCreateNewProject={handleOnCreateNewProject}
                />
                <InputField
                  label="Authentication type"
                  name="authType"
                  onChange={(selectedOption) => {
                    handleChange("authType")(selectedOption.value);
                  }}
                  onBlur={handleBlur}
                  value={values.authType}
                  optionsData={authOptions}
                  isOption
                  errorType={errors.authType && touched.authType}
                  errorMessage={errors.authType}
                />
                <InputField
                  label="Authorization URL"
                  name="authUrl"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.authUrl}
                  errorType={errors.authUrl && touched.authUrl}
                  errorMessage={errors.authUrl}
                  placeholder="https://login.microsoftonline.com/common/oauth2/v2.0/token"
                />
                <InputField
                  label="Client ID"
                  name="clientId"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.clientId}
                  errorType={errors.clientId && touched.clientId}
                  errorMessage={errors.clientId}
                  placeholder="1890-hwi0"
                />

                <Button
                  color="primary"
                  block
                  onClick={handleSubmit}
                  className="connect-btn"
                >
                  connect
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col md={5}>
          {isEdit && (
            <>
              <h3 className="disconnect-heading">
                <ZapOff size={20} className="me-1" />
                Disconnect
              </h3>
              <CustomHeading
                title="Location"
                subTitle="Folder 1"
                image={projectIcon}
                iconWidth="16px"
                iconHeight="16px"
                titleClass="titleClass"
                subTitleClass="subTitleClass"
                subImage={folderIcon}
              />
              <CustomHeading
                title="Created By John smith"
                subTitle="28 minutes ago"
                image={edit}
                iconWidth="16px"
                iconHeight="16px"
                titleClass="titleClass"
                subTitleClass="subTitleClass"
              />
              <CustomHeading
                title="Edited By John smith"
                subTitle="28 minutes ago"
                image={avatar}
                iconWidth="16px"
                iconHeight="16px"
                titleClass="titleClass"
                subTitleClass="subTitleClass"
                isDivider
              />

              <CustomHeading
                title="Dependencies"
                subTitle="Not used by any recipe"
                image={groupIcon}
                iconWidth="16px"
                iconHeight="16px"
                titleClass="titleClass"
                subTitleClass="subTitleClass"
                isDivider
              />

              <CustomHeading
                title="Need Help?"
                subTitle=""
                image={infoIcon}
                iconWidth="16px"
                iconHeight="16px"
                titleClass="titleClass"
                subTitleClass="subTitleClass"
              />
              <p className="ms-3">
                Check out the <a href="#">help guide</a> to learn how to connect
                to Workday on HIH.
              </p>
            </>
          )}
          {isNewProject && (
            <CreateNewProject
              onCancel={handleOnCreateNewProject}
              onSubmit={onPressNewProject}
            />
          )}
        </Col>
      </Row>
    </>
  );
}
