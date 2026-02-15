/**
 * BlackRoad GraphQL Resolvers
 * Mock data representing real infrastructure
 */

// Mock data representing BlackRoad infrastructure
const mockUsers = [
  {
    id: '1',
    email: 'alexa@blackroad.io',
    name: 'Alexa Amundson',
    role: 'ADMIN',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2026-02-14T00:00:00Z',
  },
];

const mockOrganizations = [
  {
    id: '1',
    name: 'BlackRoad OS',
    slug: 'blackroad-os',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

const mockProducts = [
  { id: '1', name: 'BlackRoad Dashboard', slug: 'dashboard', description: 'Unified monitoring dashboard', status: 'active', url: 'https://dashboard.blackroad.io' },
  { id: '2', name: 'BlackRoad API', slug: 'api', description: 'Core API gateway', status: 'active', url: 'https://api.blackroad.io' },
  { id: '3', name: 'BlackRoad Codex', slug: 'codex', description: 'Component search engine', status: 'active', url: 'https://codex.blackroad.io' },
  { id: '4', name: 'CECE OS', slug: 'cece', description: 'Sovereign AI operating system', status: 'active', url: 'https://cece.blackroad.io' },
  { id: '5', name: 'BlackRoad Prism', slug: 'prism', description: 'GitHub insights console', status: 'active', url: 'https://prism.blackroad.io' },
];

const mockAgents = [
  { id: '1', name: 'zeus-orchestrator', type: 'INFRASTRUCTURE', status: 'ONLINE', tasksCompleted: 1247, uptimePercent: 99.9, lastActiveAt: new Date().toISOString(), createdAt: '2024-06-01T00:00:00Z' },
  { id: '2', name: 'prometheus-monitor', type: 'ANALYTICS', status: 'ONLINE', tasksCompleted: 892, uptimePercent: 99.7, lastActiveAt: new Date().toISOString(), createdAt: '2024-06-15T00:00:00Z' },
  { id: '3', name: 'athena-reviewer', type: 'CODE_REVIEW', status: 'ONLINE', tasksCompleted: 2341, uptimePercent: 99.5, lastActiveAt: new Date().toISOString(), createdAt: '2024-07-01T00:00:00Z' },
  { id: '4', name: 'ares-security', type: 'SECURITY', status: 'BUSY', tasksCompleted: 567, uptimePercent: 99.8, lastActiveAt: new Date().toISOString(), createdAt: '2024-07-15T00:00:00Z' },
  { id: '5', name: 'hermes-deployer', type: 'INFRASTRUCTURE', status: 'ONLINE', tasksCompleted: 1893, uptimePercent: 99.6, lastActiveAt: new Date().toISOString(), createdAt: '2024-08-01T00:00:00Z' },
];

const mockDeployments = [
  { id: '1', service: 'blackroad-dashboard', version: 'v2.4.1', status: 'SUCCESS', environment: 'PRODUCTION', startedAt: '2026-02-14T10:00:00Z', completedAt: '2026-02-14T10:02:30Z', durationSeconds: 150, url: 'https://dashboard.blackroad.io' },
  { id: '2', service: 'blackroad-api', version: 'v3.1.0', status: 'SUCCESS', environment: 'PRODUCTION', startedAt: '2026-02-14T09:30:00Z', completedAt: '2026-02-14T09:31:45Z', durationSeconds: 105, url: 'https://api.blackroad.io' },
  { id: '3', service: 'blackroad-codex', version: 'v1.8.2', status: 'IN_PROGRESS', environment: 'STAGING', startedAt: '2026-02-14T11:00:00Z', completedAt: null, durationSeconds: null, url: null },
];

const mockDevices = [
  { id: '1', name: 'cecilia', hostname: 'cecilia.local', ipAddress: '192.168.4.89', tailscaleIp: '100.72.180.98', status: 'online', hardware: 'Pi 5 + Hailo-8', role: 'Primary AI Agent', aiCapability: 26.0, lastSeen: new Date().toISOString() },
  { id: '2', name: 'lucidia', hostname: 'lucidia.local', ipAddress: '192.168.4.81', tailscaleIp: '100.83.149.86', status: 'online', hardware: 'Pi 5 + Pironman', role: 'AI Inference', aiCapability: 4.0, lastSeen: new Date().toISOString() },
  { id: '3', name: 'octavia', hostname: 'octavia.local', ipAddress: '192.168.4.38', tailscaleIp: '100.66.235.47', status: 'online', hardware: 'Pi 5', role: 'Multi-arm Processing', aiCapability: 4.0, lastSeen: new Date().toISOString() },
  { id: '4', name: 'alice', hostname: 'alice.local', ipAddress: '192.168.4.49', tailscaleIp: '100.77.210.18', status: 'online', hardware: 'Pi 4', role: 'Worker Node', aiCapability: 2.0, lastSeen: new Date().toISOString() },
  { id: '5', name: 'aria', hostname: 'aria.local', ipAddress: '192.168.4.82', tailscaleIp: '100.109.14.17', status: 'online', hardware: 'Pi 5', role: 'Harmony Protocols', aiCapability: 4.0, lastSeen: new Date().toISOString() },
  { id: '6', name: 'shellfish', hostname: 'shellfish', ipAddress: '174.138.44.45', tailscaleIp: '100.94.33.37', status: 'online', hardware: 'DigitalOcean Droplet', role: 'Edge Compute', aiCapability: 8.0, lastSeen: new Date().toISOString() },
  { id: '7', name: 'codex-infinity', hostname: 'codex-infinity', ipAddress: '159.65.43.12', tailscaleIp: '100.108.132.8', status: 'online', hardware: 'DigitalOcean Droplet', role: 'Cloud Oracle', aiCapability: 4.0, lastSeen: new Date().toISOString() },
];

const mockErrors = [
  { id: '1', service: 'blackroad-api', severity: 'WARNING', message: 'High latency detected', code: 'LATENCY_001', occurredAt: '2026-02-14T08:30:00Z', resolved: true, resolvedAt: '2026-02-14T08:35:00Z', affectedUsers: 12 },
  { id: '2', service: 'blackroad-codex', severity: 'INFO', message: 'Index rebuild scheduled', code: 'INDEX_001', occurredAt: '2026-02-14T06:00:00Z', resolved: true, resolvedAt: '2026-02-14T06:15:00Z', affectedUsers: 0 },
];

const infrastructureStats = {
  githubOrgs: 15,
  repositories: 1085,
  cloudflarePages: 205,
  kvNamespaces: 35,
  railwayServices: 2,
  devices: 8,
  totalAiTops: 52.0,
  activeAgents: 314,
  totalAgents: 400,
};

const usage = {
  apiCalls: 1247893,
  computeHours: 2847.5,
  storageGb: 156.3,
  bandwidthGb: 892.7,
  period: '2026-02',
};

// Resolver implementations
export const resolvers = {
  Query: {
    // Users
    me: () => mockUsers[0],
    user: (_: unknown, { id }: { id: string }) => mockUsers.find(u => u.id === id),
    users: (_: unknown, { limit = 100, offset = 0 }: { limit?: number; offset?: number }) =>
      mockUsers.slice(offset, offset + limit),

    // Organizations
    organization: (_: unknown, { id }: { id: string }) => mockOrganizations.find(o => o.id === id),
    organizations: () => mockOrganizations,

    // Products
    product: (_: unknown, { slug }: { slug: string }) => mockProducts.find(p => p.slug === slug),
    products: () => mockProducts,

    // Agents
    agent: (_: unknown, { id }: { id: string }) => mockAgents.find(a => a.id === id),
    agents: (_: unknown, { type, status, limit = 100 }: { type?: string; status?: string; limit?: number }) => {
      let filtered = mockAgents;
      if (type) filtered = filtered.filter(a => a.type === type);
      if (status) filtered = filtered.filter(a => a.status === status);
      return filtered.slice(0, limit);
    },
    agentStats: () => ({
      tasksToday: 847,
      tasksThisWeek: 4293,
      averageTaskDuration: 2.3,
      successRate: 99.7,
    }),

    // Deployments
    deployment: (_: unknown, { id }: { id: string }) => mockDeployments.find(d => d.id === id),
    deployments: (_: unknown, { service, status, limit = 100 }: { service?: string; status?: string; limit?: number }) => {
      let filtered = mockDeployments;
      if (service) filtered = filtered.filter(d => d.service === service);
      if (status) filtered = filtered.filter(d => d.status === status);
      return filtered.slice(0, limit);
    },
    latestDeployment: (_: unknown, { service }: { service: string }) =>
      mockDeployments.filter(d => d.service === service).sort((a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      )[0],

    // Devices
    device: (_: unknown, { id }: { id: string }) => mockDevices.find(d => d.id === id),
    devices: () => mockDevices,

    // Errors
    errors: (_: unknown, { severity, service, resolved, limit = 100 }: { severity?: string; service?: string; resolved?: boolean; limit?: number }) => {
      let filtered = mockErrors;
      if (severity) filtered = filtered.filter(e => e.severity === severity);
      if (service) filtered = filtered.filter(e => e.service === service);
      if (resolved !== undefined) filtered = filtered.filter(e => e.resolved === resolved);
      return filtered.slice(0, limit);
    },

    // Infrastructure
    infrastructureStats: () => infrastructureStats,
    usage: () => usage,
  },

  Mutation: {
    // Users
    createUser: (_: unknown, { input }: { input: { email: string; name: string; role: string } }) => ({
      id: String(mockUsers.length + 1),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    updateUser: (_: unknown, { id, name, role }: { id: string; name?: string; role?: string }) => {
      const user = mockUsers.find(u => u.id === id);
      if (!user) throw new Error('User not found');
      return { ...user, name: name || user.name, role: role || user.role, updatedAt: new Date().toISOString() };
    },
    deleteUser: (_: unknown, { id }: { id: string }) => {
      const index = mockUsers.findIndex(u => u.id === id);
      return index !== -1;
    },

    // Deployments
    deploy: (_: unknown, { input }: { input: { service: string; environment: string; version?: string } }) => ({
      id: String(mockDeployments.length + 1),
      service: input.service,
      version: input.version || 'latest',
      status: 'PENDING',
      environment: input.environment,
      startedAt: new Date().toISOString(),
      completedAt: null,
      durationSeconds: null,
      url: null,
    }),
    cancelDeployment: (_: unknown, { id }: { id: string }) => {
      const deployment = mockDeployments.find(d => d.id === id);
      if (!deployment) throw new Error('Deployment not found');
      return { ...deployment, status: 'CANCELLED', completedAt: new Date().toISOString() };
    },
    rollback: (_: unknown, { service, toVersion }: { service: string; toVersion: string }) => ({
      id: String(mockDeployments.length + 1),
      service,
      version: toVersion,
      status: 'PENDING',
      environment: 'PRODUCTION',
      startedAt: new Date().toISOString(),
      completedAt: null,
      durationSeconds: null,
      url: null,
    }),

    // Agents
    scaleAgents: (_: unknown, { input }: { input: { agentType: string; targetCount: number } }) => ({
      id: String(mockAgents.length + 1),
      name: `${input.agentType.toLowerCase()}-scaled`,
      type: input.agentType,
      status: 'ONLINE',
      tasksCompleted: 0,
      uptimePercent: 100,
      lastActiveAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }),
    restartAgent: (_: unknown, { id }: { id: string }) => {
      const agent = mockAgents.find(a => a.id === id);
      if (!agent) throw new Error('Agent not found');
      return { ...agent, status: 'ONLINE', lastActiveAt: new Date().toISOString() };
    },

    // Notifications
    sendNotification: () => true,

    // Config
    updateConfig: () => true,
  },

  // Type resolvers for nested fields
  User: {
    organization: () => mockOrganizations[0],
    products: () => mockProducts,
  },

  Organization: {
    users: () => mockUsers,
    products: () => mockProducts,
    usage: () => usage,
  },

  Product: {
    deployments: (product: { slug: string }) =>
      mockDeployments.filter(d => d.service.includes(product.slug)),
    metrics: () => ({
      requestsToday: Math.floor(Math.random() * 100000),
      requestsThisMonth: Math.floor(Math.random() * 1000000),
      averageLatencyMs: Math.random() * 50 + 10,
      errorRate: Math.random() * 0.5,
      uptime: 99.5 + Math.random() * 0.5,
    }),
  },

  Agent: {
    metrics: () => ({
      tasksToday: Math.floor(Math.random() * 100),
      tasksThisWeek: Math.floor(Math.random() * 500),
      averageTaskDuration: Math.random() * 5,
      successRate: 95 + Math.random() * 5,
    }),
  },

  Deployment: {
    deployedBy: () => mockUsers[0],
    logs: () => [
      { timestamp: new Date().toISOString(), level: 'INFO', message: 'Deployment started' },
      { timestamp: new Date().toISOString(), level: 'INFO', message: 'Building container' },
      { timestamp: new Date().toISOString(), level: 'INFO', message: 'Deployment complete' },
    ],
  },
};
