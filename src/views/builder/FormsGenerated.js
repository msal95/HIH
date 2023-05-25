import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardText, Col, Input, Label, Row } from 'reactstrap'
import { useEventFormMake, useGetIntegrationAndForms } from '../../../api/config/formBuilderQueries'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function FormsGenerated() {
    const getIntegrationFoms = useGetIntegrationAndForms();
    const generatedQuery = useEventFormMake();
    const [integrationWithForms, setIntegrationForms] = useState(null);
    const [hasForm, setHasForm] = useState(false);
    const [hasEvents, setHasEvents] = useState(false);
    const [integ_id, setInteg_id] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        if (getIntegrationFoms.isFetched && getIntegrationFoms.data) {
            setIntegrationForms(getIntegrationFoms.data);
        }
    }, [getIntegrationFoms.data, getIntegrationFoms.isFetched, getIntegrationFoms.isFetching]);

    useEffect(() => {
        const data = generatedQuery?.data;
        if (generatedQuery.isSuccess) {
          const message = data?.message;
          const validationErrors = data?.validation_errors;
          const response = data?.response;
          if (response === 200) {
            console.log('✅ data?.message    ', data?.data?.message, "data", data)

              Object.keys(data?.data?.message).forEach((key) => {
                console.log('✅ key    ', key)
                  toast.success(data?.data?.message[key]);
                });
                toast.success(message);
                setTimeout(() => {
                    navigate('/apps/form/listing');
                  }, 2000);
          } else {
          }
          setSubmitting(false);
        }

        if (generatedQuery.isError) {
          setSubmitting(false);
          const message = 'Error occurred while saving the data';
          toast.error(message);
        }
      }, [generatedQuery.isSuccess, generatedQuery.isError]);


    const handleChangeIntegration = (integration_id) => {
        setHasForm(false);
        setHasEvents(false);
        const integrat_id = integration_id?.target?.value;
        setInteg_id(integrat_id);
        const oneIntegration = integrationWithForms?.filter(item => item?.id == integrat_id);
        if ((oneIntegration[0]?.events?.length) > 0) {
            oneIntegration[0]?.events?.map(item => {
                console.log('✅ item    ', item)
                if (!(item?.bpmn_form === null)) {
                    setHasForm(true);
                }
            })
            setHasEvents(true);
        } else {
            setHasForm(false);
        }
    };
    const handleGeneratedForms = () => {
        setSubmitting(true);
        const data = {
            integration_id:integ_id
        }
        generatedQuery.mutate(data);
    }

  return (
    <div className='container-xxl overflow-auto mt-5'>
            <Row>
                <Col sm='12'>
                    <Card title='Striped' className='p-3'>
                        <CardBody>
                        <CardText>
                            Integration Form Generated
                        </CardText>
                            <Row className='mb-3'>
                                <Col className='mb-1' xl='6' md='6' sm='12'>
                                    <Label className='form-label' for='basicInput'>
                                        Integration
                                    </Label>
                                    <select id="payment-select" className='form-select form-select-lg mb-3' onChange={handleChangeIntegration}>
                                        <option value={null}>Select one Selection</option>
                                        {integrationWithForms &&
                                            integrationWithForms.map((item) => (
                                                <option key={item?.id} value={item?.id}>{item?.name}</option>
                                            ))
                                        }
                                    </select>
                                    {console.log('✅ hasForm    ', hasForm)
                                    }
                                    {hasForm && <p className='text-danger'>Forms Created For This Integration</p>}
                                </Col>
                                {hasEvents  && (!hasForm) && <Col className='mb-1 mt-2' xl='6' md='6' sm='12'>
                                  <Button.Ripple color='primary' onClick={handleGeneratedForms} disabled={submitting} >Generate Forms</Button.Ripple>
                                </Col>}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
    </div>
  )
}
