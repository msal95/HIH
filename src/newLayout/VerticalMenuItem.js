import React from "react";
import { Circle, FileText } from "react-feather";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, NavItem } from "reactstrap";

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
  } = props;
  console.log(
    "🚀 ~ file: VerticalMenuItem.js:12 ~ VerticalMenuItem ~ mainMenuTitle:",
    mainMenuTitle,
    activeSubMenu
  );

  const IconComponent = iconName;
  return (
    <NavItem>
      <NavLink
        to={!isChildMenu && link}
        onClick={
          isChildMenu ? () => onClickMainMenu(mainMenuTitle) : onClickMainMenu
        }
      >
        <div className="menu-item">
          <IconComponent size={20} />
          <span className="menu-title">{mainMenuTitle}</span>
        </div>
      </NavLink>
      {isChildMenu && (
        <Collapse
          isOpen={isSubmenu ? !isSubmenu : activeSubMenu === mainMenuTitle}
        >
          <Nav vertical className="submenu">
            <NavItem>
              <NavLink
                to="/apps/integration"
                // href="#" onClick={handleSubMenuItemClick}
                onClick={() => onClickChildMenu("Integrations")}
              >
                <div className="submenu-item ">
                  <Circle size={12} className="me-1" />
                  <span className="menu-title">Integrations</span>
                </div>
              </NavLink>
            </NavItem>
            {/* <NavItem>
            <NavLink
              to="/apps/import"
              onClick={() => handleSubmenuItem("Integrations Import")}
            >
              <div className="submenu-item ">
                <Circle className="me-1" size={12} />
                <span className="menu-title">Integrations Import</span>
              </div>
            </NavLink>
          </NavItem> */}
          </Nav>
        </Collapse>
      )}
    </NavItem>
  );
}
