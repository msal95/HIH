import React, { Fragment, useEffect, useState } from 'react'
// import Table from './Table'
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col, Card, CardText, CardBody } from 'reactstrap'

import { toast } from "react-hot-toast";
// ** Styles
import '@styles/react/apps/app-users.scss'
import DataTableRender from './DataTableRender'
import { formJsonEditorDelete, getEditorAllForm } from '../../../api/apiMethods'


export default function FormListing() {
    const TABLE_HEAD = [
    { id: 'name', label: 'Form Name', alignRight: false, orderable: true },
    { id: 'Actions', label: 'Actions', alignRight: false, orderable: false },
    ];
    const [formJson, setFormJson] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFormJson = async () => {
          const formQuery = await getEditorAllForm(1);
          if (formQuery) {
            setFormJson(formQuery?.data);
          }
        };
        fetchFormJson();
      }, []);
    const ActiveApi = (action, row) => {
        if (action === 'delete') {
            try {
                formJsonEditorDelete(row?.id).then((res) => {
                  const message = res?.message;
                  const validationErrors = res?.validation_errors;
                  const response = res?.response;
                  if (response === 200) {
                      toast.success(message);
                      const updatedData = formJson.filter((item) => item.id !== row?.id);
                      setFormJson(updatedData);
                  } else {
                    console.log('✅ element    ', message, validationErrors, response);
                    Object.keys(validationErrors).forEach(key => {
                      toast.error(validationErrors[key]);
                    });
                  }
                });
              } catch (error) {
                console.log("🚀 ~ file: index.js:169 ~ handleCreateProject ~ error:", error);
              }
        }
        if (action === 'view') {
            console.log('✅ row    ', row)
            navigate("/apps/view", { state: row });
        }
        if (action === 'edit') {
            console.log('✅ row    ', row)
            navigate("/apps/editor", { state: row });
        }
        if (action === 'create') {
            console.log('✅ row    ', row)
            navigate("/apps/editor");
        }
    };
  return (
    <div className='container-xxl overflow-auto'>
    <Row>
      <Col sm='12'>
          <Card title='Striped'>
            <CardBody>
              <CardText>
                Form Builder Listing
              </CardText>
            </CardBody>
            {formJson?.length &&
            <DataTableRender data={formJson} TABLE_HEAD={TABLE_HEAD} ActiveApi={ActiveApi}/>}
          </Card>
        </Col>
    </Row>
  </div>
  )
}
