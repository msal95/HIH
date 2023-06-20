import React from "react";
import HorizontalMenu from "./Horizontal";
import Sidebar from "./Vertical";
import { Col, Container, Row } from "reactstrap";
import "./styles.css";
import MainRoutes from "./Routes";

export default function Layout() {
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
      <HorizontalMenu />
      <Container fluid className="sidebar-and-content">
        <Row>
          <Col md="1" className="sidebar-col">
            <Sidebar />
          </Col>
          <Col md="11" className="content-col">
            {/* <h1>Dummy Content</h1>
            <p>This is some dummy content for the body area.</p> */}
            <MainRoutes />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
