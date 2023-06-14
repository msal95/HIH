import React, { useEffect, useRef, useState } from "react";
import { Form } from "@bpmn-io/form-js";
// import schema from './schema.json';

import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import "./builder.css";
import { formValueSave } from "../../../api/apiMethods";
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";
import { toast } from "react-hot-toast";

export default function ViewFormRender(props) {
  const {
    form,
    selectedEvent,
    setSubmittedEventResponse,
    onClickDiscardModal,
    selectedNode,
    submission_id,
    credentials,
    selectAuth,
    setSubmittedFormResponse,
    setIsLoader,
    isSendGrid = false,
  } = props;

  const location = useLocation();

  const userData = localStorage?.getItem("userData");

  const formRender = useRef(null);
  const [formJson, setFormJson] = useState(form ?? location?.state?.json);
  const [userDataLocal, setUserDataLocal] = useState([]);
  const [stateFullData, setStateFullData] = useState(
    selectedEvent ?? location?.state
  );
  const [credentialData, setCredentialsData] = useState(credentials ?? null);
  const [userDetail, setUserDetail] = useState(userData);

  useEffect(() => {
    if (!!userData) {
      console.log("re-render");
      setUserDetail(JSON.parse(userData));
    }
  }, [userData]);

  const handleGetFormJson = async (data, errors, userDataLocal, userDetail) => {
    console.log("🚀 ~ file: ViewFormRender.js:49 ~ handleGetFormJson ~ userDataLocal:", userDataLocal, userDetail)
    const formValue = JSON.stringify(data);
    setIsLoader(true);
    const userId = JSON.parse(userDetail);
    console.log("🚀 ~ file: ViewFormRender.js:53 ~ handleGetFormJson ~ userId:", userId)

    try {
      const formValueData = {
        form_builders_id: stateFullData?.id,
        submission_id,
        data: formValue,
        name: stateFullData?.name,
        user_id: userId?.id,
        credentialData,
        selectAuth,
      };
      const response = await formValueSave(formValueData);

      const message = response?.message;
      const validationErrors = response?.validation_errors;
      const res = response?.response;
      if (response?.response === 200 && isSendGrid) {
        toast.success(response?.message);
        setIsLoader(false);
        setSubmittedFormResponse(response);
      } else if (response?.response === 200) {
        toast.success(response?.message);
        setIsLoader(false);
        // setSubmittedFormResponse(response);

        setSubmittedEventResponse({
          ...response?.data,
          ...{
            selectedNode_id: selectedNode.id,
            eventId: selectedEvent?.id,
            intgId: selectedNode?.data?.intgId,
          },
        });

        onClickDiscardModal();
      } else {
        setIsLoader(false);
        Object.keys(validationErrors).forEach((key) => {
          toast.error(validationErrors[key]);
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    setFormJson(form ?? location?.state?.json);
    setStateFullData(selectedEvent ?? location?.state);
    const userData = localStorage.getItem('userData');

    if (userData) {
      // Do something with the userData
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", JSON.parse(userData));
      setUserDataLocal(JSON.parse(userData));
    }
  }, [form]);

  useEffect(() => {
    setCredentialsData(credentials ?? null);
    const userData = localStorage.getItem('userData');

    if (userData) {
      // Do something with the userData
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", JSON.parse(userData));
      setUserDataLocal(JSON.parse(userData));
    }
  }, [credentials]);

  useEffect(() => {
    const container = document.querySelector("#form");
    if (container && !formRender?.current) {
      const formEditor = new Form({
        container,
      });
      formEditor.importSchema(JSON.parse(formJson));
      formRender.current = formEditor;
    }
    formRender.current.on("submit", ({ data, errors }) => {
      const keys = Object.keys(errors);

      if (keys.length > 0) {
        // const firstKey = keys[0];
      } else {
        handleGetFormJson(data, errors, userDataLocal, userDetail);
      }
    });
    return () => {
      if (formRender.current) {
        formRender.current.destroy();
        formRender.current = null;
      }
    };
  }, [formJson]);

  const targetNodeRef = useRef(null);

  useEffect(() => {
    const callback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "childList" ||
          mutation.type === "characterData"
        ) {
          // DOM has changed, do something
          // console.log('DOM changed');
          const labels = document.querySelectorAll("label");
          labels.forEach((label) => {
            if (label.textContent === "hidden") {
              const parentDiv = label.parentNode;
              parentDiv.style.display = "none";
              parentDiv.className = "bg-danger"; // Note: It should be className, not class
            }
          });
        }
      }
    };
    const observer = new MutationObserver(callback);
    if (targetNodeRef.current) {
      observer.observe(targetNodeRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="container-xxl overflow-auto mt-4" ref={targetNodeRef}>
      <Row>
        <Col sm="12">
          <Card title="Striped">
            <CardBody>
              <CardText>{stateFullData?.name}</CardText>
            </CardBody>
            <div id="form"></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
