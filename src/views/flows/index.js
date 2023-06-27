// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Local Imports
import "@styles/react/apps/app-email.scss";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import {
  createFolder,
  createProjects,
  createWorkflow,
  deleteFolder,
  deleteProject,
  editFolder,
  editProject,
  getProjectLists,
  getWorkflowLists,
} from "../../../api/apiMethods";
import CreateNewProject from "../../components/CreateNewProject/CreateNewProject";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomModal from "../../components/CustomModal/CustomModal";
import Divider from "../../components/Divider/Divider";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import WorkFlowsCard from "../../components/WorkFlowsCard/WorkFlowsCard";
import "../../style/base/base.scss";
import CredentialsFilter from "../credentials/CredentialsFilter";
import Sidebar from "./Sidebar";

const sortOptions = [
  {
    id: 1,
    title: "A to Z",
  },
  {
    id: 2,
    title: "Z to A",
  },
];

const MySwal = withReactContent(Swal);

const WorkFlows = () => {
  // ** States
  const [isViewAll, setIsViewAll] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isWorkFLow, setIsWorkFLow] = useState(false);
  const [isProjects, setIsProjects] = useState(true);
  const [projects, setProjects] = useState([]);
  const [folders, setFolders] = useState([]);
  const [isActiveMainFolder, setIsActiveMainFolder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedFromProjects, setSearchedFromProjects] = useState();
  const [searchedFromFolders, setSearchedFromFolders] = useState([]);
  const [isActiveSubFolder, setIsActiveSubFolder] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [isEditDetail, setIsEditDetail] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [flowsData, setFlowsData] = useState();
  const [customSelectedOption, setCustomSelectedOption] = useState(null);

  let headerTitle;

  if (isEdit) {
    headerTitle = "Update Use Case";
  } else if (isEditProject) {
    headerTitle = "Update Project";
  } else if (isWorkFLow) {
    headerTitle = "Create Workflows";
  } else if (isProjects) {
    headerTitle = "Create Project";
  } else {
    headerTitle = "Create Use Case";
  }

  let flowsLabel;

  if (isProjects) {
    flowsLabel = "All Projects";
  } else if (isActiveMainFolder) {
    flowsLabel = "Use Cases";
  }

  const { isLoading, data, error, refetch, isFetching, isError } = useQuery(
    "projectsList",
    () => getProjectLists()
  );

  const {
    isLoading: isWorkflowLoader,
    data: workflowData,
    error: workflowError,
    refetch: workflowRefetch,
    isError: isWorkflowError,
    isFetching: isWorkflowFetching,
    isRefetching,
  } = useQuery("workFLowsLists", async () => await getWorkflowLists());

  let searchedFrom;

  if (isProjects) {
    searchedFrom = projects;
  } else if (isActiveMainFolder) {
    searchedFrom = folders;
  }

  useEffect(() => {
    if (!!workflowData?.data?.data?.length) {
      setFlowsData(workflowData?.data?.data);
    }
  }, [isWorkflowFetching]);

  useEffect(() => {
    setProjects(data?.data?.data);
    setSearchedFromProjects(data?.data?.data);
    if (!!selectedTab?.is_project) {
      const selectedProjectIndex = data?.data?.data.findIndex(
        (item) => item.id === selectedTab?.id
      );

      setFolders(data?.data?.data[selectedProjectIndex]?.tree);
      setSearchedFromFolders(data?.data?.data[selectedProjectIndex]?.tree);
    }
  }, [isFetching]);

  const navigate = useNavigate();

  const handleActiveTab = (node) => {
    setSelectedTab(node);
    setIsActiveSubFolder(false);
    setIsActiveMainFolder(false);
    setSelectedOption("Sort");
    setIsEditDetail(false);
  };

  const handleActiveTabFolders = (node) => {
    setSelectedTab(node);
    setSelectedNode(node);
    setIsActiveMainFolder(true);
    setIsProjects(false);
    setIsActiveSubFolder(false);
    // setIsEditDetail(false);
    setSelectedOption("Sort");
    if (!!node?.is_project) {
      const selectedProjectIndex = projects.findIndex(
        (item) => item.id === node?.id
      );
      setFolders(projects[selectedProjectIndex]?.tree);
      setSearchedFromFolders(projects[selectedProjectIndex]?.tree);
    }
  };

  const handleActiveTabSubFolders = (node) => {
    setSelectedTab(node);
    setSelectedNode(node);
    setIsActiveSubFolder(true);
    setIsProjects(false);
    setIsActiveMainFolder(false);
    // setIsEditDetail(false);
  };

  const onClickDiscardModal = () => {
    setShow(false);
    setIsWorkFLow(false);
    setSelectedItem(null);
    setIsEditDetail(false);
    setCustomSelectedOption(null);
    // setIsActiveMainFolder(false);
    // setIsActiveSubFolder(false);
  };

  const handleToggleModal = () => {
    setShow((prevState) => !prevState);
  };

  const onHandleCreateWorkFLows = (node) => {
    setIsWorkFLow((prevState) => !prevState);
    setCustomSelectedOption(node);
    setShow(true);
    setIsEditDetail(false);
    // setIsActiveSubFolder(false);
    // setIsActiveMainFolder(true);
  };

  const handleCreateWorkflow = async (values) => {
    setIsLoader(true);
    try {
      const projectData = {
        name: values.projectName,
        project_id: isActiveMainFolder
          ? selectedNode?.id
          : selectedNode.project_id,
        folder_id: isActiveSubFolder ? selectedNode.id : null,
      };
      await createWorkflow(projectData).then((res) => {
        if (res.data.code === 201) {
          workflowRefetch();
          handleToggleModal();
          setIsLoader(false);
          toast.success("Workflow Added Successfully.");
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };

  const handleToggleCreateProjectModal = () => {
    handleToggleModal();
    // setSelectedTab(null);
    // setIsNewProject(true);
    setSelectedNode(null);
    setSelectedItem(null);
    setIsProjects(true);
    setIsActiveMainFolder(false);
    setIsActiveSubFolder(false);
    setIsEditDetail(false);
  };

  const handleToggleCreateFolderModal = (node) => {
    handleToggleModal();
    setSelectedNode(node);
    setSelectedItem(node);
    setCustomSelectedOption(node);
    setSelectedTab(node);
    setIsProjects(false);
    setIsActiveMainFolder(true);
    setIsEditProject(false);
    setIsEdit(false);
    setIsEditDetail(false);
  };

  const handleCreateFolder = async (values) => {
    setIsLoader(true);
    try {
      const projectData = {
        name: values.projectName,
        project_id: selectedNode.id,
      };
      await createFolder(projectData).then((res) => {
        if (res.status === 201) {
          // setSelectedNode(null);
          refetch();
          setIsLoader(false);
          handleToggleModal();
          toast.success("New Use Case Added Successfully.");
          setCustomSelectedOption(null);
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };

  const handleToggleCreateSubFolderModal = (node) => {
    handleToggleModal();
    setSelectedNode(node);
    setSelectedTab(node);
    setCustomSelectedOption(node);
    // setSelectedItem(null);
    setIsProjects(false);
    setIsActiveMainFolder(false);
    setIsActiveSubFolder(true);
    setIsEditProject(false);
    setIsEdit(false);
    setIsWorkFLow(false);
    setIsEditDetail(false);
  };

  const handleCreateSubFolder = async (values) => {
    setIsLoader(true);
    try {
      const projectData = {
        name: values.projectName,
        project_id: selectedNode.project_id,
        parent_id: selectedNode.id,
      };
      await createFolder(projectData).then((res) => {
        if (res.status === 201) {
          refetch();
          setIsLoader(false);
          toast.success("New Use Case Added Successfully.");
          setCustomSelectedOption(null);
          // setIsNewProject(false);
          // setSelectedNode(null);
          handleToggleModal();
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };

  const handleEditFolderModal = (node) => {
    setSelectedNode(node);
    setSelectedItem(node);
    setCustomSelectedOption(node);
    handleToggleModal();
    setIsEdit(true);
    setIsEditProject(false);
    setIsProjects(false);
    setIsEditDetail(true);
  };

  const handleViewSelectedProject = (node) => {
    setSelectedNode(node);
    setSelectedItem(node);
    handleActiveTabFolders(node);
    // handleToggleModal();
    setIsEditProject(false);
    setIsProjects(false);
    setIsEdit(false);
    setIsActiveMainFolder(true);
    setIsEditDetail(false);
  };

  const handleEditProjectModal = (node) => {
    setSelectedNode(node);
    setSelectedItem(node);
    // setCustomSelectedOption(node);
    handleToggleModal();
    setIsEditProject(true);
    setIsActiveMainFolder(false);
    setIsProjects(true);
    setIsEdit(false);
    setIsEditDetail(true);
  };

  const handleEditProject = async (values) => {
    setIsLoader(true);
    try {
      const projectData = {
        name: values.projectName,
        description: values.description,
        // parent_id: selectedNode.id,
      };
      await editProject(projectData, selectedNode.id).then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Project Edited Successfully.");
          setSelectedItem(null);
          setIsLoader(false);
          handleToggleModal();
          setIsEditProject(false);
          setCustomSelectedOption(null);
          setIsActiveMainFolder(true);
          handleActiveTabFolders(selectedNode);
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };

  const onHandleViewFolder = (node) => {
    setSelectedNode(node);
    setSelectedItem(node);
    handleActiveTabSubFolders(node);
    // handleToggleModal();
    setIsEdit(false);
    setIsEditProject(false);
    setIsProjects(false);
  };

  const handleEditFolder = async (values) => {
    setIsLoader(true);
    try {
      const projectData = {
        name: values.projectName,
        project_id: selectedNode.project_id,
        // parent_id: selectedNode.id,
      };
      await editFolder(projectData, selectedNode.id).then((res) => {
        if (res.status === 201) {
          refetch();
          toast.success("Use Case Edited Successfully.");
          setSelectedItem(null);
          setIsLoader(false);
          handleToggleModal();
          setIsEdit(false);
          setCustomSelectedOption(null);
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };

  const handleCreateProject = async (values) => {
    setIsLoader(true);
    try {
      const projectData = {
        name: values.projectName,
        description: values.description,
        // user_id: 1,
      };
      await createProjects(projectData).then((res) => {
        if (res.status === 201) {
          refetch();
          toast.success("New Project Added Successfully.");
          setIsLoader(false);
          handleToggleModal();
        } else {
          toast.error(res.data.message);
          // handleToggleModal();
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };

  const handleViewAll = () => {
    setIsViewAll((prevState) => !prevState);
  };

  const foldersData = isViewAll
    ? searchedFromFolders
    : searchedFromFolders?.slice(0, 3);

  const onHandleCredentials = () => {
    const params = {
      showModal: true,
    };
    navigate("/apps/credentials", { state: params });
  };

  const onHandleDeleteProject = async (data) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "Use Cases and Workflows will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
      preConfirm: async () => {
        await deleteProject(data);
      },
    }).then(function (result) {
      if (result.value) {
        refetch();
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your Project has been deleted.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  const onHandleDeleteFolder = async (data) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "Use Cases and workflows will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
      preConfirm: async () => {
        await deleteFolder(data);
      },
    }).then(function (result) {
      if (result.value) {
        refetch();
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your Use Case has been deleted.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  // const onHandleEdit = (item) => {
  //   setSelectedItem(item);
  //   setIsEdit(true);
  //   setShow(true);
  // };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm?.length) {
      const searchedData = searchedFrom.filter((post) => {
        return post.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (isProjects) {
        setSearchedFromProjects(searchedData);
      } else if (isActiveMainFolder) {
        // setFolders(searchedData);
        setSearchedFromFolders(searchedData);
      }
    } else {
      setSearchedFromProjects(data?.data?.data);
      // setFolders(searchedFromFolders);
      setSearchedFromFolders(searchedFrom);
    }
  }, [searchTerm]);

  const handleOnSelectSort = (value) => {
    setSelectedOption(value);
    if (value === "A to Z") {
      const sortedList = [...searchedFrom].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      // setList(sortedList);
      if (isProjects) {
        setSearchedFromProjects(sortedList);
      } else if (isActiveMainFolder) {
        setSearchedFromFolders(sortedList);
      }
    } else if (value === "Z to A") {
      const sortedList = [...searchedFrom].sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      if (isProjects) {
        setSearchedFromProjects(sortedList);
      } else if (isActiveMainFolder) {
        setSearchedFromFolders(sortedList);
      }
    } else {
      setSearchedFromProjects(data?.data?.data);
      setSearchedFromFolders(searchedFrom);
    }
  };

  if (isError) {
    return (
      <div className="container-xxl d-flex justify-content-center align-items-center">
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={3} md={3} sm={3}>
          <Sidebar
            handleActiveTab={handleActiveTab}
            handleActiveTabSubFolders={handleActiveTabSubFolders}
            handleActiveTabFolders={handleActiveTabFolders}
            handleCreateProject={handleToggleCreateProjectModal}
            handleToggleCreateFolderModal={handleToggleCreateFolderModal}
            handleToggleCreateSubFolderModal={handleToggleCreateSubFolderModal}
            handleCreateSubFolder={handleCreateSubFolder}
            handleDeleteFolder={onHandleDeleteFolder}
            handleDeleteProject={onHandleDeleteProject}
            handleEditFolderModal={handleEditFolderModal}
            handleEditProjectModal={handleEditProjectModal}
            selectedTab={selectedTab}
            projects={projects}
            folders={folders}
            isLoading={isLoading}
            setIsProjects={setIsProjects}
            setIsActiveMainFolder={setIsActiveMainFolder}
            setCustomSelectedOption={setCustomSelectedOption}
            customSelectedOption={customSelectedOption}
          />
        </Col>
        <Col lg={9} md={9} sm={9}>
          <div className=" w-100 h-100">
            <div className="content-body">
              <Row>
                <Col md={8} sm={6} className="content-header-left mb-2">
                  <h2 className="content-header-title float-start mb-0">
                    {isProjects
                      ? "Projects"
                      : isActiveMainFolder
                      ? `Project: ${selectedTab?.name}`
                      : `Use Case: ${selectedTab?.name}`}
                  </h2>
                </Col>
                <Col
                  md={4}
                  sm={6}
                  className="content-header-right text-md-end d-md-block"
                >
                  {!!projects?.length ? (
                    isProjects ? (
                      <Button
                        color="primary"
                        onClick={handleToggleCreateProjectModal}
                        block
                      >
                        Create Project
                        <Plus size={20} className="ms-1" color="#fff" />
                      </Button>
                    ) : (
                      <UncontrolledDropdown
                        className="chart-dropdown"
                        style={{
                          marginLeft: 2,
                        }}
                      >
                        <DropdownToggle
                          color="primary"
                          // onClick={handleToggleModal}
                          block
                        >
                          Create
                          <Plus size={20} className="ms-1" color="#fff" />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem
                            className="w-100"
                            onClick={() =>
                              onHandleCreateWorkFLows(selectedNode)
                            }
                          >
                            Flows
                          </DropdownItem>
                          <DropdownItem
                            className="w-100"
                            onClick={onHandleCredentials}
                          >
                            Credentials
                          </DropdownItem>
                          <DropdownItem
                            className="w-100"
                            onClick={() => {
                              // setIsActiveMainFolder(true);
                              // setIsActiveSubFolder(false);
                              handleToggleCreateFolderModal(selectedNode);
                            }}
                          >
                            Use Case
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    )
                  ) : null}
                </Col>
              </Row>

              <Divider />
              {!projects?.length && (
                // <Col md={9} lg={10}>
                <Card className="shadow-none">
                  <CardBody
                    className="d-flex flex-column align-items-center justify-content-center text-center overflow-hidden"
                    style={{ height: "90dvh" }}
                  >
                    <h3>Create Your First Project</h3>
                    <p>lorem Ipsum enim ullamco ea commodo consequat.</p>
                    <div style={{ width: "14rem !important" }}>
                      <Button
                        color="primary"
                        onClick={handleToggleCreateProjectModal}
                        block
                      >
                        Create Project
                        <Plus size={20} className="ms-1" color="#fff" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
                // </Col>
              )}

              {!isActiveSubFolder && projects?.length && (
                <CredentialsFilter
                  searchClass="col-md-6"
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearchTerm={handleSearchTerm}
                  sortOptions={sortOptions}
                  handleOnSelectSort={handleOnSelectSort}
                  selectedOption={selectedOption}
                />
              )}

              {!!projects?.length && (
                <div className="row">
                  <div className="d-flex justify-content-between">
                    <p className="folder-class">{flowsLabel}</p>
                    {!isProjects &&
                      isActiveMainFolder &&
                      folders?.length > 3 && (
                        <p className="view-all-class" onClick={handleViewAll}>
                          {isViewAll ? "View Less" : "View All"}
                        </p>
                      )}
                  </div>
                  {!searchedFromProjects?.length && !!searchTerm?.length && (
                    <NoRecordFound searchTerm={searchTerm} />
                  )}

                  {isLoading && (
                    <div className="d-flex justify-content-center align-items-center">
                      <Spinner type="grow" color="primary" />
                    </div>
                  )}
                  {!searchedFromProjects?.length ? (
                    <h3 className="d-flex align-items-center justify-content-center p-2">
                      No Project Found in Database
                    </h3>
                  ) : (
                    isProjects &&
                    searchedFromProjects?.map((item) => {
                      return (
                        <Fragment key={item.id}>
                          <CustomCard
                            name={item.name}
                            // image={item.image}
                            data={item}
                            isIcon
                            colNumber={4}
                            titleClass="custom-card-title"
                            onHandleEdit={handleEditProjectModal}
                            onHandleView={handleViewSelectedProject}
                            onHandleDelete={onHandleDeleteProject}
                            isProjects={isProjects}
                          />
                        </Fragment>
                      );
                    })
                  )}

                  {isActiveMainFolder && (
                    <>
                      {!searchedFromFolders?.length && !!searchTerm?.length && (
                        <NoRecordFound searchTerm={searchTerm} />
                      )}
                      {!folders?.length ? (
                        <h3 className="d-flex align-items-center justify-content-center p-2">
                          No Use Cases Found in this Project
                        </h3>
                      ) : (
                        foldersData.map((item) => {
                          return (
                            <Fragment key={item.id}>
                              <CustomCard
                                name={item.name}
                                // image={item.image}
                                data={item}
                                isIcon
                                colNumber={4}
                                titleClass="custom-card-title"
                                onHandleEdit={handleEditFolderModal}
                                onHandleView={onHandleViewFolder}
                                onHandleDelete={onHandleDeleteFolder}
                              />
                            </Fragment>
                          );
                        })
                      )}
                    </>
                  )}
                </div>
              )}

              {(isActiveMainFolder || isActiveSubFolder) && (
                <WorkFlowsCard
                  selectedTab={selectedTab}
                  isActiveMainFolder={isActiveMainFolder}
                  isActiveSubFolder={isActiveSubFolder}
                  isLoading={isWorkflowLoader}
                  data={workflowData?.data?.data}
                  error={workflowError}
                  refetch={workflowRefetch}
                  isError={isWorkflowError}
                  isFetching={isWorkflowFetching}
                  isRefetching={isRefetching}
                  setFlowsData={setFlowsData}
                  flowsData={flowsData}
                />
              )}
            </div>
          </div>
        </Col>

        <CustomModal
          toggleModal={handleToggleModal}
          onDiscard={onClickDiscardModal}
          show={show}
          modalClass={isWorkFLow ? "modal-fullscreen" : "modal-lg"}
        >
          <div className="p-1">
            <CreateNewProject
              onCancel={onClickDiscardModal}
              onSubmit={
                isWorkFLow
                  ? handleCreateWorkflow
                  : isEditProject
                  ? handleEditProject
                  : isEdit
                  ? handleEditFolder
                  : isActiveSubFolder
                  ? handleCreateSubFolder
                  : isProjects
                  ? handleCreateProject
                  : handleCreateFolder
              }
              isEdit={isEdit}
              data={selectedItem}
              projects={projects}
              title={headerTitle}
              isWorkFLow={isActiveMainFolder || isActiveSubFolder}
              selectedTab={selectedTab}
              isEditDetail={isEditDetail}
              isLoading={isLoader}
              setCustomSelectedOption={setCustomSelectedOption}
              customSelectedOption={customSelectedOption}
              isActiveMainFolder={isActiveMainFolder}
              setIsActiveMainFolder={setIsActiveMainFolder}
              setIsActiveSubFolder={setIsActiveSubFolder}
              isProjects={isProjects}
              setSelectedNode={setSelectedNode}
            />
          </div>
        </CustomModal>
      </Row>
    </Container>
  );
};

export default WorkFlows;
