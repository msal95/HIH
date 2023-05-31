import React from "react";
import { useState } from "react";
import { memo } from "react";
import { Handle, NodeResizer, NodeToolbar, Position } from "reactflow";

function ResizeableNode({ data }) {
  const [isHover, setIsHover] = useState(false);
  const handleOnMouseHover = () => {
    setIsHover(true);
  };

  const handleOnMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <>
      <NodeToolbar
        isVisible={isHover}
        position={data.toolbarPosition}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        // style={{ marginBottom: -10 }}
      >
        <button>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
      <div
        onMouseEnter={handleOnMouseHover}
        onMouseLeave={handleOnMouseLeave}
        // style={{ background: "red" }}
      >
        <NodeResizer
          minWidth={100}
          minHeight={30}
          //   style={{ marginTop: -12, background: "red" }}
        />
        <Handle type="target" position={Position.Left} />
        <div style={{ padding: 10 }}>{data.label}</div>
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}

export default memo(ResizeableNode);
