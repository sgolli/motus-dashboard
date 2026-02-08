import { Handle, Position } from 'reactflow';
import { NodeData } from '../../data/graph-data';

interface IntegrationNodeProps {
  data: NodeData;
  selected?: boolean;
}

export function IntegrationNode({ data, selected }: IntegrationNodeProps) {
  const statusColors = {
    active: '#22c55e',
    scheduled: '#eab308',
    error: '#ef4444',
    idle: '#6b7280',
  };

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        border: selected ? '2px solid #22c55e' : '2px solid #166534',
        background: '#161b22',
        minWidth: '180px',
        boxShadow: selected ? '0 10px 15px -3px rgba(34, 197, 94, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColors[data.status || 'idle'] }} />
        <h3 style={{ color: 'white', fontWeight: '600', fontSize: '14px', margin: 0 }}>{data.label}</h3>
      </div>
      
      <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>
        🔌 Integration
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#22c55e' }} />
    </div>
  );
}
