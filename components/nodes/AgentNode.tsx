import { Handle, Position } from 'reactflow';
import { NodeData } from '../../data/graph-data';

interface AgentNodeProps {
  data: NodeData;
  selected?: boolean;
}

export function AgentNode({ data, selected }: AgentNodeProps) {
  const statusColors = {
    active: '#22c55e',
    scheduled: '#eab308',
    error: '#ef4444',
    idle: '#6b7280',
  };

  const modelColors: Record<string, string> = {
    'Opus': '#9333ea',
    'Sonnet/Opus': '#a855f7',
  };

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        border: selected ? '2px solid #a855f7' : '2px solid #6b21a8',
        background: '#161b22',
        minWidth: '220px',
        boxShadow: selected ? '0 10px 15px -3px rgba(168, 85, 247, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColors[data.status || 'idle'] }} />
            <h3 style={{ color: 'white', fontWeight: '600', fontSize: '14px', margin: 0 }}>{data.label}</h3>
          </div>
          {data.model && (
            <span
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: modelColors[data.model] || '#4b5563',
                color: 'white',
                display: 'inline-block'
              }}
            >
              {data.model}
            </span>
          )}
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#c084fc', marginTop: '4px' }}>
        🤖 AI Agent
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: '#a855f7' }} />
    </div>
  );
}
