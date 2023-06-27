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
    handleToggleCreateSubFolderModal,
    handleEditFolderModal,
    handleDeleteFolder,
  } = props;

  return (
    <ListGroup style={{ width: "100%" }}>
      {data.map((node) => (
        <ListGroupItem key={node.id} className="border-0">
          <TreeNode
            node={node}
            handleActiveTab={handleActiveTab}
            selectedTab={selectedTab}
            handleToggleCreateFolderModal={handleToggleCreateFolderModal}
            handleEditProjectModal={handleEditProjectModal}
            handleDeleteProject={handleDeleteProject}
            handleActiveTabSubFolders={handleActiveTabSubFolders}
            handleToggleCreateSubFolderModal={handleToggleCreateSubFolderModal}
            handleEditFolderModal={handleEditFolderModal}
            handleDeleteFolder={handleDeleteFolder}
          />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default TreeView;
