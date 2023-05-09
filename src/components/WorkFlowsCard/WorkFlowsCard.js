// ** React Imports
import { Fragment, forwardRef, useState } from "react";

// ** Table Data & Columns
import ExpandableTable, { data, columns } from "./data";

// ** Add New Modal Component
// import AddNewModal from "./AddNewModal";

// ** Third Party Components
import {
  ChevronDown,
  Edit3,
  Eye,
  MoreVertical,
  Search,
  Trash2,
} from "react-feather";

// ** Reactstrap Imports
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
  UncontrolledDropdown,
} from "reactstrap";

import arrowIcon from "@src/assets/images/icons/Arrow.png";
import nemtLogo from "@src/assets/images/icons/Nemt-logo.png";
import webHook from "@src/assets/images/icons/Webhook.png";
import sendGrid from "@src/assets/images/icons/social/sendgrid.png";
import "../../style/views/workFlows.scss";
import DropDown from "../DropDown/DropDown";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";

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

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const WorkFlowsCard = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // ** Function to handle filter
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={10}
      breakLabel={"..."}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName={
        "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1"
      }
    />
  );
  return (
    <Fragment>
      <Card>
        <Row className="justify-content-end mx-0">
          <Col md="4" sm="12">
            <div className="d-flex  align-items-center mt-1">
              <div className="d-flex align-items-center checkbox-container">
                <Input type="checkbox" className="checkbox-input" />
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
                // value={searchedList}
                placeholder="Search for App"
                // onChange={handleSearchedList}
              />
            </InputGroup>

            <DropDown title="Filters" options={options} />
          </Col>
        </Row>
        {/* <div className="flows-container d-flex  px-1 pt-1 m-1">
          <div className="container p-0">
            <Col md={12} className="d-flex">
              <div className="form-check me-1">
                <Input type="checkbox" />
              </div>
              <Col md={4}>
                <p className="workflow-title">Real-time Trip Activity Alerts</p>
              </Col>
              <Col md={4}>
                <p className="workflow-sub-title">Activity Notifications</p>
              </Col>
              <Col md={4} className="activity-container">
                <div className="d-flex align-items-center">
                  <p className="workflow-activity p-0 m-0 me-1 ">Activity</p>
                  <FormGroup switch className="me-1">
                    <Input className="primary" type="switch" role="switch" />
                  </FormGroup>
                  <UncontrolledDropdown
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
                        // onClick={() => onHandleDelete(data)}
                      >
                        <Trash2 size={17} className="me-1" />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Col>
            </Col>
            <Col md={12} className="d-flex">
              <Col md={4} className="ms-3">
                <div className="d-flex align-items-center">
                  {nodesData?.map((item, index) => {
                    return (
                      <Fragment key={item.id}>
                        {!item.isIcon ? (
                          <div className={`flows-icons ${index > 1 && "ms-1"}`}>
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
              </Col>
              <Col md={4}>
                <p className="workflow-edited-time">Edited 1 minute ago</p>
              </Col>
              <Col md={4} className="activity-container">
                <p className="workflow-no-warning">No warning</p>
              </Col>
            </Col>
          </div>
        </div> */}
        {/* <div className="flows-container d-flex  px-1 pt-1 m-1">
          <div className="container p-0">
            <Col md={12} sm={12} className="d-flex">
              <Col md={4} sm={12} className="d-flex">
                <div className="form-check me-1">
                  <Input type="checkbox" />
                </div>
                <div>
                  <p className="workflow-title">
                    Real-time Trip Activity Alerts
                  </p>
                  <div className="d-flex align-items-center">
                    {nodesData?.map((item, index) => {
                      return (
                        <Fragment key={item.id}>
                          {!item.isIcon ? (
                            <div
                              className={`flows-icons ${index > 1 && "ms-1"}`}
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
                <p className="workflow-sub-title">Activity Notifications</p>
                <p className="workflow-edited-time">Edited 1 minute ago</p>
              </Col>
              <Col md={4} sm={12} className="activity-container">
                <div className="d-flex align-items-center">
                  <p className="workflow-activity p-0 m-0 me-1 ">Activity</p>
                  <FormGroup switch className="me-1">
                    <Input className="primary" type="switch" role="switch" />
                  </FormGroup>
                  <UncontrolledDropdown
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
                        // onClick={() => onHandleDelete(data)}
                      >
                        <Trash2 size={17} className="me-1" />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                <p className="workflow-no-warning">No warning</p>
              </Col>
            </Col>
          </div>
        </div> */}
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            data={data}
            columns={columns}
            // selectableRows
            className="react-dataTable"
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            // selectableRowsComponent={BootstrapCheckbox}
            highlightOnHover
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default WorkFlowsCard;
