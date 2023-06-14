import React, { useState } from "react";
import Repeater from "@components/repeater";
import { X, Plus, Hash, Copy } from "react-feather";
import { SlideDown } from "react-slidedown";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

export default function GoogleSheetScript() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  const handleCopyUrl = () => {
    toast.success(() => (
      <div className="d-flex">
        <div className="d-flex flex-column">
          <h6 className="toast-title">Google Sheet Text Copied! 📋</h6>
          <span role="img" aria-label="toast-text">
            {text}
          </span>
        </div>
      </div>
    ));
  };

  const deleteForm = (e) => {
    e.preventDefault();
    e.target.closest(".repeater-wrapper").remove();
  };
  const handleSave = () => {
    const values = Array.from(
      document.querySelectorAll(".repeater-wrapper textarea")
    ).map((textarea) => textarea.value);
    const googleSheetColum = [];
    values.forEach((element) => {
      googleSheetColum.push(`data.${element}`);
    });
    const url = document.querySelector("#url");
    const sheetNumber = document.querySelector("#sheetNumber");
    const googleSheet = `
        var sheets = SpreadsheetApp.openByUrl("${url.value}");
        var sheet = sheets.getSheetByName("${sheetNumber.value}");

        function doPost(e) {
        var data = e.parameter;
        sheet.appendRow([${googleSheetColum}]);
        return ContentService.createTextOutput('suceess');
        }`;
    setText(googleSheet);
    console.log(
      "🚀 ~ file: GoogleSheetScript.js:29 ~ handleSave ~ googleSheet:",
      googleSheet
    );
  };

  const handleAddRows = () => {
    setCount((prevState) => prevState + 1);
    setText("");
  };
  return (
    <div className="container-xxl overflow-auto">
      <h2 className="text-primary py-2">Make Google Sheet Script</h2>
      <Row className="match-height">
        <Col md="12" sm="12">
          <Card title="Basic" className="p-2">
            <CardBody className="invoice-padding invoice-product-details">
              <Row className="w-100 pe-lg-0 pe-1 py-2">
                <Col sm="6" className="px-0 pe-1">
                  <Label>Google Sheet url</Label>
                  <Input
                    name="url"
                    id="url"
                    placeholder="Enter google sheet url"
                  />
                </Col>
                <Col sm="6" className="px-0">
                  <Label>Google Sheet Number</Label>
                  <Input
                    name="sheetNumber"
                    id="sheetNumber"
                    placeholder="Enter google sheet Number"
                  />
                </Col>
              </Row>
              <Repeater count={count}>
                {(i) => {
                  const Tag = i === 0 ? "div" : SlideDown;
                  return (
                    <Tag key={i} className="repeater-wrapper">
                      <Row>
                        <Col
                          className="d-flex product-details-border position-relative pe-0"
                          sm="12"
                        >
                          <Row className="w-100 pe-lg-0 pe-1 py-2">
                            <Col
                              className="mb-lg-0 mb-2 mt-lg-0 mt-2"
                              lg="12"
                              sm="12"
                            >
                              <CardText className="col-title mb-md-50 mb-0">
                                Google Sheet Column Name
                              </CardText>
                              <Input
                                className="mt-2"
                                type="textarea"
                                rows="1"
                              />
                            </Col>
                          </Row>
                          <div className="d-flex justify-content-center border-start invoice-product-actions py-50 px-25">
                            <X
                              size={18}
                              className="cursor-pointer"
                              onClick={deleteForm}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Tag>
                  );
                }}
              </Repeater>
              <Row className="mt-1">
                <Col sm="12" className="px-0">
                  <Button
                    color="primary"
                    size="sm"
                    className="btn-add-new"
                    onClick={handleAddRows}
                  >
                    <Plus size={14} className="me-25"></Plus>{" "}
                    <span className="align-middle">Add Item</span>
                  </Button>

                  <Button
                    color="success"
                    size="sm"
                    disabled={!!text?.length}
                    className="btn-save ms-1"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  {!!text?.length && (
                    <CopyToClipboard
                      text={text}
                      className="cursor-pointer ms-1"
                    >
                      <Copy size={16} onClick={handleCopyUrl} />
                    </CopyToClipboard>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
