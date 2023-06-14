import React, { useEffect, useState } from "react";
import {
  Edit3,
  Eye,
  Folder,
  Image,
  Layers,
  MoreVertical,
  Trash2,
} from "react-feather";
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
import { getDMYFromDate } from "../../utility/customUtils/CustomUtils";
import moment from "moment";

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
    isProjects = false,
  } = props;

  const userData = localStorage.getItem("userData");

  const [userDetail, setUserDetail] = useState(userData ?? {});

  useEffect(() => {
    setUserDetail(JSON.parse(userData));
  }, [userData]);

  return (
    <div className={`col-md-${colNumber} col-sm-12 col-12`}>
      <Card className="custom-card shadow-none ">
        <CardHeader className="d-flex justify-content-between align-items-start custom-card__card-header">
          {!!image && (
            <img src={image} alt="Google Icon" width="37px" height="37px" />
          )}
          {isIcon && (
            <div className="custom-card__card-icon">
              {isProjects ? (
                <Layers size={14} color="#7367F0" />
              ) : (
                <Folder size={14} color="#7367F0" />
              )}
            </div>
          )}
          {userDetail?.role === "admin" && (
            <MoreVerticalDropdown
              handleView={() => onHandleView(data)}
              handleEdit={() => onHandleEdit(data)}
              handleDelete={() => onHandleDelete(data.id)}
            />
          )}
        </CardHeader>
        <CardBody>
          <CardTitle
            className={`${titleClass} p-0 m-0 cursor-pointer`}
            tag="h4"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={name}
            onClick={() => onHandleView(data)}
          >
            {name?.length > 10 ? `${name.substr(0, 10)}...` : name}
          </CardTitle>
          <CardText className="custom-card__sub-text mb-0">
            {/* Last 6 months */}
            {getDMYFromDate(data?.created_at)}
          </CardText>
          <p className="custom-card__text mb-0">
            Created {moment(data?.created_at).format("D MMM YYYY")}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
