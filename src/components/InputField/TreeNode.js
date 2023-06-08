import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FolderMinus,
  FolderPlus,
  Layers,
} from "react-feather";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
function TreeNode(props) {
  const { node, handleChange } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {node.is_project ? (
        <div
          className={`container__option-selector rounded-2 `}
          // style={{
          //   width: "100%",
          //   padding: selectedTab?.name === node?.name && "5px",
          // }}
        >
          <div className="cursor-pointer">
            {isOpen ? (
              <ChevronUp onClick={handleToggle} size={18} className="me-1" />
            ) : (
              <ChevronDown onClick={handleToggle} size={18} className="me-1" />
            )}
            <Layers size={16} className="me-1" />
            <span
              className={`container__option-heading `}
              onClick={() => handleChange(node)}
            >
              {node.name?.length > 7
                ? `${node.name.substr(0, 7)}...`
                : node.name}
            </span>
          </div>
        </div>
      ) : (
        <div className={`d-flex justify-content-between`}>
          <div className="d-flex">
            {isOpen ? (
              <FolderMinus
                size={18}
                className="me-1 cursor-pointer"
                onClick={handleToggle}
              />
            ) : (
              <FolderPlus
                size={18}
                className="me-1 cursor-pointer"
                onClick={handleToggle}
              />
            )}
            <span
              className="align-middle cursor-pointer d-flex flex-nowrap"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={node.name}
              style={{ minWidth: 100 }}
              onClick={() => handleChange(node)}
            >
              {node?.name?.length > 7
                ? `${node?.name.substr(0, 7)}...`
                : node?.name}
            </span>
          </div>
        </div>
      )}
      {node.tree.length > 0 && (
        <Collapse isOpen={isOpen}>
          <ListGroup>
            {node.tree.map((childNode) => {
              // handleLevel();
              return (
                <ListGroupItem key={childNode.id} className={`pt-1 pb-0 pe-0 `}>
                  <TreeNode node={childNode} handleChange={handleChange} />
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
