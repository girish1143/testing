export const personalInfo = {
  name: "Girish Sharma",
  title: "Associate Cloud & DevOps Engineer",
  subtitle: "Automating CI/CD pipelines, orchestrating Docker & Kubernetes workloads, and provisioning resilient cloud infrastructure with Terraform & AWS.",
  location: "Bangalore, India (Open to Relocation / Remote)",
  availability: "Actively Seeking DevOps & Cloud Roles",
  bio: "Passionate Cloud & DevOps Engineer specializing in end-to-end CI/CD automation, Docker containerization, and Infrastructure as Code using Terraform and AWS. Committed to eliminating deployment bottlenecks, enforcing security best practices, and architecting observable, zero-downtime cloud infrastructure.",
  email: "girish.sharma.dev@gmail.com",
  github: "https://github.com/girish-sharma",
  linkedin: "https://linkedin.com/in/girish-sharma-dev",
  twitter: "https://twitter.com/girish_codes",
  yearsExperience: "Fresher",
  projectsCount: "12+",
  satisfiedClients: "100%",
  codeContributions: "650+"
};

export const metrics = [
  { label: "Cloud & DevOps", value: "Hands-on", change: "AWS, Docker, K8s, IaC" },
  { label: "DevOps Projects", value: "12+", change: "CI/CD, IaC & K8s Repos" },
  { label: "Automated Deployments", value: "250+", change: "Zero Pipeline Downtime" },
  { label: "Infrastructure Uptime", value: "99.9%", change: "Prometheus & Grafana" }
];

export const skillsData = [
  {
    category: "Cloud & Infrastructure",
    description: "Architecting secure, cost-optimized, and repeatable cloud foundations",
    skills: [
      { name: "Amazon Web Services (AWS)", level: 90, highlight: true },
      { name: "Terraform (IaC)", level: 88, highlight: true },
      { name: "Linux Administration & Bash", level: 92, highlight: true },
      { name: "VPC, Subnets & Cloud Networking", level: 86 },
      { name: "IAM & Cloud Security Policies", level: 88 },
      { name: "Nginx Reverse Proxy & SSL", level: 85 }
    ]
  },
  {
    category: "Containers & Orchestration",
    description: "Packaging microservices and managing declarative cluster workloads",
    skills: [
      { name: "Docker & Multi-Stage Builds", level: 95, highlight: true },
      { name: "Kubernetes (K8s) & Minikube/EKS", level: 85, highlight: true },
      { name: "Docker Compose", level: 92 },
      { name: "Helm Package Manager", level: 82 },
      { name: "Pod Autoscaling (HPA) & Ingress", level: 80 },
      { name: "Microservice Container Networking", level: 84 }
    ]
  },
  {
    category: "CI/CD & Automation",
    description: "Building automated test, security scan, and deployment delivery pipelines",
    skills: [
      { name: "GitHub Actions Workflows", level: 94, highlight: true },
      { name: "Jenkins Pipeline (Declarative/Scripted)", level: 84, highlight: true },
      { name: "GitOps with ArgoCD", level: 82 },
      { name: "Git Version Control & Branching", level: 95 },
      { name: "SonarQube & Trivy Security Scans", level: 82 },
      { name: "Artifact Registries (DockerHub, ECR)", level: 88 }
    ]
  },
  {
    category: "Observability & Scripting",
    description: "Real-time system telemetry, proactive log aggregation, and task automation",
    skills: [
      { name: "Prometheus & Node Exporter", level: 88, highlight: true },
      { name: "Grafana Dashboards & Metrics", level: 90, highlight: true },
      { name: "Python for DevOps Automation", level: 85, highlight: true },
      { name: "Shell Scripting (Bash / Zsh)", level: 92 },
      { name: "AWS CloudWatch & Alarms", level: 84 },
      { name: "Alertmanager & Slack Webhooks", level: 86 }
    ]
  }
];

