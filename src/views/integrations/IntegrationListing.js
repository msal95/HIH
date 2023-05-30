// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
// import classnames from 'classnames'
// import toast from 'react-hot-toast'
import * as Icons from 'react-feather'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, Card, Input, CardBody, InputGroup, InputGroupText, UncontrolledTooltip } from 'reactstrap'

// ** Styles
import '@styles/base/pages/ui-feather.scss'

const IntegrationListing = (props) => {
    const [stateIntegration, setStateIntegration] = useState(props?.integration);
    console.log("props", props)
    console.log("stateIntegration", stateIntegration)

    useEffect(() => {
        // const paginatedData = data;
        setStateIntegration(props?.integration);
      }, [props?.integration]);

  const IconsArr = []

  const handleIconCardClick = (row) => {
    console.log('✅ row    ', row)
    props?.handleRowAction('create', row);
};

  const renderIcons = () => {
    const dataToRender = stateIntegration?.length
    if (dataToRender > 0) {
      return stateIntegration.map(icon => {
        return (
          <Fragment key={icon?.id}>
              <Card
                id={icon?.id}
                className='icon-card cursor-pointer text-center mb-2 mx-50'
                onClick={(e) => { e.preventDefault(); handleIconCardClick(icon); }}
              >
                <CardBody>
                  <div className='icon-wrapper'>
                        <img src={icon?.image} class="img-rounded" alt="Cinque Terre" width="50" height="50"/>
                  </div>
                  <p className='icon-name text-truncate mb-0 mt-1'>{icon?.name}</p>
                </CardBody>
              </Card>
          </Fragment>
        )
      })
    } else {
      return (
        <div className='d-flex align-items-center justify-content-center w-100'>
          <h4 className='mb-0'>No Icons Found!</h4>
        </div>
      )
    }
  }

  return (
    <Fragment>
      <Breadcrumbs title='Integrations' data={[{ title: 'Integration' }, { title: 'Listing' }]} />
      <Row>
      </Row>
      <div className='d-flex flex-wrap' id='icons-container'>
        {renderIcons()}
      </div>
    </Fragment>
  )
}
export default IntegrationListing
