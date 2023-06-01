// ** React Imports
import { useCallback, useEffect, useRef, useState } from "react";

// ** Local Imports
import "@styles/react/apps/app-email.scss";
import { Pause, Play } from "react-feather";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import { createWorkflowEngine } from "../../../api/apiMethods";
import CustomOffCanvas from "../../components/OffCanvas/OffCanvas";
import CustomNode from "./components/CustomNode";

const nodeTypes = {
  node: CustomNode,
};

import { useGetIntegration } from "../../../api/config/integrationQueries";
import CustomModal from "../../components/CustomModal/CustomModal";

const FLowsBuilder = () => {
  // ** States
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [active, setActive] = useState("1");
  const [canvasPlacement, setCanvasPlacement] = useState("end");
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [flowsJson, setFlowsJson] = useState(null);
  const [isOutput, setIsOutput] = useState(false);
  const [edgeOptions, setEdgeOptions] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  console.log(
    "🚀 ~ file: FlowsBuilder.js:173 ~ FLowsBuilder ~ selectedNode:",
    selectedNode?.data?.events[0]?.params?.events
    // selectedNode
  );
  const [isSelected, setIsSelected] = useState(false);

  const integrationQuery = useGetIntegration();
  const [integration, setIntegration] = useState([]);

  useEffect(() => {
    if (integrationQuery.isFetched && integrationQuery.data) {
      setIntegration(integrationQuery.data);
    }
  }, [integrationQuery.isFetching]);

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const { state } = useLocation();

  const onClickDiscardModal = () => {
    setShow(false);
    // setIsActiveMainFolder(false);
    // setIsActiveSubFolder(false);
  };

  const handleToggleModal = () => {
    setShow((prevState) => !prevState);
  };

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) {
        // console.log("If condition");
        setShow(true);
        return true;
      }
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
      setShow(true);
      // handleToggleModal();
    } else {
      console.log("Else Case");
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);

  useEffect(() => {
    setEdgeOptions({
      animated: isOutput ? isOutput : false,
      style: {
        stroke: "green",
      },
    });
  }, [isOutput]);

  const toggleCanvasEnd = () => {
    setCanvasPlacement("end");
    setCanvasOpen(!canvasOpen);
  };

  const toggleTabs = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleOutputOfNodes = () => {
    setIsOutput((prevState) => !prevState);
  };

  const addNewNode = (params) => {
    const newNode = {
      id: `node-${params?.id}`,
      type: "node",
      position: {
        x: (Math.random(0, 7) * window.innerWidth) / 3,
        y: (Math.random(0, 7) * window.innerHeight) / 3,
      },
      data: {
        label: `${params?.name}`,
        image: params?.image,
        events: [
          {
            intgId: params?.id,
            eventId: 12,
            form_builder_id: 12,
            form_submission_id: 12,
            params,
          },
        ],
      },
    };
    toggleCanvasEnd();

    setNodes((prevElements) => [...prevElements, newNode]);
  };

  const onConnect = (params) => {
    const { source, target } = params;
    const newEdge = {
      id: `edge-${edges.length + 1}`,
      source,
      target,
      // type: "smoothstep",
    };

    setEdges((prevElements) => [...prevElements, newEdge]);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const handleOnSave = async () => {
    const json = JSON.stringify({ nodes, edges }, null, 2);

    setIsLoader(true);
    try {
      const wrokflowData = {
        name: state?.name,
        workflow_id: state?.id,
        nodesEdgesJson: json,
      };
      await createWorkflowEngine(wrokflowData).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsLoader(false);
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.error);
      setIsLoader(false);
    }

    setFlowsJson(json);
  };

  const connectionLineStyle = { stroke: "red" };

  return (
    <div className="container-fluid overflow-auto">
      <Card className="w-100 h-100">
        <CardHeader className="d-flex justify-content-between align-items-center mb-1">
          <div className="col-md-6">
            <h3 className="p-2">FLows Builder</h3>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            {!isOutput ? (
              <Play
                size={22}
                className="me-1 cursor-pointer"
                onClick={handleOutputOfNodes}
              />
            ) : (
              <Pause
                size={22}
                className="me-1 cursor-pointer"
                onClick={handleOutputOfNodes}
              />
            )}
            <div style={{ width: "12rem" }}>
              <Button block color="primary" onClick={toggleCanvasEnd}>
                Create Node
              </Button>
            </div>
            <div className="ms-1" style={{ width: "8rem" }}>
              <Button block color="primary" onClick={handleOnSave}>
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        {isLoader && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner type="grow" color="primary" />
          </div>
        )}
        <CardBody>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineStyle={connectionLineStyle}
            defaultEdgeOptions={edgeOptions}
            minZoom={0.2}
            maxZoom={4}
            nodeTypes={nodeTypes}
            onInit={onInit}
            // onDrop={onDrop}
            // onDragOver={onDragOver}
          >
            <MiniMap />
            <Controls />
            <Background variant="dots" gap={12} size={2} />
          </ReactFlow>
          {/* <CustomNodes /> */}
        </CardBody>

        <CustomOffCanvas
          canvasOpen={canvasOpen}
          canvasPlacement={canvasPlacement}
          toggleCanvasEnd={toggleCanvasEnd}
          active={active}
          toggleTabs={toggleTabs}
          isLoading={integrationQuery?.isLoading}
          data={integration}
          error={integrationQuery?.error}
          isError={integrationQuery?.isError}
          onAddNode={addNewNode}
        />
      </Card>
      <CustomModal
        toggleModal={handleToggleModal}
        onDiscard={onClickDiscardModal}
        show={show}
        // modalClass={isWorkFLow ? "modal-fullscreen" : "modal-lg"}
      >
        <div className="p-1">
          <h3>Hello WOrld</h3>
          <div className="container row">
            {selectedNode?.id}
            {selectedNode?.data?.events[0]?.params?.events?.map((event) => {
              console.log(
                "🚀 ~ file: FlowsBuilder.js:278 ~ {selectedNode?.params?.events?.map ~ event:",
                event
              );
              return <div className="col-md-4">{event.name}</div>;
            })}
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default FLowsBuilder;
