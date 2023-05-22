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
import MoreVerticalDropdown from "../../components/MoreVerticalDropdown/MoreVerticalDropdown";

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
          className={`mt-1`}
          style={{ paddingTop: 5, paddingBottom: 5 }}
        >
          {node.is_project ? (
            <div
              className={`container__option-selector px-1 ${
                selectedTab?.name === node?.name && "bg-primary text-light"
              }`}
            >
              <div
                onClick={() => handleActiveTabFolders(node)}
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
                <span
                  className={`container__option-heading ${
                    selectedTab?.name === node?.name && "text-light"
                  }`}
                >
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
                <MoreVerticalDropdown
                  handleEdit={() => handleEditProjectModal(node)}
                  handleDelete={() => handleDeleteProject(node.id)}
                  isView
                />
              </div>
            </div>
          ) : (
            <div
              className={`d-flex justify-content-between container__folders-list ${
                selectedTab?.name === node?.name && "bg-primary text-light"
              }`}
              onMouseEnter={() => handleOnMouseEnter(node)}
              onMouseLeave={handleOnMouseLeave}
              onClick={() => handleActiveTabSubFolders(node)}
            >
              <div className="d-flex" style={{ marginLeft: indent }}>
                <Folder size={18} className="me-1" />
                <span
                  className="align-middle cursor-pointer d-flex flex-nowrap"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={node.name}
                  style={{ minWidth: 100 }}
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
                  <MoreVerticalDropdown
                    isView
                    handleEdit={() => handleEditFolderModal(node)}
                    handleDelete={() => handleDeleteFolder(hoverItem.id)}
                  />
                </div>
              )}
            </div>
          )}
          {node?.tree?.length > 0 && renderTree(node.tree, level + 3)}
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
        <div className="sidebar overflow-auto" style={{ width: "100%" }}>
          <div
            className="sidebar-content email-app-sidebar"
            style={{
              maxHeight: "auto",
              minHeight: "100vh",
              // width: "auto",
            }}
          >
            <div className="email-app-menu">
              <div
                className={`d-flex justify-content-between align-items-center px-1  pt-1 ${
                  selectedTab === null && "bg-primary text-light"
                }`}
              >
                <h3
                  className={`cursor-pointer ${
                    selectedTab === null && "text-light"
                  }`}
                  onClick={() => {
                    handleActiveTab(null);
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
              {/* <PerfectScrollbar
                className="sidebar-menu-list"
                options={{ wheelPropagation: true }}
              > */}
              {!projects?.length ? (
                <h3 className="d-flex align-items-center justify-content-center p-2">
                  No Projects and folders exist
                </h3>
              ) : (
                <ListGroup tag="div" className="list-group-messages">
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <Spinner type="grow" color="primary" />
                    </div>
                  ) : (
                    renderTree(projects)
                  )}
                </ListGroup>
              )}
              {/* </PerfectScrollbar> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
