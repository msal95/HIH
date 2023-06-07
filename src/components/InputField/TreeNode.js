import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FolderMinus,
  FolderPlus,
  Layers,
} from "react-feather";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import Select, { components } from "react-select";
function TreeNode({ data, value, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {data?.is_project ? (
        <div
          className={`container__option-selector rounded-2 `}
          style={{
            width: "100%",
          }}
        >
          <div className="cursor-pointer d-flex justify-content-center align-items-center ">
            {isOpen ? (
              <ChevronUp onClick={handleToggle} size={28} className="me-1" />
            ) : (
              <ChevronDown onClick={handleToggle} size={28} className="me-1" />
            )}
            <components.Option {...props}>
              <Layers size={16} className="me-1" />
              <span className={`container__option-heading `}>
                {data.name?.length > 7
                  ? `${data.name.substr(0, 7)}...`
                  : data.name}
              </span>
            </components.Option>
          </div>
        </div>
      ) : (
        <div
          className={`d-flex justify-content-between`}
          style={{
            width: "fit-content",
          }}
        >
          <div className="d-flex">
            {isOpen ? (
              <FolderMinus
                size={18}
                className="me-1 curser-pointer"
                onClick={handleToggle}
              />
            ) : (
              <FolderPlus
                size={18}
                className="me-1 curser-pointer"
                onClick={handleToggle}
              />
            )}

            <components.Option {...props}>
              <span
                className="align-middle cursor-pointer d-flex flex-nowrap"
                title={data.name}
              >
                {data?.name?.length > 7
                  ? `${data?.name.substr(0, 7)}...`
                  : data?.name}
              </span>
            </components.Option>
          </div>
        </div>
      )}
      {data?.tree.length > 0 && (
        <Collapse isOpen={isOpen}>
          <ListGroup>
            {data?.tree.map((childNode) => {
              return (
                <ListGroupItem key={childNode.id} className={`pt-1 pb-0 pe-0 `}>
                  <TreeNode data={childNode} value={value} {...props} />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Collapse>
      )}
    </>
  );
}

export default TreeNode;
