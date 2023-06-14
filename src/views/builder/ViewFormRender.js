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
  } = props;

  const location = useLocation();

  const userData = localStorage?.getItem("userData");

  const formRender = useRef(null);
  const [formJson, setFormJson] = useState(form ?? location?.state?.json);
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

  const handleGetFormJson = async (data, errors) => {
    const formValue = JSON.stringify(data);
    setIsLoader(true);

    try {
      const formValueData = {
        form_builders_id: stateFullData?.id,
        submission_id,
        data: formValue,
        name: stateFullData?.name,
        user_id: 1,
        credentialData,
        selectAuth,
      };
      const response = await formValueSave(formValueData);

      if (response?.response === 200) {
        setSubmittedFormResponse(response);
        toast.success(response?.message);
        setIsLoader(false);
      }

      const message = response?.message;
      const validationErrors = response?.validation_errors;
      const res = response?.response;
      if (res === 200) {
        setSubmittedEventResponse({
          ...response?.data,
          ...{
            selectedNode_id: selectedNode.id,
            eventId: selectedEvent?.id,
            intgId: selectedNode?.data?.intgId,
          },
        });
        onClickDiscardModal();
        toast.success(message);
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
  }, [form]);

  useEffect(() => {
    setCredentialsData(credentials ?? null);
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
        handleGetFormJson(data, errors);
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
