import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
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
    iconSize,
    optionsData,
    isOption = false,
    errorMessage,
    errorType,
    isRequired,
  } = props;

  const [inputVisibility, setInputVisibility] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ file: InputField.js:57 ~ useEffect ~ first:");
  }, [value]);

  const OptionComponent = ({ data, ...props }) => {
    function renderTree(nodes, level = 0) {
      const indent = level * 10;
      return nodes?.map((node) => {
        return (
          <div
            key={node.id}
            className={`mt-1`}
            style={{ paddingTop: 5, paddingBottom: 5 }}
          >
            {node.is_project ? (
              <div
                className={`container__option-selector px-1 ${
                  selectedTab?.name === node?.name && "bg-primary text-light"
                }`}
              >
                <div
                  onClick={() => handleActiveTabFolders(node)}
                  className="cursor-pointer"
                >
                  <img
                    src={polygon}
                    alt="Polygon icon"
                    className="me-1"
                    width="10px"
                    height="7px"
                  />
                  <Layers size={16} className="me-1" color="#131313" />
                  <span
                    className={`container__option-heading ${
                      selectedTab?.name === node?.name && "text-light"
                    }`}
                  >
                    {node.name?.length > 7
                      ? `${node.name.substr(0, 7)}...`
                      : node.name}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <Plus
                    size={16}
                    color="#131313"
                    className="me-50 container__add-project-button-icon"
                    onClick={() => {
                      handleToggleCreateFolderModal(node);
                    }}
                  />
                  <MoreVerticalDropdown
                    handleEdit={() => handleEditProjectModal(node)}
                    handleDelete={() => handleDeleteProject(node.id)}
                    isView
                  />
                </div>
              </div>
            ) : (
              <div
                className={`d-flex justify-content-between container__folders-list ${
                  selectedTab?.name === node?.name && "bg-primary text-light"
                }`}
                onMouseEnter={() => handleOnMouseEnter(node)}
                onMouseLeave={handleOnMouseLeave}
                onClick={() => handleActiveTabSubFolders(node)}
              >
                <div style={{ marginLeft: indent }}>
                  <Folder size={18} className="me-1" />
                  <span
                    className="align-middle cursor-pointer"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={node.name}
                  >
                    {node?.name?.length > 7
                      ? `${node?.name.substr(0, 7)}...`
                      : node?.name}
                  </span>
                </div>
                {hoverItem && hoverItem.uuid === node.uuid && (
                  <div className="d-flex pe-1 align-items-center">
                    <Plus
                      size={16}
                      color="#131313"
                      className="cursor-pointer me-1"
                      onClick={() => handleToggleCreateSubFolderModal(node)}
                    />
                    <MoreVerticalDropdown
                      isView
                      handleEdit={() => handleEditFolderModal(node)}
                      handleDelete={() => handleDeleteFolder(hoverItem.id)}
                    />
                  </div>
                )}
              </div>
            )}
            {node?.tree?.length > 0 && renderTree(node.tree, level + 2)}
          </div>
        );
      });
    }
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
          <Layers size={16} className="me-1" color="#131313" />
          <p className="text-black">{data.name}</p>
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
          {isRequired && <span className="text-danger"> * </span>}
        </Label>
      ) : null}

      {!isOption ? (
        <InputGroup
          // className={classnames({
          //   [className]: className,
          // })}
          className="container__input-group"
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
        // <Input
        //   type="select"
        //   id="select-basic"
        //   onChange={onChange}
        //   onBlur={onBlur}
        //   name={name}
        // >
        //   {optionsData?.map((item) => (
        //     <option value={item?.id}>{item?.name}</option>
        //   ))}
        // </Input>
        <Select
          className="react-select text-black-50"
          classNamePrefix="select"
          defaultValue={value}
          options={optionsData}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          name={name}
          // isOptionSelected={value}
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
