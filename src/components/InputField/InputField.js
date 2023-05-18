import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import classnames from "classnames";
import {
  Eye,
  EyeOff,
  Folder,
  Layers,
  MoreHorizontal,
  Plus,
} from "react-feather";
import Select, { components } from "react-select";

// Local Imports
import "../../style/views/Login/authentication.scss";
import ErrorMessage from "../../utility/Utils";
import polygon from "@src/assets/images/icons/polygon.png";

export default function InputField(props) {
  const {
    label,
    type = "text",
    name,
    onChange,
    onBlur,
    value,
    autoFocus = false,
    placeholder,
    className,
    iconSize,
    optionsData,
    isOption = false,
    errorMessage,
    errorType,
    handleOnCreateNewProject,
  } = props;
  console.log("🚀 ~ file: InputField.js:44 ~ InputField ~ name:", name);
  console.log("🚀 ~ file: InputField.js:44 ~ InputField ~ value:", value);

  const [inputVisibility, setInputVisibility] = useState(false);

  const OptionComponent = ({ data, ...props }) => {
    // console.log("🚀 ~ file: InputField.js:47 ~ OptionComponent ~ data:", data);
    // if (data?.type === "button") {
    //   return (
    //     <div className="container__option-selector px-1">
    //       <img
    //         src={polygon}
    //         alt="Polygon icon"
    //         className="me-1"
    //         width="10px"
    //         height="7px"
    //       />
    //       <Layers size={16} className="me-1" color="#131313" />
    //       <span className="container__option-heading">NEMT Automat</span>
    //       <MoreHorizontal size={16} className="me-1" color="#131313" />
    //       <Plus
    //         className="font-medium-1 me-50 container__add-project-button-icon"
    //         onClick={handleOnCreateNewProject}
    //       />
    //     </div>
    //   );
    // } else {
    return (
      <components.Option {...props}>
        <div className="d-flex ms-2">
          <Folder size={16} className="me-1" color="#131313" />
          {data.name}
        </div>
      </components.Option>
    );
    // }
  };

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = iconSize ? iconSize : 14;

    if (!inputVisibility) {
      return <Eye size={size} color="#B8BCD5" />;
    } else {
      return <EyeOff size={size} color="#B8BCD5" />;
    }
  };

  return (
    <Row className="mb-1">
      {label ? (
        <Label className="container__form-label" for={label}>
          {label}
        </Label>
      ) : null}

      {!isOption ? (
        <InputGroup
          className={classnames({
            [className]: className,
          })}
        >
          <Input
            type={!inputVisibility && type === "password" ? "password" : type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className="container__input-field"
          />
          {type === "password" && (
            <InputGroupText
              className="cursor-pointer"
              onClick={() => setInputVisibility(!inputVisibility)}
            >
              {renderIcon()}
            </InputGroupText>
          )}
        </InputGroup>
      ) : (
        <Select
          className="react-select"
          classNamePrefix="select"
          defaultValue={value}
          options={optionsData}
          isClearable={false}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          components={{
            Option: OptionComponent,
          }}
        />
      )}
      {errorType && <ErrorMessage message={errorMessage} />}
    </Row>
  );
}
