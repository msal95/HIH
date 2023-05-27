// ** React Imports
import { useEffect, useState } from 'react'

// ** Icons Imports
import * as Icon from 'react-feather'
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import {
  Nav,
  Row,
  Col,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
  UncontrolledAccordion,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Fragment
} from 'reactstrap'

import Swal from 'sweetalert2'
import { useDeleteEventWithForm } from '../../../../api/config/integrationQueries'
import { toast } from 'react-hot-toast'

const Faqs = ({ data }) => {
    const navigate = useNavigate();
    const [dataVAlue, setDataValue] = useState(data);
    const [tooltipOpen, setTooltipOpen] = useState(false)
  const dataToRender = []
  const eventFormDelete = useDeleteEventWithForm();
  useEffect(() => {
    const data = eventFormDelete?.data;
    console.log("data", data, 'eventFormDelete',  eventFormDelete);
    if (eventFormDelete.isSuccess) {
      const message = data?.message;
      const response = data?.response;
      if (response === 200) {
          toast.success(message);
        // const filteredEvents = dataVAlue?.resources?.events?.filter(event => (event.id !== null) && (event.id !== data?.data?.id));

        const resourceIdToRemove = data?.data?.id; // ID of the event to remove

            const filteredResources = dataVAlue?.resources?.map(resource => ({
            ...resource,
            events: resource.events.filter(event => event.id !== resourceIdToRemove)
            }));
            const eventsData = dataVAlue?.events.filter(event => event.id !== resourceIdToRemove)
        setDataValue((prevState) => ({
            ...prevState, // Preserve other properties in the state
            resources: filteredResources, // Update only the resources data
            events: eventsData, // Update only the resources data
        }));

        console.log('✅ filteredEvent', dataVAlue)

        // setDataValue(filteredEvents)
        // Update the state or re-render the component with the modified integration array

      } else {
        toast.error(message);
      }
    }

    if (eventFormDelete?.isError) {
      const message = 'Error occurred while saving the data';
      toast.error(message);
    }
  }, [eventFormDelete.isSuccess, eventFormDelete.isError]);
  // ** States
  const [activeTab, setActiveTab] = useState(0)

  const toggleTab = tab => setActiveTab(tab)

  // eslint-disable-next-line
  Object.entries(dataVAlue?.resources).forEach(([key, val]) => {
    dataToRender.push(val)
  })

//   const handleSelectChange = (event) => {
//     const filter = event?.target?.value;
//     if (filter === "Events With forms") {
//         const filteredData = eventsFull.filter((item) => item.form !== null && item.hasOwnProperty('form'));
//         setEvents(filteredData);
//     }
//     if (filter === "Events With Out forms") {
//         const filteredData = eventsFull.filter((item) => item.form === null);
//         setEvents(filteredData);
//     }
//     if (filter === "All forms") {
//         setEvents(eventsFull);
//     }

//   };

  const handleMenuAction = (action, row) => {
    console.log('action, row', action, row);
    if (action === "Delete") {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            if (result.isConfirmed) {
              eventFormDelete.mutate(row?.id);
            }
          });
    }
    if (action === 'View') {

        if (!(row?.bpmn_form === null)) {
            navigate("/apps/view", { state: row?.bpmn_form });
        } else {
            toast.error(`No Form Available of Event ${row?.name}`);
        }
    }
    if (action === 'Edit') {

        if (!(row?.bpmn_form === null)) {
            navigate("/apps/editor", { state: row?.bpmn_form });
        } else {
            toast.error(`No Form Available of Event ${row?.name}`);
        }
    }
};

  const renderTabs = () => {
    return dataToRender.map((item, index) => {
        if (index === 0) {
            return (
              <NavItem key={item.id} tag='li'>
                <NavLink active={activeTab === index} onClick={() => toggleTab(index)}>
                  {/* <IconTag size={18} className='me-1' /> */}
                  <Icon.AlignRight />
                  <span className='fw-bold'>All</span>
                </NavLink>
              </NavItem>
            )
        } else {
            return (
              <NavItem key={item.id} tag='li'>
                <NavLink active={activeTab === item.id} onClick={() => toggleTab(item.id)}>
                  {/* <IconTag size={18} className='me-1' /> */}
                  <Icon.AlignRight />
                  <span className='fw-bold'>{item.name}</span>
                </NavLink>
              </NavItem>
            )
        }
    })
  }

  const renderTabContent = () => {
    return dataToRender.map((item, index) => {
        if (index === 0) {
      return (
        <TabPane key={index} tabId={index}>
          <div className='d-flex align-items-center'>
            <div className='avatar avatar-tag bg-light-primary me-1'>
              <Icon.Layers />
            </div>
            <div>
              <h4 className='mb-0'>All Events</h4>
              <span>{item.name}</span>
            </div>
          </div>
          {item?.events ? (
            <UncontrolledAccordion className='accordion-margin mt-2' defaultOpen='0'>
                <Row>
                    {console.log('✅ dataVAlue    ', dataVAlue?.events)
                    }
              {dataVAlue?.events.map((r, index) => {
                return (
                    <Col lg='4' sm='4' key={index}>
                        <Card style={{border: "3px solid #f8f8f8"}}>
                            <CardBody className="fw-bolder mb-75">
                                <div className="d-flex justify-content-between mb-2">
                                    <div>
                                        <img src={data?.image} className="img-rounded" alt="Cinque Terre" width="100" height="100"/>
                                    </div>
                                    <div>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
                                                <Icon.MoreVertical size={15} />
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {/* <DropdownItem  onClick={(e) => { e.preventDefault(); handleMenuAction('Create New', r); }} >
                                                <Icon.Edit className="me-50" size={15}/> <span className="align-middle">Create New</span>
                                                </DropdownItem> */}
                                                <DropdownItem onClick={(e) => { e.preventDefault(); handleMenuAction('Edit', r); }}  >
                                                <Icon.Edit className="me-50" size={15} /> <span className="align-middle">Edit</span>
                                                </DropdownItem>
                                                <DropdownItem onClick={(e) => { e.preventDefault(); handleMenuAction('View', r); }}  >
                                                <Icon.Edit className="me-50" size={15} /> <span className="align-middle">View</span>
                                                </DropdownItem>
                                                <DropdownItem onClick={(e) => { e.preventDefault(); handleMenuAction('Delete', r); }} >
                                                <Icon.Trash className="me-50" size={15}  /> <span className="align-middle">Delete</span>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <>
                                    <div>
                                    {/* <Tooltip
                                        placement='top'
                                        isOpen={tooltipOpen}
                                        target='ControlledExample'
                                        toggle={() => setTooltipOpen(!tooltipOpen)}
                                    >
                                        {r?.name}
                                     </Tooltip> */}
                                        <h5 id='ControlledExample'>{r?.name?.length > 10 ? `${r?.name.substr(0, 20)}...` : r?.name}</h5>

                                        <h6 className='text-danger' >{r?.create_at_date}</h6>
                                        <h6 className='text-danger' >{r?.form?.length}</h6>
                                        <h6 className={(r?.bpmn_form?.id > 0) ? 'text-success' : 'text-danger'} ><Icon.FileText /> </h6>
                                    </div>
                                    </>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    )
                })}
                </Row>
            </UncontrolledAccordion>
          ) : (
            <div className='text-center p-5'>
              <h5 className='p-1'>
                <Icon.Info size='19' className='me-25' /> No Results Found
              </h5>
            </div>
          )}
        </TabPane>
      )
    } else {
              return (
                <TabPane key={item.id} tabId={item.id}>
                  <div className='d-flex align-items-center'>
                    <div className='avatar avatar-tag bg-light-primary me-1'>
                      {/* <IconTag size={20} /> */}
                      <Icon.Layers />
                    </div>
                    <div>
                      <h4 className='mb-0'>{item.name}</h4>
                      <span>{item.name}</span>
                    </div>
                  </div>
                  {item?.events ? (
                    <UncontrolledAccordion className='accordion-margin mt-2' defaultOpen='0'>
                        <Row>
                      {item?.events.map((r, index) => {
                        return (
                            <Col lg='4' sm='4' key={index}>
                                <Card style={{border: "3px solid #f8f8f8"}}>
                                    <CardBody className="fw-bolder mb-75">
                                        <div className="d-flex justify-content-between mb-2">
                                            <div>
                                                <img src={data?.image} className="img-rounded" alt="Cinque Terre" width="100" height="100"/>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
                                                        <Icon.MoreVertical size={15} />
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        {/* <DropdownItem  onClick={(e) => { e.preventDefault(); handleMenuAction('Create New', r); }} >
                                                        <Icon.Edit className="me-50" size={15}/> <span className="align-middle">Create New</span>
                                                        </DropdownItem> */}
                                                        <DropdownItem onClick={(e) => { e.preventDefault(); handleMenuAction('Edit', r); }}  >
                                                        <Icon.Edit className="me-50" size={15} /> <span className="align-middle">Edit</span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={(e) => { e.preventDefault(); handleMenuAction('View', r); }}  >
                                                        <Icon.Edit className="me-50" size={15} /> <span className="align-middle">View</span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={(e) => { e.preventDefault(); handleMenuAction('Delete', r); }} >
                                                        <Icon.Trash className="me-50" size={15}  /> <span className="align-middle">Delete</span>
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <h5>{r?.name}</h5>
                                                <h6 className='text-danger' >{r?.create_at_date}</h6>
                                                <h6 className='text-danger' >{r?.form?.length}</h6>
                                                <h6 className={(r?.bpmn_form?.id > 0) ? 'text-success' : 'text-danger'} ><Icon.FileText /> </h6>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            )
                        })}
                        </Row>
                    </UncontrolledAccordion>
                  ) : (
                    <div className='text-center p-5'>
                      <h5 className='p-1'>
                        <Icon.Info size='19' className='me-25' /> No Results Found
                      </h5>
                    </div>
                  )}
                </TabPane>
              )
          }
    })
  }

  return (
    <div id='faq-tabs'>
      <Row>
        <Col lg='3' md='4' sm='12'>
          <div className='faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0'>
            <Nav tag='ul' className='nav-left' pills vertical>
              {renderTabs()}
            </Nav>
          </div>
        </Col>
        <Col lg='9' md='8' sm='12'>
          <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default Faqs
