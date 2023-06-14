import React, { memo } from "react";
import { useState } from "react";
import { Copy, Edit2, Trash2 } from "react-feather";

import { Handle, NodeToolbar, Position, useNodeId } from "reactflow";
import FLowsBuilder from "../FlowsBuilder";
import { useDispatch, useSelector } from "react-redux";
import { addData, deleteData, onSelectNode } from "../store";

const style = {
  body: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    border: "0px solid #bbb",
    fontSize: "10pt",
    // borderRadius: "10px",
  },
  selected: {
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  title: {
    position: "relative",
    padding: "8px 32px",
    flexGrow: 1,
    // backgroundColor: "#eee",
    // borderRadius: "10px",
  },
  contentWrapper: {
    padding: "8px 0px",
  },
};

function CustomNode({ data, selected }) {
  console.log("🚀 ~ file: CustomNode.js:37 ~ CustomNode ~ data:", data);
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();

  const store = useSelector((state) => state.flowsBuilder);

  const handleOnMouseHover = () => {
    setIsHover(true);
  };

  const handleOnMouseLeave = () => {
    setIsHover(false);
  };

  const customTitle = { ...style.title };
  // customTitle.backgroundColor = "#08c9bd";

  const nodeId = useNodeId();

  const handleEdit = (nodeId) => {
    console.log("🚀 ~ file: CustomNode.js:47 ~ handleEdit ~ id:", nodeId);
    return null;
  };

  const handleDelete = async () => {
    // console.log("🚀 ~ file: CustomNode.js:51 ~ handleDelete ~ id:", nodeId);
    dispatch(deleteData(nodeId));
    return null;
  };

  const handleDuplicate = () => {
    const selectedData = store?.data?.filter((item) => item?.id === nodeId);

    const newData = selectedData.map((item) => {
      if (item.id) {
        return {
          ...item,
          id: `node-${store?.data?.length + 1}`,
          position: {
            x: (Math.random(0, 9) * window.innerWidth) / 3,
            y: (Math.random(0, 9) * window.innerHeight) / 3,
          },
          data: {
            label: `${item?.data?.label}(Copy)`,
            image: item?.data?.image,
            intgId: item?.data?.intgId,
            events: item?.data?.events,
          },
        };
      }
    });
    dispatch(addData(newData[0]));
  };

  const handleSelectedNode = () => {
    const selectedData = store?.data?.filter((item) => item?.id === nodeId);

    dispatch(onSelectNode(selectedData[0]));
  };

  return (
    <>
      <NodeToolbar
        isVisible={isHover}
        // position={data.toolbarPosition}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        // style={{ marginBottom: -10 }}
        style={{
          position: "absolute",
          top: "4%",
          display: "flex",
          padding: 5,
        }}
      >
        {/* <Edit2
          size={16}
          className="me-1  cursor-pointer"
          onClick={handleEdit}
        /> */}
        <Trash2
          size={16}
          className="me-1 cursor-pointer"
          onClick={handleDelete}
        />
        <Copy
          size={16}
          className="me-1 cursor-pointer"
          onClick={handleDuplicate}
        />
      </NodeToolbar>
      <div
        className="text-updater-node"
        onMouseEnter={handleOnMouseHover}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleSelectedNode}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            padding: 5,
            border: "1px solid #333",
          }}
        >
          <img
            src={data?.image}
            height={30}
            width={30}
            alt="Logo"
            // className="me-1"
          />
          <div style={customTitle}>{data?.label}</div>
        </div>
        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="target" position={Position.Left} id="a" />
      </div>
    </>
  );
}

export default memo(CustomNode);
