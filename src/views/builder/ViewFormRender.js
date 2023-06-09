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
  } = props;
  console.log("🚀 ~ file: ViewFormRender.js:22 ~ ViewFormRender ~ form:", form);
  const location = useLocation();

  const formRender = useRef(null);
  const [formJson] = useState(form ?? location?.state?.json);
  const [stateFullData] = useState(selectedEvent ?? location?.state);

  const handleGetFormJson = async (data, errors) => {
    const formValue = JSON.stringify(data);

    try {
      const formValueData = {
        form_builders_id: stateFullData?.id,
        submission_id,
        data: formValue,
        name: stateFullData?.name,
        user_id: 1,
      };
      const response = await formValueSave(formValueData);

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
        Object.keys(validationErrors).forEach((key) => {
          toast.error(validationErrors[key]);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      handleGetFormJson(data, errors);
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
          console.log("DOM changed");
          const labels = document.querySelectorAll("label");
          labels.forEach((label) => {
            console.log(
              "🚀 ~ file: ViewFormRender.js:100 ~ useEffect ~ label:",
              label.textContent
            );
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
