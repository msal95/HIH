import React, { Fragment } from 'react'
// import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import TableMultilingual from '../tables/data-tables/basic/TableMultilingual'

// ** Styles
import '@styles/react/apps/app-users.scss'
import BreadCrumbs from '../components/breadcrumbs'
import TestDataTable from './TestDataTable'


export default function FormListing() {
  return (
    <Fragment>
    {/* <BreadCrumbs title='Datatables Basic' data={[{ title: 'Datatables' }, { title: 'Datatables Basic' }]} /> */}
    <Row  className="overflow-auto">
      <Col sm='12'>
        <TableMultilingual />
      </Col>
      <Col sm='12'>
        <TestDataTable  data="hello world"/>
      </Col>
    </Row>
  </Fragment>
  )
}
