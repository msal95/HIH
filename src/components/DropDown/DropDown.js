import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

export default function DropDown(props) {
  const { title, options, color = "secondary", handleOnSelectSort } = props;
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle outline color={color} caret>
        {title}
      </DropdownToggle>
      <DropdownMenu>
        {options.map((item) => {
          return (
            <DropdownItem
              key={item.id}
              onClick={() => handleOnSelectSort(item.title)}
              className="w-100"
            >
              {item.title}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