export const projectsData = [
  {
    id: "k8s-gitops-cluster",
    title: "GitOps Kubernetes Fleet",
    tagline: "Declarative Microservices Delivery via ArgoCD, Helm & AWS EKS",
    category: "Kubernetes & Docker",
    featured: true,
    bannerGradient: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
    metrics: "Zero-Downtime Rollouts | 100% Declarative Git State",
    description: "Production-ready Kubernetes cluster setup managed strictly through GitOps principles. Features automatic sync triggers with ArgoCD, Helm charts for microservice deployments, and ingress routing.",
    detailedDescription: "Designed to eliminate manual kubectl interventions in production. Integrated ArgoCD detects Git repository commits and automatically synchronizes application manifests to AWS EKS. Includes Horizontal Pod Autoscalers (HPA), readiness/liveness probes, and cert-manager automated TLS certificates.",
    techStack: ["Kubernetes", "ArgoCD", "Helm", "Docker", "AWS EKS", "GitHub Actions"],
    stars: 312,
    forks: 48,
    liveUrl: "https://github.com/girish-sharma/k8s-gitops-fleet",
    githubUrl: "https://github.com/girish-sharma/k8s-gitops-fleet",
    highlights: [
      "Automated canary & rolling updates with zero downtime",
      "Declarative Helm charts managing multi-environment configs (dev/staging/prod)",
      "Strict RBAC policies, NetworkPolicies, and resource quotas per namespace"
    ]
  },
  {
    id: "terraform-aws-architecture",
    title: "AWS 3-Tier Terraform Engine",
    tagline: "Automated Multi-AZ Infrastructure as Code with Remote State Locking",
    category: "Cloud & IaC",
    featured: true,
    bannerGradient: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
    metrics: "100% Automated Provisioning | Multi-AZ High Availability",
    description: "Complete modular Terraform codebase that provisions a highly available 3-tier AWS architecture with VPC, public/private subnets, NAT Gateways, ALB, Auto Scaling Groups, and RDS PostgreSQL.",
    detailedDescription: "Employs clean Terraform modular architecture with S3 remote state storage and DynamoDB state locking to prevent concurrent deployment collisions. Incorporates AWS IAM least-privilege security roles and security groups with zero hardcoded credentials.",
    techStack: ["Terraform", "AWS VPC", "EC2 Auto Scaling", "RDS PostgreSQL", "S3 & DynamoDB", "Bash"],
    stars: 245,
    forks: 39,
    liveUrl: "https://github.com/girish-sharma/terraform-aws-3tier",
    githubUrl: "https://github.com/girish-sharma/terraform-aws-3tier",
    highlights: [
      "Modular design reusable across multiple AWS environments and regions",
      "Automated state validation and linting via TFLint and Checkov",
      "Dynamic Auto Scaling based on CPU utilization and target tracking"
    ]
  },
  {
    id: "enterprise-cicd-pipeline",
    title: "Enterprise DevSecOps Pipeline",
    tagline: "Multi-Stage Automated CI/CD with Docker, Trivy & AWS ECS Deployment",
    category: "CI/CD & GitOps",
    featured: true,
    bannerGradient: "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
    metrics: "< 3.5 min Build-to-Deploy | Automated Security Scanning",
    description: "End-to-end GitHub Actions pipeline that triggers on code pushes, runs automated unit tests, performs Docker container image vulnerability scans with Trivy, and deploys to AWS ECS Fargate.",
    detailedDescription: "Transforms code pushes into secure production containers. If any critical CVE is found during Trivy vulnerability scanning, the pipeline automatically aborts and notifies engineers via Slack. Successful builds are tagged semantically, pushed to AWS ECR, and deployed to ECS via rolling update.",
    techStack: ["GitHub Actions", "Docker", "Trivy Scanner", "AWS ECS Fargate", "AWS ECR", "Slack API"],
    stars: 418,
    forks: 64,
    liveUrl: "https://github.com/girish-sharma/enterprise-devsecops-pipeline",
    githubUrl: "https://github.com/girish-sharma/enterprise-devsecops-pipeline",
    highlights: [
      "Automated Trivy container scanning preventing insecure image pushes",
      "Optimized multi-stage Docker builds reducing container footprint by 65%",
      "Automated Slack webhooks for instant build pass/fail alerts"
    ]
  },
  {
    id: "observability-prometheus-grafana",
    title: "Cloud Telemetry & Observability Hub",
    tagline: "Full-Stack Metrics, Node Exporters & Alertmanager Dashboarding",
    category: "Monitoring",
    featured: false,
    bannerGradient: "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
    metrics: "99.9% Uptime Telemetry | <15s Alert Latency",
    description: "Centralized monitoring infrastructure utilizing Prometheus, Grafana, and Alertmanager deployed via Docker Compose to monitor host metrics, container performance, and application endpoints.",
    detailedDescription: "Configured with customized Grafana dashboards tracking CPU, memory saturation, network I/O, and HTTP 5xx error spikes. Alertmanager rules route high-priority notifications to Slack and email when CPU thresholds exceed 85% for more than 2 minutes.",
    techStack: ["Prometheus", "Grafana", "Alertmanager", "Node Exporter", "Docker Compose", "cAdvisor"],
    stars: 189,
    forks: 27,
    liveUrl: "https://github.com/girish-sharma/observability-hub",
    githubUrl: "https://github.com/girish-sharma/observability-hub",
    highlights: [
      "Pre-configured Grafana boards for container and host telemetry",
      "Automated Alertmanager routing with severity classifications",
      "Persistent metric storage with Prometheus volume mounts"
    ]
  },
  {
    id: "nginx-reverse-proxy-ssl",
    title: "Zero-Downtime Nginx Ingress & SSL",
    tagline: "Automated Let's Encrypt SSL Renewal & Load Balancer with Docker",
    category: "CI/CD & GitOps",
    featured: false,
    bannerGradient: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
    metrics: "A+ SSL Rating | Sub-5ms Reverse Proxy Latency",
    description: "Containerized Nginx reverse proxy architecture equipped with automated Let's Encrypt SSL certificate generation, HTTP/2 enforcement, and gzip compression.",
    detailedDescription: "Provides secure ingress and traffic distribution for backend web services. Features an automated cron container that triggers SSL renewal without requiring service restarts, alongside rate-limiting rules to mitigate brute-force attempts.",
    techStack: ["Nginx", "Certbot", "Docker", "Bash", "Linux", "SSL/TLS"],
    stars: 142,
    forks: 18,
    liveUrl: "https://github.com/girish-sharma/nginx-docker-ssl",
    githubUrl: "https://github.com/girish-sharma/nginx-docker-ssl",
    highlights: [
      "A+ SSL Labs rating with modern TLS 1.3 cipher suites",
      "Automated certificate rotation via Certbot sidecar container",
      "Configured rate limiting and security headers (HSTS, CSP)"
    ]
  }
];

