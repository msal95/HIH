import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Folder,
  FolderMinus,
  FolderPlus,
  Layers,
  Plus,
} from "react-feather";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import MoreVerticalDropdown from "../../components/MoreVerticalDropdown/MoreVerticalDropdown";
import polygon from "@src/assets/images/icons/polygon.png";
function TreeNode(props) {
  const {
    node,
    handleActiveTab,
    selectedTab,
    handleToggleCreateFolderModal,
    handleEditProjectModal,
    handleDeleteProject,
    handleActiveTabSubFolders,
    // handleOnMouseEnter,
    // handleOnMouseLeave,
    handleToggleCreateSubFolderModal,
    handleEditFolderModal,
    handleDeleteFolder,
  } = props;
  console.log("🚀 ~ file: TreeNode.js:30 ~ TreeNode ~ node:", node);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {node.is_project ? (
        <div
          className={`container__option-selector rounded-2  ${
            selectedTab?.name === node?.name && "bg-primary text-light"
          }`}
          style={{
            width: "fit-content",
            padding: selectedTab?.name === node?.name && "5px",
          }}
        >
          <div onClick={() => handleActiveTab(node)} className="cursor-pointer">
            {isOpen ? (
              <ChevronUp onClick={handleToggle} size={18} className="me-1" />
            ) : (
              <ChevronDown onClick={handleToggle} size={18} className="me-1" />
            )}
            <Layers
              size={16}
              className="me-1"
              color={selectedTab?.name === node?.name ? "#fff" : "#131313"}
            />
            <span className={`container__option-heading `}>
              {node.name?.length > 7
                ? `${node.name.substr(0, 7)}...`
                : node.name}
            </span>
          </div>
          <div className="d-flex align-items-center"></div>
        </div>
      ) : (
        <div
          className={`d-flex justify-content-between ${
            selectedTab?.name === node?.name &&
            "bg-primary text-light rounded-2"
          }`}
          style={{
            width: "fit-content",
            padding: selectedTab?.name === node?.name && "5px",
          }}
          // onMouseEnter={() => handleOnMouseEnter(node)}
          // onMouseLeave={handleOnMouseLeave}
          onClick={() => handleActiveTabSubFolders(node)}
        >
          <div className="d-flex">
            {isOpen ? (
              <FolderMinus
                size={18}
                className="me-1 curser-pointer"
                color={selectedTab?.name === node?.name ? "#fff" : "#131313"}
                onClick={handleToggle}
              />
            ) : (
              <FolderPlus
                size={18}
                className="me-1 curser-pointer"
                color={selectedTab?.name === node?.name ? "#fff" : "#131313"}
                onClick={handleToggle}
              />
            )}
            <span
              className="align-middle cursor-pointer d-flex flex-nowrap"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={node.name}
              style={{ minWidth: 100 }}
            >
              {node?.name?.length > 7
                ? `${node?.name.substr(0, 7)}...`
                : node?.name}
            </span>
            <div className="d-flex align-items-center">
              <Plus
                size={16}
                color={selectedTab?.name === node?.name ? "#fff" : "#131313"}
                className="cursor-pointer me-1"
                onClick={() => handleToggleCreateSubFolderModal(node)}
              />
            </div>
          </div>
        </div>
      )}
      {node.tree.length > 0 && (
        <Collapse isOpen={isOpen}>
          <ListGroup>
            {node.tree.map((childNode) => {
              return (
                <ListGroupItem key={childNode.id} className={`pt-1 pb-0 pe-0 `}>
                  <TreeNode
                    node={childNode}
                    handleActiveTab={handleActiveTab}
                    selectedTab={selectedTab}
                    handleToggleCreateFolderModal={
                      handleToggleCreateFolderModal
                    }
                    handleEditProjectModal={handleEditProjectModal}
                    handleDeleteProject={handleDeleteProject}
                    handleActiveTabSubFolders={handleActiveTabSubFolders}
                    handleToggleCreateSubFolderModal={
                      handleToggleCreateSubFolderModal
                    }
                    handleEditFolderModal={handleEditFolderModal}
                    handleDeleteFolder={handleDeleteFolder}
                  />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Collapse>
      )}
    </>
  );
}

TreeNode.propTypes = {
  handleActiveTabSubFolders: PropTypes.func.isRequired,
  handleActiveTabFolders: PropTypes.func.isRequired,
  handleToggleCreateFolderModal: PropTypes.func.isRequired,
  handleCreateProject: PropTypes.func.isRequired,
  handleToggleCreateSubFolderModal: PropTypes.func.isRequired,
  handleDeleteFolder: PropTypes.func.isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
  handleEditFolderModal: PropTypes.func.isRequired,
  handleEditProjectModal: PropTypes.func.isRequired,
  handleActiveTab: PropTypes.func.isRequired,

  // optionalArray: PropTypes.array,
  // optionalBigInt: PropTypes.bigint,
  // optionalBool: PropTypes.bool,
  // optionalFunc: PropTypes.func,
  // optionalNumber: PropTypes.number,
  // optionalObject: PropTypes.object,
  // optionalString: PropTypes.string,
  // optionalSymbol: PropTypes.symbol,
};

export default TreeNode;
