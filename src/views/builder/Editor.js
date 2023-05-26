import React, { useEffect, useRef, useState } from "react";
import { FormEditor } from "@bpmn-io/form-js";
import schema from "./schema.json";

import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import { toast } from "react-hot-toast";
import "./builder.css";
import { formJsonEditor } from "../../../api/apiMethods";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  Col,
  Row,
  Button,
  Label,
  Input,
  TabContent,
  TabPane,
  CardHeader,
} from "reactstrap";
import {
  useGetModels,
  useGetRelatedModel,
} from "../../../api/config/formBuilderQueries";
import Tabs from "./Tabs";
import Divider from "../../components/Divider/Divider";
import { Edit2 } from "react-feather";
export default function Editor() {
  // get modes options
  const modelsGet = useGetModels();
  const [models, setModels] = useState([]);
  const [nextOption, setNextOption] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [modelRelated, setModelRelated] = useState([]);

  useEffect(() => {
    if (modelsGet.isFetched && modelsGet.data) {
      setModels(modelsGet.data);
    }
  }, [modelsGet.data, modelsGet.isFetched, modelsGet.isFetching]);

  // get modes options
  const formEditorRef = useRef(null);
  const location = useLocation();
  const [formJson] = useState(location?.state?.json);
  const [stateFullData] = useState(location?.state);
  const [name, setName] = useState(stateFullData?.name ?? "Untitled");
  const [model, setModel] = useState(stateFullData?.model ?? "");
  const [modelId, setModelId] = useState(stateFullData?.model_id ?? "");
  const [modelType, setModelType] = useState(stateFullData?.model_type ?? "");
  const [editorId] = useState(stateFullData?.id ?? null);
  const [activeTab, setActiveTab] = useState("1");
  const [isEditFormName, setIsEditFormName] = useState(false);

  useEffect(() => {
    const container = document.querySelector("#form-editor");
    if (container && !formEditorRef.current) {
      const formEditor = new FormEditor({
        container,
      });
      if (location?.state?.id > 0) {
        formEditor.importSchema(JSON.parse(formJson));
      } else {
        formEditor.importSchema(schema);
      }
      formEditorRef.current = formEditor;
    }
    return () => {
      if (formEditorRef.current) {
        formEditorRef.current.destroy();
        formEditorRef.current = null;
      }
    };
  }, [formJson]);

  const handleEditFormName = () => {
    setIsEditFormName(true);
  };

  const handleGetFormJson = async () => {
    try {
      const formJson = formEditorRef.current.saveSchema();
      console.log("formJson:", JSON.stringify(formJson));
      const formJsonData = JSON.stringify(formJson);
      const data = {
        data: formJsonData,
        name,
        user_id: 1,
        editor_id: editorId,
        modelId,
        modelType,
      };
      const res = await formJsonEditor(data);
      const message = res?.message;
      const validationErrors = res?.validation_errors;
      const response = res?.response;
      if (response === 200) {
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
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleSelectChange = async (event) => {
    console.log(event.target.value);
    setModel(event.target.value);
    setModelType(event.target.value);
    const data = {
      model: event.target.value,
    };
    const modelsGetRelated = await useGetRelatedModel(data);
    console.log("✅ modelsGetRelated    ", modelsGetRelated);
    setModelRelated(modelsGetRelated);
    setNextOption(true);
  };
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const handleSwitchToggle = () => {
    setIsSwitchOn((prevValue) => !prevValue);
    console.log(`Switch is ${isSwitchOn ? "On" : "Off"}`);
    if (!isSwitchOn) {
      setModelId(null);
    }
  };

  const handleSelectOneChange = (event) => {
    console.log(event.target.value);
    setModelId(event.target.value);
    // setNextOption(true);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-xxl overflow-auto">
      <h2 className="text-primary py-2">Form Builder</h2>
      <Row className="mb-2">
        <Col xs={12}>
          <Tabs className="mb-2" activeTab={activeTab} toggleTab={toggleTab} />
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Card title="Striped" className="px-2 pb-1">
                <CardBody>
                  <CardText>{stateFullData?.name}</CardText>
                </CardBody>
                <Row className="mb-3">
                  <Col
                    className="mb-1"
                    xl={nextOption ? "5" : "7"}
                    md="6"
                    sm="12"
                  >
                    <h3>Select Category</h3>
                    <p>
                      To speed up the process you can select from one of our
                      pre-made templates, start with a blank form and create
                      your own.
                    </p>
                    {/* <Label className="form-label" for="basicInput">
                      Enter Form Name
                    </Label>
                    <Input
                      type="text"
                      id="basicInput"
                      placeholder="Name"
                      value={name}
                      onChange={handleInputChange}
                    /> */}
                  </Col>
                  <Col className="mb-1" xl="3" md="6" sm="12">
                    <Label className="form-label" for="basicInput">
                      Select one model
                    </Label>
                    <select
                      id="payment-select"
                      className="form-select form-select-lg mb-3"
                      onChange={handleSelectChange}
                    >
                      <option value={null}>Select one model</option>
                      {models &&
                        models?.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                    </select>
                  </Col>
                  {nextOption && (
                    <>
                      <Col className="mb-1" xl="1" md="6" sm="12">
                        <Label className="form-label" for="basicInput">
                          For All
                        </Label>
                        <div className="form-check form-switch">
                          <Input
                            type="checkbox"
                            checked={isSwitchOn}
                            onChange={handleSwitchToggle}
                          />
                        </div>
                      </Col>
                      {!isSwitchOn && (
                        <Col className="mb-1" xl="3" md="6" sm="12">
                          <Label className="form-label" for="basicInput">
                            Select
                          </Label>
                          <select
                            id="select type"
                            className="form-select form-select-lg mb-3"
                            onChange={handleSelectOneChange}
                          >
                            <option value={null}>Select one </option>
                            {modelRelated &&
                              modelRelated.map((item) => (
                                <option key={item?.id} value={item?.id}>
                                  {item?.name}
                                </option>
                              ))}
                          </select>
                        </Col>
                      )}
                    </>
                  )}
                </Row>
              </Card>
              <Row>
                <Col sm="12">
                  <Card title="Striped" className="p-2 pb-1">
                    <CardHeader className="p-0 m-0">
                      <div className="d-flex container justify-content-between align-items-center">
                        <div className="d-flex">
                          {!isEditFormName ? (
                            <h3>Untitled</h3>
                          ) : (
                            <Input
                              type="text"
                              id="basicInput"
                              placeholder="Name"
                              value={name}
                              onChange={handleInputChange}
                            />
                          )}
                          {!isEditFormName && (
                            <Edit2
                              size={16}
                              className="ms-2"
                              onClick={handleEditFormName}
                            />
                          )}
                        </div>
                        <Button.Ripple
                          color="primary"
                          className="mb-2"
                          onClick={handleGetFormJson}
                          disabled={
                            !(name !== "" && model !== "Select one model")
                          }
                        >
                          Save
                        </Button.Ripple>
                      </div>
                      <Divider />
                    </CardHeader>
                    <div className="" id="form-editor"></div>
                    {/* <Col sm="12 mt-4">
                      {console.log(
                        '✅ model === "Select one model" ',
                        model === "Select one model",
                        !name === "",
                        !(name !== "") && model !== "Select one model"
                      )}
                     
                    </Col> */}
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <h3>Tab2</h3>
            </TabPane>
            <TabPane tabId="3">
              <h3>Tab3</h3>
            </TabPane>
            <TabPane tabId="4">
              {/* <NotificationsTabContent /> */}
              <h3>Tab 4</h3>
            </TabPane>
            <TabPane tabId="5">
              {/* <ConnectionsTabContent /> */}
              <h3>Tab 5</h3>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      {/* <Row>
        <Col sm="12">
          <Card title="Striped" className="px-2 pb-1">
            <div className="" id="form-editor"></div>
            <Col sm="12 mt-4">
              {console.log(
                '✅ model === "Select one model" ',
                model === "Select one model",
                !name === "",
                !(name !== "") && model !== "Select one model"
              )}
              <Button.Ripple
                color="primary"
                onClick={handleGetFormJson}
                disabled={!(name !== "" && model !== "Select one model")}
              >
                Save
              </Button.Ripple>
            </Col>
          </Card>
        </Col>
      </Row> */}
    </div>
  );
}
