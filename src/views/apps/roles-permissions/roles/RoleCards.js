// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";

// ** Third Party Components
import { Copy, Info } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Custom Components
import AvatarGroup from "@components/avatar-group";

// ** FAQ Illustrations
import illustration from "@src/assets/images/illustration/faq-illustrations.svg";

// ** Avatars
import avatar1 from "@src/assets/images/avatars/1.png";
import avatar2 from "@src/assets/images/avatars/2.png";
import avatar3 from "@src/assets/images/avatars/3.png";
import avatar4 from "@src/assets/images/avatars/4.png";
import avatar5 from "@src/assets/images/avatars/5.png";
import avatar6 from "@src/assets/images/avatars/6.png";
import avatar7 from "@src/assets/images/avatars/7.png";
import avatar8 from "@src/assets/images/avatars/8.png";
import avatar9 from "@src/assets/images/avatars/9.png";
import avatar10 from "@src/assets/images/avatars/10.png";
import avatar11 from "@src/assets/images/avatars/11.png";
import avatar12 from "@src/assets/images/avatars/12.png";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import { getPermissionListings } from "../../../../../api/rolesPermissions/apiMethods";
import { useQuery } from "react-query";

// ** Vars
const data = [
  {
    totalUsers: 4,
    title: "Administrator",
    users: [
      {
        size: "sm",
        title: "Vinnie Mostowy",
        img: avatar2,
      },
      {
        size: "sm",
        title: "Allen Rieske",
        img: avatar12,
      },
      {
        size: "sm",
        title: "Julee Rossignol",
        img: avatar6,
      },
      {
        size: "sm",
        title: "Kaith Dsouza",
        img: avatar11,
      },
    ],
  },
  {
    totalUsers: 7,
    title: "Manager",
    users: [
      {
        size: "sm",
        title: "Jimmy Ressula",
        img: avatar4,
      },
      {
        size: "sm",
        title: "John Doe",
        img: avatar1,
      },
      {
        size: "sm",
        title: "Kristi Lawker",
        img: avatar2,
      },
      {
        size: "sm",
        title: "Kaith D",
        img: avatar5,
      },
      {
        size: "sm",
        title: "Danny Paul",
        img: avatar7,
      },
    ],
  },
  {
    totalUsers: 5,
    title: "Users",
    users: [
      {
        size: "sm",
        title: "Andrew Tye",
        img: avatar6,
      },
      {
        size: "sm",
        title: "Rishi Swaat",
        img: avatar9,
      },
      {
        size: "sm",
        title: "Rossie Kim",
        img: avatar2,
      },
      {
        size: "sm",
        title: "Kim Merchent",
        img: avatar10,
      },
      {
        size: "sm",
        title: "Sam Dsouza",
        img: avatar8,
      },
    ],
  },
  {
    totalUsers: 3,
    title: "Support",
    users: [
      {
        size: "sm",
        title: "Kim Karlos",
        img: avatar3,
      },
      {
        size: "sm",
        title: "Katy Turner",
        img: avatar9,
      },
      {
        size: "sm",
        title: "Peter Adward",
        img: avatar12,
      },
      {
        size: "sm",
        title: "Kaith Dsouza",
        img: avatar10,
      },
      {
        size: "sm",
        title: "John Parker",
        img: avatar11,
      },
    ],
  },
  {
    totalUsers: 2,
    title: "Restricted User",
    users: [
      {
        size: "sm",
        title: "Kim Merchent",
        img: avatar10,
      },
      {
        size: "sm",
        title: "Sam Dsouza",
        img: avatar6,
      },
      {
        size: "sm",
        title: "Nurvi Karlos",
        img: avatar3,
      },
      {
        size: "sm",
        title: "Andrew Tye",
        img: avatar8,
      },
      {
        size: "sm",
        title: "Rossie Kim",
        img: avatar9,
      },
    ],
  },
];

const rolesArr = [
  "User Management",
  "Content Management",
  "Disputes Management",
  "Database Management",
  "Financial Management",
  "Reporting",
  "API Control",
  "Repository Management",
  "Payroll",
];

