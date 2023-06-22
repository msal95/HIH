import React, { useContext } from "react";
import HorizontalMenu from "./Horizontal";
import Sidebar from "./Vertical";
import { Col, Container, Row } from "reactstrap";
import "./styles.css";
import MainRoutes from "./Routes";
import { LayoutContext } from "./LayoutProvider";

export default function Layout() {
  const { showSidebar, showHeader } = useContext(LayoutContext);
  return (
    // <Row>
    //   <Col md={12}>
    //     <HorizontalMenu />
    //   </Col>
    //   <Container className="bg-dark">
    //     <Row>
    //       <Col md={2}>
    //         <Sidebar />
    //       </Col>
    //       <Col md={10}>
    //         {/* <Row>
    //         <Col> */}
    //         <h1>Dummy Content</h1>
    //         <p>This is some dummy content for the body area.</p>
    //         {/* </Col>
    //       </Row> */}
    //       </Col>
    //     </Row>
    //   </Container>
    // </Row>
    <div className="layout-container">
      {showHeader && <HorizontalMenu />}
      <Container fluid className="sidebar-and-content">
        <Row>
          <Col lg="1" md="2" sm="3" className="sidebar-col pe-0">
            {showSidebar && <Sidebar />}
          </Col>
          <Col lg="11" md="10" sm="9" className="content-col ps-0">
            {/* <h1>Dummy Content</h1>
            <p>This is some dummy content for the body area.</p> */}
            <MainRoutes />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
