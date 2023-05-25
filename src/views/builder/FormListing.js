import React, { Fragment, useEffect, useState } from "react";
// import Table from './Table'
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  Label,
  Input,
  Spinner,
  Button,
} from "reactstrap";

import { toast } from "react-hot-toast";
// ** Styles
import "@styles/react/apps/app-users.scss";
import DataTableRender from "./DataTableRender";
import {
  formJsonEditorDelete,
  getEditorAllForm,
} from "../../../api/apiMethods";
import Divider from "../../components/Divider/Divider";
import { Plus, PlusSquare } from "react-feather";
import CustomModal from "../../components/CustomModal/CustomModal";
import {
  useGetModels,
  useGetRelatedModel,
} from "../../../api/config/formBuilderQueries";

export default function FormListing() {
  const TABLE_HEAD = [
    { id: "id", label: "#", alignRight: false, orderable: false },
    { id: "name", label: "Form Name", alignRight: false, orderable: true },
    { id: "Actions", label: "Actions", alignRight: false, orderable: false },
  ];
  const [formJson, setFormJson] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [models, setModels] = useState([]);
  const [stateFullData] = useState();
  const [modelId, setModelId] = useState("");
  const [modelType, setModelType] = useState("");
  const [nextOption, setNextOption] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [modelRelated, setModelRelated] = useState([]);

  const navigate = useNavigate();

  const modelsGet = useGetModels();

  useEffect(() => {
    if (modelsGet.isFetched && modelsGet.data) {
      setModels(modelsGet.data);
    }
  }, [modelsGet.data, modelsGet.isFetched, modelsGet.isFetching]);

  useEffect(() => {
    const fetchFormJson = async () => {
      setIsLoader(true);
      const formQuery = await getEditorAllForm(1);
      if (formQuery) {
        setFormJson(formQuery?.data);
        setIsLoader(false);
      }

      setIsLoader(false);
    };
    fetchFormJson();
  }, []);

  const onClickDiscardModal = () => {
    setShow(false);
    // setIsActiveMainFolder(false);
    // setIsActiveSubFolder(false);
  };

  const handleToggleModal = () => {
    setShow((prevState) => !prevState);
  };

  const ActiveApi = (action, row) => {
    if (action === "delete") {
      try {
        formJsonEditorDelete(row?.id).then((res) => {
          const message = res?.message;
          const validationErrors = res?.validation_errors;
          const response = res?.response;
          if (response === 200) {
            toast.success(message);
            const updatedData = formJson.filter((item) => item.id !== row?.id);
            setFormJson(updatedData);
          } else {
            console.log("✅ element    ", message, validationErrors, response);
            Object.keys(validationErrors).forEach((key) => {
              toast.error(validationErrors[key]);
            });
          }
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js:169 ~ handleCreateProject ~ error:",
          error
        );
      }
    }
    if (action === "view") {
      console.log("✅ row    ", row);
      navigate("/apps/view", { state: row });
    }
    if (action === "edit") {
      console.log("✅ row    ", row);
      navigate("/apps/editor", { state: row });
    }
    if (action === "create") {
      console.log("✅ row    ", row);
      navigate("/apps/editor");
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // onSearch(query);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleSelectChange = async (event) => {
    console.log(event.target.value);
    setModels(event.target.value);
    setModelType(event.target.value);
    const data = {
      model: event.target.value,
    };
    const modelsGetRelated = await useGetRelatedModel(data);
    console.log("✅ modelsGetRelated    ", modelsGetRelated);
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

  return (
    <div className="container-xxl overflow-auto">
      <Row>
        <Col sm="12">
          <Card title="Striped">
            <CardBody className="d-flex justify-content-between align-items-center">
              <Col md="4">
                <h3>Available Forms List</h3>
              </Col>
              <Col md="8">
                <Row className="d-flex justify-content-end align-items-center">
                  <Col
                    className="d-flex align-items-center justify-content-end "
                    md="8"
                    sm="12"
                  >
                    <Label className="me-1" for="search-input-1">
                      Search
                    </Label>
                    <Input
                      className="dataTable-filter"
                      type="text"
                      bsSize="md"
                      id="search-input-1"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </Col>
                  <Col md="4">
                    <Button
                      outline
                      color="primary"
                      onClick={() => navigate("/apps/editor")}
                    >
                      <Plus size={14} />
                      <span className="align-middle ms-25">Create New</span>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </CardBody>

            <Divider />
            {isLoader && (
              <div className="d-flex justify-content-center align-items-center p-5">
                <Spinner type="grow" color="primary" />
              </div>
            )}
            {!!formJson?.length && (
              <DataTableRender
                data={formJson}
                TABLE_HEAD={TABLE_HEAD}
                ActiveApi={ActiveApi}
                searchQuery={searchQuery}
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* <CustomModal
        toggleModal={handleToggleModal}
        onDiscard={onClickDiscardModal}
        show={show}
        modalClass="modal-lg"
      >
        <div className="p-1">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <Col md="4">
              <h3>Select a Category</h3>
              <p>Dummy text ......................</p>
            </Col>
            <Col md="8">
              <div className="d-flex container justify-content-end">
                <div className="me-2">
                  <Label className="form-label" for="basicInput">
                    Enter Form Name
                  </Label>
                  <Input
                    type="text"
                    id="basicInput"
                    placeholder="Name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label className="form-label" for="basicInput">
                    Select one model
                  </Label>
                  <select
                    id="payment-select"
                    className="form-select"
                    onChange={handleSelectChange}
                  >
                    <option value={null}>Select one model</option>
                    {models?.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              {nextOption && (
                <>
                  <Col className="mb-1" xl="3" md="6" sm="12">
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
            </Col>
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
    </div>
  );
}
