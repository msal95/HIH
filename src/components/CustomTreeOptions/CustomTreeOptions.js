import React from "react";
import TreeView from "./TreeView";

export default function CustomTreeOptions(props) {
  console.log(
    "🚀 ~ file: CustomTreeOptions.js:5 ~ CustomTreeOptions ~ props:",
    props
  );
  const { projects } = props;
  return (
    <TreeView
      data={projects}
      // handleActiveTab={handleActiveTabFolders}
      // selectedTab={selectedTab}
      // handleToggleCreateFolderModal={
      //   handleToggleCreateFolderModal
      // }
      // handleEditProjectModal={handleEditProjectModal}
      // handleDeleteProject={handleDeleteProject}
      // handleActiveTabSubFolders={handleActiveTabSubFolders}
      // // handleOnMouseEnter={handleOnMouseEnter}
      // // handleOnMouseLeave={handleOnMouseLeave}
      // handleToggleCreateSubFolderModal={
      //   handleToggleCreateSubFolderModal
      // }
      // handleEditFolderModal={handleEditFolderModal}
      // handleDeleteFolder={handleDeleteFolder}
    />
  );
}
