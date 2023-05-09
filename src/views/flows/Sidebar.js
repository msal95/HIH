// ** React Imports
import { Link, useParams } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { Folder, Layers, MoreVertical, Plus } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import { ListGroup, ListGroupItem } from "reactstrap";
import FolderTree, { testData } from "react-folder-tree";
import "react-folder-tree/dist/style.css";

import polygon from "@src/assets/images/icons/polygon.png";
import "../../style/views/Login/authentication.scss";
import { useState } from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import CreateNewProject from "../../components/CreateNewProject/CreateNewProject";

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

const treeState = {
  name: "root [half checked and opened]",
  checked: 0.5, // half check: some children are checked
  isOpen: true, // this folder is opened, we can see it's children
  children: [
    { name: "children 1 [not checked]", checked: 0 },
    {
      name: "children 2 [half checked and not opened]",
      checked: 0.5,
      isOpen: false,
      children: [
        { name: "children 2-1 [not checked]", checked: 0 },
        { name: "children 2-2 [checked]", checked: 1 },
      ],
    },
  ],
};
const Sidebar = (props) => {
  // ** Props
  const {
    store,
    sidebarOpen,
    dispatch,
    getMails,
    resetSelectedMail,
    setOpenMail,
  } = props;

  const [show, setShow] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);

  // ** Vars
  const params = useParams();

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    setOpenMail(false);
    dispatch(getMails({ ...store.params, folder }));
    dispatch(resetSelectedMail());
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if (
      (params.folder && params.folder === value) ||
      (params.label && params.label === value)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onClickDiscardModal = (item) => {
    setShow(false);
  };

  const handleToggleModal = (item) => {
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

  const onTreeStateChange = (state, event) =>
    console.log("onChange function ===> ", state, event);

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
                  {/* <FolderTree
                    data={testData}
                    onChange={onTreeStateChange}
                    showCheckbox={false}
                    initOpenStatus="closed"
                  /> */}
                  {/* <FolderTree
                    data={treeState}
                    initCheckedStatus="custom" // default: 0 [unchecked]
                    initOpenStatus="custom" // default: 'open'
                  /> */}
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
