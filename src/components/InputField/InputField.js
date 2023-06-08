import React, { useEffect, useState } from "react";
import { ChevronDown, Eye, EyeOff } from "react-feather";
import { Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";

// Local Imports
import "../../style/views/Login/authentication.scss";
import ErrorMessage from "../../utility/Utils";
import TreeView from "./TreeView";

const style = {
  container: {
    padding: "0.571rem 1rem",
    border: "1px solid #d8d6de",
    borderRadius: "0.357rem",
  },
  text: {
    fontSize: 12,
    color: "#b9b9c3 !important",
  },
};
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
    iconSize,
    optionsData,
    isOption = false,
    errorMessage,
    errorType,
    isRequired,
    setCustomSelectedOption,
    customSelectedOption,
    setIsActiveMainFolder,
    setIsActiveSubFolder,
    setSelectedNode,
  } = props;

  const [inputVisibility, setInputVisibility] = useState(false);
  const [toggleSelect, setToggleSelect] = useState(false);

  const handleToggleSelect = () => {
    setToggleSelect((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener("mousedown", setToggleSelect(false));
    return () => {
      document.removeEventListener("mousedown", setToggleSelect(false));
    };
  }, []);

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = iconSize ? iconSize : 14;

    if (!inputVisibility) {
      return <Eye size={size} color="#B8BCD5" />;
    } else {
      return <EyeOff size={size} color="#B8BCD5" />;
    }
  };

  const handleChange = (selected) => {
    setCustomSelectedOption(selected);
    setSelectedNode(selected);
    if (selected?.is_project) {
      setIsActiveMainFolder(true);
      setIsActiveSubFolder(false);
    } else if (!selected?.is_project) {
      setIsActiveSubFolder(true);
      setIsActiveMainFolder(false);
    }
    onChange(selected);
    handleToggleSelect();
  };

  return (
    <Row className="mb-1">
      {label ? (
        <Label className="container__form-label" for={label}>
          {label}
          {isRequired && <span className="text-danger"> * </span>}
        </Label>
      ) : null}

      {!isOption ? (
        <InputGroup className="container__input-group">
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
        <div>
          <div
            className="d-flex align-items-center justify-content-between"
            onClick={handleToggleSelect}
            style={style.container}
          >
            <p style={style.text} className="p-0 m-0">
              {!!customSelectedOption?.name
                ? customSelectedOption?.name
                : `Select an option`}
            </p>
            <ChevronDown size={16} />
          </div>

          {toggleSelect && (
            <div className="">
              <TreeView data={optionsData} handleChange={handleChange} />
            </div>
          )}
        </div>
      )}
      {errorType && <ErrorMessage message={errorMessage} />}
    </Row>
  );
}
