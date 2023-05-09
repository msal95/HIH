import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

export default function DropDown(props) {
  const { title, options, color = "secondary" } = props;
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle outline color={color} caret>
        {title}
      </DropdownToggle>
      <DropdownMenu>
        {options.map((item) => {
          return (
            <DropdownItem key={item.id} href="/" tag="a">
              {item.title}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
