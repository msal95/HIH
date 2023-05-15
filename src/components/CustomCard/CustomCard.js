import React from "react";
import { Edit3, Eye, Folder, Image, MoreVertical, Trash2 } from "react-feather";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import "../../style/components/customCard.scss";
import MoreVerticalDropdown from "../MoreVerticalDropdown/MoreVerticalDropdown";

export default function CustomCard(props) {
  const {
    name,
    image,
    onHandleEdit,
    onHandleView,
    onHandleDelete,
    data,
    colNumber = 3,
    isIcon,
    titleClass = "custom-card__heading",
  } = props;

  return (
    <div className={`col-md-${colNumber} col-sm-12 col-12`}>
      <Card className="custom-card shadow-none ">
        <CardHeader className="d-flex justify-content-between align-items-start custom-card__card-header">
          {!!image && (
            <img
              src={import.meta.env.VITE_API_URL + image}
              alt="Google Icon"
              width="37px"
              height="37px"
            />
          )}
          {isIcon && (
            <div className="custom-card__card-icon">
              <Folder size={14} color="#7367F0" />
            </div>
          )}
          <MoreVerticalDropdown
            handleView={() => onHandleView(data)}
            handleEdit={() => onHandleEdit(data)}
            handleDelete={() => onHandleDelete(data)}
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
                onClick={() => onHandleView(data)}
              >
                <Eye size={17} className="me-1" />
                View
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => onHandleEdit(data)}
              >
                <Edit3 size={17} className="me-1" />
                Edit
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => onHandleDelete(data)}
              >
                <Trash2 size={17} className="me-1" />
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </CardHeader>
        <CardBody>
          <CardTitle
            className={`${titleClass} p-0 m-0`}
            tag="h4"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={name}
            onClick={() => onHandleView(data)}
          >
            {name?.length > 10 ? `${name.substr(0, 10)}...` : name}
          </CardTitle>
          <CardText className="custom-card__sub-text mb-0">
            Last 6 months
          </CardText>
          <p className="custom-card__text mb-0">Created 27 Feb 2023</p>
        </CardBody>
      </Card>
    </div>
  );
}
