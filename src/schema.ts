/**
 * BlackRoad GraphQL Schema
 * Unified schema for all 40+ products
 */

export const typeDefs = /* GraphQL */ `
  scalar DateTime
  scalar JSON

  # ============================================
  # Enums
  # ============================================

  enum AgentStatus {
    ONLINE
    OFFLINE
    BUSY
    ERROR
  }

  enum AgentType {
    INFRASTRUCTURE
    CODE_REVIEW
    SECURITY
    ANALYTICS
    GENERAL
  }

  enum DeploymentStatus {
    PENDING
    IN_PROGRESS
    SUCCESS
    FAILURE
    CANCELLED
  }

  enum Environment {
    PRODUCTION
    STAGING
    DEVELOPMENT
  }

  enum UserRole {
    ADMIN
    DEVELOPER
    VIEWER
  }

  enum Severity {
    INFO
    WARNING
    ERROR
    CRITICAL
  }

  # ============================================
  # Types - Core
  # ============================================

  type User {
    id: ID!
    email: String!
    name: String!
    role: UserRole!
    createdAt: DateTime!
    updatedAt: DateTime!
    organization: Organization
    products: [Product!]!
  }

  type Organization {
    id: ID!
    name: String!
    slug: String!
    users: [User!]!
    products: [Product!]!
    usage: Usage!
    createdAt: DateTime!
  }

  type Product {
    id: ID!
    name: String!
    slug: String!
    description: String
    status: String!
    url: String
    deployments: [Deployment!]!
    metrics: ProductMetrics
  }

  # ============================================
  # Types - Infrastructure
  # ============================================

  type Agent {
    id: ID!
    name: String!
    type: AgentType!
    status: AgentStatus!
    tasksCompleted: Int!
    uptimePercent: Float!
    lastActiveAt: DateTime
    createdAt: DateTime!
    metrics: AgentMetrics
  }

  type AgentMetrics {
    tasksToday: Int!
    tasksThisWeek: Int!
    averageTaskDuration: Float!
    successRate: Float!
  }

  type Deployment {
    id: ID!
    service: String!
    version: String!
    status: DeploymentStatus!
    environment: Environment!
    startedAt: DateTime!
    completedAt: DateTime
    durationSeconds: Int
    deployedBy: User
    url: String
    logs: [DeploymentLog!]
  }

  type DeploymentLog {
    timestamp: DateTime!
    level: String!
    message: String!
  }

  type Device {
    id: ID!
    name: String!
    hostname: String!
    ipAddress: String
    tailscaleIp: String
    status: String!
    hardware: String
    role: String
    aiCapability: Float
    lastSeen: DateTime
  }

  # ============================================
  # Types - Monitoring
  # ============================================

  type Error {
    id: ID!
    service: String!
    severity: Severity!
    message: String!
    code: String
    occurredAt: DateTime!
    resolved: Boolean!
    resolvedAt: DateTime
    affectedUsers: Int
  }

  type Usage {
    apiCalls: Int!
    computeHours: Float!
    storageGb: Float!
    bandwidthGb: Float!
    period: String!
  }

  type ProductMetrics {
    requestsToday: Int!
    requestsThisMonth: Int!
    averageLatencyMs: Float!
    errorRate: Float!
    uptime: Float!
  }

  # ============================================
  # Types - Infrastructure Stats
  # ============================================

  type InfrastructureStats {
    githubOrgs: Int!
    repositories: Int!
    cloudflarePages: Int!
    kvNamespaces: Int!
    railwayServices: Int!
    devices: Int!
    totalAiTops: Float!
    activeAgents: Int!
    totalAgents: Int!
  }

  # ============================================
  # Input Types
  # ============================================

  input CreateUserInput {
    email: String!
    name: String!
    role: UserRole!
    products: [String!]
  }

  input DeployInput {
    service: String!
    environment: Environment!
    version: String
  }

  input ScaleAgentsInput {
    agentType: AgentType!
    targetCount: Int!
    scalingPolicy: String
  }

  input NotificationInput {
    channel: String!
    title: String!
    message: String!
    severity: Severity
    recipients: [String!]
  }

  # ============================================
  # Queries
  # ============================================

  type Query {
    # Users
    me: User
    user(id: ID!): User
    users(limit: Int, offset: Int): [User!]!

    # Organizations
    organization(id: ID!): Organization
    organizations: [Organization!]!

    # Products
    product(slug: String!): Product
    products: [Product!]!

    # Agents
    agent(id: ID!): Agent
    agents(type: AgentType, status: AgentStatus, limit: Int): [Agent!]!
    agentStats: AgentMetrics!

    # Deployments
    deployment(id: ID!): Deployment
    deployments(service: String, status: DeploymentStatus, limit: Int): [Deployment!]!
    latestDeployment(service: String!): Deployment

    # Devices
    device(id: ID!): Device
    devices: [Device!]!

    # Errors
    errors(severity: Severity, service: String, resolved: Boolean, limit: Int): [Error!]!

    # Infrastructure
    infrastructureStats: InfrastructureStats!
    usage: Usage!
  }

  # ============================================
  # Mutations
  # ============================================

  type Mutation {
    # Users
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, name: String, role: UserRole): User!
    deleteUser(id: ID!): Boolean!

    # Deployments
    deploy(input: DeployInput!): Deployment!
    cancelDeployment(id: ID!): Deployment!
    rollback(service: String!, toVersion: String!): Deployment!

    # Agents
    scaleAgents(input: ScaleAgentsInput!): Agent!
    restartAgent(id: ID!): Agent!

    # Notifications
    sendNotification(input: NotificationInput!): Boolean!

    # Config
    updateConfig(service: String!, key: String!, value: String!): Boolean!
  }

  # ============================================
  # Subscriptions (Real-time)
  # ============================================

  type Subscription {
    # Real-time deployment updates
    deploymentUpdated(service: String): Deployment!

    # Agent status changes
    agentStatusChanged(type: AgentType): Agent!

    # New errors
    errorOccurred(severity: Severity): Error!

    # Usage alerts
    usageThresholdExceeded(metric: String!): Usage!
  }
`;
