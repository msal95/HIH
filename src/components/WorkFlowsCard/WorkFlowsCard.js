// ** React Imports
import { Fragment, forwardRef, useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  Edit3,
  Eye,
  MoreVertical,
  Search,
  Trash2,
} from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import axios from "axios";

// Local Imports
import arrowIcon from "@src/assets/images/icons/Arrow.png";
import nemtLogo from "@src/assets/images/icons/Nemt-logo.png";
import webHook from "@src/assets/images/icons/Webhook.png";
import sendGrid from "@src/assets/images/icons/social/sendgrid.png";
import "../../style/views/workFlows.scss";
import DropDown from "../DropDown/DropDown";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import MoreVerticalDropdown from "../MoreVerticalDropdown/MoreVerticalDropdown";
import {
  deleteWorkflow,
  editWorkflow,
  getWorkflowLists,
} from "../../../api/apiMethods";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

// ** Bootstrap Checkbox Component

const nodesData = [
  { id: 1, icon: nemtLogo },
  { id: 2, icon: arrowIcon, isIcon: true },
  { id: 3, icon: webHook },
  { id: 4, icon: sendGrid },
];

const options = [
  { id: 1, title: "Option 1" },
  { id: 2, title: "Option 2" },
  { id: 3, title: "Option 3" },
  { id: 4, title: "Option 4" },
];

const MySwal = withReactContent(Swal);

const filtersOptions = [
  {
    id: 1,
    title: "A to Z",
  },
  {
    id: 2,
    title: "Z to A",
  },
  {
    id: 3,
    title: "Active",
  },
  {
    id: 4,
    title: "InActive",
  },
];

