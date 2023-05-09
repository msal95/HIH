// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import axios from "axios";
import {
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Eye,
  Edit3,
  Trash2,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  FormGroup,
} from "reactstrap";

import arrowIcon from "@src/assets/images/icons/Arrow.png";
import nemtLogo from "@src/assets/images/icons/Nemt-logo.png";
import webHook from "@src/assets/images/icons/Webhook.png";
import sendGrid from "@src/assets/images/icons/social/sendgrid.png";
import { Fragment } from "react";
import { useEffect } from "react";

// ** Vars
const states = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];

const status = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Professional", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

const nodesData = [
  { id: 1, icon: nemtLogo },
  { id: 2, icon: arrowIcon, isIcon: true },
  { id: 3, icon: webHook },
  { id: 4, icon: sendGrid },
];

export let data;

// ** Get initial Data
axios.get("/api/datatables/initial-data").then((response) => {
  data = response.data;
});

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: "ID",
    sortable: true,
    maxWidth: "100px",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    sortable: true,
    minWidth: "225px",
    selector: (row) => row.full_name,
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "310px",
    selector: (row) => row.email,
  },
  {
    name: "Position",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.post,
  },
  {
    name: "Age",
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.age,
  },
  {
    name: "Salary",
    sortable: true,
    minWidth: "175px",
    selector: (row) => row.salary,
  },
];
// ** Table ReOrder Column
export const reOrderColumns = [
  {
    name: "ID",
    reorder: true,
    sortable: true,
    maxWidth: "100px",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    reorder: true,
    sortable: true,
    minWidth: "225px",
    selector: (row) => row.full_name,
  },
  {
    name: "Email",
    reorder: true,
    sortable: true,
    minWidth: "310px",
    selector: (row) => row.email,
  },
  {
    name: "Position",
    reorder: true,
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.post,
  },
  {
    name: "Age",
    reorder: true,
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.age,
  },
  {
    name: "Salary",
    reorder: true,
    sortable: true,
    minWidth: "175px",
    selector: (row) => row.salary,
  },
];

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className="expandable-content p-2">
      <p>
        <span className="fw-bold">City:</span> {data.city}
      </p>
      <p>
        <span className="fw-bold">Experience:</span> {data.experience}
      </p>
      <p className="m-0">
        <span className="fw-bold">Post:</span> {data.post}
      </p>
    </div>
  );
};

// ** Table Common Column
export const columns = [
  {
    // name: "Name",
    minWidth: "250px",
    // sortable: (row) => row.full_name,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="form-check me-1">
          <Input type="checkbox" />
        </div>
        <div>
          <p className="workflow-title">Real-time Trip Activity Alerts</p>
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
        </div>
      </div>
    ),
  },
  {
    // name: "Email",
    // sortable: true,
    // minWidth: "150px",
    // selector: (row) => row.email,
    cell: (row) => (
      <div>
        <p className="workflow-sub-title">Activity Notifications</p>
        <p className="workflow-edited-time m-0">Edited 1 minute ago</p>
      </div>
    ),
  },
  {
    // name: "Date",
    // sortable: true,
    // minWidth: "250px",
    // selector: (row) => row.start_date,
    cell: (row) => (
      <>
        <div className="activity-container">
          <div className="d-flex align-items-center">
            <p className="workflow-activity p-0 m-0 me-1 ">Active</p>
            <FormGroup switch className="me-1">
              <Input className="primary" type="switch" checked role="switch" />
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
          <p className="workflow-no-warning m-0">No warning</p>
        </div>
      </>
    ),
  },
];

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.full_name,
  },
  {
    name: "Position",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.post,
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.email,
  },
  {
    name: "Date",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.start_date,
  },

  {
    name: "Salary",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.salary,
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.status,
    cell: (row) => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      );
    },
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    },
  },
];

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: "Full Name",
    minWidth: "225px",
    selector: (row) => row.full_name,
  },
  {
    sortable: true,
    name: "Email",
    minWidth: "250px",
    selector: (row) => row.email,
  },
  {
    sortable: true,
    name: "Position",
    minWidth: "250px",
    selector: (row) => row.post,
  },
  {
    sortable: true,
    name: "Office",
    minWidth: "150px",
    selector: (row) => row.city,
  },
  {
    sortable: true,
    name: "Start Date",
    minWidth: "150px",
    selector: (row) => row.start_date,
  },
  {
    sortable: true,
    name: "Salary",
    minWidth: "150px",
    selector: (row) => row.salary,
  },
];

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.full_name,
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.email,
  },
  {
    name: "Post",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.post,
  },
  {
    name: "City",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.city,
  },
  {
    name: "Date",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.start_date,
  },

  {
    name: "Salary",
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.salary,
  },
];

export default ExpandableTable;
