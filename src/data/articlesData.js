export const articlesData = [
  {
    id: "eks-gitops-zero-downtime",
    title: "Zero-Downtime Blue/Green & Canary Deployments on AWS EKS with ArgoCD",
    slug: "eks-gitops-zero-downtime",
    category: "GitOps & Kubernetes",
    tagline: "How we eliminated deployment outages and automated rollbacks using Argo Rollouts and Prometheus metrics analysis.",
    readTime: "6 min read",
    date: "February 2026",
    author: "Girish Sharma",
    likes: 84,
    tags: ["Kubernetes", "ArgoCD", "Argo Rollouts", "AWS EKS", "Zero-Downtime", "Prometheus"],
    summary: "A production case study on evolving from brute-force rolling deployments to intelligent metric-driven canary releases on Amazon EKS with ArgoCD.",
    sections: [
      {
        heading: "1. The Problem with Naive Rolling Updates",
        content: `In microservice architectures, standard Kubernetes RollingUpdates often mask critical runtime failures. A newly deployed pod might pass a simple TCP liveness probe and enter the Ready state, but immediately start throwing 500 errors when hit with real, distributed database queries. By the time human operators notice the spike on Grafana, all healthy pods have already been terminated.
        
To achieve genuine zero-downtime resilience, our deployment system required three capabilities:
- Progressive traffic shifting (e.g. 5% -> 20% -> 50% -> 100%)
- Real-time telemetry gates measuring HTTP 5xx error rate and p99 latency
- Instant, automated rollback without any human intervention when thresholds breach.`
      },
      {
        heading: "2. Architectural Blueprint: Argo Rollouts + Ingress NGINX",
        content: `We replaced standard Deployment manifests with \`argoproj.io/v1alpha1 Rollout\` custom resources. Argo Rollouts dynamically manipulates the service routing weights in our NGINX Ingress controller using canary annotations.`,
        code: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: payment-service-rollout
  namespace: production
spec:
  replicas: 10
  strategy:
    canary:
      canaryService: payment-svc-canary
      stableService: payment-svc-stable
      trafficRouting:
        nginx:
          stableIngress: payment-ingress
      steps:
      - setWeight: 5
      - pause: { duration: 3m }
      - analysis:
          templates:
          - templateName: prometheus-error-rate-check
      - setWeight: 25
      - pause: { duration: 5m }
      - setWeight: 100`,
        codeLanguage: "yaml"
      },
      {
        heading: "3. Automated Metric Analysis Gate with Prometheus",
        content: `During the 5% traffic canary step, an AnalysisRun query runs against our in-cluster Prometheus server every 30 seconds. If the HTTP 5xx error rate exceeds 0.5% over a 3-minute window, the rollout is instantly aborted and traffic reverts 100% back to the stable replica set in under 4 seconds.`,
        code: `apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: prometheus-error-rate-check
spec:
  metrics:
  - name: success-rate
    interval: 30s
    successCondition: result[0] <= 0.005
    failureLimit: 2
    provider:
      prometheus:
        address: http://prometheus-server.monitoring.svc:9090
        query: |
          sum(rate(nginx_ingress_controller_requests{status=~"5.*", service="payment-svc-canary"}[1m]))
          /
          sum(rate(nginx_ingress_controller_requests{service="payment-svc-canary"}[1m]))`,
        codeLanguage: "yaml"
      },
      {
        heading: "4. Results & Lessons Learned",
        content: `Key takeaways from running this GitOps pattern across 14 microservices:
1. **Zero Incidents During Peak Hours**: We deployed 250+ automated releases to production during business hours with 0 customer-facing downtime.
2. **Fast Blast-Radius Containment**: A bad database migration commit in v2.4.1 was detected during the 5% canary step and auto-reverted before 95% of users were ever routed to it.
3. **Auditability**: Every change is anchored to a signed Git commit in our GitOps repository, providing complete compliance tracking.`
      }
    ]
  },
  {
    id: "terraform-multi-az-state-locking",
    title: "Production Terraform Architecture: S3 State Locking, Least-Privilege IAM & Checkov",
    slug: "terraform-multi-az-state-locking",
    category: "Cloud & IaC",
    tagline: "Hardening multi-environment AWS infrastructure as code pipelines with atomic locks, modular reuse, and static security linting.",
    readTime: "8 min read",
    date: "January 2026",
    author: "Girish Sharma",
    likes: 92,
    tags: ["Terraform", "AWS", "DynamoDB", "S3", "Security", "Checkov"],
    summary: "A practical guide to structuring enterprise-ready Terraform code that prevents state corruption, enforces encryption, and eliminates hardcoded secrets.",
    sections: [
      {
        heading: "1. Why Local State and Unlocked Backends Are Disasters",
        content: `When multiple engineers or automated CI runners execute \`terraform apply\` concurrently without distributed locking, state files get overwritten or corrupted. Worse, when sensitive outputs like database credentials are stored in unencrypted S3 buckets without versioning, accidental bucket wipes or security leaks become catastrophic.
        
Our enterprise baseline requires:
- S3 Remote State with AES-256 server-side encryption via AWS KMS
- DynamoDB table with \`LockID\` partition key to provide atomic mutex locking
- S3 Object Versioning to permit instant rollback to prior state snapshots
- Explicit TLS enforcement policies on the state bucket.`
      },
      {
        heading: "2. Backend Configuration with State Locking",
        content: `Here is the production backend setup implemented across our Dev, Staging, and Prod workspaces:`,
        code: `terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }

  backend "s3" {
    bucket         = "girish-terraform-state-prod"
    key            = "vpc/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "girish-terraform-locks"
  }
}`,
        codeLanguage: "hcl"
      },
      {
        heading: "3. Modular Directory Structure",
        content: `We organize our infrastructure into separate modules and environment roots to strictly limit the blast radius:
        
\`\`\`bash
├── modules/
│   ├── networking/      # VPC, Subnets, Route Tables, NAT Gateways
│   ├── compute/         # Auto Scaling Groups, Launch Templates, ALB
│   └── database/        # RDS Aurora PostgreSQL, KMS Keys, Subnet Groups
└── environments/
    ├── dev/             # Minimal replicas, small t4g instances
    ├── staging/         # Exact prod mirror for integration testing
    └── prod/            # Multi-AZ, deletion protection, strict backups
\`\`\`
By decoupling networking from compute and databases into independent state files, changes to an application launch template can never accidentally touch or destroy the VPC or database state.`
      },
      {
        heading: "4. Automated Static Analysis with Checkov in GitHub Actions",
        content: `We enforce automated policy-as-code linting before any PR can be merged using Checkov:`,
        code: `- name: Run Checkov Security Scan
  uses: bridgecrewio/checkov-action@master
  with:
    directory: 'terraform/'
    framework: 'terraform'
    output_format: 'cli'
    soft_fail: false # Blocks PR on HIGH or CRITICAL violations`,
        codeLanguage: "yaml"
      }
    ]
  },
  {
    id: "shrink-docker-images-distroless",
    title: "Shrinking Production Docker Images by 72% with Multi-Stage Alpine & Distroless Builds",
    slug: "shrink-docker-images-distroless",
    category: "Containers & Security",
    tagline: "Eliminating attack surfaces and deployment network overhead by transitioning microservices to minimal distroless containers.",
    readTime: "5 min read",
    date: "December 2025",
    author: "Girish Sharma",
    likes: 110,
    tags: ["Docker", "Containers", "Distroless", "DevSecOps", "Trivy", "Security"],
    summary: "How we cut Docker image sizes from 850MB to 42MB, sped up Kubernetes pod pull times by 4x, and wiped out 94% of Trivy vulnerability findings.",
    sections: [
      {
        heading: "1. The Problem: Bloated Containers and Hidden CVEs",
        content: `A default Node.js or Python base image (\`node:20\` or \`python:3.11\`) weighs between 800MB and 1.1GB. These bulky base images bundle full operating system toolchains: compilers, curl, wget, python, package managers like apt/yum, and hundreds of OS libraries.
        
In production, these tools are not just dead weight that clogs registry bandwidth and slows down Kubernetes autoscaling; they are dangerous attack primitives. If an attacker gains remote code execution, having \`curl\` or \`bash\` pre-installed makes privilege escalation and data exfiltration trivial.`
      },
      {
        heading: "2. The Multi-Stage Distroless Solution",
        content: `Google's Distroless images contain *only* the application runtime and minimal shared libraries. There is no package manager, no shell (\`/bin/sh\`), and no root login.
        
Here is our hardened multi-stage Dockerfile:`,
        code: `# Stage 1: Build & Dependency Resolution
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Stage 2: Hardened Distroless Production Runtime
FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app
# Copy only the compiled artifacts and node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Enforce non-root execution (UID 65532)
USER 65532:65532
EXPOSE 3000
CMD ["dist/server.js"]`,
        codeLanguage: "dockerfile"
      },
      {
        heading: "3. Quantitative Benchmarks",
        content: `The results were dramatic across all performance metrics:
- **Image Size**: Reduced from 842 MB to 48 MB (94.3% reduction)
- **Kubernetes Pod Startup Pull Time**: Decreased from 18.4s to 3.8s on cold nodes
- **Trivy Vulnerability Count**: Dropped from 38 CVEs (4 High, 1 Critical) to **0 Vulnerabilities**
- **Security Posture**: Even if an exploit triggers, no shell exists for lateral network movement.`
      }
    ]
  },
  {
    id: "observability-prometheus-grafana-slo",
    title: "Building an Observable Cloud: High-Throughput Metrics with Prometheus, Alertmanager & Grafana",
    slug: "observability-prometheus-grafana-slo",
    category: "Observability",
    tagline: "Architecting a multi-tiered monitoring stack based on Google's SRE Golden Signals and proactive Alertmanager routing.",
    readTime: "7 min read",
    date: "November 2025",
    author: "Girish Sharma",
    likes: 76,
    tags: ["Prometheus", "Grafana", "Alertmanager", "SRE", "Observability", "DevOps"],
    summary: "Transforming reactive monitoring into proactive observability with Prometheus scrape optimizations, recording rules, and Slack alert grouping.",
    sections: [
      {
        heading: "1. The 4 Golden Signals Framework",
        content: `Rather than drowning engineers in hundreds of meaningless alerts (e.g. temporary CPU spikes on batch workers), our observability stack focuses strictly on the 4 Golden Signals:
1. **Latency**: Time taken to service a request (measured at p50, p95, and p99 percentiles).
2. **Traffic**: Demand on the system (HTTP requests per second or IOPS).
3. **Errors**: Rate of requests that fail (HTTP 5xx status codes or dropped packets).
4. **Saturation**: How full the service is (memory buffer capacity, connection pool depth).`
      },
      {
        heading: "2. High-Performance Prometheus Recording Rules",
        content: `Calculating real-time 99th percentile latencies across millions of data points causes heavy query latency during dashboard refresh. We deployed Prometheus Recording Rules that pre-compute intensive PromQL expressions into lightweight metrics:`,
        code: `groups:
  - name: service_slo_rules
    rules:
      - record: job:http_latency_p99:rate5m
        expr: histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, job))

      - record: job:http_error_rate:ratio5m
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m]))`,
        codeLanguage: "yaml"
      },
      {
        heading: "3. Intelligent Alert Routing Tree",
        content: `Alertmanager was configured with intelligent grouping, inhibition rules, and routing trees:
- **P1 Critical (Page On-Call)**: Error rate > 2% for 2 mins or cluster nodes NotReady. Dispatches to PagerDuty + Emergency Slack channel.
- **P2 Warning (Team Slack)**: Disk utilization > 85%, memory saturation > 80% for 15 mins.
- **Inhibition Rules**: If an entire host is down (\`InstanceDown\`), mute all child alerts for individual microservices running on that host to prevent notification floods.`
      }
    ]
  },
  {
    id: "postmortem-coredns-exhaustion",
    title: "Post-Mortem: Troubleshooting Kubernetes DNS Resolution Latency Under Spike Traffic",
    slug: "postmortem-coredns-exhaustion",
    category: "Incident Post-Mortem",
    tagline: "Root cause analysis and resolution of 5-second DNS timeouts during peak microservices load.",
    readTime: "6 min read",
    date: "October 2025",
    author: "Girish Sharma",
    likes: 125,
    tags: ["Kubernetes", "CoreDNS", "Networking", "Linux", "Troubleshooting", "Post-Mortem"],
    summary: "How we diagnosed Linux conntrack table race conditions causing intermittent 5000ms socket timeouts, and deployed NodeLocal DNSCache to permanently solve it.",
    sections: [
      {
        heading: "1. Incident Description & Symptoms",
        content: `At 14:15 UTC during an e-commerce flash sale event, application microservices began experiencing random 5000ms latency spikes. While database queries and internal compute CPU remained under 40%, HTTP response times degraded severely.
        
A key clue emerged in the logs: multiple internal microservice calls failed with \`java.net.UnknownHostException\` and timeout errors after exactly 5.0 seconds.`
      },
      {
        heading: "2. Root Cause Analysis (The 5s DNS Race Condition)",
        content: `Why exactly 5 seconds? In Linux glibc, standard resolver timeout is 5 seconds.
        
When a Kubernetes pod initiates an external or service DNS query via UDP, the Linux kernel's Netfilter/conntrack subsystem handles source and destination NAT translation. Under heavy multi-threaded connection concurrency:
- Two UDP queries (A record and AAAA record) are dispatched simultaneously from the same socket.
- Both packets attempt to create a conntrack entry with the same tuple.
- The kernel drops one of the packets due to a lock contention race condition in conntrack NAT.
- The application socket waits for 5 seconds before retrying!`
      },
      {
        heading: "3. The Permanent Solution: NodeLocal DNSCache",
        content: `We implemented two permanent architectural fixes:
1. **NodeLocal DNSCache DaemonSet**: Deploys a caching DNS agent on every Kubernetes worker node running on a link-local IP (\`169.254.20.10\`). Pods query local cache over TCP, bypassing iptables DNAT and conntrack race conditions completely.
2. **CoreDNS Autoscaler**: Configured linear horizontal pod autoscaling for CoreDNS based on total cluster core and pod counts.`,
        code: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-local-dns
  namespace: kube-system
spec:
  selector:
    matchLabels:
      k8s-app: node-local-dns
  template:
    metadata:
      labels:
        k8s-app: node-local-dns
    spec:
      hostNetwork: true
      containers:
      - name: node-cache
        image: registry.k8s.io/dns/k8s-dns-node-cache:1.22.28
        resources:
          limits: { memory: 60Mi }
          requests: { cpu: 50m, memory: 30Mi }`,
        codeLanguage: "yaml"
      },
      {
        heading: "4. Verification & Metrics After Deployment",
        content: `Post-implementation verification showed:
- DNS lookup p99 latency dropped from **5,002ms to 0.4ms**.
- 0 dropped conntrack packets across peak 35,000 req/sec load tests.
- CoreDNS central cluster load decreased by 85% thanks to local node caching.`
      }
    ]
  }
];
