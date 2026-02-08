import { Node, Edge } from 'reactflow';

export interface NodeData {
  label: string;
  model?: string;
  schedule?: string;
  status?: 'active' | 'scheduled' | 'error' | 'idle';
  lastRun?: string;
  description?: string;
  delivery?: string;
}

// Layout: 5 vertical columns
// Col 1 (x=0):   Integrations (green)
// Col 2 (x=300):  Cron Jobs (blue)
// Col 3 (x=600):  Agents (purple)
// Col 4 (x=600):  One-shots (orange) — below agents
// Col 5 (x=900):  Delivery (pink)

const COL = { integration: 0, cron: 300, agent: 600, oneshot: 600, delivery: 900 };
const ROW = 140; // vertical spacing

export const initialNodes: Node<NodeData>[] = [
  // ── Column 3: Agents (purple) ──
  {
    id: 'motus',
    type: 'agent',
    position: { x: COL.agent, y: 0 },
    data: {
      label: 'Motus (Main Agent)',
      model: 'Opus',
      status: 'active',
      description: 'Primary AI agent orchestrating all automation tasks',
    },
  },
  {
    id: 'subagents',
    type: 'agent',
    position: { x: COL.agent, y: ROW },
    data: {
      label: 'Sub-agents',
      model: 'Sonnet/Opus',
      status: 'idle',
      description: 'Spawned on-demand for specific tasks',
    },
  },

  // ── Column 2: Cron Jobs (blue) — vertical stack ──
  {
    id: 'morning-brief',
    type: 'cron',
    position: { x: COL.cron, y: 0 },
    data: {
      label: 'Morning Brief',
      model: 'Sonnet',
      schedule: 'Daily 09:00 Dubai',
      status: 'active',
      lastRun: '2026-02-08T09:00:00Z',
      description: 'Daily morning summary with weather, crypto, and news',
      delivery: 'Telegram',
    },
  },
  {
    id: 'email-triage',
    type: 'cron',
    position: { x: COL.cron, y: ROW },
    data: {
      label: 'Email Triage',
      model: 'Sonnet',
      schedule: 'Every 15min',
      status: 'active',
      lastRun: '2026-02-08T12:31:35Z',
      description: 'Checks Gmail + M365 for urgent emails',
      delivery: 'Telegram (urgent only)',
    },
  },
  {
    id: 'newsletter-audit',
    type: 'cron',
    position: { x: COL.cron, y: ROW * 2 },
    data: {
      label: 'Newsletter Audit',
      model: 'Sonnet',
      schedule: 'Daily 07:00 Dubai',
      status: 'active',
      lastRun: '2026-02-08T07:00:00Z',
      description: 'Identifies and reports newsletter subscriptions',
      delivery: 'Telegram',
    },
  },
  {
    id: 'skill-discovery',
    type: 'cron',
    position: { x: COL.cron, y: ROW * 3 },
    data: {
      label: 'Skill Discovery',
      model: 'Sonnet',
      schedule: 'Daily 10:00 Dubai',
      status: 'active',
      lastRun: '2026-02-08T10:00:00Z',
      description: 'Discovers new ClawdHub skills',
      delivery: 'Telegram',
    },
  },
  {
    id: 'amazon-scout',
    type: 'cron',
    position: { x: COL.cron, y: ROW * 4 },
    data: {
      label: 'Amazon Toy Scout',
      model: 'Sonnet',
      schedule: 'Daily 12:00 Dubai',
      status: 'active',
      lastRun: '2026-02-08T12:00:00Z',
      description: 'Searches Amazon.ae for discounted toys',
      delivery: 'Telegram',
    },
  },
  {
    id: 'phone-monitor',
    type: 'cron',
    position: { x: COL.cron, y: ROW * 5 },
    data: {
      label: 'Phone Call Monitor',
      model: 'Sonnet',
      schedule: 'Hourly',
      status: 'active',
      lastRun: '2026-02-08T12:00:00Z',
      description: 'Monitors Twilio for missed calls and voicemails',
      delivery: 'Telegram',
    },
  },
  {
    id: 'proactive-check',
    type: 'cron',
    position: { x: COL.cron, y: ROW * 6 },
    data: {
      label: 'Proactive Check',
      model: 'Main Session',
      schedule: 'Daily 14:00 Dubai',
      status: 'active',
      lastRun: '2026-02-08T14:00:00Z',
      description: 'Proactive system health check',
      delivery: 'Telegram',
    },
  },
  {
    id: 'workout-reminders',
    type: 'cron',
    position: { x: COL.cron, y: ROW * 7 },
    data: {
      label: 'Workout Reminders',
      model: 'Sonnet',
      schedule: 'Mon-Fri',
      status: 'active',
      description: 'Daily workout motivation',
      delivery: 'Telegram',
    },
  },

  // ── Column 4: One-shots (orange) — below agents ──
  {
    id: 'weber-reminder',
    type: 'oneshot',
    position: { x: COL.oneshot, y: ROW * 3 },
    data: {
      label: 'Weber Grill Reminder',
      model: 'Sonnet',
      schedule: 'Feb 10, 2026',
      status: 'scheduled',
      description: 'Reminder to check Weber grill delivery',
      delivery: 'Telegram',
    },
  },

  // ── Column 1: Integrations (green) — vertical stack ──
  {
    id: 'gmail',
    type: 'integration',
    position: { x: COL.integration, y: 0 },
    data: {
      label: 'Gmail',
      status: 'active',
      description: 'golli.sabri@gmail.com via IMAP + OAuth2',
    },
  },
  {
    id: 'm365',
    type: 'integration',
    position: { x: COL.integration, y: ROW },
    data: {
      label: 'M365 / SophoSTC',
      status: 'active',
      description: 'info@sophostc.com via Graph API',
    },
  },
  {
    id: 'amazon',
    type: 'integration',
    position: { x: COL.integration, y: ROW * 2 },
    data: {
      label: 'Amazon.ae',
      status: 'active',
      description: 'Product search and price monitoring',
    },
  },
  {
    id: 'coingecko',
    type: 'integration',
    position: { x: COL.integration, y: ROW * 3 },
    data: {
      label: 'CoinGecko',
      status: 'active',
      description: 'Cryptocurrency price data',
    },
  },
  {
    id: 'brave-search',
    type: 'integration',
    position: { x: COL.integration, y: ROW * 4 },
    data: {
      label: 'Brave Search',
      status: 'active',
      description: 'Web search API',
    },
  },
  {
    id: 'clawdhub',
    type: 'integration',
    position: { x: COL.integration, y: ROW * 5 },
    data: {
      label: 'ClawdHub',
      status: 'active',
      description: 'Skill repository and discovery',
    },
  },
  {
    id: 'twilio',
    type: 'integration',
    position: { x: COL.integration, y: ROW * 6 },
    data: {
      label: 'Twilio Phone Agent',
      status: 'active',
      description: 'Phone call monitoring and voicemail',
    },
  },
  {
    id: 'weather',
    type: 'integration',
    position: { x: COL.integration, y: ROW * 7 },
    data: {
      label: 'Weather (wttr.in)',
      status: 'active',
      description: 'Weather forecasts and conditions',
    },
  },

  // ── Column 5: Delivery (pink) ──
  {
    id: 'telegram',
    type: 'delivery',
    position: { x: COL.delivery, y: ROW * 3 },
    data: {
      label: 'Telegram (Sabri)',
      status: 'active',
      description: 'Primary delivery channel for all notifications',
    },
  },
];

