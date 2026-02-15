/**
 * BlackRoad GraphQL Gateway
 * Unified API endpoint for all 40+ BlackRoad products
 *
 * Deployed on Cloudflare Workers with GraphQL Yoga
 */

import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// Create the GraphQL schema
const schema = createSchema({
  typeDefs,
  resolvers,
});

// Create Yoga instance with Cloudflare Workers adapter
const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  landingPage: false,
  cors: {
    origin: [
      'https://blackroad.io',
      'https://dashboard.blackroad.io',
      'https://api.blackroad.io',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  },
  graphiql: {
    title: 'BlackRoad GraphQL Gateway',
    defaultQuery: `# Welcome to BlackRoad GraphQL Gateway
# Unified API for the entire BlackRoad ecosystem

# Get infrastructure overview
query InfrastructureOverview {
  infrastructureStats {
    githubOrgs
    repositories
    cloudflarePages
    kvNamespaces
    devices
    totalAiTops
    activeAgents
    totalAgents
  }
}

# List all agents
query AllAgents {
  agents {
    id
    name
    type
    status
    tasksCompleted
    uptimePercent
  }
}

# Get current user
query CurrentUser {
  me {
    id
    email
    name
    role
    organization {
      name
      slug
    }
  }
}

# List products
query Products {
  products {
    id
    name
    slug
    status
    url
    metrics {
      requestsToday
      uptime
      errorRate
    }
  }
}

# List devices in the fleet
query DeviceFleet {
  devices {
    name
    hostname
    status
    hardware
    role
    aiCapability
    tailscaleIp
  }
}
`,
  },
});

// Landing page HTML
const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlackRoad GraphQL Gateway</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 34px;
    }
    .container {
      max-width: 610px;
      text-align: center;
    }
    h1 {
      font-size: 55px;
      background: linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 21px;
    }
    .subtitle {
      font-size: 21px;
      color: #888;
      margin-bottom: 34px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 21px;
      margin-bottom: 34px;
    }
    .stat {
      background: #111;
      border: 1px solid #333;
      border-radius: 13px;
      padding: 21px;
    }
    .stat-value {
      font-size: 34px;
      font-weight: bold;
      color: #FF1D6C;
    }
    .stat-label {
      font-size: 13px;
      color: #888;
      margin-top: 8px;
    }
    .endpoints {
      text-align: left;
      background: #111;
      border: 1px solid #333;
      border-radius: 13px;
      padding: 21px;
      margin-bottom: 34px;
    }
    .endpoint {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 0;
      border-bottom: 1px solid #222;
    }
    .endpoint:last-child { border-bottom: none; }
    .endpoint-method {
      background: #2979FF;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }
    .endpoint-path {
      font-family: monospace;
      color: #F5A623;
    }
    a {
      color: #FF1D6C;
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
    .cta {
      display: inline-block;
      background: linear-gradient(135deg, #FF1D6C 0%, #9C27B0 100%);
      color: #fff;
      padding: 13px 34px;
      border-radius: 8px;
      font-weight: bold;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .cta:hover {
      transform: scale(1.05);
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>BlackRoad GraphQL</h1>
    <p class="subtitle">Unified API Gateway for 40+ Products</p>

    <div class="stats">
      <div class="stat">
        <div class="stat-value">15</div>
        <div class="stat-label">GitHub Orgs</div>
      </div>
      <div class="stat">
        <div class="stat-value">1,085</div>
        <div class="stat-label">Repositories</div>
      </div>
      <div class="stat">
        <div class="stat-value">314</div>
        <div class="stat-label">Active Agents</div>
      </div>
    </div>

    <div class="endpoints">
      <div class="endpoint">
        <span class="endpoint-method">POST</span>
        <span class="endpoint-path">/graphql</span>
      </div>
      <div class="endpoint">
        <span class="endpoint-method">GET</span>
        <span class="endpoint-path">/graphql (GraphiQL)</span>
      </div>
      <div class="endpoint">
        <span class="endpoint-method">GET</span>
        <span class="endpoint-path">/health</span>
      </div>
    </div>

    <a href="/graphql" class="cta">Open GraphiQL Playground</a>
  </div>
</body>
</html>`;

// Health check response
const healthResponse = {
  status: 'healthy',
  service: 'blackroad-graphql-gateway',
  version: '1.0.0',
  timestamp: new Date().toISOString(),
  infrastructure: {
    githubOrgs: 15,
    repositories: 1085,
    activeAgents: 314,
    devices: 8,
  },
};

// Main fetch handler
export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ ...healthResponse, timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Landing page
    if (url.pathname === '/' && request.method === 'GET') {
      return new Response(landingPageHTML, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // GraphQL endpoint
    if (url.pathname === '/graphql') {
      return yoga.fetch(request, env, ctx);
    }

    // 404 for other routes
    return new Response(JSON.stringify({ error: 'Not found', endpoints: ['/graphql', '/health', '/'] }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
