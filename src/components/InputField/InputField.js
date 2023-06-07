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
import TreeNode from "./TreeNode";

// const data = [
//   { name: "card", value: 89519 },
//   { name: "array", value: 49024 },
//   { name: "grocery", value: 90170 },
//   { name: "input", value: 56963 },
// ];

// const withCategoryData = [
//   { category: "calculate", name: "card", value: 89519 },
//   { category: "calculate", name: "array", value: 49024 },
//   { category: "lavender", name: "grocery", value: 90170 },
//   { category: "lavender", name: "input", value: 56963 },
// ];

const data = [
  {
    is_project: "true",
    id: 5,
    name: "p1",
    created_at: "2023-05-22T12:31:43.000000Z",
    updated_at: "2023-05-24T08:04:41.000000Z",
    tree: [
      {
        id: 12,
        name: "f3",
        uuid: "2309c793-44db-45e2-9368-be5ca3b33a94",
        project_id: 5,
        created_at: "2023-05-23T12:58:17.000000Z",
        updated_at: "2023-05-23T12:58:17.000000Z",
        tree: [],
      },
      {
        id: 13,
        name: "f4",
        uuid: "7e9ed6ca-437d-40c7-aa4f-7e4a42629878",
        project_id: 5,
        created_at: "2023-05-23T12:59:17.000000Z",
        updated_at: "2023-05-23T12:59:17.000000Z",
        tree: [],
      },
      {
        id: 14,
        name: "f5",
        uuid: "664b0b92-7feb-4d58-9b81-7dc0784bdcc4",
        project_id: 5,
        created_at: "2023-05-23T13:02:14.000000Z",
        updated_at: "2023-05-23T13:02:14.000000Z",
        tree: [],
      },
      {
        id: 29,
        name: "1122",
        uuid: "dbf30113-ae52-4f48-9345-040d6c6c8689",
        project_id: 5,
        created_at: "2023-05-29T12:35:32.000000Z",
        updated_at: "2023-05-29T12:35:32.000000Z",
        tree: [],
      },
      {
        id: 30,
        name: "11221",
        uuid: "434a66fe-2bc5-4602-8660-6723a1a30725",
        project_id: 5,
        created_at: "2023-05-29T12:36:37.000000Z",
        updated_at: "2023-05-29T12:36:37.000000Z",
        tree: [
          {
            id: 55,
            name: "s12",
            uuid: "e3b57367-c95f-429d-a2bf-c153976cbbd4",
            project_id: 5,
            created_at: "2023-06-06T11:10:38.000000Z",
            updated_at: "2023-06-06T11:10:38.000000Z",
            tree: [
              {
                id: 56,
                name: "s13",
                uuid: "f9f7dbfa-007c-4fac-a09c-d431faaec982",
                project_id: 5,
                created_at: "2023-06-06T11:10:55.000000Z",
                updated_at: "2023-06-06T11:10:55.000000Z",
                tree: [
                  {
                    id: 57,
                    name: "S14",
                    uuid: "dcbb972e-1280-4dd8-a77f-aca590f28c70",
                    project_id: 5,
                    created_at: "2023-06-06T11:11:12.000000Z",
                    updated_at: "2023-06-06T11:11:12.000000Z",
                    tree: [
                      {
                        id: 58,
                        name: "s15",
                        uuid: "c0c98371-7b51-430a-b90a-2ac4295adc5f",
                        project_id: 5,
                        created_at: "2023-06-06T11:11:33.000000Z",
                        updated_at: "2023-06-06T11:11:33.000000Z",
                        tree: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    is_project: "true",
    id: 8,
    name: "P3",
    created_at: "2023-05-23T15:22:11.000000Z",
    updated_at: "2023-05-23T15:22:11.000000Z",
    tree: [],
  },
  {
    is_project: "true",
    id: 9,
    name: "test",
    created_at: "2023-05-25T08:18:59.000000Z",
    updated_at: "2023-05-25T08:18:59.000000Z",
    tree: [],
  },
  {
    is_project: "true",
    id: 10,
    name: "test 1",
    created_at: "2023-05-25T08:23:22.000000Z",
    updated_at: "2023-05-25T08:23:22.000000Z",
    tree: [],
  },
  {
    is_project: "true",
    id: 18,
    name: "p2",
    created_at: "2023-05-31T11:05:15.000000Z",
    updated_at: "2023-05-31T11:05:15.000000Z",
    tree: [],
  },
];

const options = data.map((item) => ({
  label: item.name,
  value: item.id.toString(),
}));

const groupedOptions = [
  {
    label: "Projects",
    options: options.filter((option) =>
      data.find(
        (item) =>
          item.id.toString() === option.value && item.is_project === "true"
      )
    ),
  },
  {
    label: "Other Options",
    options: options.filter((option) =>
      data.find(
        (item) =>
          item.id.toString() === option.value && item.is_project !== "true"
      )
    ),
  },
];
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
  // console.log(
  //   "🚀 ~ file: InputField.js:44 ~ InputField ~ optionsData:",
  //   JSON.stringify(optionsData)
  // );

  const [selectedOption, setSelectedOption] = useState(null);
  console.log(
    "🚀 ~ file: InputField.js:73 ~ InputField ~ selectedOption:",
    selectedOption
  );

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  // const data = [
  //   {
  //     is_project: "true",
  //     id: 5,
  //     name: "p1",
  //     created_at: "2023-05-22T12:31:43.000000Z",
  //     updated_at: "2023-05-24T08:04:41.000000Z",
  //     tree: [
  //       {
  //         id: 12,
  //         name: "f3",
  //         uuid: "2309c793-44db-45e2-9368-be5ca3b33a94",
  //         project_id: 5,
  //         created_at: "2023-05-23T12:58:17.000000Z",
  //         updated_at: "2023-05-23T12:58:17.000000Z",
  //         tree: [],
  //       },
  //       {
  //         id: 13,
  //         name: "f4",
  //         uuid: "7e9ed6ca-437d-40c7-aa4f-7e4a42629878",
  //         project_id: 5,
  //         created_at: "2023-05-23T12:59:17.000000Z",
  //         updated_at: "2023-05-23T12:59:17.000000Z",
  //         tree: [],
  //       },
  //       {
  //         id: 14,
  //         name: "f5",
  //         uuid: "664b0b92-7feb-4d58-9b81-7dc0784bdcc4",
  //         project_id: 5,
  //         created_at: "2023-05-23T13:02:14.000000Z",
  //         updated_at: "2023-05-23T13:02:14.000000Z",
  //         tree: [],
  //       },
  //       {
  //         id: 29,
  //         name: "1122",
  //         uuid: "dbf30113-ae52-4f48-9345-040d6c6c8689",
  //         project_id: 5,
  //         created_at: "2023-05-29T12:35:32.000000Z",
  //         updated_at: "2023-05-29T12:35:32.000000Z",
  //         tree: [],
  //       },
  //       {
  //         id: 30,
  //         name: "11221",
  //         uuid: "434a66fe-2bc5-4602-8660-6723a1a30725",
  //         project_id: 5,
  //         created_at: "2023-05-29T12:36:37.000000Z",
  //         updated_at: "2023-05-29T12:36:37.000000Z",
  //         tree: [
  //           {
  //             id: 55,
  //             name: "s12",
  //             uuid: "e3b57367-c95f-429d-a2bf-c153976cbbd4",
  //             project_id: 5,
  //             created_at: "2023-06-06T11:10:38.000000Z",
  //             updated_at: "2023-06-06T11:10:38.000000Z",
  //             tree: [
  //               {
  //                 id: 56,
  //                 name: "s13",
  //                 uuid: "f9f7dbfa-007c-4fac-a09c-d431faaec982",
  //                 project_id: 5,
  //                 created_at: "2023-06-06T11:10:55.000000Z",
  //                 updated_at: "2023-06-06T11:10:55.000000Z",
  //                 tree: [
  //                   {
  //                     id: 57,
  //                     name: "S14",
  //                     uuid: "dcbb972e-1280-4dd8-a77f-aca590f28c70",
  //                     project_id: 5,
  //                     created_at: "2023-06-06T11:11:12.000000Z",
  //                     updated_at: "2023-06-06T11:11:12.000000Z",
  //                     tree: [
  //                       {
  //                         id: 58,
  //                         name: "s15",
  //                         uuid: "c0c98371-7b51-430a-b90a-2ac4295adc5f",
  //                         project_id: 5,
  //                         created_at: "2023-06-06T11:11:33.000000Z",
  //                         updated_at: "2023-06-06T11:11:33.000000Z",
  //                         tree: [],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     is_project: "true",
  //     id: 8,
  //     name: "P3",
  //     created_at: "2023-05-23T15:22:11.000000Z",
  //     updated_at: "2023-05-23T15:22:11.000000Z",
  //     tree: [],
  //   },
  //   {
  //     is_project: "true",
  //     id: 9,
  //     name: "test",
  //     created_at: "2023-05-25T08:18:59.000000Z",
  //     updated_at: "2023-05-25T08:18:59.000000Z",
  //     tree: [],
  //   },
  //   {
  //     is_project: "true",
  //     id: 10,
  //     name: "test 1",
  //     created_at: "2023-05-25T08:23:22.000000Z",
  //     updated_at: "2023-05-25T08:23:22.000000Z",
  //     tree: [],
  //   },
  //   {
  //     is_project: "true",
  //     id: 18,
  //     name: "p2",
  //     created_at: "2023-05-31T11:05:15.000000Z",
  //     updated_at: "2023-05-31T11:05:15.000000Z",
  //     tree: [],
  //   },
  // ];

  const renderOptions = (data) => {
    return data?.map((item) => {
      console.log(
        "🚀 ~ file: InputField.js:180 ~ returndata.map ~ item:",
        item
      );
      return {
        value: item.id,
        label: item.name,
        data: renderOptions(item.tree),
      };
    });
  };

  // const options = renderOptions(optionsData);

  const [inputVisibility, setInputVisibility] = useState(false);
  console.log("🚀 ~ file: InputField.js:29 ~ InputField ~ type:", type);

  useEffect(() => {
    console.log("🚀 ~ file: InputField.js:57 ~ useEffect ~ first:");
  }, [value]);

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
        // <Select
        //   value={selectedOption}
        //   onChange={handleChange}
        //   options={options}
        //   isClearable
        //   isSearchable
        //   closeMenuOnSelect={false}
        //   placeholder="Select an option"
        //   className="react-select-container"
        //   classNamePrefix="react-select"
        // />
        <Select
          options={groupedOptions}
          value={selectedOption}
          onChange={handleChange}
        />
        // <Select
        //   className="react-select text-black-50"
        //   classNamePrefix="select"
        //   defaultValue={value}
        //   options={optionsData}
        //   getOptionValue={(option) => option.id}
        //   getOptionLabel={(option) => option.name}
        //   name={name}
        //   onChange={onChange}
        //   onBlur={onBlur}
        //   components={{
        //     Option: TreeNode,
        //   }}
        // />
      )}
      {errorType && <ErrorMessage message={errorMessage} />}
    </Row>
  );
}
