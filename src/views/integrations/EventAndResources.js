import React, {useState, useEffect} from 'react'
import { Card, CardBody, CardText, Col, Row, Button, Label, Input } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { User, UserPlus, UserCheck, UserX, FileText } from 'react-feather'

export default function EventAndResources() {
    const location = useLocation();
    const [resource] = useState(location?.state?.resources);
    const [events, setEvents] = useState(location?.state?.events);
    const [eventsFull] = useState(location?.state?.events);
    const [searchTerm, setSearchTerm] = useState("");
    console.log('✅ events    ', events, 'location?.state', location?.state)

    const handleRowAction = (action, row) => {
        const updatedData = eventsFull.filter((item) => item.resource_id === row?.id);
        setEvents(updatedData);
    };
    useEffect(() => {
      const searchedData = eventsFull?.filter((event) => {
        return event?.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setEvents(searchedData);
    }, [searchTerm]);

    const handleSearchTerm = (event) => {
      setSearchTerm(event.target.value);
    };
    const handleSelectChange = (event) => {
        console.log(event.target.value)
      };
  return (
    <div className='container-xxl overflow-auto mt-5'>
        <Row>
            <Col sm='12'>
                <Card title='Striped' className='p-3'>
                    <CardBody>
                    <CardText>
                        event and resource
                    </CardText>
                    </CardBody>
                        <Row>
                            <Col className='mb-1' xl='4' md='6' sm='12'>
                                <Label className='form-label' for='basicInput'>
                                    Search
                                </Label>
                                <Input type="text" id="basicInput"
                                value={searchTerm}
                                onChange={handleSearchTerm}
                                />
                            </Col>
                            <Col className='mb-1' xl='4' md='6' sm='12'>
                                <Label className='form-label' for='basicInput'>
                                    Filters
                                </Label>
                                <Input type='select' id='payment-select' onChange={handleSelectChange}>
                                    <option value={null}>Choose</option>
                                    <option>All forms</option>
                                    <option>Events With forms</option>
                                    <option>Events With Out forms</option>
                                </Input>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col className='mb-1' xl='4' md='4' sm='12'>
                                <Row>
                                    <Col className='mb-1' sm='12'>
                                        <p>Resource</p>
                                    </Col>
                                    {(resource?.length > 0) && resource?.map((item, index) => (
                                        <Col className='mb-1' sm='12' key={index}>
                                        <Button.Ripple color='primary' outline  onClick={(e) => { e.preventDefault(); handleRowAction('create', item); }}>
                                            {item?.name}
                                        </Button.Ripple>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                            <Col className='mb-1' xl='8' md='8' sm='12'>
                                <Row>
                                    <Col className='mb-1' sm='12'>
                                        <p>Events</p>
                                    </Col>
                                        {(events?.length > 0) && events?.map((item, index) => (
                                            <Col lg='6' sm='6' key={index}>
                                                <Card style={{border: "3px solid #f8f8f8"}}>
                                                    <CardBody className="fw-bolder mb-75">
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>{item?.name}</h5>
                                                                <h6 className='text-danger' >{item?.create_at_date}</h6>
                                                                <h6 className='text-danger' >{item?.form?.length}</h6>
                                                                <h6 className={(item?.form?.id > 0) ? 'text-success' : 'text-danger'} ><FileText /> </h6>
                                                                {console.log('✅ {item?.form?.length    ', item?.form?.id > 0)
                                                                }
                                                            </div>
                                                            <div className="avatar avatar-stats p-50 m-0 bg-light-primary">
                                                                <div className='avatar-content'>{<UserX size={20}/>}</div>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        ))}
                                </Row>
                            </Col>
                        </Row>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
