import React, { useState } from "react";
import polygonGray from "@src/assets/images/icons/polygon-gray.png";
import polygon from "@src/assets/images/icons/polygon.png";

import "../../style/components/customSelector.scss";
import { Layers, MoreHorizontal } from "react-feather";
import { Button } from "reactstrap";

export default function CustomSelector() {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = () => {
    setIsToggle((prevState) => !prevState);
  };
  return (
    <>
      <div className="custom-selector mx-1" onClick={handleToggle}>
        <p className="custom-selector__default-option m-0">
          Chose project or folder
        </p>
        <img src={polygonGray} alt="PolyGon Gray" width="15px" height="11px" />
      </div>
      {isToggle && (
        <div className="d-flex">
          <img
            src={polygon}
            alt="Polygon icon"
            className="me-1"
            width="10px"
            height="7px"
          />
          <Layers size={16} className="me-1" />
          <p>Heading</p>
          <MoreHorizontal size={16} className="me-1" color="#82868B" />
          <Button>+</Button>
          {/* <p>Sub Text</p> */}
        </div>
      )}
    </>
  );
}
