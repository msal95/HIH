// ** React Imports
import classnames from "classnames";
import { useState } from "react";
import {
  Edit3,
  Folder,
  Layers,
  MoreVertical,
  Plus,
  Trash2,
} from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";

// Local Imports
import polygon from "@src/assets/images/icons/polygon.png";
import "../../style/views/Login/authentication.scss";

const Sidebar = (props) => {
  // ** Props
  const {
    sidebarOpen,
    handleActiveTab,
    selectedTab,
    projects,
    setIsProjects,
    isLoading,
    handleActiveTabSubFolders,
    handleActiveTabFolders,
    handleToggleCreateFolderModal,
    handleCreateProject,
    handleToggleCreateSubFolderModal,
    handleDeleteFolder,
    handleDeleteProject,
    handleEditFolderModal,
    handleEditProjectModal,
  } = props;

  const [hoverItem, setHoverItem] = useState(null);

  const handleOnMouseEnter = (node) => {
    setHoverItem(node);
  };

  const handleOnMouseLeave = () => {
    setHoverItem(null);
  };

  function renderTree(nodes, level = 0) {
    const indent = level * 10;
    return nodes?.map((node) => {
      return (
        <div
          key={node.id}
          className={`mt-1 ${
            selectedTab === node.name && "bg-primary text-light"
          } `}
          style={{ paddingTop: 5, paddingBottom: 5 }}
        >
          {node.is_project ? (
            <div className="container__option-selector px-1">
              <div
                onClick={() => handleActiveTabFolders(node.name)}
                className="cursor-pointer"
              >
                <img
                  src={polygon}
                  alt="Polygon icon"
                  className="me-1"
                  width="10px"
                  height="7px"
                />
                <Layers size={16} className="me-1" color="#131313" />
                <span className="container__option-heading">
                  {node.name?.length > 7
                    ? `${node.name.substr(0, 7)}...`
                    : node.name}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <Plus
                  size={16}
                  color="#131313"
                  className="me-50 container__add-project-button-icon"
                  onClick={() => {
                    handleToggleCreateFolderModal(node);
                  }}
                />
                <UncontrolledDropdown
                  className="chart-dropdown"
                  style={{ paddingBottom: 5, transition: "ease" }}
                >
                  <DropdownToggle
                    color=""
                    className="bg-transparent btn-sm border-0 p-0"
                  >
                    <MoreVertical size={18} className="cursor-pointer" />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      className="w-100"
                      onClick={() => handleEditProjectModal(node)}
                    >
                      <Edit3 size={17} className="me-1" />
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      className="w-100"
                      onClick={() => handleDeleteProject(node.id)}
                    >
                      <Trash2 size={17} className="me-1" />
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          ) : (
            <div
              className={`d-flex justify-content-between container__folders-list`}
              onMouseEnter={() => handleOnMouseEnter(node)}
              onMouseLeave={handleOnMouseLeave}
              onClick={() => handleActiveTabSubFolders(node.name)}
              // style={setSelectedTab === node.name && { background: "red" }}
            >
              <div style={{ marginLeft: indent }}>
                <Folder size={18} className="me-1" />
                <span
                  className="align-middle cursor-pointer"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={node.name}
                >
                  {node?.name?.length > 7
                    ? `${node?.name.substr(0, 7)}...`
                    : node?.name}
                </span>
              </div>
              {hoverItem && hoverItem.uuid === node.uuid && (
                <div className="d-flex pe-1 align-items-center">
                  <Plus
                    size={16}
                    color="#131313"
                    className="cursor-pointer me-1"
                    onClick={() => handleToggleCreateSubFolderModal(node)}
                  />
                  <UncontrolledDropdown
                    className="chart-dropdown"
                    style={{ paddingBottom: 5, transition: "ease" }}
                  >
                    <DropdownToggle
                      color=""
                      className="bg-transparent btn-sm border-0 p-0"
                    >
                      <MoreVertical size={18} className="cursor-pointer" />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        className="w-100"
                        onClick={() => handleEditFolderModal(node)}
                      >
                        <Edit3 size={17} className="me-1" />
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        className="w-100"
                        onClick={() => handleDeleteFolder(hoverItem.id)}
                      >
                        <Trash2 size={17} className="me-1" />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              )}
            </div>
          )}
          {node?.tree?.length > 0 && renderTree(node.tree, level + 2)}
        </div>
      );
    });
  }

  return (
    <>
      <div
        className={classnames("sidebar-left ", {
          show: sidebarOpen,
        })}
      >
        <div className="sidebar ">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div
                className={`d-flex justify-content-between px-1 py-1 ${
                  selectedTab === "projects" && "bg-primary text-light"
                }`}
              >
                <h3
                  className={`cursor-pointer`}
                  onClick={() => {
                    handleActiveTab("projects");
                    setIsProjects(true);
                  }}
                >
                  Projects
                </h3>
                <Plus
                  size={17}
                  onClick={handleCreateProject}
                  className="cursor-pointer"
                />
              </div>
              <PerfectScrollbar
                className="sidebar-menu-list"
                options={{ wheelPropagation: false }}
              >
                <ListGroup tag="div" className="list-group-messages">
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <Spinner type="grow" color="primary" />
                    </div>
                  ) : (
                    renderTree(projects)
                  )}

                  <div></div>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
