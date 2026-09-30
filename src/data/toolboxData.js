export const sampleDockerfiles = {
  nodejs: `# Unoptimized Node.js Dockerfile
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]`,

  optimizedNodejs: `# Hardened Multi-Stage Distroless Node.js
# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Stage 2: Distroless Minimal Production Runtime
FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER 65532:65532
EXPOSE 3000
ENV NODE_ENV=production
CMD ["dist/index.js"]`,

  python: `# Unoptimized Python Dockerfile
FROM python:3.11
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "main.py"]`,

  optimizedPython: `# Hardened Multi-Stage Python Dockerfile
# Stage 1: Builder
FROM python:3.11-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Minimal Distroless / Slim Runtime
FROM python:3.11-slim
WORKDIR /app
RUN useradd -u 10001 -m appuser
COPY --from=builder /root/.local /home/appuser/.local
COPY . .
USER appuser
ENV PATH="/home/appuser/.local/bin:\$PATH"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,

  golang: `# Unoptimized Go Dockerfile
FROM golang:1.22
WORKDIR /go/src/app
COPY . .
RUN go build -o server .
EXPOSE 8080
CMD ["./server"]`,

  optimizedGolang: `# Scratch Ultra-Minimal Go Dockerfile (Size: < 15MB)
FROM golang:1.22-alpine AS builder
WORKDIR /build
RUN apk add --no-cache git ca-certificates
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o app .

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /build/app /app
USER 10001
EXPOSE 8080
ENTRYPOINT ["/app"]`
};

export const k8sCheatsheetCategories = [
  {
    id: "pods-deployments",
    title: "Pods & Deployments",
    commands: [
      {
        id: "cmd-get-pods",
        title: "List Pods with Node & IP Info",
        desc: "Display all pods in namespace with wide formatting showing node assignment and internal pod IP.",
        template: "kubectl get pods -n {namespace} -o wide --show-labels",
        category: "Pods"
      },
      {
        id: "cmd-restart-rollout",
        title: "Zero-Downtime Rolling Restart",
        desc: "Trigger a graceful rolling restart of all pods in a deployment without configuration changes.",
        template: "kubectl rollout restart deployment/{deployment} -n {namespace}",
        category: "Deployments"
      },
      {
        id: "cmd-rollout-history",
        title: "Check Deployment Rollout History & Status",
        desc: "Inspect deployment revisions and check current rolling update completion status.",
        template: "kubectl rollout status deployment/{deployment} -n {namespace}",
        category: "Deployments"
      },
      {
        id: "cmd-scale-hpa",
        title: "Manually Scale Deployment Replicas",
        desc: "Immediately scale the replica count of an active deployment up or down.",
        template: "kubectl scale deployment {deployment} --replicas={replicas} -n {namespace}",
        category: "Deployments"
      }
    ]
  },
  {
    id: "debugging-troubleshooting",
    title: "Troubleshooting & Live Logs",
    commands: [
      {
        id: "cmd-pod-logs-follow",
        title: "Stream Live Container Logs with Timestamps",
        desc: "Follow streaming logs from all replicas or specific pod with human-readable timestamps.",
        template: "kubectl logs -f -l app={appLabel} -n {namespace} --tail=100 --timestamps",
        category: "Logs"
      },
      {
        id: "cmd-exec-debug",
        title: "Interactive Shell into Running Pod",
        desc: "Spawn an interactive TTY shell into a target pod for live diagnosis.",
        template: "kubectl exec -it {podName} -n {namespace} -- /bin/sh",
        category: "Debug"
      },
      {
        id: "cmd-describe-events",
        title: "Describe Pod Failure Events & Probes",
        desc: "View recent Kubernetes cluster events, OOMKilled reasons, and liveness probe failures.",
        template: "kubectl describe pod {podName} -n {namespace}",
        category: "Debug"
      },
      {
        id: "cmd-port-forward",
        title: "Forward Port to Localhost",
        desc: "Securely map a remote pod or service port directly to your local development machine.",
        template: "kubectl port-forward svc/{serviceName} {localPort}:{remotePort} -n {namespace}",
        category: "Networking"
      }
    ]
  },
  {
    id: "helm-gitops",
    title: "Helm & GitOps Operations",
    commands: [
      {
        id: "cmd-helm-upgrade",
        title: "Atomic Helm Upgrade with Timeout & Rollback",
        desc: "Safely upgrade release and automatically roll back to previous state if deployment fails within 5 mins.",
        template: "helm upgrade --install {releaseName} ./charts/{chart} -n {namespace} --atomic --timeout 5m -f values-prod.yaml",
        category: "Helm"
      },
      {
        id: "cmd-helm-history",
        title: "View Helm Release History & Revisions",
        desc: "List all historical revisions and their corresponding status.",
        template: "helm history {releaseName} -n {namespace}",
        category: "Helm"
      },
      {
        id: "cmd-argocd-sync",
        title: "ArgoCD Force Sync & Prune via CLI",
        desc: "Instruct ArgoCD to immediately reconcile cluster state against target Git branch.",
        template: "argocd app sync {appName} --prune --force",
        category: "GitOps"
      }
    ]
  },
  {
    id: "cluster-admin",
    title: "Cluster Admin & Nodes",
    commands: [
      {
        id: "cmd-top-nodes",
        title: "Resource Utilization (CPU / Memory)",
        desc: "List real-time CPU cores and memory consumption per worker node via metrics-server.",
        template: "kubectl top nodes",
        category: "Cluster"
      },
      {
        id: "cmd-top-pods",
        title: "Top Resource Consuming Pods",
        desc: "Identify pods consuming the highest CPU or memory across the namespace.",
        template: "kubectl top pods -n {namespace} --sort-by=cpu",
        category: "Cluster"
      },
      {
        id: "cmd-drain-node",
        title: "Drain Worker Node for Maintenance",
        desc: "Safely evict all pods from a worker node before patching or termination.",
        template: "kubectl drain {nodeName} --ignore-daemonsets --delete-emptydir-data",
        category: "Maintenance"
      }
    ]
  }
];
