// ** React Imports
import { Fragment, useState } from "react";

import {
  Circle,
  FileText,
  GitBranch,
  Home,
  Mail,
  Settings,
  Shield,
  Table,
  User,
} from "react-feather";
// ** Third Party Components

// ** Vertical Menu Components
// import VerticalNavMenuItems from "./VerticalNavMenuItems";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, NavItem } from "reactstrap";
import "./styles.css";
import VerticalMenuItem from "./VerticalMenuItem";
// import { NavLink } from "react-router-dom";

const integrationSubMenus = [
  { id: 1, name: "Applications", link: "/apps/integration" },
  { id: 2, name: "Applications Import", link: "/apps/import" },
  { id: 3, name: "Forms List", link: "/apps/form/listing" },
  { id: 4, name: "Form Builder", link: "/apps/form/generated" },
];

const rolesPermissionSubMenus = [
  { id: 1, name: "Roles", link: "/apps/roles" },
  { id: 2, name: "Permissions", link: "/apps/permissions" },
];

const Sidebar = () => {
  // ** Props
  const [collapsed, setCollapsed] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [isSubmenu, setIsSubMenu] = useState(false);
  const [subMenuItem, setSubMenuItem] = useState("");

  //   const toggleNavbar = () => {
  //     setCollapsed(!collapsed);
  //   };

  const handleSubmenuItem = (subItem) => {
    setSubMenuItem(subItem);
    setIsSubMenu(true);
  };

  const handleMenuItemClick = (submenu) => {
    setActiveSubMenu(activeSubMenu === submenu ? "" : submenu);
    setCollapsed(false);
    setIsSubMenu(false);
    if (!submenu?.length) {
      setSubMenuItem("");
    }

    // setIsSubMenu(activeSubMenu === submenu ? isSubmenu : !isSubmenu);
    // setCollapsed(false);
  };
  //   const handleMenuItemClick = () => {
  //     // Handle click logic for menu items with children
  //   };

  //   const handleSubMenuItemClick = () => {
  //     // Handle click logic for sub-menu items
  //   };

  // ** Menu Hover State
  //   const [menuHover, setMenuHover] = useState(false);

  //   // ** Ref
  //   const shadowRef = useRef(null);

  //   // ** Function to handle Mouse Enter
  //   const onMouseEnter = () => {
  //     setMenuHover(true);
  //   };

  // ** Scroll Menu
  //   const scrollMenu = (container) => {
  //     if (shadowRef && container.scrollTop > 0) {
  //       if (!shadowRef.current.classList.contains("d-block")) {
  //         shadowRef.current.classList.add("d-block");
  //       }
  //     } else {
  //       if (shadowRef.current.classList.contains("d-block")) {
  //         shadowRef.current.classList.remove("d-block");
  //       }
  //     }
  //   };

  return (
    <Fragment>
      <div
        className={`sidebar ${!collapsed ? "expanded" : ""}`}
        style={{
          background: "white",
          borderRight: "2px solid rgba(173, 172, 172, 0.1)",
          marginTop: "4.5rem",
        }}
      >
        <Nav vertical className="flex-column">
          <VerticalMenuItem
            mainMenuTitle="Dashboard"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={Home}
            link="/dashboard"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          />
          {/* <NavItem>
            <NavLink to="/dashboard" onClick={handleMenuItemClick}>
              <div className="menu-item">
                <Home size={18} />
                <span className="menu-title">Dashboard</span>
              </div>
            </NavLink>
          </NavItem> */}
          <VerticalMenuItem
            mainMenuTitle="Flows"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={GitBranch}
            link="/apps/flows"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          />

          <VerticalMenuItem
            mainMenuTitle="Applications"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={FileText}
            SubMenus={integrationSubMenus}
            onClickChildMenu={handleSubmenuItem}
            isChildMenu
            isSubmenu={isSubmenu}
            subMenuItem={subMenuItem}
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          />

          <VerticalMenuItem
            mainMenuTitle="Credentials"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={Table}
            link="/apps/credentials"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          />

          {/* <VerticalMenuItem
            mainMenuTitle="Builder"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={Mail}
            SubMenus={builderSubMenus}
            onClickChildMenu={handleSubmenuItem}
            isChildMenu
            isSubmenu={isSubmenu}
            subMenuItem={subMenuItem}
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          /> */}

          <VerticalMenuItem
            mainMenuTitle="Users"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={User}
            link="/apps/user/list"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          />

          <VerticalMenuItem
            mainMenuTitle="Roles & Permissions"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={Shield}
            SubMenus={rolesPermissionSubMenus}
            onClickChildMenu={handleSubmenuItem}
            isChildMenu
            isSubmenu={isSubmenu}
            subMenuItem={subMenuItem}
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          />
          <VerticalMenuItem
            mainMenuTitle="Settings"
            onClickMainMenu={handleMenuItemClick}
            activeSubMenu={activeSubMenu}
            iconName={Settings}
            link="/apps/settings"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          />

          {/* <NavItem>
            <NavLink to="/apps/flows" onClick={handleMenuItemClick}>
              <div className="menu-item">
                <GitBranch size={20} />
                <span className="menu-title">Flows</span>
              </div>
            </NavLink>
          </NavItem> */}
          {/* <NavItem>
            <NavLink to="/apps/user/list" onClick={handleMenuItemClick}>
              <div className="menu-item">
                <User size={20} />
                <span className="menu-title">Users</span>
              </div>
            </NavLink>
          </NavItem> */}
          {/* <NavItem>
            <NavLink to="/apps/settings" onClick={handleMenuItemClick}>
              <div className="menu-item">
                <Settings size={20} />
                <span className="menu-title">Settings</span>
              </div>
            </NavLink>
          </NavItem> */}
          {/* <NavItem>
            <NavLink onClick={() => handleMenuItemClick("rolesPermissions")}>
              <div className="menu-item">
                <Shield size={20} />
                <span className="menu-title">Roles & Permissions</span>
              </div>
            </NavLink>
            <Collapse
              isOpen={
                isSubmenu ? !isSubmenu : activeSubMenu === "rolesPermissions"
              }
            >
              <Nav vertical className="submenu">
                <NavItem>
                  <NavLink
                    to="/apps/roles"
                    onClick={() => handleSubmenuItem("Roles")}
                  >
                    <div className="submenu-item ">
                      <Circle className="me-1" size={12} />

                      <span className="menu-title">Roles</span>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/apps/permissions"
                    onClick={() => handleSubmenuItem("Permissions")}
                  >
                    <div className="submenu-item ">
                      <Circle className="me-1" size={12} />

                      <span className="menu-title">Permissions</span>
                    </div>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </NavItem> */}
        </Nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
