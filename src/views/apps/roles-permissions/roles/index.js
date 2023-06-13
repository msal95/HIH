// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Roles Components
import Table from "./Table";
import RoleCards from "./RoleCards";
import { useQuery } from "react-query";
import {
  getPermissionListings,
  getRolesListings,
} from "../../../../../api/rolesPermissions/apiMethods";
import { Spinner } from "reactstrap";

const Roles = () => {
  const [rolesData, setRolesData] = useState([]);
  const [permissionData, setPermissionData] = useState(null);

  const { isLoading, data, error, isFetching, isError } = useQuery(
    "rolesData",
    () => getRolesListings()
  );

  const {
    isLoading: permIsLoading,
    data: permData,
    error: permError,
    isFetching: permIsFetching,
    isError: permIsError,
  } = useQuery("permissionData", () => getPermissionListings());

  useEffect(() => {
    setRolesData(data?.data?.data);
  }, [isFetching]);

  useEffect(() => {
    setPermissionData(permData?.data?.data);
  }, [permIsFetching]);

  if (isError) {
    return (
      <div className="container-xxl d-flex justify-content-center align-items-center">
        <h3>{error.message}</h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner type="grow" color="primary" />
      </div>
    );
  }

  return (
    <Fragment>
      <h3>Roles List</h3>
      <p className="mb-2">
        A role provides access to predefined menus and features depending on the
        assigned role to an administrator that can have access to what he needs.
      </p>

      <RoleCards
        rolesData={rolesData}
        permData={permissionData}
        permError={permError}
        permIsError={permIsError}
        isLoading={permIsLoading}
      />
      <h3 className="mt-50">Total users with their roles</h3>
      <p className="mb-2">
        Find all of your company’s administrator accounts and their associate
        roles.
      </p>
      <div className="app-user-list">
        <Table />
      </div>
    </Fragment>
  );
};

export default Roles;
