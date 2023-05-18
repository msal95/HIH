import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@bpmn-io/form-js';
// import schema from './schema.json';

import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import  './builder.css'
import { formValueSave } from '../../../api/apiMethods';
import { useLocation } from 'react-router-dom';
import { Card, CardBody, CardText, Col, Row } from 'reactstrap';

export default function ViewFormRender() {
    const location = useLocation();
    console.log('✅ props    ', location?.state?.json)

    const formRender = useRef(null);
    const [formJson] = useState(location?.state?.json);
    const [stateFullData] = useState(location?.state);

    const handleGetFormJson = async (data, errors) => {
        const formValue = JSON.stringify(data);
        console.log(formValue, 'formValue', 'errors', errors, 'formJson?.data', formJson?.data);

        try {
          const formValueData = {
              form_builders_id: formJson?.data?.id,
            data: formValue,
            name: "name builder",
            user_id: 1,
          };
          console.log('formValueData', formValueData)
          const response = await formValueSave(formValueData);
          console.log('Response:', response);
        } catch (error) {
          console.error(error);
        }
    };

    // useEffect(() => {
    //     const fetchFormJson = async () => {
    //       const formQuery = await getEditorJsonById(1);
    //       if (formQuery) {
    //         setFormJson(formQuery);
    //       }
    //     };
    //     fetchFormJson();
    //   }, []);

    // useEffect(() => {
    //     if (formJson?.data?.json?.[0]) {
    //       const container = document.querySelector('#form');
    //       if (container && !formRender?.current) {
    //         const formEditor = new Form({
    //           container,
    //         });
    //         formEditor.importSchema(JSON.parse(formJson?.data?.json?.[0]));
    //         formRender.current = formEditor;
    //       }
    //       formRender.current.on('submit', ({ data, errors }) => {
    //         handleGetFormJson(data, errors)
    //       });
    //       return () => {
    //         if (formRender.current) {
    //           formRender.current.destroy();
    //           formRender.current = null;
    //         }
    //       };
    //     }
    // }, [formJson?.data?.json?.[0]]);

    useEffect(() => {
          const container = document.querySelector('#form');
          if (container && !formRender?.current) {
            const formEditor = new Form({
              container,
            });
            formEditor.importSchema(JSON.parse(formJson));
            formRender.current = formEditor;
          }
          formRender.current.on('submit', ({ data, errors }) => {
            handleGetFormJson(data, errors)
          });
          return () => {
            if (formRender.current) {
              formRender.current.destroy();
              formRender.current = null;
            }
          };
    }, [formJson]);
  return (
    <div className='container-xxl overflow-auto'>
    <Row>
      <Col sm='12'>
          <Card title='Striped'>
            <CardBody>
              <CardText>
                {stateFullData?.name}
              </CardText>
            </CardBody>
                <div id="form"></div>
          </Card>
        </Col>
    </Row>
  </div>
  )
}
