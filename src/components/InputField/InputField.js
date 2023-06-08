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
  ChevronDown,
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
import TreeNode from "./TreeNode";
import { useForm } from "react-hook-form";
import { Field } from "formik";
import TreeView from "./TreeView";

function renderTree(nodes, level = 0) {
  return nodes?.map((node) => {
    const indent = level * 10;

    return (
      <>
        <option style={{ marginLeft: indent }}>{node?.name}</option>
        {node?.tree?.length > 0 && renderTree(node.tree, level + 2)}
      </>
    );
  });
}

// function renderTreeSelect(nodes, level = 0) {
//   console.log("🚀 ~ file: InputField.js:45 ~ renderTreeSelect ~ nodes:", nodes);
//   const indent = level * 10;

//   return nodes?.map((node) => {
//     console.log("🚀 ~ file: InputField.js:44 ~ returnnodes?.map ~ node:", node);

//     // return (
//     //   <div
//     //     key={node.id}
//     //     className={`mt-1`}
//     //     style={{ paddingTop: 5, paddingBottom: 5 }}
//     //   >
//     //     {node.is_project && (
//     //       <div>
//     //         <div className="cursor-pointer">
//     //           <img
//     //             src={polygon}
//     //             alt="Polygon icon"
//     //             className="me-1"
//     //             width="10px"
//     //             height="7px"
//     //           />
//     //           <Layers size={16} className="me-1" color="#131313" />
//     //           <span>
//     //             {node.name?.length > 7
//     //               ? `${node.name.substr(0, 7)}...`
//     //               : node.name}
//     //           </span>
//     //         </div>
//     //       </div>
//     //     )}

//     //     {node?.tree?.length > 0 && renderTreeSelect(node.tree, level + 2)}
//     //   </div>
//     // );

//     const child =
//       node?.tree?.length > 0 && renderTreeSelect(node.tree, level + 2);

//     return {
//       label: node?.name,
//       child,
//     };
//   });
// }

