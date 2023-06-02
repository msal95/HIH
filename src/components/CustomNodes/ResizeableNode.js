import React from "react";
import { useState } from "react";
import { memo } from "react";
import { Copy, Edit2, Trash2 } from "react-feather";
import { Handle, NodeResizer, NodeToolbar, Position } from "reactflow";

function ResizeableNode({ data }) {
  console.log("🚀 ~ file: ResizeableNode.js:8 ~ ResizeableNode ~ data:", data);
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
        style={{
          position: "absolute",
          top: "3%",
          display: "flex",
          padding: 5,
        }}
      >
        <Edit2
          size={16}
          className="me-1  cursor-pointer"
          onClick={() => alert("Hellow World")}
        />
        <Trash2
          size={16}
          className="me-1 cursor-pointer"
          onClick={() => alert("Hellow World")}
        />
        <Copy
          size={16}
          className="me-1 cursor-pointer"
          onClick={() => alert("Hellow World")}
        />
        {/* <button>delete</button>
        <button>copy</button>
        <button>expand</button> */}
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
