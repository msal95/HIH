// ** React Imports
import { useCallback, useEffect, useState } from "react";

// ** Local Imports
import "@styles/react/apps/app-email.scss";
import { useQuery } from "react-query";
import { getIntegrationsList, getProjectLists } from "../../../api/apiMethods";
import CustomModal from "../../components/CustomModal/CustomModal";
import "reactflow/dist/style.css";
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { Button } from "reactstrap";
import OffCanvas from "../components/offcanvas";
import CustomOffCanvas from "../../components/OffCanvas/OffCanvas";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const newNode = [
  {
    id: "3",
    position: { x: 50, y: 130 },
    data: { label: "3" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const FLowsBuilder = () => {
  // ** States
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [active, setActive] = useState("1");
  const [canvasPlacement, setCanvasPlacement] = useState("end");
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [integrationList, setIntegrationsList] = useState();

  const {
    isLoading: integrationLoader,
    data: integrationData,
    error: integrationError,
    // refetch: integrationRefetch,
    isFetching: integrationIsFetching,
    isError: integrationIsError,
  } = useQuery("integrationsList", () => getIntegrationsList());

  useEffect(() => {
    if (!!integrationData?.data?.data?.integration?.length) {
      setIntegrationsList(integrationData?.data?.data?.integration);
    }
  }, [integrationIsFetching]);

  const toggleCanvasEnd = () => {
    setCanvasPlacement("end");
    setCanvasOpen(!canvasOpen);
  };

  const toggleTabs = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  //   const [isLoader, setIsLoader] = useState(false);

  //   const { isLoading, data, error, refetch, isFetching, isError } = useQuery(
  //     "projectsList",
  //     () => getProjectLists()
  //   );
  const addNewNode = (params) => {
    console.log("🚀 ~ file: FlowsBuilder.js:83 ~ addNewNode ~ params:", params);
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "default",
      position: {
        x: (Math.random(0, 7) * window.innerWidth) / 3,
        y: (Math.random(0, 7) * window.innerHeight) / 3,
      },
      data: { label: `${params?.name}` },
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

  return (
    <div className="container-fluid overflow-auto">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h3 className="p-2">FLows Builder screen</h3>
        <Button block color="primary" onClick={toggleCanvasEnd}>
          Create First Node
        </Button>
      </div>

      {/* <div className="w-100 h-100 bg-gradient rounded-1"> */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Handle type="source" position="right" />
        <Handle type="target" position="left" />
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={2} />
      </ReactFlow>
      {/* </div> */}

      <CustomOffCanvas
        canvasOpen={canvasOpen}
        canvasPlacement={canvasPlacement}
        toggleCanvasEnd={toggleCanvasEnd}
        active={active}
        toggleTabs={toggleTabs}
        isLoading={integrationLoader}
        data={integrationList}
        error={integrationError}
        isError={integrationIsError}
        onAddNode={addNewNode}
      />
    </div>
  );
};

export default FLowsBuilder;
