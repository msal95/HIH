// ** React Imports
import { Fragment, forwardRef, useEffect, useState } from "react";
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

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

let newData;

// ** Get initial Data
axios.get("/api/datatables/initial-data").then((response) => {
  newData = response.data;
});

const WorkFlowsCard = (props) => {
  const {} = props;

  const { isLoading, data, error, refetch, isError, isFetching } = useQuery(
    "workFLowsLists",
    async () => await getWorkflowLists()
  );

  console.log("🚀 ~ file: WorkFlowsCard.js:81 ~ WorkFlowsCard ~ data:", data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [statusList, setStatusList] = useState({});
  const [workflowsList, setWorkFlowsList] = useState(data?.data);
  console.log(
    "🚀 ~ file: WorkFlowsCard.js:78 ~ WorkFlowsCard ~ workflowsList:",
    workflowsList
  );
  const [flowsData, setFlowsData] = useState(newData);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setWorkFlowsList(data?.data);
  }, [isFetching]);

  useEffect(() => {
    const searchedData = newData.filter((post) => {
      return post.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFlowsData(searchedData);
  }, [searchTerm]);

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = async (item, itemId) => {
    console.log(
      "🚀 ~ file: WorkFlowsCard.js:98 ~ handleCheckboxChange ~ itemId:",
      itemId,
      item.status
    );
    setStatusList((prevStatusList) => ({
      ...prevStatusList,

      [itemId]: !prevStatusList[itemId],
    }));

    try {
      const projectData = {
        is_active: !item.status,
      };
      await editWorkflow(projectData, itemId).then((res) => {
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
        await deleteWorkflow(data.id);
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

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      const allRows = newData.map((row) => row.id);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleItemSelection = (id) => {
    const existingItem = selectedRows.filter((item) => item === id);

    if (!!existingItem.length) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    } else {
      // selectedRows.push([id]);
      setSelectedRows([...selectedRows, id]);
    }
  };

  const allSelected = selectedRows.length === newData.length;

  if (!workflowsList?.length) {
    return (
      <h3 className="d-flex align-items-center justify-content-center p-2">
        No Workflows Found in this Project
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
                    <DropdownItem className="w-100">Last 28 Days</DropdownItem>
                    <DropdownItem className="w-100">Last Month</DropdownItem>
                    <DropdownItem className="w-100">Last Year</DropdownItem>
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

            <DropDown title="Filters" options={options} />
          </Col>
        </Row>
        {!flowsData.length && <NoRecordFound searchTerm={searchTerm} />}
        {workflowsList.map((item) => {
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
                      <p className="workflow-title">{item.name}</p>
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
                      {!!item.folder ? item.folder.name : item.project.name}
                    </p>
                    <p className="workflow-edited-time m-0">
                      Edited 1 minute ago
                    </p>
                  </Col>
                  <Col md={4} sm={12} className="activity-container">
                    <div className="d-flex align-items-center">
                      <p className="workflow-activity p-0 m-0 me-1 ">
                        {isChecked ? "Active" : "InActive"}
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
                        handleEdit={() => handleEditFolderModal(item)}
                        handleDelete={() => onHandleDelete(item)}
                      />
                      {/* <UncontrolledDropdown
                        className="chart-dropdown"
                        style={{
                          marginLeft: 2,
                        }}
                      >
                        <DropdownToggle
                          color=""
                          className="bg-transparent btn-sm border-0 p-0"
                        >
                          <MoreVertical size={18} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem
                            className="w-100"
                            // onClick={() => onHandleView(data)}
                          >
                            <Eye size={17} className="me-1" />
                            View
                          </DropdownItem>
                          <DropdownItem
                            className="w-100"
                            // onClick={() => onHandleEdit(data)}
                          >
                            <Edit3 size={17} className="me-1" />
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            className="w-100"
                            onClick={() => onHandleDelete(item)}
                          >
                            <Trash2 size={17} className="me-1" />
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
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
