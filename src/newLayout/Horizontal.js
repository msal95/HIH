import classNames from "classnames";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
} from "reactstrap";
import HIHLogo from "@src/assets/images/logo/hih_icon.png";
import "./styles.css";
import { Power, User } from "react-feather";
import { handleLogout } from "@store/authentication";

// ** Custom Hooks

export default function HorizontalMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("myToken");

    const token = localStorage.getItem("myToken");

    if (!token) {
      navigate("/login", { replace: true });
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    // <Container>
    <Navbar light expand="md" className="header-navbar pt-1 pb-1">
      <NavLink to="/dashboard">
        <img src={HIHLogo} width={32} height={32} alt="HIH Logo" />
      </NavLink>

      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className="user-dropdown">
            <div className="user-avatar" />
            <span className="username">
              {/* Usama Khizer */}
              {userData?.name}
            </span>
          </DropdownToggle>
          <DropdownMenu right style={{ marginLeft: -5 }}>
            <DropdownItem tag={Link} to="/apps/profile">
              <User size={14} className="me-75" />
              <span className="align-middle">Profile</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              // tag={Link}
              // to="/login"
              onClick={handleLogout}
            >
              <Power size={14} className="me-75" />
              <span className="align-middle">Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
    // </Container>
  );
}
