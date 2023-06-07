import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FolderMinus,
  FolderPlus,
  Layers,
  Plus,
} from "react-feather";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import MoreVerticalDropdown from "../../components/MoreVerticalDropdown/MoreVerticalDropdown";
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
            width: "100%",
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
              color={selectedTab?.name === node?.name ? "#fff" : "#131313"}
              className="me-50 container__add-project-button-icon"
              onClick={() => {
                handleToggleCreateFolderModal(node);
              }}
            />
            <MoreVerticalDropdown
              handleEdit={() => handleEditProjectModal(node)}
              handleDelete={() => handleDeleteProject(node.id)}
              isView
              iconColor={selectedTab?.name === node?.name ? "#fff" : "#131313"}
            />
          </div>
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
              <MoreVerticalDropdown
                isView
                handleEdit={() => handleEditFolderModal(node)}
                handleDelete={() => handleDeleteFolder(node.id)}
                iconColor={
                  selectedTab?.name === node?.name ? "#fff" : "#131313"
                }
              />
            </div>
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