const WorkFlowsCard = (props) => {
  const {
    selectedTab,
    isActiveMainFolder,
    isActiveSubFolder,
    isLoading,
    data,
    error,
    refetch,
    isFetching,
    isError,
  } = props;
  console.log(
    "🚀 ~ file: WorkFlowsCard.js:96 ~ WorkFlowsCard ~ selectedTab:",
    selectedTab
  );

  // const { isLoading, data, error, refetch, isError, isFetching } = useQuery(
  //   "workFLowsLists",
  //   async () => await getWorkflowLists()
  // );

  const [selectedRows, setSelectedRows] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [statusList, setStatusList] = useState({});
  const [workflowsList, setWorkFlowsList] = useState();
  const [flowsData, setFlowsData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  console.log(
    "🚀 ~ file: WorkFlowsCard.js:113 ~ WorkFlowsCard ~ selectedItem:",
    selectedItem
  );
  const [workflowName, setWorkflowName] = useState(selectedItem?.name || "");
  const [count, setCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!!data?.length) {
      setFlowsData(data);
      if (isActiveMainFolder) {
        const filteredProjectsWorkflows = data?.filter(
          (item) => item.project_id === selectedTab.id
        );
        setWorkFlowsList(filteredProjectsWorkflows);
        setFlowsData(filteredProjectsWorkflows);
        setCount(2);
      } else if (isActiveSubFolder) {
        const filteredProjectsWorkflows = data?.filter(
          (item) => item.folder_id === selectedTab.id
        );
        setWorkFlowsList(filteredProjectsWorkflows);
        setFlowsData(filteredProjectsWorkflows);
        setCount(2);
      }
    }
  }, [selectedTab]);

  useEffect(() => {
    // setWorkFlowsList(data?.data?.data);
    setFlowsData(data);
  }, [isFetching]);

  useEffect(() => {
    if (count > 1) {
      console.log(
        "🚀 ~ file: WorkFlowsCard.js:134 ~ useEffect ~ searchTerm?.length:",
        searchTerm?.length
      );
      const searchedData = flowsData?.filter((post) => {
        return post?.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setWorkFlowsList(searchedData);
    }
  }, [searchTerm]);

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleWorkFLowName = (event) => {
    setWorkflowName(event.target.value);
  };

  const handleCheckboxChange = async (item, itemId) => {
    setStatusList((prevStatusList) => ({
      ...prevStatusList,

      [itemId]: !prevStatusList[itemId],
    }));

    try {
      const projectData = {
        is_active: !!selectedRows?.length ? false : !item.status,
        workflow_ids: !!selectedRows?.length ? selectedRows : [item.id],
        project_id: selectedTab.id,
      };
      await editWorkflow(projectData).then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Status Updated Successfully.");
        }
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:342 ~ handleCreateProject ~ error:",
        error
      );
      toast.error(error?.response?.data?.message);
    }
  };

  const onHandleDelete = async (data) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
      preConfirm: async () => {
        const selectedIds = {
          workflow_ids: !!selectedRows?.length ? selectedRows : [data.id],
        };
        await deleteWorkflow(selectedIds);
        // const deletedItem = flowsData.filter((item) => item.id !== data.id);
        // setFlowsData(deletedItem);
      },
    }).then(function (result) {
      if (result.value) {
        refetch();
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your Workflow has been deleted.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const onPressEditWorkflowName = (item) => {
    setSelectedItem(item);
    setWorkflowName(item?.name);
    setIsEdit(true);
  };

  const handleEditWorkflow = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        name: workflowName,
        workflow_ids: [selectedItem.id],
        project_id: selectedItem.project_id,
        // parent_id: selectedNode.id,
      };
      await editWorkflow(projectData).then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Workflow name updated Successfully.");
          setSelectedItem(null);
          setIsEdit(false);
        }
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:169 ~ handleCreateProject ~ error:",
        error
      );

      toast.error(error?.response?.data?.message);
    }
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      const allRows = workflowsList.map((row) => row.id);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleOnSelectSort = (value) => {
    console.log(
      "🚀 ~ file: WorkFlowsCard.js:264 ~ handleOnSelectSort ~ value:",
      value
    );
    setSelectedOption(value);
    if (value === "A to Z") {
      const sortedList = [...workflowsList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setWorkFlowsList(sortedList);
      // setList(sortedList);
      // if (isProjects) {
      //   setSearchedFromProjects(sortedList);
      // } else if (isActiveMainFolder) {
      //   setSearchedFromFolders(sortedList);
      // }
    } else if (value === "Z to A") {
      const sortedList = [...workflowsList].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setWorkFlowsList(sortedList);
      // if (isProjects) {
      //   setSearchedFromProjects(sortedList);
      // } else if (isActiveMainFolder) {
      //   setSearchedFromFolders(sortedList);
      // }
    } else if (value === "Active") {
      // if()
      const sortedList = [...workflowsList].sort((a, b) => b.status - a.status);

      setWorkFlowsList(sortedList);
    } else if (value === "InActive") {
      const sortedList = [...workflowsList].sort((a, b) => a.status - b.status);
      setWorkFlowsList(sortedList);
    }
    // else {
    //   setSearchedFromProjects(data?.data?.data);
    //   setSearchedFromFolders(searchedFrom);
    // }
  };

  const handleItemSelection = (id) => {
    const existingItem = selectedRows.filter((item) => item === id);

    if (!!existingItem?.length) {
      setSelectedRows(selectedRows?.filter((item) => item !== id));
    } else {
      // selectedRows.push([id]);
      setSelectedRows([...selectedRows, id]);
    }
  };

  const allSelected = selectedRows?.length === workflowsList?.length;

  if (isError) {
    return (
      <h3 className="d-flex align-items-center justify-content-center p-2">
        {error?.message}
      </h3>
    );
  }

  if (!workflowsList?.length && isActiveMainFolder && !searchTerm?.length) {
    return (
      <h3 className="d-flex align-items-center justify-content-center p-2">
        No Workflows Found in this Project
      </h3>
    );
  }

  if (!workflowsList?.length && !searchTerm?.length) {
    return (
      <h3 className="d-flex align-items-center justify-content-center p-2">
        No Workflows Found in "{selectedTab?.name}"
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner type="grow" color="primary" />
      </div>
    );
  }

  return (
    <Fragment>
      <Card>
        <Row className="justify-content-end mx-0">
          <Col md="4" sm="12">
            <div className="d-flex  align-items-center mt-1">
              <div className="d-flex align-items-center checkbox-container">
                <Input
                  type="checkbox"
                  className="checkbox-input"
                  checked={allSelected}
                  onChange={handleSelectAllRows}
                />
                <UncontrolledDropdown className="chart-dropdown checkbox-icon">
                  <DropdownToggle
                    color=""
                    className="bg-transparent btn-sm p-0 "
                  >
                    <ChevronDown
                      size={18}
                      className="cursor-pointer"
                      color="#b9b9c3"
                    />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem className="w-100">
                      Delete Selected
                    </DropdownItem>
                    <DropdownItem
                      className="w-100"
                      onClick={() => {
                        handleCheckboxChange();
                        setIsActive(true);
                      }}
                    >
                      Active Selected
                    </DropdownItem>
                    <DropdownItem
                      className="w-100"
                      onClick={() => {
                        handleCheckboxChange();
                        setIsActive(false);
                      }}
                    >
                      InActive Selected
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <h4 className="checkbox-title">All Flows</h4>
            </div>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="8"
            sm="12"
          >
            <InputGroup className="input-group-merge w-100 me-1 ">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                placeholder="Search for App"
                value={searchTerm}
                onChange={handleSearchTerm}
              />
            </InputGroup>

            <DropDown
              title={selectedOption ?? "Filters"}
              options={filtersOptions}
              handleOnSelectSort={handleOnSelectSort}
            />
          </Col>
        </Row>
        {!workflowsList?.length && !!searchTerm?.length && (
          <NoRecordFound searchTerm={searchTerm} />
        )}
        {workflowsList?.map((item) => {
          return (
            <div
              key={item.id}
              className="flows-container d-flex  px-1 pt-1 m-1"
            >
              <div className="container-xxl p-0">
                <Col
                  md={12}
                  sm={12}
                  className="d-flex"
                  style={{ paddingBottom: 10 }}
                >
                  <Col md={4} sm={12} className="d-flex">
                    <div className="form-check me-1">
                      <Input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleItemSelection(item.id)}
                      />
                    </div>
                    <div>
                      {selectedItem?.id === item.id && isEdit ? (
                        <Form onSubmit={handleEditWorkflow}>
                          <Input
                            type="text"
                            name="name"
                            value={workflowName}
                            placeholder="Workflows Name"
                            onChange={handleWorkFLowName}
                            required
                            style={{ padding: 5, marginBottom: 10 }}
                          />
                        </Form>
                      ) : (
                        <p className="workflow-title">{item?.name}</p>
                      )}
                      <div className="d-flex align-items-center">
                        {nodesData?.map((item, index) => {
                          return (
                            <Fragment key={item.id}>
                              {!item.isIcon ? (
                                <div
                                  className={`flows-icons ${
                                    index > 1 && "ms-1"
                                  }`}
                                >
                                  <img
                                    src={item.icon}
                                    alt="NEMT Logo"
                                    width="24px"
                                    height="24px"
                                    style={{ padding: 2 }}
                                  />
                                </div>
                              ) : (
                                <img
                                  src={item.icon}
                                  alt="NEMT Logo"
                                  width="15px"
                                  height="8px"
                                />
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </Col>
                  <Col md={4} sm={12}>
                    <p className="workflow-sub-title">
                      {!!item.folder ? item?.folder?.name : item.project?.name}
                    </p>
                    <p className="workflow-edited-time m-0">
                      Edited 1 minute ago
                    </p>
                  </Col>
                  <Col md={4} sm={12} className="activity-container">
                    <div className="d-flex align-items-center">
                      <p className="workflow-activity p-0 m-0 me-1 ">
                        {!!item.status ? "Active" : "InActive"}
                      </p>
                      <FormGroup switch className="me-1">
                        <Input
                          className="primary cursor-pointer"
                          type="switch"
                          role="switch"
                          checked={!!item.status || statusList[item.id]}
                          onChange={() => handleCheckboxChange(item, item.id)}
                        />
                      </FormGroup>
                      <MoreVerticalDropdown
                        handleView={() => {}}
                        handleEdit={() => onPressEditWorkflowName(item)}
                        handleDelete={() => onHandleDelete(item)}
                      />
                    </div>
                    <p className="workflow-no-warning">No warning</p>
                  </Col>
                </Col>
              </div>
            </div>
          );
        })}
      </Card>
    </Fragment>
  );
};

export default WorkFlowsCard;
