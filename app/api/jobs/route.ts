import { NextResponse } from 'next/server';
import { Node, Edge } from 'reactflow';

interface NodeData {
  label: string;
  model?: string;
  schedule?: string;
  status?: 'active' | 'scheduled' | 'error' | 'idle';
  lastRun?: string;
  description?: string;
  delivery?: string;
}

interface CronJob {
  id: string;
  name: string;
  enabled: boolean;
  schedule: {
    kind: 'cron' | 'every' | 'at';
    expr?: string;
    everyMs?: number;
    date?: string;
  };
  sessionTarget: string;
  payload: {
    model?: string;
    message?: string;
  };
  delivery?: {
    mode: string;
    channel: string;
  };
  state: {
    lastStatus?: string;
    lastRunAtMs?: number;
  };
}

const COL = { integration: 0, cron: 350, agent: 700, oneshot: 700, delivery: 1050 };
const ROW = 160;

// Integration detection keywords
const INTEGRATIONS = {
  gmail: ['gmail', 'imap', 'golli.sabri'],
  m365: ['m365', 'graph', 'sophostc', 'info@sophostc'],
  amazon: ['amazon', 'amazon.ae'],
  coingecko: ['coingecko', 'crypto', 'cryptocurrency'],
  'brave-search': ['brave', 'web_search', 'search'],
  clawdhub: ['clawdhub', 'skill'],
  twilio: ['twilio', 'phone', 'call', 'voicemail'],
  weather: ['wttr', 'weather', 'forecast'],
};

function detectIntegrations(message: string): string[] {
  const lowerMsg = message.toLowerCase();
  const detected: string[] = [];
  
  for (const [integration, keywords] of Object.entries(INTEGRATIONS)) {
    if (keywords.some(keyword => lowerMsg.includes(keyword))) {
      detected.push(integration);
    }
  }
  
  return detected;
}

function formatSchedule(schedule: CronJob['schedule']): string {
  if (schedule.kind === 'cron') {
    return `Cron: ${schedule.expr}`;
  } else if (schedule.kind === 'every' && schedule.everyMs) {
    const minutes = schedule.everyMs / 60000;
    const hours = minutes / 60;
    if (minutes < 60) {
      return `Every ${minutes}min`;
    } else if (hours < 24) {
      return `Every ${hours}h`;
    } else {
      return `Every ${hours / 24}d`;
    }
  } else if (schedule.kind === 'at' && schedule.date) {
    return new Date(schedule.date).toLocaleString();
  }
  return 'Unknown';
}

function deriveStatus(job: CronJob): 'active' | 'scheduled' | 'error' | 'idle' {
  if (!job.enabled) return 'idle';
  if (job.schedule.kind === 'at') return 'scheduled';
  if (job.state.lastStatus === 'error') return 'error';
  return 'active';
}