const RoleCards = (props) => {
  const { rolesData, permData, permError, permIsError, isLoading } = props;
  console.log("🚀 ~ file: RoleCards.js:219 ~ RoleCards ~ permData:", permData);
  // ** States
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Add New");
  const [permissionKeys, setPermissionKeys] = useState(null);

  const [selectedItem, setSelectedItem] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [noModulePermission, setNoModulePermission] = useState([]);
  // console.log(
  //   "🚀 ~ file: RoleCards.js:229 ~ RoleCards ~ noModulePermission:",
  //   noModulePermission
  // );
  // console.log(
  //   "🚀 ~ file: RoleCards.js:230 ~ RoleCards ~ rolePermissions:",
  //   rolePermissions
  // );

  // const {
  //   isLoading,
  //   data: permData,
  //   error,
  //   isFetching,
  //   isError,
  // } = useQuery("permissionData", () => getPermissionListings());

  // useEffect(() => {
  //   setPermissionData(permData?.data?.data);
  // }, [isFetching]);
  const handleSelectNoModulePermission = (option) => {
    // if (!!noModulePermission?.includes(option)) {
    //   setNoModulePermission((prevSelected) =>
    //     prevSelected.filter((selected) => selected !== option)
    //   );
    // } else {
    //   setNoModulePermission((prevSelected) => [...prevSelected, option]);
    // }
    const existingItem = noModulePermission?.filter((item) => item === option);

    if (!!existingItem?.length) {
      setNoModulePermission(
        noModulePermission?.filter((item) => item !== option)
      );
    } else {
      // selectedRows.push([id]);
      setNoModulePermission([...noModulePermission, option]);
    }
  };

  const handleCheckboxChange = (role, permission) => {
    setRolePermissions((prevState) => ({
      ...prevState,
      [role]: {
        ...(prevState[role] || {}),
        [permission]: !prevState[role]?.[permission],
      },
    }));
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  // console.log(
  //   "🚀 ~ file: RoleCards.js:280 ~ RoleCards ~ selectedOptions:",
  //   selectedOptions
  // );

  const handleSelectAll = (event) => {
    const { checked } = event.target;

    if (checked) {
      const allOptions = Object.values(permData?.module).flat();
      // console.log(
      //   "🚀 ~ file: RoleCards.js:287 ~ handleSelectAll ~ allOptions:",
      //   allOptions
      // );
      setSelectedOptions(allOptions);
    } else {
      setSelectedOptions([]);
    }
  };

  // const handleSelectAll = () => {
  //   const allSelected = Object.entries(permData?.module).every(
  //     ([role, permissions]) =>
  //       permissions.every((permission) => rolePermissions[role]?.[permission])
  //   );

  //   const updatedRolePermissions = {};
  //   const data = !!permData && Object.keys(permData?.module);
  //   data.forEach((role) => {
  //     updatedRolePermissions[role] = {};

  //     data[role].forEach((permission) => {
  //       updatedRolePermissions[role][permission] = !allSelected;
  //     });
  //   });

  //   setRolePermissions(updatedRolePermissions);
  // };

  // useEffect(() => {
  //   if (permData !== null) {
  //     const keys = !!permData && Object.keys(permData?.module);
  //     if (!!keys?.length) {
  //       setPermissionKeys(keys);
  //     }
  //   }
  // }, [permData]);

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { roleName: "" } });

  const onSubmit = (data) => {
    if (data.roleName.length) {
      setShow(false);
    } else {
      setError("roleName", {
        type: "manual",
      });
    }
  };

  const onReset = () => {
    setShow(false);
    reset({ roleName: "" });
  };

  const handleModalClosed = () => {
    setModalType("Add New");
    setValue("roleName");
  };
  const handleToggleModal = () => {
    setShow((prevState) => !prevState);
  };

  const rolesModalData = () => {
    return (
      <>
        <div className="text-center mb-4">
          <h1>{modalType} Role</h1>
          <p>Set role permissions</p>
        </div>
        <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <Label className="form-label" for="roleName">
              Role Name
            </Label>
            <Controller
              name="roleName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="roleName"
                  placeholder="Enter role name"
                  invalid={errors.roleName && true}
                />
              )}
            />
            {errors.roleName && (
              <FormFeedback>Please enter a valid role name</FormFeedback>
            )}
          </Col>
          <Col xs={12}>
            <h4 className="mt-2 pt-50">Role Permissions</h4>
            {isLoading && (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="primary" />
              </div>
            )}
            {permIsError && (
              <div className="container-xxl d-flex justify-content-center align-items-center">
                <h3>{permError.message}</h3>
              </div>
            )}
            <Table className="table-flush-spacing" responsive>
              <tbody>
                <tr>
                  <td className="text-nowrap fw-bolder">
                    <span className="me-50"> Administrator Access</span>
                    <Info size={14} id="info-tooltip" />
                    <UncontrolledTooltip placement="top" target="info-tooltip">
                      Allows a full access to the system
                    </UncontrolledTooltip>
                  </td>
                  <td>
                    <div className="form-check">
                      <Input
                        type="checkbox"
                        id="select-all"
                        // checked={
                        //   !!permData &&
                        //   Object.entries(permData?.module).every(
                        //     ([role, permissions]) =>
                        //       permissions.every(
                        //         (permission) =>
                        //           rolePermissions[role]?.[permission]
                        //       )
                        //   )
                        // }

                        checked={
                          selectedOptions.length === !!permData &&
                          Object.values(permData?.module).flat().length
                        }
                        onChange={handleSelectAll}
                      />
                      <Label className="form-check-label" for="select-all">
                        Select All
                      </Label>
                    </div>
                  </td>
                </tr>
                {!!permData &&
                  Object.entries(permData.module).map(
                    ([role, permissions], index) => {
                      return (
                        <tr key={index}>
                          <td className="text-nowrap fw-bolder">{role}</td>
                          <td>
                            <div className="d-flex">
                              {permissions?.map((perm, pindex) => {
                                return (
                                  <div
                                    className="form-check me-3 me-lg-5"
                                    key={pindex}
                                  >
                                    <Input
                                      type="checkbox"
                                      id={`read-${role}`}
                                      checked={
                                        rolePermissions[role]?.[perm] || false
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(role, perm)
                                      }
                                    />
                                    <Label
                                      className="form-check-label"
                                      for={`read-${role}`}
                                    >
                                      {perm}
                                    </Label>
                                  </div>
                                );
                              })}

                              {/* <div className="form-check me-3 me-lg-5">
                            <Input
                              type="checkbox"
                              id={`write-${role}`}
                              checked={rolePermissions[role]?.[permission] || false}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                            <Label
                              className="form-check-label"
                              for={`write-${role}`}
                            >
                              Write
                            </Label>
                          </div>
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              id={`create-${role}`}
                              checked={rolePermissions[role]?.[permission] || false}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                            <Label
                              className="form-check-label"
                              for={`create-${role}`}
                            >
                              Create
                            </Label>
                          </div> */}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}

                <tr>
                  <h4 className="mt-2 pt-50">Other Permissions</h4>
                  {/* </tr>
                <tr> */}
                  <td>
                    <div className="row">
                      {permData?.no_module?.map((item, index) => {
                        return (
                          <div className="col-md-3" key={index}>
                            <div className="form-check me-3 me-lg-5">
                              <Input
                                type="checkbox"
                                id={`read-${item}`}
                                checked={noModulePermission?.includes(item)}
                                onChange={() =>
                                  handleSelectNoModulePermission(item)
                                }
                              />
                              <Label
                                className="form-check-label"
                                for={`read-${item}`}
                              >
                                {item}
                              </Label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col className="text-center mt-2" xs={12}>
            <Button type="submit" color="primary" className="me-1">
              Submit
            </Button>
            <Button type="reset" outline onClick={onReset}>
              Discard
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Fragment>
      <Row>
        {!!Boolean(!rolesData?.length) && (
          <h3 className="d-flex align-items-center justify-content-center p-2">
            No Roles Found in Database
          </h3>
        )}
        {rolesData?.map((item, index) => {
          return (
            <Col key={index} xl={4} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <span>{`Total ${item.totalUsers} users`}</span>
                    <AvatarGroup data={item.users} />
                  </div>
                  <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                    <div className="role-heading">
                      <h4 className="fw-bolder">{item.name}</h4>
                      <Link
                        to="/"
                        className="role-edit-modal"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalType("Edit");
                          setShow(true);
                        }}
                      >
                        <small className="fw-bolder">Edit Role</small>
                      </Link>
                    </div>
                    <Link
                      to=""
                      className="text-body"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Copy className="font-medium-5" />
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
        <Col xl={4} md={6}>
          <Card>
            <Row>
              <Col sm={5}>
                <div className="d-flex align-items-end justify-content-center h-100">
                  <img
                    className="img-fluid mt-2"
                    src={illustration}
                    alt="Image"
                    width={85}
                  />
                </div>
              </Col>
              <Col sm={7}>
                <CardBody className="text-sm-end text-center ps-sm-0">
                  <Button
                    color="primary"
                    className="text-nowrap mb-1"
                    onClick={() => {
                      setModalType("Add New");
                      setShow(true);
                    }}
                  >
                    Add New Role
                  </Button>
                  <p className="mb-0">Add a new role, if it does not exist</p>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <CustomModal
        toggleModal={handleToggleModal}
        onDiscard={handleModalClosed}
        show={show}
        modalClass={"modal-lg"}
      >
        {rolesModalData()}
      </CustomModal>
    </Fragment>
  );
};

export default RoleCards;
