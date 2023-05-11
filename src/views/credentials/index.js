// ** Reactstrap Imports
import { Fragment, useEffect, useState } from "react";
import { Search } from "react-feather";
import { Button, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Local Imports
import atTheRate from "@src/assets/images/icons/social/at-credentiali-con.png";
import gmail from "@src/assets/images/icons/social/gmai-logo.png";
import microsoft from "@src/assets/images/icons/social/microsoft.png";
import sendGrid from "@src/assets/images/icons/social/sendgrid.png";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomHeading from "../../components/CustomHeading/CustomHeading";
import CustomModal from "../../components/CustomModal/CustomModal";
import Divider from "../../components/Divider/Divider";
import SendGrid from "../../components/SendGrid/SendGrid";
import "../../style/base/base.scss";
import CredentialsFilter from "./CredentialsFilter";
import { toast } from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const dummyData = [
  { id: 1, name: "SendGrid", image: sendGrid },
  { id: 2, name: "Gmail", image: gmail },
  { id: 3, name: "Microsoft", image: microsoft },
  { id: 4, name: "Untitled Credential", image: atTheRate },
  { id: 5, name: "Untitled Credential", image: atTheRate },
];

const colourOptions = [
  {
    value: "add-new",
    label: "Add New Customer",
    type: "button",
    color: "flat-success",
  },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

const MySwal = withReactContent(Swal);

const Credentials = () => {
  const location = useLocation();
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(!!location?.state?.showModal ?? false);
  const [isSendGridData, setIsSendGridData] = useState(false);
  const [isCredential, setIsCredential] = useState(false);
  const [isSelectedCredential, setIsSelectedCredential] = useState(false);
  const [credentialsData, setCredentialsData] = useState(dummyData);
  const [searchedList, setSearchedList] = useState("");
  const [addCredentialsList, setAddCredentialsList] = useState(dummyData);
  const [selectedItem, setSelectedItem] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);
  const [optionsData, setOptionsData] = useState(colourOptions);

  useEffect(() => {
    const searchedData = dummyData.filter((post) => {
      return post.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setCredentialsData(searchedData);
  }, [searchTerm]);

  useEffect(() => {
    const searchedData = dummyData.filter((post) => {
      return post.name.toLowerCase().includes(searchedList.toLowerCase());
    });
    setAddCredentialsList(searchedData);
  }, [searchedList]);

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchedList = (event) => {
    setSearchedList(event.target.value);
  };

  const toggleModal = () => {
    setShow((prevState) => !prevState);
  };

  const toggleModalSelectedCredential = () => {
    setIsSelectedCredential((prevState) => !prevState);
  };

  const handleOnCreateNewProject = () => {
    setIsNewProject((prevState) => !prevState);
  };

  const onDiscard = () => {
    setShow(false);
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
    setIsCredential(true);
    setIsSelectedCredential(true);
    setIsSendGridData(true);
    setIsEdit(true);
    setShow(false);
  };

  const onHandleEdit = (item) => {
    setSelectedItem(item);
    setIsCredential(true);
    setIsSelectedCredential(true);
    setIsSendGridData(true);
    setIsEdit(true);
    setShow(false);
  };

  const onDiscardSelectedCredential = () => {
    // setShow(true);
    setIsCredential(false);
    setIsSelectedCredential(false);
    setIsSendGridData(false);
    setIsEdit(false);
    setIsNewProject(false);
  };

  const onClickSendGridCredential = (item) => {
    setIsCredential(true);
    setIsSelectedCredential(true);
    setIsSendGridData(true);
    setSelectedItem(item);
    setShow(false);
  };

  const onSubmitCredentialsData = (values) => {
    console.log(
      "🚀 ~ file: index.js:76 ~ onSubmitCredentialsData ~ values:",
      values
    );
    return null;
  };

  const onSubmitNewProjectData = (values) => {
    console.log(
      "🚀 ~ file: index.js:76 ~ onSubmitCredentialsData ~ values:",
      values
    );

    const newLabel =
      values.projectName.charAt(0).toUpperCase() + values.projectName.slice(1);
    const newOptions = [
      ...optionsData,
      {
        value: values.projectName,
        label: newLabel,
      },
    ];
    toast.success("New Project Added Successfully.");
    handleOnCreateNewProject();
    setOptionsData(newOptions);
    return null;
  };
  const selectedCredentialData = () => {
    if (isSendGridData) {
      return (
        <SendGrid
          isEdit={isEdit}
          isNewProject={isNewProject}
          item={selectedItem}
          onPressCredentials={onSubmitCredentialsData}
          onPressNewProject={onSubmitNewProjectData}
          handleOnCreateNewProject={handleOnCreateNewProject}
          optionsData={optionsData}
        />
      );
    }
  };

  const credentialsList = () => {
    return (
      <>
        <CustomHeading
          title="Add Credentials"
          subTitle="Select an app or service to connect to"
        />
        <Col className="px-1">
          <InputGroup className="input-group-merge w-100  ">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input
              value={searchedList}
              placeholder="Search for App"
              onChange={handleSearchedList}
            />
          </InputGroup>

          <div className="row">
            {addCredentialsList.map((item) => {
              return (
                <div
                  className="col-md-2 d-flex flex-column align-items-center mt-2 ps-0"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt="Google Icon"
                    width="56px"
                    height="56px"
                    onClick={() => onClickSendGridCredential(item)}
                    className="pointer-icon"
                  />
                  <h3
                    className="icon-title mt-1"
                    onClick={() => onClickSendGridCredential(item)}
                  >
                    {item.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </Col>
      </>
    );
  };

  return (
    <>
      <div className="row container-xxl overflow-auto">
        <Col className="col-12">
          <div className="row">
            <div className="content-header-left col-md-9 col-12 mb-2">
              <div className="col-12">
                <h2 className="content-header-title float-start mb-0">
                  Credentials
                </h2>
              </div>
            </div>
            <div className="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
              <Button color="primary" onClick={toggleModal} block>
                Add Credentials
              </Button>
            </div>
          </div>

          <Divider />

          <CredentialsFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchTerm={handleSearchTerm}
          />
          <div className="row">
            {credentialsData.map((item) => {
              return (
                <Fragment key={item.id}>
                  <CustomCard
                    name={item.name}
                    image={item.image}
                    data={item}
                    onHandleEdit={onHandleEdit}
                    onHandleView={onHandleView}
                    onHandleDelete={onHandleDelete}
                  />
                </Fragment>
              );
            })}
          </div>
        </Col>
      </div>
      <CustomModal toggleModal={toggleModal} onDiscard={onDiscard} show={show}>
        {credentialsList()}
      </CustomModal>

      {isCredential && (
        <CustomModal
          toggleModal={toggleModalSelectedCredential}
          onDiscard={onDiscardSelectedCredential}
          show={isSelectedCredential}
        >
          {selectedCredentialData()}
        </CustomModal>
      )}
    </>
  );
};

export default Credentials;
