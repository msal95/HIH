// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { Folder, Layers, MoreVertical, Plus } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import { ListGroup, ListGroupItem } from "reactstrap";

import polygon from "@src/assets/images/icons/polygon.png";
import { useState } from "react";
import CreateNewProject from "../../components/CreateNewProject/CreateNewProject";
import CustomModal from "../../components/CustomModal/CustomModal";
import "../../style/views/Login/authentication.scss";

const sideBarData = [
  {
    id: 1,
    label: "NEMT Automation",
    // data: {
    data: [
      { id: 1, label: "New Folder 1" },
      { id: 2, label: "New Folder 2" },
      { id: 3, label: "New Folder 3" },
    ],
    // },
  },
  {
    id: 1,
    label: "HIH Automation",
    // data: {
    data: [
      { id: 1, label: "New Folder 1" },
      { id: 2, label: "New Folder 2" },
      { id: 3, label: "New Folder 3" },
    ],
    // },
  },
];

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen } = props;

  const [show, setShow] = useState(false);
  // const [isNewProject, setIsNewProject] = useState(false);

  const onClickDiscardModal = () => {
    setShow(false);
  };

  const handleToggleModal = () => {
    setShow((prevState) => !prevState);
  };

  const handleCreateProject = (values) => {
    console.log(
      "🚀 ~ file: Sidebar.js:87 ~ handleCreateProject ~ values:",
      values
    );
    setShow(false);
    return null;
  };

  return (
    <>
      <div
        className={classnames("sidebar-left", {
          show: sidebarOpen,
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div className="d-flex justify-content-between px-1 py-1">
                <h3>Projects</h3>
                <Plus size={17} />
              </div>
              <PerfectScrollbar
                className="sidebar-menu-list"
                options={{ wheelPropagation: false }}
              >
                <ListGroup tag="div" className="list-group-messages">
                  {sideBarData.map((item) => {
                    return (
                      <>
                        <ListGroupItem className="m-0 p-0">
                          <div className="container__option-selector ps-1">
                            <img
                              src={polygon}
                              alt="Polygon icon"
                              className="me-1"
                              width="10px"
                              height="7px"
                            />
                            <Layers
                              size={16}
                              className="me-1"
                              color="#131313"
                            />
                            <span className="container__option-heading">
                              {item.label?.length > 9
                                ? `${item.label.substr(0, 10)}...`
                                : item.label}
                            </span>

                            <Plus
                              size={16}
                              color="#131313"
                              className="me-50 container__add-project-button-icon"
                              onClick={handleToggleModal}
                            />
                            <MoreVertical
                              size={16}
                              className="float-end"
                              color="#131313"
                            />
                          </div>
                        </ListGroupItem>
                        {item?.data.map((options) => {
                          return (
                            <ListGroupItem
                              tag={Link}
                              to="/apps/email/inbox"
                              onClick={() => handleFolder("inbox")}
                              action
                              style={{
                                paddingTop: 12,
                                paddingBottom: 0,
                                paddingLeft: 36,
                              }}
                            >
                              <Folder size={18} className="me-75" />
                              <span className="align-middle">
                                {options.label}
                              </span>
                            </ListGroupItem>
                          );
                        })}
                      </>
                    );
                  })}
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        toggleModal={handleToggleModal}
        onDiscard={onClickDiscardModal}
        show={show}
      >
        <div className="p-1">
          <CreateNewProject
            onCancel={onClickDiscardModal}
            onSubmit={handleCreateProject}
          />
        </div>
      </CustomModal>
    </>
  );
};

export default Sidebar;
