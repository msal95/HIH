import React from "react";
import { Edit3, Eye, MoreVertical, Trash2 } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export default function MoreVerticalDropdown(props) {
  const {
    handleView,
    handleEdit,
    handleDelete,
    isView = false,
    iconColor = "#b9b9c3",
  } = props;
  return (
    <UncontrolledDropdown
      className="chart-dropdown"
      style={{
        marginLeft: 2,
      }}
    >
      <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-0">
        <MoreVertical size={18} className="cursor-pointer" color={iconColor} />
      </DropdownToggle>
      <DropdownMenu end>
        {!isView && (
          <DropdownItem className="w-100" onClick={handleView}>
            <Eye size={17} className="me-1" />
            View
          </DropdownItem>
        )}
        <DropdownItem className="w-100" onClick={handleEdit}>
          <Edit3 size={17} className="me-1" />
          Edit
        </DropdownItem>
        <DropdownItem className="w-100" onClick={handleDelete}>
          <Trash2 size={17} className="me-1" />
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
