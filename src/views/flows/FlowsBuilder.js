// ** React Imports
import { useCallback, useEffect, useState } from "react";

// ** Local Imports
import "@styles/react/apps/app-email.scss";
import { Pause, Play } from "react-feather";
import { useQuery } from "react-query";
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  ReactFlow,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import {
  createWorkflowEngine,
  getIntegrationsList,
} from "../../../api/apiMethods";
import CustomOffCanvas from "../../components/OffCanvas/OffCanvas";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CustomNodes } from "../../components/CustomNodes";

const nodesEdgesJson = {
  nodes: [
    {
      id: "node-1",
      type: "default",
      position: {
        x: 589.3596767929886,
        y: 258.9307334449153,
      },
      data: {
        label: "Twitter",
      },
      width: 150,
      height: 39,
      selected: false,
      positionAbsolute: {
        x: 589.3596767929886,
        y: 258.9307334449153,
      },
      dragging: false,
    },
    {
      id: "node-2",
      type: "default",
      position: {
        x: 116.99595780215276,
        y: 263.1157637896678,
      },
      data: {
        label: "Gmail",
      },
      width: 150,
      height: 39,
    },
    {
      id: "node-3",
      type: "default",
      position: {
        x: 181.86291193635492,
        y: 41.26602348954947,
      },
      data: {
        label: "SendGrid",
      },
      width: 150,
      height: 39,
      selected: false,
      positionAbsolute: {
        x: 181.86291193635492,
        y: 41.26602348954947,
      },
      dragging: false,
    },
    {
      id: "node-4",
      type: "default",
      position: {
        x: 396.7521655186009,
        y: 162.94417412706343,
      },
      data: {
        label: "dadadsa",
      },
      width: 150,
      height: 39,
      selected: false,
      positionAbsolute: {
        x: 396.7521655186009,
        y: 162.94417412706343,
      },
      dragging: false,
    },
  ],
  edges: [
    {
      id: "edge-1",
      source: "node-3",
      target: "node-4",
    },
    {
      id: "edge-2",
      source: "node-4",
      target: "node-2",
    },
    {
      id: "edge-3",

      source: "node-4",
      target: "node-1",
    },
  ],
};

const FLowsBuilder = () => {
  // ** States
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [active, setActive] = useState("1");
  const [canvasPlacement, setCanvasPlacement] = useState("end");
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [integrationList, setIntegrationsList] = useState();
  const [flowsJson, setFlowsJson] = useState(null);
  console.log(
    "🚀 ~ file: FlowsBuilder.js:129 ~ FLowsBuilder ~ flowsJson:",
    flowsJson
  );
  const [isOutput, setIsOutput] = useState(false);
  const [edgeOptions, setEdgeOptions] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const { state } = useLocation();

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

  useEffect(() => {
    // if (Object.values(nodesEdgesJson)?.length) {
    //   setNodes(nodesEdgesJson.nodes);
    //   setEdges(nodesEdgesJson.edges);
    // }
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

  //   const [isLoader, setIsLoader] = useState(false);

  //   const { isLoading, data, error, refetch, isFetching, isError } = useQuery(
  //     "projectsList",
  //     () => getProjectLists()
  //   );
  const addNewNode = (params) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "default",
      position: {
        x: (Math.random(0, 7) * window.innerWidth) / 3,
        y: (Math.random(0, 7) * window.innerHeight) / 3,
      },
      data: { label: `${params?.name}`, image: params?.image },
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
          {/* <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineStyle={connectionLineStyle}
            defaultEdgeOptions={edgeOptions}
            minZoom={0.2}
            maxZoom={4}
          >
            <Handle type="source" position="right" />
            <Handle type="target" position="left" />

            <MiniMap />
            <Controls />
            <Background variant="dots" gap={12} size={2} />
          </ReactFlow> */}
          <CustomNodes />
        </CardBody>

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
      </Card>
    </div>
  );
};

export default FLowsBuilder;
