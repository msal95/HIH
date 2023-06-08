import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import TreeNode from "./TreeNode";

function TreeView(props) {
  const { data, handleChange } = props;

  return (
    <ListGroup style={{ width: "100%" }}>
      {data.map((node) => (
        <ListGroupItem key={node.id}>
          <TreeNode node={node} handleChange={handleChange} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default TreeView;
