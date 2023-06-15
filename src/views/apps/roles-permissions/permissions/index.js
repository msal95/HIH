// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Card, Spinner } from "reactstrap";

// ** Table Import
import Table from "./Table";
import { getPermissionListings } from "../../../../../api/rolesPermissions/apiMethods";
import { useQuery } from "react-query";

const Permissions = () => {
  const [permissionsData, setPermissionsData] = useState([]);

  const { isLoading, data, error, isFetching, isError, refetch } = useQuery(
    "permissionsData",
    () => getPermissionListings()
  );

  useEffect(() => {
    setPermissionsData(data?.data?.data);
  }, [isFetching]);

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
      <h3>Permissions List</h3>
      <p>
        Each category (Basic, Professional, and Business) includes the four
        predefined roles shown below.
      </p>
      <Card>
        <div className="card-datatable app-user-list table-responsive">
          <Table data={permissionsData} refetch={refetch} />
        </div>
      </Card>
    </Fragment>
  );
};

export default Permissions;
