import React, { Fragment, useEffect, useState } from 'react'
// import Table from './Table'
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardBody, CardText, Col, Row, Button, Label, Input, InputGroup, InputGroupText, UncontrolledTooltip, Spinner } from 'reactstrap';

// import { toast } from "react-hot-toast";


// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'
import { useGetIntegration } from '../../../api/config/integrationQueries';
import IntegrationListing from './IntegrationListing';

export default function Integration() {
    const integrationQuery = useGetIntegration();
    const navigate = useNavigate();

    const [integration, setIntegration] = useState([]);

    useEffect(() => {
        if (integrationQuery.isFetched && integrationQuery.data) {
            setIntegration(integrationQuery.data);
        }
      }, [integrationQuery.data, integrationQuery.isFetched, integrationQuery.isFetching]);
    //   console.log('✅ integration    ', integration)
    //   /apps/resources/event

    const handleRowAction = (action, row) => {
        // console.log('✅ row    ', row)
        navigate("/apps/resources/event", { state: row });
    };

  return (
    <div className='container-xxl overflow-auto mt-5'>
        <div className='app-user-list'>
            <Row>
                <Col lg='4' sm='6'>
                    <Card>
                        <CardBody className="fw-bolder mb-75">
                            <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h2>Total</h2>
                                <h2>Integrations</h2>
                                <h2>{integration?.integrationCount}</h2>
                            </div>
                            <div className="avatar avatar-stats p-50 m-0 bg-light-primary">
                                <div className='avatar-content'>{<UserX size={20}/>}</div>
                            </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg='4' sm='6'>
                    <Card>
                        <CardBody className="fw-bolder mb-75">
                            <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h2>active</h2>
                                <h2>Integrations</h2>
                                <h2 className='text-success'>{integration?.active}</h2>
                            </div>
                            <div className="avatar avatar-stats p-50 m-0 bg-light-primary">
                                <div className='avatar-content'>{<UserX size={20}/>}</div>
                            </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg='4' sm='6'>
                    <Card>
                        <CardBody className="fw-bolder mb-75">
                            <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h2>Not Active</h2>
                                <h2>Integrations</h2>
                                <h2 className='text-danger'>{integration?.notActive}</h2>
                            </div>
                            <div className="avatar avatar-stats p-50 m-0 bg-light-primary">
                                <div className='avatar-content'>{<UserX size={20}/>}</div>
                            </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <hr></hr>
            </Row>
        </div>
        {(integration?.integrations?.length > 0) ?
            <IntegrationListing integration={integration?.integrations} handleRowAction={handleRowAction}/>
            : <div className="d-flex justify-content-center align-items-center p-5">
            <Spinner type="grow" color="primary" />
        </div>
        }
    </div>
  )
}
