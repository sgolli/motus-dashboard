'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  NodeTypes,
} from 'reactflow';
import { CronNode } from '../components/nodes/CronNode';
import { IntegrationNode } from '../components/nodes/IntegrationNode';
import { DeliveryNode } from '../components/nodes/DeliveryNode';
import { AgentNode } from '../components/nodes/AgentNode';
import { OneShotNode } from '../components/nodes/OneShotNode';
import { DetailSidebar } from '../components/DetailSidebar';
import { initialNodes, initialEdges } from '../data/graph-data';

const nodeTypes: NodeTypes = {
  cron: CronNode,
  integration: IntegrationNode,
  delivery: DeliveryNode,
  agent: AgentNode,
  oneshot: OneShotNode,
};

export default function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const closeSidebar = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#0d1117', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        height: '64px',
        borderBottom: '1px solid #30363d',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: '#161b22'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#eab308' }}>⚡</span>
          Motus Dashboard
        </h1>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <div className="animate-pulse" style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></div>
            <span style={{ color: '#8b949e' }}>All Systems Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          style={{ background: '#0d1117' }}
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#6e7681', strokeWidth: 2 },
          }}
        >
          <Background color="#30363d" gap={16} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case 'cron':
                  return '#3b82f6';
                case 'oneshot':
                  return '#eab308';
                case 'integration':
                  return '#22c55e';
                case 'agent':
                  return '#a855f7';
                case 'delivery':
                  return '#f97316';
                default:
                  return '#6e7681';
              }
            }}
          />
        </ReactFlow>

        {/* Detail Sidebar */}
        {selectedNode && (
          <DetailSidebar node={selectedNode} onClose={closeSidebar} />
        )}
      </div>
    </div>
  );
}
