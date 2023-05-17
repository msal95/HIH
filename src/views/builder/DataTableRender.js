import React, { useState } from 'react';
import { Edit, MoreVertical, Trash } from 'react-feather';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, Table, UncontrolledDropdown, Button, Card, CardBody } from 'reactstrap';


const DataTableRender = ({data, TABLE_HEAD, ActiveApi, onSort, onSearch, onPageChange}) => {


  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (field) => {
    let direction = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortField(field);
    setSortDirection(direction);
    // onSort(field, direction);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // onSearch(query);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // onPageChange(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleRowAction = (action, row) => {
    ActiveApi(action, row);
  };

  const renderTableHead = () => {
    return (
      <tr>
        {TABLE_HEAD.map((column) => (
          <th
            key={column.id}
            className={`sortable ${column.orderable ? 'orderable' : ''}`}
            onClick={() => column.orderable && handleSort(column.id)}
          >
            {column.label}
            {column.orderable && sortField === column.id && (
              <span className="sort-icon">{sortDirection === 'asc' ? '▲' : '▼'}</span>
            )}
          </th>
        ))}
      </tr>
    );
  };

  const renderTableBody = () => {
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
      <>
        {paginatedData.map((row) => (
            <tr key={row.id}>
              {console.log('row', row)}
              <td>{row?.name}</td>
            <td>
            <UncontrolledDropdown>
              <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" onClick={(e) => { e.preventDefault(); handleRowAction('edit', row); }}>
                  <Edit className="me-50" size={15} /> <span className="align-middle">Edit</span>
                </DropdownItem>
                <DropdownItem href="/" onClick={(e) => { e.preventDefault(); handleRowAction('view', row); }}>
                  <Edit className="me-50" size={15} /> <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem href="/" onClick={(e) => { e.preventDefault(); handleRowAction('delete', row); }}>
                  <Trash className="me-50" size={15} /> <span className="align-middle">Delete</span>
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
    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
      <div className='demo-inline-spacing pagination'>
      {currentPage > 1 && (<Button.Ripple color='primary' onClick={() => handlePageChange(currentPage - 1)}>Previous</Button.Ripple>)}
      {currentPage < totalPages && (<Button.Ripple color='secondary' onClick={() => handlePageChange(currentPage + 1)}>Next</Button.Ripple>)}
    </div>
    );
  };

  return (
    <div>
      <div className="search">
        <Row className='justify-content-end mx-0'>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
          <Label className='me-1' for='search-input-1'>
            Search
          </Label>
          <Input
            className='dataTable-filter mb-50'
            type='text'
            bsSize='sm'
            id='search-input-1'
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      </div>
      <Table striped responsive>
        <thead>{renderTableHead()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </Table>
      <Row className='mt-2  mx-0'>
      <hr></hr>
          <Col className='mb-1d-flex align-items-center justify-content-start mt-1' xl='4' md='6' sm='12'>
            <div className='mb-1'>
                <Label className='form-label' for='select-basic'>
                </Label>
                <Input type='select' value={rowsPerPage} onChange={handleRowsPerPageChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </Input>
            </div>
          </Col>
          <Col className='mb-1 d-flex align-items-center justify-content-end mt-1' xl='4' md='6' sm='12'>
            {renderPagination()}
          </Col>
        </Row>
    </div>
  );
};

export default DataTableRender;
