import React, { useEffect, useState } from "react";
import { ChevronDown, Eye, EyeOff } from "react-feather";
import { Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import Select, { components } from "react-select";

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
        {/* <Folder size={16} className="me-1" color="#131313" /> */}
        {data.name}
      </div>
    </components.Option>
  );
  // }
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
    isSelectorOption = false,
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
    handleToggleSelect();
    setCustomSelectedOption(selected);
    if (!isSelectorOption) {
      setSelectedNode(selected);
      if (selected?.is_project) {
        setIsActiveMainFolder(true);
        setIsActiveSubFolder(false);
      } else if (!selected?.is_project) {
        setIsActiveSubFolder(true);
        setIsActiveMainFolder(false);
      }
    }
    onChange(selected);
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
          {!isSelectorOption ? (
            <>
              {" "}
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
            </>
          ) : (
            <Select
              className="react-select text-black-50"
              classNamePrefix="select"
              defaultValue={value}
              options={optionsData}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              components={{
                Option: OptionComponent,
              }}
            />
          )}
        </div>
      )}

      {errorType && <ErrorMessage message={errorMessage} />}
    </Row>
  );
}
