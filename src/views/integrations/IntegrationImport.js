import React, { Fragment } from "react";
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
} from "reactstrap";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { getFormData } from "../../../api/config/utils/formUtil";

export default function IntegrationImport() {
  const importQuery = useIntegrationImport();

  const integrationSchema = Yup.object().shape({
    file: Yup.mixed().required("Integration Json File is required"),
    image: Yup.mixed().required("Integration image is required"),
    description: Yup.string().required("Description is required"),
    name: Yup.string().required("Integration name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "emmanuel",
      description: "description",
    },
    validationSchema: integrationSchema,
    onSubmit: (data) => {
      console.log("✅ data   >>>>>>>>>>>>>>>>>>>>>> ", data);
      importQuery.mutate(data);
    },
  });

  const handleChangeIcon = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  };

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  console.log("✅ values", formik.values, "errors", errors, "touched", touched);

  return (
    <div className="container-xxl overflow-auto">
      <h2 className="text-primary py-2">Integration Import</h2>
      <Row className="match-height">
        <Col md="12" sm="12">
          <Card title="Basic" className="p-2">
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <Fragment>
                  <Label for="col-cb" className="text-danger">
                    {errors.name}
                  </Label>
                  <InputGroup className="mb-2">
                    <Input
                      placeholder="Integration name"
                      className={errors.name ? "text-danger border-danger" : ""}
                      {...getFieldProps("name")}
                    />
                  </InputGroup>
                  <Label for="col-cb" className="text-danger">
                    {errors.description}
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
                    {errors.image}
                  </Label>
                  <InputGroup className="mb-2">
                    <Input
                      type="file"
                      multiple={false}
                      accept="image/*"
                      onChange={handleChangeIcon}
                      className={
                        errors.image && touched.image
                          ? "text-danger border-danger"
                          : ""
                      }
                    />
                  </InputGroup>
                  <Label for="col-cb">Integration Json File</Label>
                  <Label for="col-cb" className="text-danger">
                    {errors.file}
                  </Label>
                  <InputGroup>
                    <Input
                      type="file"
                      onChange={(event) =>
                        formik.setFieldValue("file", event.target.files[0])
                      }
                      className={
                        errors.file && touched.file
                          ? "text-danger border-danger"
                          : ""
                      }
                    />
                  </InputGroup>
                  <Button type="submit" className="mt-2">
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
