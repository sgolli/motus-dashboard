import { Handle, Position } from 'reactflow';
import { NodeData } from '../../data/graph-data';

interface DeliveryNodeProps {
  data: NodeData;
  selected?: boolean;
}

export function DeliveryNode({ data, selected }: DeliveryNodeProps) {
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
        border: selected ? '2px solid #f97316' : '2px solid #9a3412',
        background: '#161b22',
        minWidth: '200px',
        boxShadow: selected ? '0 10px 15px -3px rgba(249, 115, 22, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s'
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: '#f97316' }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColors[data.status || 'idle'] }} />
        <h3 style={{ color: 'white', fontWeight: '600', fontSize: '14px', margin: 0 }}>{data.label}</h3>
      </div>
      
      <div style={{ fontSize: '12px', color: '#fb923c', marginTop: '4px' }}>
        📤 Delivery Channel
      </div>
    </div>
  );
}
