import React from "react";
import { Col } from "reactstrap";
import Divider from "../Divider/Divider";
import { Layers } from "react-feather";
export default function CustomHeading(props) {
  const {
    image,
    title,
    subTitle,
    isDivider = false,
    iconWidth = "48px",
    iconHeight = "48px",
    titleClass = "modal-title",
    subTitleClass = "modal-description",
    subImage,
    isIcon = false,
  } = props;

  console.log(
    "🚀 ~ file: CustomHeading.js:17 ~ CustomHeading ~ isIcon:",
    isIcon
  );
  return (
    <>
      <div className="d-flex px-1 justify-content-center align-content-center">
        {!!image && (
          <img
            src={image}
            alt="SendGrid Logo"
            className="me-1"
            width={iconWidth}
            height={iconHeight}
          />
        )}
        <Col>
          <h1 className={titleClass}>{title}</h1>
          <div className="d-flex">
            {!!subImage && (
              <img
                src={subImage}
                alt="SendGrid Logo"
                className="me-1"
                width={iconWidth}
                height={iconHeight}
              />
            )}
            {isIcon && <Layers size={16} className="me-1" />}
            <p className={subTitleClass}>{subTitle}</p>
          </div>
        </Col>
      </div>
      {isDivider && <Divider />}
    </>
  );
}
