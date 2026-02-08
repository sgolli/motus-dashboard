import { Node } from 'reactflow';
import { NodeData } from '../data/graph-data';

interface DetailSidebarProps {
  node: Node<NodeData>;
  onClose: () => void;
}

export function DetailSidebar({ node, onClose }: DetailSidebarProps) {
  const { data } = node;

  const typeLabels: Record<string, string> = {
    cron: '🔄 Cron Job',
    oneshot: '⏰ One-Shot Task',
    integration: '🔌 Integration',
    agent: '🤖 AI Agent',
    delivery: '📤 Delivery Channel',
  };

  const statusColors = {
    active: '#22c55e',
    scheduled: '#eab308',
    error: '#ef4444',
    idle: '#6b7280',
  };

  const statusLabels = {
    active: 'Active',
    scheduled: 'Scheduled',
    error: 'Error',
    idle: 'Idle',
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: '384px',
      background: '#161b22',
      borderLeft: '1px solid #30363d',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      zIndex: 50,
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#161b22',
        borderBottom: '1px solid #30363d',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>Node Details</h2>
        <button
          onClick={onClose}
          style={{
            color: '#8b949e',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'white')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#8b949e')}
        >
          <svg
            style={{ width: '24px', height: '24px' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{data.label}</h3>
          <div style={{ fontSize: '14px', color: '#8b949e' }}>
            {typeLabels[node.type || 'cron']}
          </div>
        </div>

        {/* Status */}
        {data.status && (
          <div style={{
            background: '#0d1117',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #30363d',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Status</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: statusColors[data.status] }}>
              {statusLabels[data.status]}
            </div>
          </div>
        )}

        {/* Model */}
        {data.model && (
          <div style={{
            background: '#0d1117',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #30363d',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Model</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{data.model}</div>
          </div>
        )}

        {/* Schedule */}
        {data.schedule && (
          <div style={{
            background: '#0d1117',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #30363d',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Schedule</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⏱</span>
              {data.schedule}
            </div>
          </div>
        )}

        {/* Last Run */}
        {data.lastRun && (
          <div style={{
            background: '#0d1117',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #30363d',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Last Run</div>
            <div style={{ fontSize: '14px', color: 'white' }}>
              {new Date(data.lastRun).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </div>
          </div>
        )}

        {/* Delivery */}
        {data.delivery && (
          <div style={{
            background: '#0d1117',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #30363d',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Delivery</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{data.delivery}</div>
          </div>
        )}

        {/* Description */}
        {data.description && (
          <div style={{
            background: '#0d1117',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #30363d',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Description</div>
            <div style={{ fontSize: '14px', color: '#c9d1d9', lineHeight: '1.6' }}>
              {data.description}
            </div>
          </div>
        )}

        {/* Node ID */}
        <div style={{
          background: '#0d1117',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #30363d'
        }}>
          <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Node ID</div>
          <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6b7280' }}>{node.id}</div>
        </div>
      </div>
    </div>
  );
}