export async function GET() {
  try {
    const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL || 'https://oc.sabrigolli.com';
    const gatewayToken = process.env.OPENCLAW_GATEWAY_TOKEN;

    if (!gatewayToken) {
      return NextResponse.json(
        { error: 'OPENCLAW_GATEWAY_TOKEN not configured' },
        { status: 500 }
      );
    }

    // Fetch cron jobs from OpenClaw gateway
    const response = await fetch(`${gatewayUrl}/tools/invoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gatewayToken}`,
      },
      body: JSON.stringify({
        tool: 'cron',
        action: 'list',
        args: {
          action: 'list',
          includeDisabled: false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gateway responded with ${response.status}`);
    }

    const data = await response.json();
    const jobs: CronJob[] = data.jobs || [];

    // Track which integrations are actually used
    const usedIntegrations = new Set<string>();
    
    // Separate cron jobs and one-shots
    const cronJobs = jobs.filter(j => j.schedule.kind !== 'at');
    const oneShots = jobs.filter(j => j.schedule.kind === 'at');

    // Detect integrations for all jobs
    jobs.forEach(job => {
      const integrations = detectIntegrations(job.payload.message || '');
      integrations.forEach(int => usedIntegrations.add(int));
    });

    const nodes: Node<NodeData>[] = [];
    const edges: Edge[] = [];

    // --- Static nodes: Agents ---
    nodes.push({
      id: 'motus',
      type: 'agent',
      position: { x: COL.agent, y: 0 },
      data: {
        label: 'Motus (Main Agent)',
        model: 'Opus',
        status: 'active',
        description: 'Primary AI agent orchestrating all automation tasks',
      },
    });

    nodes.push({
      id: 'subagents',
      type: 'agent',
      position: { x: COL.agent, y: ROW },
      data: {
        label: 'Sub-agents',
        model: 'Sonnet/Opus',
        status: 'idle',
        description: 'Spawned on-demand for specific tasks',
      },
    });

    // --- Static nodes: Delivery ---
    nodes.push({
      id: 'telegram',
      type: 'delivery',
      position: { x: COL.delivery, y: ROW * 3 },
      data: {
        label: 'Telegram (Sabri)',
        status: 'active',
        description: 'Primary delivery channel for all notifications',
      },
    });

    // --- Dynamic nodes: Integrations (only used ones) ---
    const integrationLabels: Record<string, string> = {
      gmail: 'Gmail',
      m365: 'M365 / SophoSTC',
      amazon: 'Amazon.ae',
      coingecko: 'CoinGecko',
      'brave-search': 'Brave Search',
      clawdhub: 'ClawdHub',
      twilio: 'Twilio Phone Agent',
      weather: 'Weather (wttr.in)',
    };

    const integrationDescriptions: Record<string, string> = {
      gmail: 'golli.sabri@gmail.com via IMAP + OAuth2',
      m365: 'info@sophostc.com via Graph API',
      amazon: 'Product search and price monitoring',
      coingecko: 'Cryptocurrency price data',
      'brave-search': 'Web search API',
      clawdhub: 'Skill repository and discovery',
      twilio: 'Phone call monitoring and voicemail',
      weather: 'Weather forecasts and conditions',
    };

    let integrationY = 0;
    usedIntegrations.forEach(intId => {
      nodes.push({
        id: intId,
        type: 'integration',
        position: { x: COL.integration, y: integrationY },
        data: {
          label: integrationLabels[intId] || intId,
          status: 'active',
          description: integrationDescriptions[intId] || '',
        },
      });
      integrationY += ROW;
    });

    // --- Dynamic nodes: Cron jobs ---
    cronJobs.forEach((job, index) => {
      const nodeId = job.id;
      
      nodes.push({
        id: nodeId,
        type: 'cron',
        position: { x: COL.cron, y: index * ROW },
        data: {
          label: job.name,
          model: job.payload.model || (job.sessionTarget === 'main' ? 'Main Session' : 'Sonnet'),
          schedule: formatSchedule(job.schedule),
          status: deriveStatus(job),
          lastRun: job.state.lastRunAtMs ? new Date(job.state.lastRunAtMs).toISOString() : undefined,
          description: job.payload.message?.substring(0, 100) || '',
          delivery: job.delivery ? `${job.delivery.mode} (${job.delivery.channel})` : undefined,
        },
      });

      // Edge: motus → cron job
      edges.push({
        id: `e-motus-${nodeId}`,
        source: 'motus',
        target: nodeId,
        animated: true,
      });

      // Edges: integrations → cron job
      const integrations = detectIntegrations(job.payload.message || '');
      integrations.forEach(intId => {
        edges.push({
          id: `e-${intId}-${nodeId}`,
          source: intId,
          target: nodeId,
          label: intId.replace('-', ' '),
        });
      });

      // Edge: cron job → telegram (if delivery exists)
      if (job.delivery) {
        edges.push({
          id: `e-${nodeId}-telegram`,
          source: nodeId,
          target: 'telegram',
          animated: true,
        });
      }
    });

    // --- Dynamic nodes: One-shots ---
    oneShots.forEach((job, index) => {
      const nodeId = job.id;
      const yPos = ROW * 3 + index * ROW; // Below agents
      
      nodes.push({
        id: nodeId,
        type: 'oneshot',
        position: { x: COL.oneshot, y: yPos },
        data: {
          label: job.name,
          model: job.payload.model || 'Sonnet',
          schedule: formatSchedule(job.schedule),
          status: deriveStatus(job),
          description: job.payload.message?.substring(0, 100) || '',
          delivery: job.delivery ? `${job.delivery.mode} (${job.delivery.channel})` : undefined,
        },
      });

      // Edge: motus → one-shot
      edges.push({
        id: `e-motus-${nodeId}`,
        source: 'motus',
        target: nodeId,
        animated: true,
      });

      // Edge: one-shot → telegram (if delivery exists)
      if (job.delivery) {
        edges.push({
          id: `e-${nodeId}-telegram`,
          source: nodeId,
          target: 'telegram',
          animated: true,
        });
      }
    });

    return NextResponse.json({ nodes, edges });

  } catch (error) {
    console.error('Error fetching cron jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cron jobs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
