import React, { useEffect, useRef, useState } from 'react';
import { FormEditor } from '@bpmn-io/form-js';
import schema from './schema.json';

import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import { toast } from "react-hot-toast";
import  './builder.css'
import { formJsonEditor } from '../../../api/apiMethods';
import { useLocation } from 'react-router-dom';
import { Card, CardBody, CardText, Col, Row, Button, Label, Input } from 'reactstrap';
export default function Editor() {
    const formEditorRef = useRef(null);
    const location = useLocation();
    console.log('✅ props    ', location?.state?.json)
    const [formJson] = useState(location?.state?.json);
    const [stateFullData] = useState(location?.state);
    const [name, setName] = useState(stateFullData?.name ?? "");
    const [model, setModel] = useState(stateFullData?.model ?? "");
    const [editorId] = useState(stateFullData?.id ?? null);

    useEffect(() => {
      const container = document.querySelector('#form-editor');
      if (container && !formEditorRef.current) {
        const formEditor = new FormEditor({
          container,
        });
        if (location?.state?.id > 0) {
            formEditor.importSchema(JSON.parse(formJson));
        } else {
            formEditor.importSchema(schema);
        }
        formEditorRef.current = formEditor;
      }
      return () => {
        if (formEditorRef.current) {
          formEditorRef.current.destroy();
          formEditorRef.current = null;
        }
      };
    }, [formJson]);
    const handleGetFormJson = async () => {
        try {
          const formJson = formEditorRef.current.saveSchema();
          console.log('formJson:', JSON.stringify(formJson));
            const formJsonData = JSON.stringify(formJson);
          const data = {
            data: formJsonData,
            name,
            user_id: 1,
            editor_id: editorId,
          };
          const res = await formJsonEditor(data);
          const message = res?.message;
          const validationErrors = res?.validation_errors;
          const response = res?.response;
          if (response === 200) {
              toast.success(message);
          } else {
            console.log('✅ element    ', message,
            validationErrors,
            response);
            Object.keys(validationErrors).forEach(key => {
              toast.error(validationErrors[key]);
            });
          }
          console.log('Response:', response);
        } catch (error) {
          console.error(error);
        }
      };
      const handleInputChange = (event) => {
        console.log(event.target.value)
        setName(event.target.value);
      };
      const handleSelectChange = (event) => {
        console.log(event.target.value)
        setModel(event.target.value);
      };

      console.log('✅ formJson    ', stateFullData, 'formJson', formJson)
    return (
        <div className='container-xxl overflow-auto mt-5'>
            <Row>
            <Col sm='12'>
                <Card title='Striped' className='p-3'>
                    <CardBody>
                    <CardText>
                        {stateFullData?.name}
                    </CardText>
                    </CardBody>
                        <Row className='mb-3'>
                            <Col className='mb-1' xl='4' md='6' sm='12'>
                                <Label className='form-label' for='basicInput'>
                                    Enter Form Name
                                </Label>
                                <Input type="text" id="basicInput" placeholder="Name" value={name} onChange={handleInputChange} />
                            </Col>
                            <Col className='mb-1' xl='4' md='6' sm='12'>
                                <Label className='form-label' for='basicInput'>
                                    Select one model
                                </Label>
                                <Input type='select' id='payment-select' onChange={handleSelectChange}>
                                    <option value={null}>Select one model</option>
                                    <option>For User</option>
                                    <option>For credentials</option>
                                    <option>for Integration</option>
                                </Input>
                            </Col>
                        </Row>
                        <div className='' id="form-editor"></div>
                        <Col sm='12 mt-4'>
                            {console.log('✅ model === "Select one model"    ', model === "Select one model", !name === "", (!(name !== "") && (model !== "Select one model")))
                            }
                            <Button.Ripple color='primary'  onClick={handleGetFormJson} disabled={!((name !== "") && (model !== "Select one model"))}>Save</Button.Ripple>
                        </Col>
                </Card>
                </Col>
            </Row>
        </div>
    );
  }
