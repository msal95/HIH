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
import Tree from "../../components/TreeNode/Tree";

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
  const { sidebarOpen } = props;

  const [show, setShow] = useState(false);
  // const [isNewProject, setIsNewProject] = useState(false);
  const [folders, setFolders] = useState(
    treeState
    // [
    //   {
    //     name: "Folder 1",
    //     children: [
    //       { name: "Subfolder 1", children: [] },
    //       { name: "Subfolder 2", children: [] },
    //     ],
    //   },
    //   { name: "Folder 2", children: [] },
    // ]
  );

  // const handleChange = (state) => {
  //   // console.log("🚀 ~ file: Sidebar.js:83 ~ handleChange ~ state:", state);
  //   setFolders(state.data);
  // };

  const handleCreateFolder = (parentId) => {
    console.log(
      "🚀 ~ file: Sidebar.js:97 ~ handleCreateFolder ~ parentId:",
      parentId
    );
    const newFolder = { name: "New", children: [] };
    // setFolders((prevState) =>
    //   prevState.map((folder) => {
    //     if (folder.id === parentId) {
    //       return { ...folder, children: [...folder.children, newFolder] };
    //     }
    //     return folder;
    //   })
    // );
  };

  const handleRenameFolder = (folderId, newName) => {
    console.log(
      "🚀 ~ file: Sidebar.js:104 ~ handleRenameFolder ~ newName:",
      newName
    );
    console.log(
      "🚀 ~ file: Sidebar.js:104 ~ handleRenameFolder ~ folderId:",
      folderId
    );
    setFolders((prevState) =>
      prevState.map((folder) => {
        if (folder.id === folderId) {
          return { ...folder, name: newName };
        }
        return folder;
      })
    );
  };

  const handleDeleteFolder = (folderId) => {
    setFolders((prevState) =>
      prevState.filter((folder) => {
        if (folder.id === folderId) {
          return false;
        }
        if (folder.children) {
          folder.children = folder.children.filter(
            (child) => child.id !== folderId
          );
        }
        return true;
      })
    );
  };

  const renderFolder = (folder, onToggle) => {
    console.log("🚀 ~ file: Sidebar.js:140 ~ renderFolder ~ folder:", folder);
    // const isExpanded =
    //   folder.isOpen || folder.children.some((child) => child.isOpen);
    // const Icon = isExpanded ? FaFolderOpen : FaFolder;

    return (
      <div onClick={onToggle}>
        {/* <Icon /> */}
        {folder.name}
      </div>
    );
  };

  // ** Vars
  // const params = useParams();

  // Insert a new folder at the specified path in the folder tree
  // function insertFolder(folders, path, newFolder) {
  //   console.log(
  //     "🚀 ~ file: Sidebar.js:87 ~ insertFolder ~ newFolder:",
  //     newFolder
  //   );
  //   if (path.length === 0) {
  //     return [...folders, newFolder];
  //   }

  //   const [current, ...rest] = path;
  //   const index = folders.findIndex((folder) => folder.label === current);

  //   if (index === -1) {
  //     return folders;
  //   }

  //   const children = insertFolder(folders[index].children, rest, newFolder);

  //   return [
  //     ...folders.slice(0, index),
  //     { ...folders[index], children },
  //     ...folders.slice(index + 1),
  //   ];
  // }

  // Remove the folder at the specified path from the folder tree
  // function removeFolder(folders, path) {
  //   console.log("🚀 ~ file: Sidebar.js:109 ~ removeFolder ~ folders:", folders);
  //   if (path.length === 0) {
  //     return [];
  //   }

  //   const [current, ...rest] = path;
  //   const index = folders.findIndex((folder) => folder.label === current);

  //   if (index === -1) {
  //     return folders;
  //   }

  //   const children = removeFolder(folders[index].children, rest);

  //   if (children.length === 0) {
  //     return [...folders.slice(0, index), ...folders.slice(index + 1)];
  //   }

  //   return [
  //     ...folders.slice(0, index),
  //     { ...folders[index], children },
  //     ...folders.slice(index + 1),
  //   ];
  // }

  // Rename the folder at the specified path in the folder tree
  // function renameFolder(folders, path, newLabel) {
  //   console.log(
  //     "🚀 ~ file: Sidebar.js:135 ~ renameFolder ~ newLabel:",
  //     newLabel
  //   );
  //   if (path.length === 0) {
  //     return folders;
  //   }

  //   const [current, ...rest] = path;
  //   const index = folders.findIndex((folder) => folder.label === current);

  //   if (index === -1) {
  //     return folders;
  //   }

  //   const children = renameFolder(folders[index].children, rest, newLabel);

  //   return [
  //     ...folders.slice(0, index),
  //     { ...folders[index], label: newLabel, children },
  //     ...folders.slice(index + 1),
  //   ];
  // }

  // const handleCreateFolder = (folderPath) => {
  //   console.log(
  //     "🚀 ~ file: Sidebar.js:160 ~ handleCreateFolder ~ folderPath:",
  //     folderPath
  //   );
  //   const newFolder = { label: "New", children: [] };
  //   const newFolders = insertFolder(folders, folderPath, newFolder);
  //   setFolders(newFolders);
  // };

  // const handleDeleteFolder = (folderPath) => {
  //   console.log(
  //     "🚀 ~ file: Sidebar.js:166 ~ handleDeleteFolder ~ folderPath:",
  //     folderPath
  //   );
  //   const newFolders = removeFolder(folders, folderPath);
  //   setFolders(newFolders);
  // };

  // const handleRenameFolder = (folderPath, newLabel) => {
  //   console.log(
  //     "🚀 ~ file: Sidebar.js:175 ~ handleRenameFolder ~ newLabel:",
  //     newLabel
  //   );
  //   console.log(
  //     "🚀 ~ file: Sidebar.js:175 ~ handleRenameFolder ~ folderPath:",
  //     folderPath
  //   );
  //   const newFolders = renameFolder(folders, folderPath, newLabel);
  //   setFolders(newFolders);
  // };

  // ** Functions To Active List Item
  // const handleActiveItem = (value) => {
  //   if (
  //     (params.folder && params.folder === value) ||
  //     (params.label && params.label === value)
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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

  const onTreeStateChange = (state, event) => {
    console.log("onChange function ===> ", state, event);
    // setFolders(state.data);
    if (event.type === "addNode") {
      handleCreateFolder();
    }
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
                  {/* {sideBarData.map((item) => {
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
                  })} */}
                  {/* <FolderTree
                    data={testData}
                    onChange={onTreeStateChange}
                    showCheckbox={false}
                    initOpenStatus="closed"
                  /> */}
                  {/* <FolderTree
                    data={folders}
                    onNodeCreate={handleCreateFolder}
                    onNodeDelete={handleDeleteFolder}
                    onNodeUpdate={handleRenameFolder}
                    showCheckbox={false}
                    initOpenStatus="closed"
                    onChange={handleChange}
                  /> */}

                  <FolderTree
                    data={folders}
                    onChange={onTreeStateChange}
                    onCreateFolder={handleCreateFolder}
                    onRenameFolder={handleRenameFolder}
                    onDeleteFolder={handleDeleteFolder}
                    renderFolder={renderFolder}
                  />
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
