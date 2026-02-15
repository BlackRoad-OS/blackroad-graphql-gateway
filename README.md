# BlackRoad GraphQL Gateway

Unified GraphQL API endpoint for the entire BlackRoad ecosystem - 40+ products, 15 GitHub orgs, 1,085 repos.

## Live Endpoints

- **GraphQL**: https://blackroad-graphql-gateway.amundsonalexa.workers.dev/graphql
- **GraphiQL**: https://blackroad-graphql-gateway.amundsonalexa.workers.dev/graphql (GET)
- **Health**: https://blackroad-graphql-gateway.amundsonalexa.workers.dev/health

## Features

### Queries
- `me` - Current authenticated user
- `users` - List all users
- `agents` - List AI agents (filter by type, status)
- `deployments` - List deployments (filter by service, status)
- `devices` - Device fleet inventory
- `products` - All BlackRoad products
- `errors` - System errors and alerts
- `infrastructureStats` - GitHub orgs, repos, devices, agents
- `usage` - API calls, compute hours, storage

### Mutations
- `createUser` / `updateUser` / `deleteUser` - User management
- `deploy` / `cancelDeployment` / `rollback` - Deployment operations
- `scaleAgents` / `restartAgent` - Agent management
- `sendNotification` - Multi-channel notifications
- `updateConfig` - Service configuration

### Subscriptions (Real-time)
- `deploymentUpdated` - Deployment status changes
- `agentStatusChanged` - Agent health updates
- `errorOccurred` - New errors/alerts
- `usageThresholdExceeded` - Usage alerts

## Example Queries

```graphql
# Infrastructure Overview
query {
  infrastructureStats {
    githubOrgs
    repositories
    cloudflarePages
    devices
    totalAiTops
    activeAgents
  }
}

# List Online Agents
query {
  agents(status: ONLINE, limit: 10) {
    name
    type
    tasksCompleted
    uptimePercent
  }
}

# Deploy a Service
mutation {
  deploy(input: {
    service: "blackroad-dashboard"
    environment: PRODUCTION
    version: "v2.5.0"
  }) {
    id
    status
    startedAt
  }
}
```

## Tech Stack

- **GraphQL Yoga** - GraphQL server
- **Cloudflare Workers** - Edge deployment
- **TypeScript** - Type safety

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## Infrastructure

| Resource | Count |
|----------|-------|
| GitHub Orgs | 15 |
| Repositories | 1,085 |
| Cloudflare Pages | 205 |
| KV Namespaces | 35 |
| Devices | 8 |
| Total AI TOPS | 52 |
| Active Agents | 314 |

## License

Proprietary - BlackRoad OS, Inc.