export const experienceData = [
  {
    role: "Cloud & DevOps Engineering Intern",
    company: "CloudMatrix Technologies",
    location: "Bangalore (Hybrid)",
    period: "2023 - 2024",
    description: "Assisted senior platform engineers in managing AWS cloud infrastructure, writing Docker multi-stage builds, and maintaining automated CI/CD deployment pipelines.",
    achievements: [
      "Containerized 4 legacy backend services using Docker multi-stage builds, cutting container sizes by 50% and improving local dev setup time.",
      "Constructed reusable GitHub Actions CI workflows for automated linting, test execution, and Docker Hub image publication.",
      "Configured Prometheus Node Exporter and built Grafana dashboards to monitor staging server CPU, memory, and container health.",
      "Authored Bash scripts to automate routine database backups to Amazon S3 with lifecycle transition policies."
    ],
    tech: ["AWS (EC2, S3, IAM)", "Docker", "GitHub Actions", "Prometheus", "Grafana", "Bash", "Linux"]
  },
  {
    role: "DevOps & Cloud Capstone Engineer",
    company: "University Cloud Computing Lab",
    location: "Bangalore",
    period: "2022 - 2023",
    description: "Engineered an end-to-end automated microservices deployment pipeline on a multi-node Kubernetes cluster as part of the engineering degree capstone.",
    achievements: [
      "Deployed and configured a 3-node Kubernetes cluster using Minikube and kubeadm for microservices hosting.",
      "Implemented GitOps deployment workflow using ArgoCD, reducing release deployment steps from manual scripts to a single Git commit.",
      "Wrote comprehensive Terraform configuration files to provision underlying cloud networking, VPCs, and security groups."
    ],
    tech: ["Kubernetes", "Terraform", "ArgoCD", "Helm", "Docker Compose", "Python", "Git"]
  },
  {
    role: "B.Tech in Computer Science & Engineering",
    company: "APJ Abdul Kalam Technological University",
    location: "India",
    period: "2020 - 2024",
    description: "Focused coursework in Cloud Computing, Operating Systems, Computer Networks, Distributed Systems, and Linux Shell Programming.",
    achievements: [
      "Graduated with Distinction (First Class with Honours).",
      "Led the University Linux & Open Source Club, conducting workshops on Docker, Git, and Cloud Infrastructure for 120+ students.",
      "Completed certifications: AWS Certified Cloud Practitioner & Docker Fundamentals."
    ],
    tech: ["Linux", "Operating Systems", "Networking", "Data Structures", "Python", "Bash"]
  }
];

