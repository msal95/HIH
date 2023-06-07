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
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default TreeView;
