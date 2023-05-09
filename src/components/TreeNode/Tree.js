import React from "react";
import TreeNode from "./TreeNode";

const Tree = ({ data, onCreate, onRename, onDelete }) => {
  const renderTree = (nodes) =>
    nodes.map(({ label, children }) => (
      <TreeNode
        label={label}
        onCreate={onCreate}
        onRename={onRename}
        onDelete={onDelete}
      >
        {children && renderTree(children)}
      </TreeNode>
    ));

  return <div>{renderTree(data)}</div>;
};

export default Tree;
