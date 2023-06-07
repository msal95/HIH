// ** React Imports
import classnames from "classnames";
import PropTypes from "prop-types";
import { Plus } from "react-feather";
import { Spinner } from "reactstrap";

// Local Imports
import "../../style/views/Login/authentication.scss";
import TreeView from "./TreeView";

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

  return (
    <>
      <div
        className={classnames("sidebar-left ", {
          show: sidebarOpen,
        })}
      >
        <div
          className="sidebar overflow-auto bg-white"
          style={{
            maxWidth: "290px",
          }}
        >
          <div
            className="sidebar-content email-app-sidebar"
            style={{
              maxHeight: "auto",
              minHeight: "100vh",
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
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner type="grow" color="primary" />
                </div>
              ) : // )}
              !projects?.length ? (
                <h3 className="d-flex align-items-center justify-content-center p-2">
                  No Projects and folders exist
                </h3>
              ) : (
                <>
                  {/* <ListGroup tag="div" className="list-group-messages">
                    {renderTree(projects)}
                  </ListGroup> */}
                  <TreeView
                    data={projects}
                    handleActiveTab={handleActiveTabFolders}
                    selectedTab={selectedTab}
                    handleToggleCreateFolderModal={
                      handleToggleCreateFolderModal
                    }
                    handleEditProjectModal={handleEditProjectModal}
                    handleDeleteProject={handleDeleteProject}
                    handleActiveTabSubFolders={handleActiveTabSubFolders}
                    // handleOnMouseEnter={handleOnMouseEnter}
                    // handleOnMouseLeave={handleOnMouseLeave}
                    handleToggleCreateSubFolderModal={
                      handleToggleCreateSubFolderModal
                    }
                    handleEditFolderModal={handleEditFolderModal}
                    handleDeleteFolder={handleDeleteFolder}
                  />
                </>
              )}
              {/* </PerfectScrollbar> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  handleActiveTabSubFolders: PropTypes.func.isRequired,
  handleActiveTabFolders: PropTypes.func.isRequired,
  handleToggleCreateFolderModal: PropTypes.func.isRequired,
  handleCreateProject: PropTypes.func.isRequired,
  handleToggleCreateSubFolderModal: PropTypes.func.isRequired,
  handleDeleteFolder: PropTypes.func.isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
  handleEditFolderModal: PropTypes.func.isRequired,
  handleEditProjectModal: PropTypes.func.isRequired,
  handleActiveTab: PropTypes.func.isRequired,

  // optionalArray: PropTypes.array,
  // optionalBigInt: PropTypes.bigint,
  // optionalBool: PropTypes.bool,
  // optionalFunc: PropTypes.func,
  // optionalNumber: PropTypes.number,
  // optionalObject: PropTypes.object,
  // optionalString: PropTypes.string,
  // optionalSymbol: PropTypes.symbol,
};

export default Sidebar;
