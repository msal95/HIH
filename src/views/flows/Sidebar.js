// ** React Imports
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import classnames from "classnames";
import {
  Edit3,
  Folder,
  Layers,
  MoreVertical,
  Plus,
  Trash2,
} from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";

// Local Imports
import polygon from "@src/assets/images/icons/polygon.png";
import CreateNewProject from "../../components/CreateNewProject/CreateNewProject";
import CustomModal from "../../components/CustomModal/CustomModal";
import "../../style/views/Login/authentication.scss";
import { deleteFolder, getProjectLists } from "../../../api/apiMethods";
import { useQuery } from "react-query";

const MySwal = withReactContent(Swal);

const Sidebar = (props) => {
  // ** Props
  const {
    sidebarOpen,
    handleActiveTab,
    selectedTab,
    projects,
    folders,
    setIsProjects,
    isLoading,
    handleActiveTabSubFolders,
    handleActiveTabFolders,
  } = props;
  console.log("🚀 ~ file: Sidebar.js:43 ~ projects:", projects);
  // console.log("🚀 ~ file: Sidebar.js:43 ~ setSelectedTab:", selectedTab);

  const [show, setShow] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  // console.log("🚀 ~ file: Sidebar.js:46 ~ hoverItem:", hoverItem);

  const [nodes, setNodes] = useState([]);
  // {
  //   id: "1",
  //   name: "Node 1",
  //   isNewProject: false,
  //   childNodes: [
  //     {
  //       id: "2",
  //       name: "Node 1.1",
  //       childNodes: [],
  //     },
  //     {
  //       id: "3",
  //       name: "Node 1.2",
  //       childNodes: [
  //         {
  //           id: "4",
  //           name: "Node 1.2.1",
  //           childNodes: [],
  //         },
  //         {
  //           id: "5",
  //           name: "Node 1.2.2",
  //           childNodes: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: "6",
  //   name: "Node 2",
  //   childNodes: [],
  // },
  const [selectedNode, setSelectedNode] = useState(null);
  // console.log("🚀 ~ file: Sidebar.js:85 ~ selectedNode:", selectedNode);
  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isSubNode, setIsSubNode] = useState(false);

  // const handleSelectNode = (node) => {
  //   setSelectedNode(node);
  // };

  // API Call
  // const { isLoading, data, error, refetch, isFetching, isError } = useQuery(
  //   "projectsList",
  //   () => getProjectLists()
  // );

  // console.log(
  //   "🚀 ~ file: Sidebar.js:97 ~ data:",
  //   data?.data?.data,
  //   isError,
  //   error
  // );

  // useEffect(() => {
  //   // if (data?.data?.data?.folders?.length) {

  //   setNodes(data?.data?.data[0]?.folders);
  //   // }
  // }, [isFetching]);

  const handleOnMouseEnter = (node) => {
    setHoverItem(node);
  };

  const handleOnMouseLeave = () => {
    setHoverItem(null);
  };
  const handleNodeLabelChange = (e) => {
    setNewNodeLabel(e.target.value);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onClickDiscardFolderModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setIsSubNode(false);
    setNewNodeLabel("");
  };

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function findNode(id, nodes) {
    for (const node of nodes) {
      if (node.id === id) {
        return { node, parent: null };
      }
      if (node?.descendants?.length > 0) {
        const { node: foundNode, parent } = findNode(id, node.descendants);
        if (foundNode) {
          return { node: foundNode, parent: parent || node };
        }
      }
    }
    return { node: null, parent: null };
  }

  function addNode(name, parentId, isNewProject = false) {
    const newNode = {
      id: generateUniqueId(),
      name,
      isNewProject,
      descendants: [],
    };

    if (parentId === null) {
      setNodes([...nodes, newNode]);
    } else {
      const parent = findNode(parentId, nodes).node;
      parent.descendants = [...parent.descendants, newNode];
      setNodes([...nodes]);
    }
    toast.success("New Node Added Successfully.");
    onClickDiscardFolderModal();
  }

  function addSubnode(name, parentId) {
    console.log("🚀 ~ file: Sidebar.js:219 ~ addSubnode ~ parentId:", parentId);
    const parent = findNode(parentId, nodes).node;
    const newSubnode = {
      id: generateUniqueId(),
      name,
      descendants: [],
    };
    parent.descendants = [...parent.descendants, newSubnode];
    setNodes([...nodes]);

    toast.success("New Sub Node Added Successfully.");

    setSelectedNode(null);
    onClickDiscardFolderModal();
  }

  // function deleteNode(id) {
  //   const { node, parent } = findNode(id, nodes);
  //   if (!node) {
  //     return;
  //   }
  //   if (!parent) {
  //     // Delete root node
  //     setNodes(nodes.filter((n) => n.id !== id));
  //   } else {
  //     // Delete child node
  //     const index = parent.descendants.findIndex((n) => n.id === id);
  //     if (index !== -1) {
  //       parent.descendants.splice(index, 1);
  //       setNodes([...nodes]);
  //     }
  //   }
  //   toast.success("Node Deleted Successfully.");
  // }
  const onHandleDelete = async (data) => {
    console.log("🚀 ~ file: Sidebar.js:208 ~ onHandleDelete ~ data:", data);
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
      preConfirm: () => {
        // deleteCredential(data.id);
        deleteFolder(hoverItem.id);
      },
    }).then(function (result) {
      console.log(
        "🚀 ~ file: Sidebar.js:224 ~ onHandleDelete ~ result:",
        result
      );
      if (result.value) {
        refetch();
      }
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  function editNode(id, newLabel) {
    const { node } = findNode(id, nodes);
    if (node) {
      node.name = newLabel;
      setNodes([...nodes]);
    }
    toast.success("Node Edited Successfully.");
    onClickDiscardFolderModal();
    setSelectedNode(null);
  }

  const handleAddSubNode = (node) => {
    setSelectedNode(node);
    handleModalToggle();
    setIsSubNode(true);
  };

  const handleAddNewNode = () => {
    handleModalToggle();
  };

  const handleEditNode = (node) => {
    setSelectedNode(node);
    handleModalToggle();
    setIsEdit(true);
  };

  // const handleDeleteNode = () => {
  //   onHandleDelete(hoverItem.id);
  //   setSelectedNode(null);
  // };

  function renderTree(nodes, level = 0) {
    const indent = level * 10;
    return nodes?.map((node) => {
      console.log(
        "🚀 ~ file: Sidebar.js:388 ~ returnnodes?.map ~ node:",
        selectedTab === node.name,
        selectedTab,
        node.name
      );
      // console.log(
      //   "🚀 ~ file: Sidebar.js:230 ~ returndata?.data?.data?.folders?.map ~ node:",
      //   hoverItem?.id === node?.id,
      //   "hoverItem.id",
      //   hoverItem?.id,
      //   "node.id",
      //   node?.id,
      //   "hoverItem.parent_id",
      //   hoverItem?.parent_id,
      //   "node.parent_id",
      //   node?.parent_id,
      //   hoverItem?.parent_id === node?.parent_id
      // );
      return (
        <div
          key={node.id}
          className={`px-1 mt-1 ${
            selectedTab === node.name && "bg-primary text-light"
          } `}
          style={{ paddingTop: 5, paddingBottom: 5 }}
        >
          {node.is_project ? (
            <div className="container__option-selector">
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
                    handleModalToggle();
                  }}
                />
                <MoreVertical size={16} className="float-end" color="#131313" />
              </div>
            </div>
          ) : (
            <div
              className={`d-flex justify-content-between container__folders-list `}
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
                  // onClick={() => {
                  //   handleSelectNode(node);
                  //   handleModalToggle();
                  // }}
                >
                  {node?.name?.length > 7
                    ? `${node?.name.substr(0, 7)}...`
                    : node?.name}
                </span>
              </div>
              {hoverItem && hoverItem.uuid === node.uuid && (
                <div className="d-flex">
                  <Plus
                    size={16}
                    color="#131313"
                    className="cursor-pointer me-1"
                    onClick={() => handleAddSubNode(node)}
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
                        onClick={() => handleEditNode(node)}
                      >
                        <Edit3 size={17} className="me-1" />
                        Edit
                      </DropdownItem>
                      <DropdownItem className="w-100" onClick={onHandleDelete}>
                        <Trash2 size={17} className="me-1" />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              )}
            </div>
          )}
          {node?.tree?.length > 0 && renderTree(node.tree, level + 1)}
        </div>
      );
    });
  }

  const onClickDiscardModal = () => {
    setShow(false);
  };

  const handleToggleModal = () => {
    setShow((prevState) => !prevState);
    setIsNewProject(true);
  };

  const handleCreateProject = (values) => {
    addNode(values.projectName, null, true);
    // setNewNodeLabel("");
    // handleModalToggle();
    setShow(false);
    return null;
  };

  // if (isLoading) {
  //   return (
  //     <div className="container-xxl d-flex justify-content-center align-items-center">
  //       <Spinner type="grow" color="primary" />
  //     </div>
  //   );
  // }

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
                  onClick={handleToggleModal}
                  className="cursor-pointer"
                />
              </div>
              <PerfectScrollbar
                className="sidebar-menu-list"
                options={{ wheelPropagation: false }}
              >
                <ListGroup tag="div" className="list-group-messages">
                  {/* <div className="container__option-selector px-1">
                    <div>
                      <img
                        src={polygon}
                        alt="Polygon icon"
                        className="me-1"
                        width="10px"
                        height="7px"
                      />
                      <Layers size={16} className="me-1" color="#131313" />
                      <span className="container__option-heading">
                        {item.name?.length > 9
                          ? `${item.name.substr(0, 10)}...`
                          : item.name}
                      </span>
                    </div>
                    <div>
                      <Plus
                        size={16}
                        color="#131313"
                        className="cursor-pointer me-1"
                        onClick={handleAddNewNode}
                      />
                      <MoreVertical
                        size={16}
                        // className="float-end"
                        color="#131313"
                      />
                    </div>
                  </div> */}
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <Spinner type="grow" color="primary" />
                    </div>
                  ) : (
                    renderTree(projects)
                  )}

                  <div>
                    <Modal
                      isOpen={isModalOpen}
                      toggle={handleModalToggle}
                      onClosed={onClickDiscardFolderModal}
                    >
                      <ModalHeader toggle={handleModalToggle}>
                        {isSubNode
                          ? "Add SubFolder"
                          : isEdit
                          ? "Edit Folder"
                          : "Add FOlder"}
                      </ModalHeader>
                      <ModalBody>
                        <div className="form-group">
                          <label>Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newNodeLabel}
                            onChange={handleNodeLabelChange}
                          />
                        </div>
                        {/* <div className="form-group">
                          <label>Type:</label>
                          <select
                            className="form-control"
                            value={nodeType}
                            onChange={(e) => setNodeType(e.target.value)}
                          >
                            <option value="node">Node</option>
                            <option value="subnode">Sub-Node</option>
                          </select>
                        </div> */}
                      </ModalBody>{" "}
                      <ModalFooter>
                        {/* {isEdit ? ( */}
                        {!isSubNode && (
                          <Button
                            color="primary"
                            onClick={
                              isEdit
                                ? () => {
                                    editNode(selectedNode.id, newNodeLabel);
                                  }
                                : () => {
                                    addNode(newNodeLabel, null);
                                  }
                            }
                          >
                            {isEdit ? "Edit Node" : "Add Node"}
                          </Button>
                        )}
                        {isSubNode && (
                          <Button
                            color="primary"
                            onClick={() =>
                              addSubnode(newNodeLabel, selectedNode.id)
                            }
                          >
                            Add SubNode
                          </Button>
                        )}
                        <Button color="secondary" onClick={handleModalToggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
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
        modalClass="modal-lg"
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
