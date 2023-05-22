import React, { Fragment, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './overview.css';
import { Button, Col, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from 'reactstrap';
import Navbar from './layouts/Navbar';
import FloatingButton from './components/FloatingButton';
import SimpleModal from './components/modals/SimpleModal';
import OffCanvas from './components/modals/OffCanvas';
import classnames from 'classnames'

// ** Third Party Components
import Prism from 'prismjs'


// ** Custom Components
import Card from '@components/card-snippet'
import BreadCrumbs from '@components/breadcrumbs'
import Tabs from './components/Tabs';

// ** Source Code
// import { offCanvasPlacement, offCanvasOptions } from './OffCanvasSourceCode'

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const Engine = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    // we are using a bit of a shortcut here to adjust the edge type
    // this could also be done with a custom edge for example
    const edgesWithUpdatedTypes = edges.map((edge) => {
      if (edge.sourceHandle) {
        const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
        edge.type = edgeType;
      }

      return edge;
    });

    // components code

    const [canvasPlacement, setCanvasPlacement] = useState('start')
    const [canvasOpen, setCanvasOpen] = useState(false)

    const toggleCanvasStart = () => {
      setCanvasPlacement('start')
      setCanvasOpen(!canvasOpen)
    }

    const toggleCanvasEnd = () => {
      setCanvasPlacement('end')
      setCanvasOpen(!canvasOpen)
    }

  return (
    <Fragment>
        <Navbar/>
    <div class="position-fixed fixed-top fixed-end p-3" style={{marginTop: "2rem", paddingTop: "4.7rem !important", right: "0 !important", left: "93.7%"}} onClick={toggleCanvasEnd}> <button type="button" class="btn btn-icon btn-lg btn-outline-secondary sidebar-btn" tabindex="0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddNode" > + </button> </div>

        {/* <FloatingButton toggleCanvasEnd={toggleCanvasEnd}/> */}
        <SimpleModal/>
        <OffCanvas/>
        <div className='demo-inline-spacing'>
      <Offcanvas direction={canvasPlacement} isOpen={canvasOpen} toggle={toggleCanvasStart}>
        <OffcanvasHeader toggle={toggleCanvasStart}>OffCanvas {canvasPlacement}</OffcanvasHeader>
        <OffcanvasBody
          className={classnames({
            'my-auto mx-0 flex-grow-0': canvasPlacement === 'start' || canvasPlacement === 'end'
          })}
        >
          <p
            className={classnames({
              'text-center': canvasPlacement === 'start' || canvasPlacement === 'end'
            })}
          >
            <Tabs/>
            </p>
          <Button
            color='primary'
            onClick={toggleCanvasStart}
            className={classnames({
              'mb-1': canvasPlacement === 'start' || canvasPlacement === 'end',
              'me-1': canvasPlacement === 'top' || canvasPlacement === 'bottom'
            })}
            {...(canvasPlacement === 'start' || canvasPlacement === 'end' ? { block: true } : {})}
          >
            Continue
          </Button>
          <Button
            outline
            color='secondary'
            onClick={toggleCanvasStart}
            {...(canvasPlacement === 'start' || canvasPlacement === 'end' ? { block: true } : {})}
          >
            Cancel
          </Button>
        </OffcanvasBody>
      </Offcanvas>
    </div>
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edgesWithUpdatedTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
                >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
  </Fragment>
  );
};

export default Engine;
