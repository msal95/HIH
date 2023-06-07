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
  console.log(
    "🚀 ~ file: ViewFormRender.js:22 ~ ViewFormRender ~ submission_id:",
    submission_id
  );

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
        console.log("✅ element    ", message, validationErrors, response);
        Object.keys(validationErrors).forEach((key) => {
          toast.error(validationErrors[key]);
        });
      }
      console.log("Response:", response);
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
  return (
    <div className="container-xxl overflow-auto mt-4">
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
