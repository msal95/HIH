import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ZapOff } from "react-feather";
import { Button, Col, Form, Row, Spinner } from "reactstrap";
import { Form as BuilderForm } from "@bpmn-io/form-js";
// import schema from './schema.json';

import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import { formValueSave } from "../../../api/apiMethods";

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
import ViewFormRender from "../../views/builder/ViewFormRender";
import { useGetAuthType } from "../../../api/config/AuthTypeQueries";
// import "./builder.css";

// const authOptions = [
//   { id: 1, name: "No Auth", value: "No Auth" },
//   { id: 2, name: "API Key", value: "API Key" },
//   { id: 3, name: "OAuth 2.0", value: "OAuth 2.0" },
//   { id: 4, name: "Bearer Token", value: "Bearer Token" },
//   { id: 5, name: "Auth 1.0", value: "Auth 1.0" },
//   { id: 6, name: "JWT", value: "JWT" },
// ];

// const jsonValue = ["{\"components\":[{\"label\":\"not auth\",\"type\":\"textfield\",\"layout\":{\"row\":\"Row_0jz0kqc\",\"columns\":null},\"id\":\"Field_0cr3x8d\",\"key\":\"field_0nyi8r7\"},{\"key\":\"make-the-form\",\"label\":\"make the form\",\"type\":\"textfield\",\"validate\":{\"required\":true},\"id\":\"Field_0ojcoxg\",\"layout\":{\"row\":\"Row_17acaag\"}},{\"label\":\"Number\",\"type\":\"number\",\"layout\":{\"row\":\"Row_1wikq3o\",\"columns\":null},\"id\":\"Field_131tvrc\",\"key\":\"field_18x6u6j\"},{\"action\":\"submit\",\"label\":\"Button\",\"type\":\"button\",\"layout\":{\"row\":\"Row_06yz7la\",\"columns\":null},\"id\":\"Field_0uoppwp\",\"key\":\"field_0ybs29u\"}],\"type\":\"default\",\"id\":\"Form_08pufoe\",\"schemaVersion\":8}"];

export default function SendGrid(props) {
  const {
    isEdit,
    onPressNewProject,
    item,
    isNewProject = false,
    handleOnCreateNewProject,
    optionsData,
    forms,
    customSelectedOption,
    setCustomSelectedOption,
    setSubmittedFormResponse,
    submittedFormResponse,
    onDiscardSelectedCredential,
  } = props;

  const authQuery = useGetAuthType();

  const { id, name, data, type } = item ?? {};

  const [formsTypeData, setFormsTypeData] = useState(forms);
  const [authOptions, setauthOptions] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [selectAuth, setSelectAuth] = useState(null);
  const [selectedAuthType, setSelectedAuthType] = useState(null);
  const [hasForm, setHasForm] = useState(false);
  const [hasFormJson, setFormJson] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  //   const formRender = useRef(null);

  useEffect(() => {
    if (submittedFormResponse?.response === 200) {
      onDiscardSelectedCredential();
    }
  }, submittedFormResponse);

  useEffect(() => {
    if (authQuery.isFetched && authQuery.data) {
      setauthOptions(authQuery.data);
    }
  }, [authQuery.data, authQuery.isFetched, authQuery.isFetching]);

  const [formJson, setSelectedFormJson] = useState(null);

  const handleGetFormJson = async (data, errors) => {
    const formValue = JSON.stringify(data);
    try {
      const formValueData = {
        form_builders_id: formJson?.data?.id,
        data: formValue,
        name: "name builder",
        user_id: 1,
      };
      const response = await formValueSave(formValueData);
    } catch (error) {}
  };
  useEffect(() => {
    const filtered = formsTypeData.filter(
      (item) => item?.name === selectedAuthType
    );
    setSelectAuth(filtered[0] ?? null);
    if (!(filtered[0]?.bpmn_form === null)) {
      setHasForm(true);
      setFormJson(filtered[0]?.bpmn_form?.json);
    } else {
      setHasForm(false);
      setFormJson(null);
      setSelectAuth(null);
    }
  }, [selectedAuthType]);

  return (
    <>
      {isLoader && (
        <div className="container-xxl d-flex justify-content-center align-items-center">
          <Spinner type="grow" color="primary" />
        </div>
      )}
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
              integration_id: item?.id,
              user_id: item?.user_id,
            }}
            onSubmit={handleGetFormJson}
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
                  name="auth_id"
                  type="hidden"
                  value={selectAuth?.id}
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
                  customSelectedOption={customSelectedOption}
                  setCustomSelectedOption={setCustomSelectedOption}
                />
                <InputField
                  label="Authentication type"
                  name="authType"
                  onChange={(selectedOption) => {
                    handleChange("authType")(selectedOption.name);
                    setSelectedAuthType(selectedOption.name);
                  }}
                  onBlur={handleBlur}
                  value={values.authType}
                  optionsData={authOptions}
                  isOption
                  errorType={errors.authType && touched.authType}
                  errorMessage={errors.authType}
                  isSelectorOption
                />
                {setCredentials(values)}
                {selectAuth?.id > 0 && (
                  <ViewFormRender
                    form={hasFormJson}
                    selectedEvent={selectAuth}
                    credentials={credentials}
                    selectAuth={selectAuth?.id}
                    setSubmittedFormResponse={setSubmittedFormResponse}
                    submittedFormResponse={submittedFormResponse}
                    onDiscardSelectedCredential={onDiscardSelectedCredential}
                    setIsLoader={setIsLoader}
                    isSendGrid
                  />
                )}

                {/* <InputField
                  label="Authorization URL"
                  name="authUrl"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.authUrl}
                  errorType={errors.authUrl && touched.authUrl}
                  errorMessage={errors.authUrl}
                  placeholder="https://login.microsoftonline.com/common/oauth2/v2.0/token"
                /> */}
                {/* <InputField
                  label="Client ID"
                  name="clientId"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.clientId}
                  errorType={errors.clientId && touched.clientId}
                  errorMessage={errors.clientId}
                  placeholder="1890-hwi0"
                /> */}

                {/* <Button
                  color="primary"
                  block
                  onClick={handleSubmit}
                  className="connect-btn"
                >
                  connect
                </Button> */}
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
