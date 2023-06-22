import React, { useState } from "react";
import { Circle, FileText, StopCircle } from "react-feather";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, NavItem } from "reactstrap";
import "./styles.css";

export default function VerticalMenuItem(props) {
  const {
    isOpen,
    activeSubMenu,
    isSubmenu,
    mainMenuTitle = "Integrations",
    SubMenus,
    onClickMainMenu,
    onClickChildMenu,
    isChildMenu = false,
    iconName = FileText,
    link,
    subMenuItem,
  } = props;

  const [isActiveLink, setIsActiveLink] = useState(false);

  const [currentLink, setCurrentLink] = useState("test");

  const IconComponent = iconName;
  return (
    <NavItem key={mainMenuTitle}>
      <NavLink
        to={!isChildMenu && link}
        onClick={
          isChildMenu ? () => onClickMainMenu(mainMenuTitle) : onClickMainMenu
        }
        className={({ isActive }) => {
          setIsActiveLink(isActive);
        }}
      >
        <div
          className={`menu-item ${
            isActiveLink && !isChildMenu ? "link-active" : ""
          } ${currentLink === subMenuItem && "link-active"}`}
        >
          <IconComponent size={24} />
          <span className="menu-title">{mainMenuTitle}</span>
        </div>
      </NavLink>
      {isChildMenu && (
        <Collapse
          isOpen={isSubmenu ? !isSubmenu : activeSubMenu === mainMenuTitle}
        >
          <Nav vertical className="submenu">
            {SubMenus?.map((subMenu) => {
              return (
                <NavItem key={subMenu?.id}>
                  <NavLink
                    to={subMenu?.link}
                    onClick={() => {
                      onClickChildMenu(subMenu?.name);
                      setIsActiveLink(true);
                      setCurrentLink(subMenu?.name);
                    }}
                    // className={({ isActive }) => {}}
                  >
                    <div
                      className={`submenu-item ${
                        isActiveLink && currentLink === subMenu?.name
                          ? "link-active"
                          : ""
                      }`}
                    >
                      {subMenuItem === subMenu?.name ? (
                        <StopCircle size={12} className="me-1" />
                      ) : (
                        <Circle size={12} className="me-1" />
                      )}
                      <span className="menu-title">{subMenu?.name}</span>
                    </div>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Collapse>
      )}
    </NavItem>
  );
}
