// ** React Imports
import { useCallback, useEffect, useState } from "react";

// ** Local Imports
import "@styles/react/apps/app-email.scss";
import { Copy, Pause, Play } from "react-feather";
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
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  useNodeId,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import {
  createWorkflowEngine,
  generateWebhook,
  runWorkflowEngine,
} from "../../../api/apiMethods";
import CustomOffCanvas from "../../components/OffCanvas/OffCanvas";
import CustomNode from "./components/CustomNode";

const nodeTypes = {
  node: CustomNode,
};

import { useGetIntegration } from "../../../api/config/integrationQueries";
import CustomModal from "../../components/CustomModal/CustomModal";
import Divider from "../../components/Divider/Divider";
import ViewFormRender from "../builder/ViewFormRender";
import { useDispatch, useSelector } from "react-redux";
import { addData, addNewEdges, discardSelectedItem } from "./store";
import CopyToClipboard from "react-copy-to-clipboard";
import webhook from "@src/assets/images/icons/Webhook.png";

const FLowsBuilder = () => {
  const { state } = useLocation();
  // const locationData = !!state ? JSON.parse(state?.nodes) : {};

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [active, setActive] = useState("1");
  const [canvasPlacement, setCanvasPlacement] = useState("end");
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [flowsJson, setFlowsJson] = useState(null);
  console.log(
    "🚀 ~ file: FlowsBuilder.js:54 ~ FLowsBuilder ~ flowsJson:",
    flowsJson
  );
  const [isOutput, setIsOutput] = useState(false);
  const [edgeOptions, setEdgeOptions] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [show, setShow] = useState(false);
  // const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelectedEvent, setIsSelectedEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submittedEventResponse, setSubmittedEventResponse] = useState(null);
  const [isSaveResponse, setIsSaveResponse] = useState(false);
  const [isGenerateWebHook, setIsGenerateWebHook] = useState(false);
  const integrationQuery = useGetIntegration();
  const [integration, setIntegration] = useState([]);
  const [formJson, setSelectedFormJson] = useState(null);
  const [updatedNode, setUpdatedNode] = useState([]);
  const [generatedWebhookUrl, setGeneratedWebhookUrl] =
    useState("zfvhbzfjvbhzkjhbzj");

  useEffect(() => {
    if (submittedEventResponse !== null) {
      const selectedNodeFiltered = nodes?.filter(
        (node) => node?.id === submittedEventResponse?.selectedNode_id
      );
      const selectedNodeIndex = nodes?.findIndex(
        (node) => node?.id === submittedEventResponse?.selectedNode_id
      );
      const events = {
        intgId: submittedEventResponse?.intgId,
        eventId: submittedEventResponse?.eventId,
        form_builder_id: submittedEventResponse?.form_builder_id,
        form_submitted_id: submittedEventResponse?.id,
      };

      const updatedData = selectedNodeFiltered.map((obj) => {
        const { events, ...rest } = obj.data;
        return { ...obj, data: { ...rest } };
      });

      const newNode = { ...updatedData[0], ...{ events } };

      setUpdatedNode((prevData) => {
        const updatedData = [...prevData];
        updatedData[selectedNodeIndex] = newNode;
        return updatedData;
      });

      setShow(false);
      setSelectedNode(null);
      // setSubmittedEventResponse(null);
    }
  }, [submittedEventResponse]);

  // const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.flowsBuilder);

  const { selectedItem } = store;

  // useEffect(() => {
  //   if (!!Object?.keys(JSON.parse(state?.nodes))?.length) {
  //     console.log(
  //       "🚀 ~ file: FlowsBuilder.js:119 ~ useEffect ~ !!Object?.keys(JSON.parse(state?.nodes))?.length:",
  //       !!Object?.keys(JSON.parse(state?.nodes))?.length
  //     );
  //     // setNodes(locationNodes);
  //     // setEdges(locationEdges);

  //     dispatch(addData(state?.nodes?.nodes));

  //     dispatch(addNewEdges(state?.nodes?.edges));
  //   }
  // }, [state]);

  useEffect(() => {
    if (integrationQuery.isFetched && integrationQuery.data) {
      setIntegration(integrationQuery.data);
    }
  }, [integrationQuery.isFetching]);

  const onClickDiscardModal = () => {
    setShow(false);
    // setIsSelected(false);
    setSelectedNode(null);
    setIsSelectedEvent(false);
    setSelectedEvent(null);
    dispatch(discardSelectedItem());
  };

  const handleToggleModal = () => {
    setShow((prevState) => !prevState);
  };

  useEffect(() => {
    if (Object.keys(selectedItem)?.length) {
      setSelectedNode(selectedItem);
      // setIsSelected(true);
      setShow(true);
    } else {
      setSelectedNode(null);
      // setIsSelected(false);
      setShow(false);
    }
  }, [selectedItem]);

  useEffect(() => {
    setEdgeOptions({
      animated: isOutput ? isOutput : false,
      style: {
        stroke: "green",
      },
    });
  }, [isOutput]);

  useEffect(() => {
    if (store?.data?.length) {
      setNodes(store?.data);
      setEdges(store?.edges);
    } else {
      setNodes(
        // locationData?.updatedNode?.length ? locationData?.updatedNode :
        []
      );
      setEdges(
        // locationData?.edges?.length ? locationData?.edges :
        []
      );
    }
  }, [store?.data]);

  // const onNodesDelete = useCallback(
  //   (deleted) => {
  //     setEdges(
  //       deleted.reduce((acc, node) => {
  //         const incomers = getIncomers(node, nodes, edges);
  //         const outgoers = getOutgoers(node, nodes, edges);
  //         const connectedEdges = getConnectedEdges([node], edges);

  //         const remainingEdges = acc.filter(
  //           (edge) => !connectedEdges.includes(edge)
  //         );

  //         const createdEdges = incomers.flatMap(({ id: source }) =>
  //           outgoers.map(({ id: target }) => ({
  //             id: `${source}->${target}`,
  //             source,
  //             target,
  //           }))
  //         );

  //         return [...remainingEdges, ...createdEdges];
  //       }, edges)
  //     );
  //   },
  //   [nodes, edges]
  // );

  const toggleCanvasEnd = () => {
    setCanvasPlacement("end");
    setCanvasOpen(!canvasOpen);
  };

  const toggleTabs = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    const newNode = {
      id: `node-${nodes?.length + 1}`,
      type: "input",
      position: {
        x: (Math.random(0, 7) * window.innerWidth) / 3,
        y: (Math.random(0, 7) * window.innerHeight) / 3,
      },
      sourcePosition: "right",
      data: {
        label: `Webhook`,
        image: webhook,
      },
      events: [],
    };

    dispatch(addData(newNode));

    setUpdatedNode((prevElements) => [...prevElements, newNode]);
  }, []);

  // const handleOutputOfNodes = () => {
  //   setIsOutput((prevState) => !prevState);
  // };

  const addNewNode = (params) => {
    const newNode = {
      id: `node-${nodes?.length + 1}`,
      type: "node",
      position: {
        x: (Math.random(0, 7) * window.innerWidth) / 3,
        y: (Math.random(0, 7) * window.innerHeight) / 3,
      },
      data: {
        label: `${params?.name}`,
        image: params?.image,
        intgId: params?.id,
        events: params?.events,
      },
    };

    toggleCanvasEnd();

    dispatch(addData(newNode));

    setNodes((prevElements) => [...prevElements, newNode]);
    setUpdatedNode((prevElements) => [...prevElements, newNode]);
  };

  const handleCopyUrl = () => {
    toast.success(() => (
      <div className="d-flex">
        <div className="d-flex flex-column">
          <h6 className="toast-title">Webhook URL Copied! 📋</h6>
          <span role="img" aria-label="toast-text">
            {generatedWebhookUrl}
          </span>
        </div>
      </div>
    ));
  };

  const onConnect = (params) => {
    const { source, target } = params;
    const newEdge = {
      id: `edge-${edges.length + 1}`,
      source,
      target,
      // type: "smoothstep",
    };

    dispatch(addNewEdges(newEdge));

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

  const handleEventsForm = (data) => {
    setIsSelectedEvent(true);
    setShow(true);
    setSelectedEvent(data);
    setSelectedFormJson(data?.bpmn_form?.json);
  };

  const handleEventsData = () => {
    const selectedId = updatedNode?.filter(
      (item) => item?.id === selectedNode?.id
    );

    let submittedFormId;

    if (!!selectedId[0]?.events) {
      submittedFormId = selectedId[0]?.events?.form_submitted_id;
    } else {
      submittedFormId = null;
    }

    return (
      <div>
        <h5>Selected Events Data</h5>
        <ViewFormRender
          form={formJson}
          selectedEvent={selectedEvent?.bpmn_form}
          submission_id={submittedFormId ?? null}
          setSubmittedEventResponse={setSubmittedEventResponse}
          onClickDiscardModal={onClickDiscardModal}
          selectedNode={selectedNode}
          setIsLoader={setIsLoader}
        />
      </div>
    );
  };

  // const onDragOver = (event) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // };

  // const onDrop = (event) => {
  //   console.log("🚀 ~ file: FlowsBuilder.js:241 ~ onDrop ~ event:", event);
  //   event.preventDefault();
  //   const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

  //   const type = event.dataTransfer.getData("application/reactflow");
  //   console.log("🚀 ~ file: FlowsBuilder.js:245 ~ onDrop ~ type:", type);
  //   const label = event.dataTransfer.getData("label");
  //   console.log("🚀 ~ file: FlowsBuilder.js:246 ~ onDrop ~ label:", label);
  //   console.log(reactFlowInstance, "reactIns");
  //   const position = reactFlowInstance.project({
  //     x: event.clientX - reactFlowBounds.left,
  //     y: event.clientY - reactFlowBounds.top,
  //   });
  //   const newNode = {
  //     id: getId(),
  //     type,
  //     position,
  //     data: { heading: "Send Message", content: label },
  //   };
  //   setNodes((es) => es.concat(newNode));
  //   setSelectedNode(newNode.id);
  // };

  const handleOnSave = async () => {
    const json = JSON.stringify({ updatedNode, edges }, null, 2);

    setIsLoader(true);
    try {
      const wrokflowData = {
        name: state?.name,
        workflow_id: state?.id,
        nodesEdgesJson: json,
      };
      await createWorkflowEngine(wrokflowData).then((res) => {
        if (res.data?.response === 200) {
          toast.success(res.data.message);
          setIsSaveResponse(true);
          setIsLoader(false);
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.error);
      setIsLoader(false);
    }

    setFlowsJson(json);
  };

  const handleRunWorkflow = async () => {
    setIsLoader(true);
    try {
      const workflowData = {
        workflow_id: state?.id,
      };
      await runWorkflowEngine(workflowData).then((res) => {
        console.log(
          "🚀 ~ file: FlowsBuilder.js:385 ~ awaitrunWorkflowEngine ~ res:",
          res
        );
        if (res.status === 200) {
          toast.success("Workflow started Successfully.");
          setIsLoader(false);
        } else {
          toast.error(res.data.message);
          setIsLoader(false);
        }
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:342 ~ handleCreateProject ~ error:",
        error
      );
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };
  const handleGenerateWebHook = async () => {
    setIsLoader(true);
    try {
      const workflowData = {
        workflow_id: state?.id,
      };
      await generateWebhook(workflowData).then((res) => {
        if (res.data.response === 200) {
          toast.success(res.data.message);
          setGeneratedWebhookUrl(res?.data.data);
          setIsGenerateWebHook(true);
          setIsLoader(false);
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:342 ~ handleCreateProject ~ error:",
        error
      );
      toast.error(error?.data?.message);
      setIsLoader(false);
    }
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
            {isSaveResponse && (
              <>
                {!isOutput ? (
                  <Play
                    size={22}
                    className="me-1 cursor-pointer"
                    onClick={handleRunWorkflow}
                  />
                ) : (
                  <Pause
                    size={22}
                    className="me-1 cursor-pointer"
                    onClick={handleRunWorkflow}
                  />
                )}
                {isGenerateWebHook ? (
                  <div
                    style={{ width: "12rem" }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Generated URL"
                  >
                    <CopyToClipboard
                      text={generatedWebhookUrl}
                      className="cursor-pointer"
                    >
                      <Copy size={16} onClick={handleCopyUrl} />
                    </CopyToClipboard>
                  </div>
                ) : (
                  <div className="me-1" style={{ width: "14rem" }}>
                    <Button
                      block
                      color="primary"
                      onClick={handleGenerateWebHook}
                    >
                      Generate Webhook
                    </Button>
                  </div>
                )}
              </>
            )}
            <div className="me-1" style={{ width: "12rem" }}>
              <Button block color="primary" onClick={toggleCanvasEnd}>
                Create Node
              </Button>
            </div>
            <div style={{ width: "8rem" }}>
              <Button
                block
                color="primary"
                disabled={isSaveResponse}
                onClick={handleOnSave}
              >
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
          >
            <MiniMap />
            <Controls />
            <Background variant="dots" gap={12} size={2} />
          </ReactFlow>
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
        modalClass={"modal-lg"}
      >
        <div className="p-1">
          {/* <h3>Hello WOrld</h3> */}
          {!isSelectedEvent ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <Button outline color="primary" onClick={onClickDiscardModal}>
                  Go Back
                </Button>
                <h3>Integration: {selectedNode?.data?.label}</h3>
              </div>
              <Divider />
              <div className="container row">
                {!selectedNode?.data?.events?.length && (
                  <h3 className="d-flex align-items-center justify-content-center p-2">
                    No Events Available for this integration
                  </h3>
                )}
                {selectedNode?.data?.events?.map((event) => {
                  return (
                    <div className="col-md-4" key={event.id}>
                      <h5
                        onClick={() => handleEventsForm(event)}
                        className="cursor-pointer border-bottom-1 border-secondary"
                      >
                        {event.name}
                      </h5>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            handleEventsData()
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default FLowsBuilder;
