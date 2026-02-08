import { Handle, Position } from 'reactflow';
import { NodeData } from '../../data/graph-data';

interface CronNodeProps {
  data: NodeData;
  selected?: boolean;
}

export function CronNode({ data, selected }: CronNodeProps) {
  const statusColors = {
    active: '#22c55e',
    scheduled: '#eab308',
    error: '#ef4444',
    idle: '#6b7280',
  };

  const modelColors: Record<string, string> = {
    'Opus': '#9333ea',
    'Sonnet': '#3b82f6',
    'Main Session': '#6366f1',
  };

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        border: selected ? '2px solid #3b82f6' : '2px solid #1e3a8a',
        background: '#161b22',
        minWidth: '220px',
        boxShadow: selected ? '0 10px 15px -3px rgba(59, 130, 246, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s'
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: '#3b82f6' }} />
      
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

      <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '8px' }}>
        {data.schedule && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#3b82f6' }}>⏱</span>
            <span>{data.schedule}</span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#3b82f6' }} />
    </div>
  );
}
