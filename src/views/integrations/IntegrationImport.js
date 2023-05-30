import React, { Fragment, useEffect, useState } from "react";
import { useIntegrationImport } from "../../../api/config/integrationQueries";
import {
  InputGroup,
  Input,
  InputGroupText,
  Row,
  Col,
  Card,
  Label,
  Button,
  Spinner,
} from "reactstrap";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../utility/Utils";

export default function IntegrationImport() {
  const importQuery = useIntegrationImport();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [submittingSuccess, setSubmittingSuccess] = useState(false);
  const [submittingClick, setSubmittingClick] = useState(false);

  const integrationSchema = Yup.object().shape({
    // file: Yup.mixed().required("Integration Json File is required"),
    // image: Yup.mixed().required("Integration image is required"),
    description: Yup.string().required("Description is required"),
    name: Yup.string().required("Integration name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: integrationSchema,
    onSubmit: (data) => {
        setSubmittingClick(true);
      console.log("✅ data   >>>>>>>>>>>>>>>>>>>>>> ", data);
      importQuery.mutate(data);
    },
  });

  useEffect(() => {
    const data = importQuery?.data;
    if (importQuery.isSuccess) {
      const message = data?.message;
      const validationErrors = data?.validation_errors;
      const response = data?.response;
      if (response === 200) {
        setSubmittingSuccess(true)
        toast.success(message);

        setTimeout(() => {
            navigate('/apps/integration');
        }, 3000);
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

    if (importQuery.isError) {
      setSubmitting(false);
      const message = 'Error occurred while saving the data';
      toast.error(message);
    }
  }, [importQuery.isSuccess, importQuery.isError]);


  const { errors, touched, values, handleSubmit, getFieldProps, isSubmitting } = formik;
  console.log("✅ values", values, "errors", errors, "touched", touched);
  console.log("✅ values", values, values?.file?.name.split('.').pop());


  const handleChangeIcon = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    formik.setFieldValue("image", file);

    // if (values?.file?.name) {
    //     alert('json')
    // }
  };

  return (
    <div className="container-xxl overflow-auto">
      <h2 className="text-primary py-2">Integration Import</h2>
      <Row className="match-height">
        <Col md="12" sm="12">
          <Card title="Basic" className="p-2">
          {(submitting || submittingSuccess || submittingClick) && <div className="d-flex justify-content-center align-items-center p-5">
                            <Spinner type="grow" color="primary" />
                        </div>}
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <Fragment>
                  <Label for="col-cb" className="text-danger">
                  {errors.name && touched?.name && <ErrorMessage message={errors.name} />}
                  </Label>
                  <InputGroup className="mb-2">
                    <Input
                      placeholder="Integration name"
                      className={errors.name ? "text-danger border-danger" : ""}
                      {...getFieldProps("name")}
                    />
                  </InputGroup>
                  <Label for="col-cb" className="text-danger">
                    {errors.description && touched?.description && <ErrorMessage message={errors.description} />}
                  </Label>
                  <InputGroup className="mb-2">
                    <InputGroupText>Description</InputGroupText>
                    <Input
                      type="textarea"
                      {...getFieldProps("description")}
                      className={
                        errors.description ? "text-danger border-danger" : ""
                      }
                    />
                  </InputGroup>
                  <Label for="col-cb">Integration image</Label>
                  <Label for="col-cb" className="text-danger">
                    {console.log(errors.image && touched?.image, ">>>>>>>>>>>>>>>>")}
                    {(errors.image && touched?.image) && <ErrorMessage message={errors.image} />}
                  </Label>
                  <InputGroup className="mb-2">
                    <Input
                      type="file"
                      name="image"
                      multiple={false}
                      accept="image/*"
                      onChange={handleChangeIcon}
                      className={ (errors.image && touched.image) ? "text-danger border-danger" : ""
                      }
                    />
                  </InputGroup>
                  <Label for="col-cb">Integration Json File</Label>
                  <Label for="col-cb" className="text-danger">
                  {(errors.file && touched?.file) && <ErrorMessage message={errors.file} />}
                  </Label>
                  <InputGroup>
                    <Input
                      type="file"
                      accept="application/json"
                      onChange={(event) =>
                        formik.setFieldValue("file", event.target.files[0])
                      }
                      className={ (errors.file && touched.file) ? "text-danger border-danger" : ""
                      }
                    />
                  </InputGroup>
                  <Button type="submit" className="mt-2" disabled={(submitting || submittingSuccess || submittingClick)}>
                    Create integration
                  </Button>
                </Fragment>
              </Form>
            </FormikProvider>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
