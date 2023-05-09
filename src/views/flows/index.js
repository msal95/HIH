// ** React Imports
import classnames from "classnames";
import { Fragment, useState } from "react";
import { Plus } from "react-feather";
import { Button, Col, Row } from "reactstrap";

import Sidebar from "./Sidebar";

// ** Styles
import atTheRate from "@src/assets/images/icons/social/at-credentiali-con.png";
import gmail from "@src/assets/images/icons/social/gmai-logo.png";
import microsoft from "@src/assets/images/icons/social/microsoft.png";
import sendGrid from "@src/assets/images/icons/social/sendgrid.png";
import "@styles/react/apps/app-email.scss";
import CustomCard from "../../components/CustomCard/CustomCard";
import Divider from "../../components/Divider/Divider";
import WorkFlowsCard from "../../components/WorkFlowsCard/WorkFlowsCard";
import "../../style/base/base.scss";

const dummyData = [
  { id: 1, name: "SendGrid", image: sendGrid },
  { id: 2, name: "Gmail", image: gmail },
  { id: 3, name: "Microsoft", image: microsoft },
  { id: 4, name: "Untitled Credential", image: atTheRate },
  { id: 5, name: "Untitled Credential", image: atTheRate },
];
const WorkFlows = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [credentialsData, setCredentialsData] = useState(dummyData);
  const [isViewAll, setIsViewAll] = useState(false);

  const handleViewAll = () => {
    setIsViewAll((prevState) => !prevState);
  };

  const foldersData = isViewAll ? credentialsData : credentialsData.slice(0, 3);

  return (
    <div className="content-area-wrapper">
      <Sidebar />
      <div className="content-right overflow-auto h-100">
        <div className="content-body">
          <div
            className={classnames("body-content-overlay", {
              show: sidebarOpen,
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Col className="container-xxl col-12">
            <Row>
              <Col md={9} sm={6} className="content-header-left mb-2">
                <h2 className="content-header-title float-start mb-0">
                  Workflows
                </h2>
              </Col>
              <Col
                md={3}
                sm={6}
                className="content-header-right text-md-end d-md-block"
              >
                <Button color="primary" onClick={() => {}} block>
                  Create
                  <Plus size={20} className="ms-1" color="#fff" />
                </Button>
              </Col>
            </Row>

            <Divider />

            <div className="row">
              <div className="d-flex justify-content-between">
                <p className="folder-class">Folder</p>
                <p className="view-all-class" onClick={handleViewAll}>
                  {isViewAll ? "View Less" : "View All"}
                </p>
              </div>
              {foldersData.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <CustomCard
                      name={item.name}
                      // image={item.image}
                      data={item}
                      isIcon
                      colNumber={4}
                      titleClass="custom-card-title"
                      // onHandleEdit={onHandleEdit}
                      // onHandleView={onHandleView}
                      // onHandleDelete={onHandleDelete}
                    />
                  </Fragment>
                );
              })}
            </div>
            <WorkFlowsCard />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default WorkFlows;
