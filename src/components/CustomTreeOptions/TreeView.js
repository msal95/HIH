import PropTypes from "prop-types";
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import TreeNode from "./TreeNode";

function TreeView(props) {
  const {
    data,
    handleActiveTab,
    selectedTab,
    handleToggleCreateFolderModal,
    handleEditProjectModal,
    handleDeleteProject,
    handleActiveTabSubFolders,
    // handleOnMouseEnter,
    // handleOnMouseLeave,
    handleToggleCreateSubFolderModal,
    handleEditFolderModal,
    handleDeleteFolder,
    handleAlert,
  } = props;
  console.log("🚀 ~ file: TreeView.js:22 ~ TreeView ~ data:", data);

  return (
    <ListGroup style={{ width: "100%" }}>
      {data.map((node) => (
        <ListGroupItem key={node.id}>
          <TreeNode
            node={node}
            handleActiveTab={handleActiveTab}
            selectedTab={selectedTab}
            handleToggleCreateFolderModal={handleToggleCreateFolderModal}
            handleEditProjectModal={handleEditProjectModal}
            handleDeleteProject={handleDeleteProject}
            handleActiveTabSubFolders={handleActiveTabSubFolders}
            // handleOnMouseEnter={handleOnMouseEnter}
            // handleOnMouseLeave={handleOnMouseLeave}
            handleToggleCreateSubFolderModal={handleToggleCreateSubFolderModal}
            handleEditFolderModal={handleEditFolderModal}
            handleDeleteFolder={handleDeleteFolder}
            handleAlert={handleAlert}
          />
          {/* {renderTreeNode(node)} */}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

TreeView.propTypes = {
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

export default TreeView;
