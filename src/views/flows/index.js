// ** React Imports
import classnames from "classnames";
import { Fragment, useState } from "react";
import { Plus } from "react-feather";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

// ** Local Imports
import atTheRate from "@src/assets/images/icons/social/at-credentiali-con.png";
import gmail from "@src/assets/images/icons/social/gmai-logo.png";
import microsoft from "@src/assets/images/icons/social/microsoft.png";
import sendGrid from "@src/assets/images/icons/social/sendgrid.png";
import "@styles/react/apps/app-email.scss";
import CreateNewProject from "../../components/CreateNewProject/CreateNewProject";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomModal from "../../components/CustomModal/CustomModal";
import Divider from "../../components/Divider/Divider";
import WorkFlowsCard from "../../components/WorkFlowsCard/WorkFlowsCard";
import "../../style/base/base.scss";
import Sidebar from "./Sidebar";

const dummyData = [
  { id: 1, name: "SendGrid", image: sendGrid },
  { id: 2, name: "Gmail", image: gmail },
  { id: 3, name: "Microsoft", image: microsoft },
  { id: 4, name: "Untitled Credential", image: atTheRate },
  { id: 5, name: "Untitled Credential", image: atTheRate },
];

const MySwal = withReactContent(Swal);

const WorkFlows = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [credentialsData, setCredentialsData] = useState(dummyData);
  const [isViewAll, setIsViewAll] = useState(false);
  const [show, setShow] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

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

  const handleViewAll = () => {
    setIsViewAll((prevState) => !prevState);
  };

  const foldersData = isViewAll ? credentialsData : credentialsData.slice(0, 3);

  const onHandleCredentials = () => {
    const params = {
      showModal: true,
    };
    navigate("/apps/credentials", { state: params });
  };

  const onHandleDelete = async (data) => {
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
        const deletedItem = credentialsData.filter(
          (item) => item.id !== data.id
        );
        setCredentialsData(deletedItem);
      },
    }).then(function (result) {
      console.log("🚀 ~ file: index.js:70 ~ onHandleDelete ~ result:", result);
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

  const onHandleView = (item) => {
    setSelectedItem(item);
    setIsEdit(true);
    setShow(true);
  };

  const onHandleEdit = (item) => {
    setSelectedItem(item);
    setIsEdit(true);
    setShow(true);
  };

  return (
    <div className="content-area-wrapper">
      <Sidebar />
      <div className="content-right overflow-auto h-100">
        <div className="content-body">
          <div
            className={classnames("body-content-overlay", {
              show: sidebarOpen,
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Col className="container-xxl col-12">
            <Row>
              <Col md={9} sm={6} className="content-header-left mb-2">
                <h2 className="content-header-title float-start mb-0">
                  Workflows
                </h2>
              </Col>
              <Col
                md={3}
                sm={6}
                className="content-header-right text-md-end d-md-block"
              >
                {isNewProject ? (
                  <Button color="primary" onClick={handleToggleModal} block>
                    Create
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
                        // onClick={() => onHandleView(data)}
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
                        onClick={handleToggleModal}
                      >
                        Folder
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Col>
            </Row>

            <Divider />

            <div className="row">
              <div className="d-flex justify-content-between">
                <p className="folder-class">Folder</p>
                <p className="view-all-class" onClick={handleViewAll}>
                  {isViewAll ? "View Less" : "View All"}
                </p>
              </div>
              {foldersData.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <CustomCard
                      name={item.name}
                      // image={item.image}
                      data={item}
                      isIcon
                      colNumber={4}
                      titleClass="custom-card-title"
                      onHandleEdit={onHandleEdit}
                      onHandleView={onHandleView}
                      onHandleDelete={onHandleDelete}
                    />
                  </Fragment>
                );
              })}
            </div>
            <WorkFlowsCard />
          </Col>
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
            isEdit={isEdit}
            data={selectedItem}
            title={isEdit ? "Edit Folder" : "Create Folder"}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default WorkFlows;