export const testimonialsData = [
  {
    quote: "Girish demonstrates an exceptional grasp of DevOps fundamentals that is rare in a fresher. His grasp of Docker, Kubernetes manifests, and CI/CD pipelines made our staging releases completely painless.",
    name: "Vikram Rathore",
    title: "Senior DevOps Architect at CloudMatrix",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    quote: "What impressed me most about Girish was his proactive approach to automation. He took the initiative to set up our Grafana dashboards and automate our S3 backups without needing supervision.",
    name: "Pooja Nair",
    title: "Lead Systems Engineer at CloudMatrix",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    quote: "Girish spearheaded our team's GitOps adoption with ArgoCD and Helm. His documentation was crystal clear, and his infrastructure manifests were structured like a seasoned engineer's.",
    name: "Arun Menon",
    title: "Capstone Project Advisor & Professor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5
  }
];

export const terminalCommands = {
  help: "Available commands: 'about', 'skills', 'projects', 'status', 'architecture', 'contact', 'clear', 'sudo hire'",
  about: "Girish Sharma - Associate Cloud & DevOps Engineer specializing in AWS, Docker, Kubernetes, Terraform & CI/CD automation.",
  skills: "Core: AWS, Docker, Kubernetes, Terraform, GitHub Actions, Jenkins, Linux, Bash, Prometheus, Grafana, Python.",
  projects: "1. GitOps Kubernetes Fleet (ArgoCD & EKS)\n2. AWS 3-Tier Architecture (Terraform)\n3. Enterprise DevSecOps Pipeline (Trivy & ECS)\n4. Cloud Telemetry Hub (Prometheus & Grafana)",
  contact: "Email: girish.sharma.dev@gmail.com | LinkedIn: /in/girish-sharma-dev | GitHub: @girish-sharma",
  status: "🟢 DevOps Status: ALL CI/CD RUNNERS ONLINE | Cluster Health: 99.9% | Actively interviewing for Cloud/DevOps roles.",
  architecture: "Type 'architecture' or switch to the stack.json tab to view declarative cloud infrastructure details.",
  "sudo hire": "🎉 Sudo permission granted! Initializing fast-track interview protocol. Redirecting to contact..."
};
