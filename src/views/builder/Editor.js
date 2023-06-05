import { FormEditor } from "@bpmn-io/form-js";
import React, { useEffect, useRef, useState } from "react";
import schema from "./schema.json";

import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import "@bpmn-io/form-js/dist/assets/form-js.css";
import { ChevronLeft, Edit2, PlusSquare } from "react-feather";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Input,
  Label,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import { formJsonEditor } from "../../../api/apiMethods";
import {
  useGetModels,
  useGetRelatedModel,
} from "../../../api/config/formBuilderQueries";
import CustomModal from "../../components/CustomModal/CustomModal";
import Divider from "../../components/Divider/Divider";
import Tabs from "./Tabs";
import "./builder.css";
export default function Editor() {
  // get modes options
  const modelsGet = useGetModels();
  const [models, setModels] = useState([]);
  const [nextOption, setNextOption] = useState(false);
  const [modelRelated, setModelRelated] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  useEffect(() => {
    if (modelsGet.isFetched && modelsGet.data) {
      setModels(modelsGet.data);
    }
  }, [modelsGet.data, modelsGet.isFetched, modelsGet.isFetching]);

  // get modes options
  const formEditorRef = useRef(null);
  const location = useLocation();
  console.log("🚀 ~ file: Editor.js:50 ~ Editor ~ location:", location);
  const [formJson] = useState(location?.state?.row?.json);
  const [stateFullData] = useState(location?.state?.row);
  const [name, setName] = useState(stateFullData?.name ?? "Untitled");
  const [model, setModel] = useState(stateFullData?.model ?? "");
  const [modelId, setModelId] = useState(
    location?.state?.row?.related_id ?? ""
  );
  const [modelType, setModelType] = useState(
    location?.state?.row?.related_type ?? ""
  );
  const [editorId] = useState(stateFullData?.id ?? null);
  const [activeTab, setActiveTab] = useState("1");
  const [isEditFormName, setIsEditFormName] = useState(false);
  const [show, setShow] = useState(
    !!location?.state?.isEdit ? !location?.state?.isEdit : true
  );
  const [isLoader, setIsLoader] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const container = document.querySelector("#form-editor");
    console.log("🚀 ~ file: Editor.js:67 ~ useEffect ~ container:", container);
    if (container && !formEditorRef.current) {
      const formEditor = new FormEditor({
        container,
      });
      if (location?.state?.row?.id > 0) {
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
  }, [formJson, isLoader]);

  useEffect(() => {
    setIsLoader(true);
    const timer = setTimeout(() => {
      setIsLoader(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setIsEditFormName(false);
      } else if (event.key === "Escape") {
        setIsEditFormName(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleEditFormName = () => {
    setIsEditFormName(true);
  };

  const handleGetFormJson = async () => {
    try {
      const formJson = formEditorRef.current.saveSchema();
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
        navigate("/apps/form/listing");
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
    setName(event.target.value);
  };

  const handleSelectChange = async (event) => {
    setModel(event.target.value);
    setModelType(event.target.value);
    const data = {
      model: event.target.value,
    };

    const modelsGetRelated = await useGetRelatedModel(data);
    setModelRelated(modelsGetRelated);
    setNextOption(true);
  };

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

  const onClickDiscardModal = () => {
    setShow(false);
  };

  const handleToggleModal = () => {
    if (!!modelType && isSwitchOn) {
      setShow((prevState) => !prevState);
    } else if (!!modelType && !isSwitchOn && !!modelId) {
      setShow((prevState) => !prevState);
    } else {
      toast.error("Select One Model is required");
    }
  };

  return (
    <Card className="container-xxl overflow-auto pt-1">
      {/* <h2 className="text-primary py-2">Form Builder</h2> */}
      <Row className="mb-2">
        <Col xs={12}>
          {!show && (
            <>
              <div className="d-flex">
                <Link to="/apps/form/listing" className="d-flex">
                  <ChevronLeft
                    size={27}
                    className="me-1 bg-opacity-50 bg-primary"
                    style={{
                      width: 30,
                      borderRadius: 16,
                    }}
                    color="white"
                  />
                  Back to Listing
                </Link>
                <div className="d-flex container justify-content-between align-items-center">
                  <div className="d-flex align-items-center mb-1">
                    {!isEditFormName ? (
                      <h3>{name}</h3>
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
                  <div>
                    <Button
                      color="primary"
                      className="mb-2 me-1"
                      outline
                      onClick={() => {}}
                      disabled={!(name !== "" && model !== "Select one model")}
                    >
                      Preview
                    </Button>
                    <Button
                      color="primary"
                      className="mb-2"
                      onClick={handleGetFormJson}
                      disabled={!(name !== "" && model !== "Select one model")}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
              <Divider />
            </>
          )}
          <Col sm="12">
            <div title="Striped" className="p-2 pb-1">
              <CardHeader className="p-0 m-0">
                <Tabs
                  className="mb-2"
                  activeTab={activeTab}
                  toggleTab={toggleTab}
                />
              </CardHeader>
            </div>
          </Col>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {show && (
                <div className="p-1">
                  {isLoader ? (
                    <div className="d-flex justify-content-center align-items-center p-5">
                      <Spinner type="grow" color="primary" />
                    </div>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-1">
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
                              To speed up the process you can select from one of
                              our pre-made templates, start with a blank form
                              and create your own.
                            </p>
                          </Col>
                          <Col
                            className="mb-1"
                            xl={!nextOption ? "4" : "3"}
                            md="6"
                            sm="12"
                          >
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
                                  <Label
                                    className="form-label"
                                    for="basicInput"
                                  >
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
                      </div>

                      <Divider />

                      <Button
                        outline
                        color="primary"
                        className="d-flex"
                        onClick={handleToggleModal}
                      >
                        <PlusSquare size={22} className="mt-1" />
                        <div className="ms-2">
                          <p style={{ textAlign: "left" }} className="m-0 p-0">
                            Create New
                          </p>
                          <p>Create new form from scratch</p>
                        </div>
                      </Button>
                    </>
                  )}
                </div>
              )}
              {!show && (
                <Row>
                  {isLoader && (
                    <div className="d-flex justify-content-center align-items-center p-5">
                      <Spinner type="grow" color="primary" />
                    </div>
                  )}
                  {/* ) : (
                    <Col sm="12">
                      <div title="Striped" className="p-2 pb-1">
                        <CardHeader className="p-0 m-0">
                          <Tabs
                            className="mb-2"
                            activeTab={activeTab}
                            toggleTab={toggleTab}
                          />
                        </CardHeader>
                        <div className="" id="form-editor"></div>
                      </div>
                    </Col>
                  )} */}
                </Row>
              )}

              {!show && <div className="" id="form-editor"></div>}
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

      {/* <CustomModal
        toggleModal={handleToggleModal}
        onDiscard={onClickDiscardModal}
        show={show}
        modalClass="modal-lg"
      >
        <div className="p-1">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <CardBody>
              <CardText>{stateFullData?.name}</CardText>
            </CardBody>
            <Row className="mb-3">
              <Col className="mb-1" xl={nextOption ? "5" : "7"} md="6" sm="12">
                <h3>Select Category</h3>
                <p>
                  To speed up the process you can select from one of our
                  pre-made templates, start with a blank form and create your
                  own.
                </p>
              </Col>
              <Col className="mb-1" xl={!nextOption ? "4" : "3"} md="6" sm="12">
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
                    models?.map((item) => <option key={item}>{item}</option>)}
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
          </div>

          <Divider />

          <Button
            outline
            color="primary"
            className="d-flex"
            onClick={handleToggleModal}
          >
            <PlusSquare size={22} className="mt-1" />
            <div className="ms-2">
              <p style={{ textAlign: "left" }} className="m-0 p-0">
                Create New
              </p>
              <p>Create new form from scratch</p>
            </div>
          </Button>
        </div>
      </CustomModal> */}
    </Card>
  );
}
