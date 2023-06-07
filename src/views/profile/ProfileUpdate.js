import { Form, FormikProvider, useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import  from 'react'
import { Button, Card, Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import ErrorMessage, { ErrorMessageInline } from '../../utility/Utils'

import { useDispatch } from 'react-redux'
import { handleUpdateProfile } from '@store/authentication'
import { useUpdateProfile } from "../../../api/config/userProfile";

export default function ProfileUpdate() {
    const userQuery = useUpdateProfile();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [submittingSuccess, setSubmittingSuccess] = useState(false);
    const [submittingClick, setSubmittingClick] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    const [hasError, setHasError] = useState(false);

    const integrationSchema = Yup.object().shape({
      name: Yup.string().required(" Required"),
    });

    const formik = useFormik({
      initialValues: {
        name: "hello",
        user_id: 1,
      },
      validationSchema: integrationSchema,
      onSubmit: (data) => {
          setSubmittingClick(true);
        console.log("✅ data   >>>>>>>>>>>>>>>>>>>>>> ", data);
        userQuery.mutate(data);
      },
    });
    const { errors, touched, getFieldProps,} = formik;

      // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    // if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    // }
  }, [])
  useEffect(() => {
        console.log('✅ userData    ', userData)
        formik.setFieldValue("name", userData?.name ?? "");
        formik.setFieldValue("email", userData?.email ?? "");
        formik.setFieldValue("user_id", userData?.id ?? "");

  }, [userData])

    useEffect(() => {
      const data = userQuery?.data;
      if (userQuery.isSuccess) {
        const message = data?.message;
        const validationErrors = data?.validation_errors;
        const response = data?.response;
        if (response === 200) {
          setSubmittingSuccess(false)
          setSubmitting(false);
          setSubmittingClick(false);
          toast.success(message);
          dispatch(handleUpdateProfile(data))
      } else {
            setSubmittingSuccess(false)
            setSubmitting(false);
            setSubmittingClick(false)
          Object.keys(validationErrors).forEach((key) => {
            toast.error(validationErrors[key]);
          });
        }
        setSubmitting(false);
      }

      if (userQuery.isError) {
        setSubmitting(false);
        const message = 'Error occurred while saving the data';
        toast.error(message);
      }
    }, [userQuery.isSuccess, userQuery.isError]);

    // const handleChangeIcon = (e) => {
    //   if (!e.target.files || e.target.files.length === 0) {
    //     return;
    //   }
    //   const file = e.target.files[0];
    //   formik.setFieldValue("image", file);

    //   // if (values?.file?.name) {
    //   //     alert('json')
    //   // }
    // };

  return (
    <div className="container-xxl overflow-auto">
      <h2 className="text-primary py-2">Profile Update</h2>
      <Row className="match-height">
        <Col md="12" sm="12">
          <Card title="Basic" className="p-2">
          {/* {(submitting || submittingSuccess || submittingClick) && <div className="d-flex justify-content-center align-items-center p-5">
                            <Spinner type="grow" color="primary" />
                        </div>} */}
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                encType="multipart/form-data"
                // onSubmit={handleSubmit}
              >
                <Fragment>
                  <Label for="col-cb">Name * {errors.name && touched?.name &&  <ErrorMessageInline message={errors.name}/>}</Label>
                     {/* <div class="d-inline">{errors.name && touched?.name && <ErrorMessage message={errors.name} />}</div> */}
                  <InputGroup className="mb-2">
                    <Input
                      placeholder="Integration name"
                      className={(errors.name && touched?.name) ? "" : ""}
                      {...getFieldProps("name")}
                    />
                  </InputGroup>
                  <Label for="col-cb">Email * {errors.email && touched?.email &&  <ErrorMessageInline message={errors.email}/>}</Label>
                     {/* <div class="d-inline">{errors.name && touched?.name && <ErrorMessage message={errors.name} />}</div> */}
                  <InputGroup className="mb-2">
                    <Input
                      placeholder="Integration name"
                      className={(errors.email && touched?.email) ? "" : ""}
                      {...getFieldProps("email")}
                    />
                  </InputGroup>
                  <Button type="submit" className="mt-2">
                    Update Profile
                  </Button>
                </Fragment>
              </Form>
            </FormikProvider>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