// const renderOptions = (data) => {
//   return data?.map((item) => {
//     return {
//       value: item.id,
//       label: item.name,
//       children: renderOptions(item.tree),
//     };
//   });
// };

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
    handleOnCreateNewProject,
  } = props;

  const [inputVisibility, setInputVisibility] = useState(false);
  const [toggleSelect, setToggleSelect] = useState(false);
  // console.log("🚀 ~ file: InputField.js:29 ~ InputField ~ type:", type);

  // useEffect(() => {
  //   console.log("🚀 ~ file: InputField.js:57 ~ useEffect ~ first:");
  // }, [value]);

  // const renderOptions = (items) => {
  //   return items?.map((item) => {
  //     const { id, name, tree } = item;
  //     const hasChildren = tree.length > 0;

  //     return {
  //       value: id,
  //       label: name,
  //       children: hasChildren ? renderOptions(tree) : null,
  //     };
  //   });
  // };
  // const options = optionsData?.map((item) => {
  //   return {
  //     label: item.name,
  //     value: item.id,
  //     children: item.tree.flat().map((child) => {
  //       return {
  //         label: child.name,
  //         value: child.id,
  //       };
  //     }),
  //   };
  // });

  // const renderNestedOptions = (options) => {
  //   console.log(
  //     "🚀 ~ file: InputField.js:148 ~ renderNestedOptions ~ options:",
  //     options
  //   );
  //   return options?.map((option) => (
  //     <option key={option?.value} value={option?.value}>
  //       {option.name}
  //       {option?.tree && renderNestedOptions(option.tree)}
  //     </option>
  //   ));
  // };
  const renderNestedOptions = (options) => {
    return options?.map((group) => (
      <optgroup label={group.name} key={group.label}>
        {" "}
        {group?.options?.map((option) => (
          <React.Fragment key={option.value}>
            {" "}
            <option value={option.value}>{option.name}</option>{" "}
            {option?.tree && renderNestedOptions(option.tree)}{" "}
          </React.Fragment>
        ))}{" "}
      </optgroup>
    ));
  };

  const renderOptions = (items, level = 0) => {
    return items?.map((item) => {
      const { id, name, tree } = item;

      const hasChildren = tree.length > 0;

      const optionStyle = {
        paddingLeft: level * 20, // Adjust the indentation as needed
      };

      const option = {
        value: id,
        label: name,
        style: optionStyle,
      };

      return hasChildren ? [option, ...renderOptions(tree, level + 1)] : option;
    });
  };

  const options = renderOptions(optionsData);

  // const options = renderOptions(optionsData);
  console.log("🚀 ~ file: InputField.js:124 ~ InputField ~ options:", options);

  const OptionComponent = ({ data, ...props }) => {
    // function renderTree(nodes, level = 0) {
    //   const indent = level * 10;
    //   return nodes?.map((node) => {
    //     return (
    //       <div
    //         key={node.id}
    //         className={`mt-1`}
    //         style={{ paddingTop: 5, paddingBottom: 5 }}
    //       >
    //         {node.is_project ? (
    //           <div
    //             className={`container__option-selector px-1 ${
    //               selectedTab?.name === node?.name && "bg-primary text-light"
    //             }`}
    //           >
    //             <div
    //               onClick={() => handleActiveTabFolders(node)}
    //               className="cursor-pointer"
    //             >
    //               <img
    //                 src={polygon}
    //                 alt="Polygon icon"
    //                 className="me-1"
    //                 width="10px"
    //                 height="7px"
    //               />
    //               <Layers size={16} className="me-1" color="#131313" />
    //               <span
    //                 className={`container__option-heading ${
    //                   selectedTab?.name === node?.name && "text-light"
    //                 }`}
    //               >
    //                 {node.name?.length > 7
    //                   ? `${node.name.substr(0, 7)}...`
    //                   : node.name}
    //               </span>
    //             </div>
    //             <div className="d-flex align-items-center">
    //               <Plus
    //                 size={16}
    //                 color="#131313"
    //                 className="me-50 container__add-project-button-icon"
    //                 onClick={() => {
    //                   handleToggleCreateFolderModal(node);
    //                 }}
    //               />
    //               <MoreVerticalDropdown
    //                 handleEdit={() => handleEditProjectModal(node)}
    //                 handleDelete={() => handleDeleteProject(node.id)}
    //                 isView
    //               />
    //             </div>
    //           </div>
    //         ) : (
    //           <div
    //             className={`d-flex justify-content-between container__folders-list ${
    //               selectedTab?.name === node?.name && "bg-primary text-light"
    //             }`}
    //             onMouseEnter={() => handleOnMouseEnter(node)}
    //             onMouseLeave={handleOnMouseLeave}
    //             onClick={() => handleActiveTabSubFolders(node)}
    //           >
    //             <div style={{ marginLeft: indent }}>
    //               <Folder size={18} className="me-1" />
    //               <span
    //                 className="align-middle cursor-pointer"
    //                 data-bs-toggle="tooltip"
    //                 data-bs-placement="top"
    //                 title={node.name}
    //               >
    //                 {node?.name?.length > 7
    //                   ? `${node?.name.substr(0, 7)}...`
    //                   : node?.name}
    //               </span>
    //             </div>
    //             {hoverItem && hoverItem.uuid === node.uuid && (
    //               <div className="d-flex pe-1 align-items-center">
    //                 <Plus
    //                   size={16}
    //                   color="#131313"
    //                   className="cursor-pointer me-1"
    //                   onClick={() => handleToggleCreateSubFolderModal(node)}
    //                 />
    //                 <MoreVerticalDropdown
    //                   isView
    //                   handleEdit={() => handleEditFolderModal(node)}
    //                   handleDelete={() => handleDeleteFolder(hoverItem.id)}
    //                 />
    //               </div>
    //             )}
    //           </div>
    //         )}
    //         {node?.tree?.length > 0 && renderTree(node.tree, level + 2)}
    //       </div>
    //     );
    //   });
    // }
    // console.log("🚀 ~ file: InputField.js:47 ~ OptionComponent ~ data:", data);
    // if (data?.type === "button") {
    //   return (
    //     <div className="container__option-selector px-1">
    //       <div className="d-flex align-items-center">
    //         <img
    //           src={polygon}
    //           alt="Polygon icon"
    //           className="me-1"
    //           width="10px"
    //           height="7px"
    //         />
    //         <Layers size={16} className="me-1" color="#131313" />
    //         <span className="container__option-heading">NEMT Automat</span>
    //       </div>
    //       <div className="d-flex align-items-center">
    //         <MoreHorizontal size={16} className="me-1" color="#131313" />
    //         <Plus
    //           className="font-medium-1 me-50 container__add-project-button-icon"
    //           onClick={handleOnCreateNewProject}
    //         />
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <components.Option {...props}>
    //       <div className="d-flex ms-2">
    //         {data?.is_project && (
    //           <Layers size={16} className="me-1" color="#131313" />
    //         )}
    //         <p className="text-black">{data.name}</p>
    //       </div>
    //     </components.Option>
    //   );
    // }
  };
  const handleToggleSelect = () => {
    setToggleSelect((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleToggleSelect);
    return () => {
      document.removeEventListener("mousedown", handleToggleSelect);
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

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected);
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
              {!!selectedOption?.name
                ? selectedOption?.name
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
