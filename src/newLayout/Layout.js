import React, { useContext } from "react";
import { Col, Container, Row } from "reactstrap";

import "./styles.css";
import MainRoutes from "./Routes";
import { LayoutContext } from "./LayoutProvider";
import HorizontalMenu from "./Horizontal";
import Sidebar from "./Vertical";

export default function Layout() {
  const { showSidebar, showHeader } = useContext(LayoutContext);
  return (
    <div className="layout-container">
      {showHeader && <HorizontalMenu />}
      <Container fluid className="sidebar-and-content">
        <div className="content-container">
          <div className="sidebar-col pe-0">{showSidebar && <Sidebar />}</div>
          <div className="content-col ps-0">
            <MainRoutes />
          </div>
        </div>
      </Container>
    </div>
  );
}
