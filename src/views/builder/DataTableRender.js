import React, { useEffect, useState } from "react";
import { ChevronDown, Edit, MoreVertical, Trash } from "react-feather";
import ReactPaginate from "react-paginate";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  Table,
  UncontrolledDropdown,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import Swal from "sweetalert2";

const DataTableRender = ({
  data,
  TABLE_HEAD,
  ActiveApi,
  onSort,
  onSearch,
  onPageChange,
  searchQuery,
}) => {

  console.log("🚀 ~ file: DataTableRender.js:28 ~ searchQuery:", data);
  const [currentPage, setCurrentPage] = useState(0);
  console.log("🚀 ~ file: DataTableRender.js:30 ~ currentPage:", currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [searchedData, setSearchedData] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);


  console.log('✅ searchedData    ', searchedData, "data", data)

  useEffect(() => {
    // const paginatedData = data;
    setSearchedData(data);
  }, [data]);
  useEffect(() => {
    if (!!searchQuery?.length) {
      const filteredData = data.filter((post) => {
        return post.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchedData(filteredData);
    } else {
      setSearchedData(data);
    }
  }, [searchQuery]);

  const handleSort = (field) => {
    let direction = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);
    // onSort(field, direction);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber.selected);
    // onPageChange(pageNumber);
  };

  const handleRowAction = (action, row) => {

    if (action === "delete") {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
              if (result.isConfirmed) {
                  ActiveApi(action, row);
            }
        });
    }
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      const allRows = data.map((row) => row.id);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleItemSelection = (id) => {
    const existingItem = selectedRows.filter((item) => item === id);

    if (!!existingItem?.length) {
      setSelectedRows(selectedRows?.filter((item) => item !== id));
    } else {
      // selectedRows.push([id]);
      setSelectedRows([...selectedRows, id]);
    }
  };

  const allSelected = selectedRows?.length === data?.length;

  const renderTableHead = () => {
    return (
      <tr>
        {TABLE_HEAD.map((column) => (
          <th
            key={column.id}
            className={`sortable ${column.orderable ? "orderable" : ""}`}
            onClick={() => column.orderable && handleSort(column.id)}
          >
            {column.label === "select" && (
              <div className="d-flex align-items-center checkbox-container">
                <Input
                  type="checkbox"
                  className="checkbox-input"
                  checked={allSelected}
                  onChange={handleSelectAllRows}
                />
                <UncontrolledDropdown className="chart-dropdown checkbox-icon">
                  <DropdownToggle
                    color=""
                    className="bg-transparent btn-sm p-0 "
                  >
                    <ChevronDown
                      size={18}
                      className="cursor-pointer"
                      color="#b9b9c3"
                    />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      className="w-100"
                      // onClick={onHandleDelete}
                    >
                      Delete Selected
                    </DropdownItem>
                    <DropdownItem
                      className="w-100"
                      // onClick={() => {
                      //   handleCheckboxChange(true);
                      // }}
                    >
                      Duplicate Selected
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            )}
            {column.label !== "select" && column.label}
            {column.orderable && sortField === column.id && (
              <span className="sort-icon">
                {sortDirection === "asc" ? "▲" : "▼"}
              </span>
            )}
          </th>
        ))}
      </tr>
    );
  };

  const renderTableBody = () => {
    const startIndex = (currentPage + 1 - 1) * rowsPerPage;
    console.log(
      "🚀 ~ file: DataTableRender.js:150 ~ renderTableBody ~ startIndex:",
      startIndex
    );
    const endIndex = startIndex + rowsPerPage;
    console.log(
      "🚀 ~ file: DataTableRender.js:152 ~ renderTableBody ~ endIndex:",
      endIndex
    );
    const paginatedData = searchedData?.slice(startIndex, endIndex);
    console.log(
      "🚀 ~ file: DataTableRender.js:154 ~ renderTableBody ~ paginatedData:",
      paginatedData
    );

    return (
      <>
        {paginatedData.map((row) => (
          <tr key={row.id}>
            <td style={{ width: 0 }}>
              <div className="form-check">
                <Input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleItemSelection(row.id)}
                />
              </div>
            </td>
            <td>{row?.id}</td>
            <td>{row?.name}</td>
            <td style={{ width: 20 }}>
              <UncontrolledDropdown>
                <DropdownToggle
                  className="icon-btn hide-arrow"
                  color="transparent"
                  size="sm"
                  caret
                >
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRowAction("create", row);
                    }}
                  >
                    <Edit className="me-50" size={15} />{" "}
                    <span className="align-middle">Create New</span>
                  </DropdownItem>
                  <DropdownItem
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRowAction("edit", row);
                    }}
                  >
                    <Edit className="me-50" size={15} />{" "}
                    <span className="align-middle">Edit</span>
                  </DropdownItem>
                  <DropdownItem
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRowAction("view", row);
                    }}
                  >
                    <Edit className="me-50" size={15} />{" "}
                    <span className="align-middle">View</span>
                  </DropdownItem>
                  <DropdownItem
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRowAction("delete", row);
                    }}
                  >
                    <Trash className="me-50" size={15} />{" "}
                    <span className="align-middle">Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        ))}
      </>
    );
  };

  const renderPagination = () => {
    const count = Number(Math.ceil(data.length / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage + 1 - 1 : 0}
        onPageChange={(page) => handlePageChange(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  return (
    <div>
      <Table striped>
        <thead>{renderTableHead()}</thead>
        <tbody>
          {!searchedData?.length ? (
            <h3 className=" p-2">No Forms Available</h3>
          ) : (
            renderTableBody()
          )}
        </tbody>
      </Table>
      <Row className="mt-2  mx-0">
        <hr></hr>

        <Col
          className="mb-1 d-flex align-items-center justify-content-end mt-1"
          xl="12"
          md="12"
          sm="12"
        >
          {!!searchedData?.length && renderPagination()}
        </Col>
      </Row>
    </div>
  );
};

export default DataTableRender;