export const initialEdges: Edge[] = [
  // Motus orchestrates all cron jobs
  { id: 'e-motus-morning', source: 'motus', target: 'morning-brief', animated: true },
  { id: 'e-motus-email', source: 'motus', target: 'email-triage', animated: true },
  { id: 'e-motus-newsletter', source: 'motus', target: 'newsletter-audit', animated: true },
  { id: 'e-motus-skill', source: 'motus', target: 'skill-discovery', animated: true },
  { id: 'e-motus-amazon', source: 'motus', target: 'amazon-scout', animated: true },
  { id: 'e-motus-phone', source: 'motus', target: 'phone-monitor', animated: true },
  { id: 'e-motus-proactive', source: 'motus', target: 'proactive-check', animated: true },
  { id: 'e-motus-workout', source: 'motus', target: 'workout-reminders', animated: true },
  { id: 'e-motus-weber', source: 'motus', target: 'weber-reminder', animated: true },

  // Morning Brief connections
  { id: 'e-coingecko-morning', source: 'coingecko', target: 'morning-brief', label: 'crypto prices' },
  { id: 'e-weather-morning', source: 'weather', target: 'morning-brief', label: 'forecast' },
  { id: 'e-brave-morning', source: 'brave-search', target: 'morning-brief', label: 'news' },
  { id: 'e-morning-telegram', source: 'morning-brief', target: 'telegram', animated: true },

  // Email Triage connections
  { id: 'e-gmail-triage', source: 'gmail', target: 'email-triage', label: 'inbox' },
  { id: 'e-m365-triage', source: 'm365', target: 'email-triage', label: 'inbox' },
  { id: 'e-triage-telegram', source: 'email-triage', target: 'telegram', label: 'urgent', animated: true },

  // Newsletter Audit connections
  { id: 'e-gmail-newsletter', source: 'gmail', target: 'newsletter-audit', label: 'newsletters' },
  { id: 'e-newsletter-telegram', source: 'newsletter-audit', target: 'telegram', animated: true },

  // Skill Discovery connections
  { id: 'e-clawdhub-skill', source: 'clawdhub', target: 'skill-discovery', label: 'new skills' },
  { id: 'e-skill-telegram', source: 'skill-discovery', target: 'telegram', animated: true },

  // Amazon Scout connections
  { id: 'e-amazon-scout', source: 'amazon', target: 'amazon-scout', label: 'products' },
  { id: 'e-brave-scout', source: 'brave-search', target: 'amazon-scout', label: 'deals' },
  { id: 'e-scout-telegram', source: 'amazon-scout', target: 'telegram', animated: true },

  // Phone Monitor connections
  { id: 'e-twilio-phone', source: 'twilio', target: 'phone-monitor', label: 'calls' },
  { id: 'e-phone-telegram', source: 'phone-monitor', target: 'telegram', animated: true },

  // Other deliveries to Telegram
  { id: 'e-proactive-telegram', source: 'proactive-check', target: 'telegram', animated: true },
  { id: 'e-workout-telegram', source: 'workout-reminders', target: 'telegram', animated: true },
  { id: 'e-weber-telegram', source: 'weber-reminder', target: 'telegram', animated: true },
];
