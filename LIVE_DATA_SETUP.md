# Live Cron Data Integration

## What Was Changed

### 1. Created API Route: `/app/api/jobs/route.ts`
- Server-side endpoint that fetches live cron jobs from OpenClaw gateway
- Transforms cron job data into React Flow nodes and edges
- Features:
  - Auto-detects integrations from job payload messages
  - Only includes integration nodes that are actually used by active jobs
  - Separates cron jobs and one-shot jobs
  - Creates edges between: integrations→cron, cron→telegram, motus→all jobs
  - Vertical column layout: Integrations (x=0), Crons (x=350), Agents/One-shots (x=700), Delivery (x=1050)

### 2. Updated Dashboard: `/app/page.tsx`
- Fetches data from `/api/jobs` on mount
- Auto-refreshes every 60 seconds
- Shows loading state and last update time in header
- Falls back to static data if API fails
- Displays errors in header if fetch fails

### 3. Created `.env.example`
- Template for required environment variables

## Environment Variables Required

Set these in your Railway dashboard:

```bash
OPENCLAW_GATEWAY_URL=https://oc.sabrigolli.com
OPENCLAW_GATEWAY_TOKEN=your_gateway_token_here
```

**Important:** 
- The gateway token must be set on Railway (server-side only)
- Never commit the token to git
- The token is used only in the API route, never exposed to the client

## How It Works

1. **Client-side** (browser):
   - Fetches from `/api/jobs` every 60 seconds
   - Renders React Flow graph with live data

2. **API Route** (server-side):
   - Fetches from `POST https://oc.sabrigolli.com/tools/invoke`
   - Request body: `{"tool":"cron","action":"list","args":{"action":"list","includeDisabled":false}}`
   - Transforms response into React Flow format

3. **Integration Detection**:
   - Scans job `payload.message` for keywords
   - gmail/imap → Gmail
   - m365/graph → M365
   - amazon → Amazon.ae
   - coingecko/crypto → CoinGecko
   - brave/web_search → Brave Search
   - clawdhub/skill → ClawdHub
   - twilio/phone → Twilio
   - wttr/weather → Weather

4. **Node Types**:
   - `cron` - Regular recurring jobs
   - `oneshot` - Scheduled one-time jobs (schedule.kind === 'at')
   - `integration` - External services
   - `agent` - Motus and sub-agents
   - `delivery` - Telegram

## Next Steps

1. Set `OPENCLAW_GATEWAY_TOKEN` in Railway dashboard
2. Deploy to Railway (should auto-deploy on push to main)
3. Visit dashboard - should show live cron jobs
4. Check browser console for any API errors

## Fallback Behavior

If the API fails:
- Dashboard continues using static data from `/data/graph-data.ts`
- Error message appears in header
- Next refresh attempt in 60 seconds
