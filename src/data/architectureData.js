export const architectureTopologies = [
  {
    id: "aws-3tier-vpc",
    name: "AWS 3-Tier Multi-AZ Resilient Cloud",
    subtitle: "Production VPC across 2 Availability Zones with ALB, Auto Scaling & Aurora RDS",
    category: "Cloud Infrastructure (AWS)",
    status: "Healthy",
    sla: "99.99% Uptime",
    latency: "6.8 ms",
    nodes: [
      {
        id: "node-igw",
        label: "Internet Gateway",
        sublabel: "igw-09a82f3",
        tier: "Edge / Routing",
        icon: "Globe",
        status: "Online",
        ip: "198.51.100.1",
        description: "Horizontally scaled, redundant VPC component that enables communication between VPC and the internet.",
        specs: { "Throughput": "100 Gbps", "HA Mode": "AWS Managed Multi-AZ", "VPC ID": "vpc-07b14d2e" },
        terraform: `resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name        = "girish-prod-igw"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}`
      },
      {
        id: "node-alb",
        label: "Application Load Balancer",
        sublabel: "alb-production-edge",
        tier: "Edge / Routing",
        icon: "Cpu",
        status: "Online",
        ip: "Dual-Stack DNS",
        description: "Layer 7 load balancer distributing incoming TLS traffic across EC2 instances in multiple AZs.",
        specs: { "Listener": "HTTPS:443", "TLS Version": "TLS 1.3 Strict", "Health Probe": "GET /healthz (200 OK)", "Idle Timeout": "60s" },
        terraform: `resource "aws_lb" "external" {
  name               = "girish-alb-prod"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  enable_deletion_protection = true
  drop_invalid_header_fields = true
}`
      },
      {
        id: "node-nat-gw",
        label: "NAT Gateways (AZ-a & AZ-b)",
        sublabel: "nat-0817cba & nat-0941efa",
        tier: "Public Subnet",
        icon: "Shield",
        status: "Online",
        ip: "52.14.88.21 / 54.21.90.14",
        description: "Allows private subnet compute instances to download package updates and outbound APIs securely.",
        specs: { "Elastic IPs": "2 Assigned", "Bandwidth": "45 Gbps burst", "Subnet": "10.0.1.0/24, 10.0.2.0/24" },
        terraform: `resource "aws_nat_gateway" "nat_a" {
  allocation_id = aws_eip.nat_a.id
  subnet_id     = aws_subnet.public_a.id
  tags = { Name = "nat-gateway-az-a" }
}`
      },
      {
        id: "node-asg-app",
        label: "App Auto Scaling Group (EC2 / ECS)",
        sublabel: "asg-microservices-v2",
        tier: "Private App Subnet",
        icon: "Server",
        status: "Online",
        ip: "10.0.10.0/24 (Private)",
        description: "Stateless container/application compute cluster dynamic scaling between 3 to 12 replicas on CPU > 70%.",
        specs: { "Min / Desired / Max": "3 / 6 / 12 Nodes", "Instance Type": "t4g.large (ARM Graviton3)", "OS": "Amazon Linux 2023 Hardened", "AMI": "ami-07c828d9" },
        terraform: `resource "aws_autoscaling_group" "app_asg" {
  name                = "girish-app-asg"
  vpc_zone_identifier = [aws_subnet.private_app_a.id, aws_subnet.private_app_b.id]
  target_group_arns   = [aws_lb_target_group.app_tg.arn]
  min_size            = 3
  max_size            = 12
  desired_capacity    = 6

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }
}`
      },
      {
        id: "node-aurora-rds",
        label: "Amazon Aurora PostgreSQL Multi-AZ",
        sublabel: "aurora-pg-cluster-prod",
        tier: "Private Data Subnet",
        icon: "Database",
        status: "Online",
        ip: "10.0.20.0/24 (Isolated)",
        description: "Fully managed PostgreSQL cluster with synchronous storage replication across 3 AZs and automated backup snapshots.",
        specs: { "Engine": "PostgreSQL 16.2", "Storage": "Aurora Serverless v2 (2 - 16 ACU)", "Encryption": "AWS KMS (AES-256)", "RPO / RTO": "< 1 min / < 15 min" },
        terraform: `resource "aws_rds_cluster" "postgresql" {
  cluster_identifier      = "aurora-db-prod"
  engine                  = "aurora-postgresql"
  engine_version          = "16.2"
  database_name           = "appdb"
  master_username         = "dbadmin"
  kms_key_id              = aws_kms_key.db_key.arn
  storage_encrypted       = true
  backup_retention_period = 30
}`
      },
      {
        id: "node-redis-cache",
        label: "ElastiCache Redis Cluster",
        sublabel: "redis-cluster-cache",
        tier: "Private Data Subnet",
        icon: "Layers",
        status: "Online",
        ip: "10.0.21.0/24 (In-Memory)",
        description: "Sub-millisecond latency distributed cache and session store with automatic primary node failover.",
        specs: { "Node Type": "cache.r6g.large", "Replicas": "2 Read Replicas", "In-Transit TLS": "Enforced", "Hit Rate": "96.4%" },
        terraform: `resource "aws_elasticache_replication_group" "redis" {
  replication_group_id       = "redis-prod-cache"
  description                = "Production Redis cluster"
  node_type                  = "cache.r6g.large"
  num_cache_clusters         = 3
  automatic_failover_enabled = true
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
}`
      }
    ],
    connections: [
      { from: "node-igw", to: "node-alb", label: "TLS 443 Inbound", protocol: "HTTPS" },
      { from: "node-alb", to: "node-asg-app", label: "Reverse Proxy :8080", protocol: "HTTP/2" },
      { from: "node-asg-app", to: "node-nat-gw", label: "Outbound API calls", protocol: "NAT egress" },
      { from: "node-asg-app", to: "node-aurora-rds", label: "SQL Queries :5432", protocol: "PostgreSQL TLS" },
      { from: "node-asg-app", to: "node-redis-cache", label: "Session Cache :6379", protocol: "Redis TLS" }
    ]
  },
  {
    id: "k8s-gitops-mesh",
    name: "Enterprise GitOps Kubernetes (EKS)",
    subtitle: "Declarative continuous delivery via ArgoCD, NGINX Ingress, Helm & Prometheus",
    category: "Container Orchestration",
    status: "Synchronized",
    sla: "99.98% SLO",
    latency: "3.2 ms",
    nodes: [
      {
        id: "node-git-repo",
        label: "Git Manifests (Single Source of Truth)",
        sublabel: "gitops-fleet.git",
        tier: "GitOps Control",
        icon: "GitBranch",
        status: "Synced",
        ip: "github.com/girish-sharma",
        description: "All Kubernetes state, Helm charts, and environment overrides stored immutably with signed Git commits.",
        specs: { "Branch": "main (Protected)", "Signing": "GPG Enforced", "Review Gate": "2 Approvals Required" },
        terraform: `# GitOps Repository Webhook Configuration
resource "github_repository_webhook" "argocd_webhook" {
  repository = "k8s-gitops-fleet"
  configuration {
    url          = "https://argocd.cloud.internal/api/webhook"
    content_type = "json"
    insecure_ssl = false
  }
  events = ["push", "pull_request"]
}`
      },
      {
        id: "node-argocd",
        label: "ArgoCD Application Controller",
        sublabel: "argocd-server (EKS namespace: argocd)",
        tier: "GitOps Control",
        icon: "Cpu",
        status: "Healthy",
        ip: "10.100.0.12",
        description: "Reconciles actual cluster state against target Git state every 3 minutes. Dispatches automated rollbacks on health check failure.",
        specs: { "Sync Mode": "Automated + Prune", "Self-Heal": "Enabled", "Rollback Trigger": "Prometheus 5xx > 1%" },
        terraform: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-microservices
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/girish-sharma/k8s-gitops-fleet.git'
    targetRevision: HEAD
    path: charts/production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`
      },
      {
        id: "node-ingress",
        label: "NGINX Ingress & Cert-Manager",
        sublabel: "ingress-nginx-controller",
        tier: "Ingress & Edge",
        icon: "Globe",
        status: "Online",
        ip: "a91823.elb.amazonaws.com",
        description: "Terminates TLS via Let's Encrypt certificates managed dynamically by cert-manager and routes traffic via HTTP path rules.",
        specs: { "Ingress Class": "nginx", "SSL Rotation": "Automated (90 Days)", "Rate Limit": "150 req/min per IP" },
        terraform: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts: [ "api.domain.io" ]
    secretName: api-tls-cert
  rules:
  - host: api.domain.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: gateway-service
            port: { number: 80 }`
      },
      {
        id: "node-pods-auth",
        label: "Auth Microservice (Deployment)",
        sublabel: "auth-svc (3 Pods, HPA Active)",
        tier: "App Mesh",
        icon: "Shield",
        status: "Running",
        ip: "Pod CIDR: 192.168.1.14/32",
        description: "Handles JWT validation, OAuth tokens, and RBAC authorization with sub-millisecond crypto verification.",
        specs: { "Replicas": "3 (Min 2 / Max 8)", "CPU Request": "150m", "Memory Request": "256Mi", "Probes": "liveness & readiness OK" },
        terraform: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      containers:
      - name: auth
        image: 928374918234.dkr.ecr.us-east-1.amazonaws.com/auth:v2.4.0
        resources:
          limits: { cpu: "500m", memory: "512Mi" }
          requests: { cpu: "150m", memory: "256Mi" }`
      },
      {
        id: "node-pods-api",
        label: "Core API Worker Pods",
        sublabel: "core-api (6 Pods, Canary 10%)",
        tier: "App Mesh",
        icon: "Server",
        status: "Canary Rollout",
        ip: "Pod CIDR: 192.168.2.0/24",
        description: "Primary stateless business logic pods connected to PostgreSQL RDS and asynchronous Kafka message queues.",
        specs: { "Traffic Split": "90% v2.3.9 / 10% v2.4.0", "HPA Target": "CPU 75%", "Pod Topology Spread": "zone & hostname" },
        terraform: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: core-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: core-api
  minReplicas: 4
  maxReplicas: 16
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`
      },
      {
        id: "node-prom-telemetry",
        label: "Prometheus & Grafana Agent",
        sublabel: "kube-prometheus-stack",
        tier: "Observability",
        icon: "Activity",
        status: "Collecting",
        ip: "10.100.8.44",
        description: "Scrapes cAdvisor, Node Exporter, and ingress nginx metrics every 15s to verify cluster SLOs and alert on error rates.",
        specs: { "Scrape Interval": "15s", "Retention": "30 Days", "Active Alerts": "0 Firing", "Exporter Health": "100%" },
        terraform: `apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: core-api-monitor
spec:
  selector:
    matchLabels:
      app: core-api
  endpoints:
  - port: metrics
    interval: 15s
    path: /metrics`
      }
    ],
    connections: [
      { from: "node-git-repo", to: "node-argocd", label: "Webhook Sync", protocol: "Git over SSH" },
      { from: "node-argocd", to: "node-ingress", label: "Applies manifests", protocol: "k8s API :6443" },
      { from: "node-ingress", to: "node-pods-auth", label: "Auth verify", protocol: "gRPC" },
      { from: "node-ingress", to: "node-pods-api", label: "HTTP Routing", protocol: "HTTP/1.1" },
      { from: "node-pods-api", to: "node-prom-telemetry", label: "Metrics scrape", protocol: "OpenMetrics" }
    ]
  },
  {
    id: "devsecops-pipeline-topology",
    name: "Zero-Trust DevSecOps Delivery Engine",
    subtitle: "Automated security gates: SAST, Trivy CVE scanning, container signing & immutable deployments",
    category: "DevSecOps & CI/CD",
    status: "Pipeline Active",
    sla: "< 4.0 min Cycle Time",
    latency: "3.8 min",
    nodes: [
      {
        id: "node-commit-gate",
        label: "Signed Git Commit & Branch Policy",
        sublabel: "PR #142 -> main",
        tier: "Source Gate",
        icon: "GitBranch",
        status: "Verified",
        ip: "GitHub Enterprise",
        description: "Developer pushes code requiring GPG commit signature verification, pre-commit secret scan, and branch protection.",
        specs: { "GPG Check": "Verified", "Secret Scanning": "GitGuardian / Gitleaks", "Required Reviewers": "2 Engineers" },
        terraform: `# Pre-commit hook configuration
repos:
- repo: https://github.com/gitleaks/gitleaks
  rev: v8.18.2
  hooks:
    - id: gitleaks
- repo: https://github.com/koalaman/shellcheck
  rev: v0.9.0
  hooks:
    - id: shellcheck`
      },
      {
        id: "node-runner",
        label: "Ephemeral GitHub Runner (K8s ARC)",
        sublabel: "arc-runner-prod-pool",
        tier: "Build Engine",
        icon: "Cpu",
        status: "Running",
        ip: "k8s-pod: runner-92ka",
        description: "Zero-trust ephemeral Kubernetes Actions Runner Controller pod that is destroyed immediately after pipeline completion.",
        specs: { "Pod Isolation": "NetworkPolicy Enforced", "Runner OS": "Ubuntu 22.04 LTS Minimal", "Ephemeral Lifecycle": "1 Job per container" },
        terraform: `apiVersion: actions.summerwind.dev/v1alpha1
kind: RunnerDeployment
metadata:
  name: devops-ephemeral-runner
spec:
  replicas: 4
  template:
    spec:
      ephemeral: true
      resources:
        requests: { cpu: "2", memory: "4Gi" }`
      },
      {
        id: "node-sast-trivy",
        label: "SonarQube & Trivy Scanner Gate",
        sublabel: "Vulnerability & Static Analysis",
        tier: "Security Gate",
        icon: "Shield",
        status: "Passed (0 CVE)",
        ip: "scanner.internal:9000",
        description: "Scans code for OWASP Top 10 vulnerabilities, code smells, test coverage (>80%), and scans Docker layers for CVEs.",
        specs: { "Trivy Scan": "CRITICAL,HIGH abort", "Sonar Quality Gate": "PASSED (Rating A)", "Secret Leak Check": "0 Detected" },
        terraform: `# Trivy Security Scan Step in GitHub Actions
- name: Run Trivy Vulnerability Scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'myapp:\${{ github.sha }}'
    format: 'table'
    exit-code: '1'
    ignore-unfixed: true
    vuln-type: 'os,library'
    severity: 'CRITICAL,HIGH'`
      },
      {
        id: "node-ecr-registry",
        label: "AWS ECR Immutable Registry",
        sublabel: "aws-ecr/production-services",
        tier: "Artifact Store",
        icon: "Package",
        status: "Encrypted",
        ip: "AWS US-East-1",
        description: "Stores multi-architecture Docker container images with immutable image tags and automatic scanning on push.",
        specs: { "Tag Immutability": "Enabled", "Encryption": "KMS Customer Managed Key", "Lifecycle": "Expire untagged > 14 days" },
        terraform: `resource "aws_ecr_repository" "app_repo" {
  name                 = "girish-production-services"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
    kms_key         = aws_kms_key.ecr_key.arn
  }
}`
      },
      {
        id: "node-canary-prod",
        label: "Canary Automated Deployment",
        sublabel: "Argo Rollouts (5% -> 25% -> 100%)",
        tier: "Deployment Gate",
        icon: "Cloud",
        status: "Promoting",
        ip: "AWS EKS Cluster",
        description: "Progressive traffic rollout that monitors error rates and p99 latency before shifting 100% of live user traffic.",
        specs: { "Rollout Tool": "Argo Rollouts", "Step 1": "5% (3 min pause)", "Step 2": "25% (5 min pause)", "Rollback": "Automated" },
        terraform: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api-rollout
spec:
  replicas: 10
  strategy:
    canary:
      steps:
      - setWeight: 5
      - pause: { duration: 3m }
      - setWeight: 25
      - pause: { duration: 5m }
      - setWeight: 100`
      }
    ],
    connections: [
      { from: "node-commit-gate", to: "node-runner", label: "Dispatches workflow", protocol: "Webhook" },
      { from: "node-runner", to: "node-sast-trivy", label: "Executes test & SAST", protocol: "CLI pipe" },
      { from: "node-sast-trivy", to: "node-ecr-registry", label: "Docker Push on Pass", protocol: "Docker TLS" },
      { from: "node-ecr-registry", to: "node-canary-prod", label: "Pulls verified image", protocol: "IAM OIDC" }
    ]
  }
];
