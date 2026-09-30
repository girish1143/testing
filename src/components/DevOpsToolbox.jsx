import React, { useState, useMemo } from 'react';
import { sampleDockerfiles, k8sCheatsheetCategories } from '../data/toolboxData';
import {
  Wrench,
  Calculator,
  Container,
  Terminal,
  Check,
  Copy,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Search,
  Zap,
  Sliders,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import './DevOpsToolbox.css';

export default function DevOpsToolbox() {
  const [activeTool, setActiveTool] = useState('subnet'); // 'subnet' | 'dockerfile' | 'k8s'

  // ===================== SUBNET CALCULATOR STATE =====================
  const [ipAddress, setIpAddress] = useState('10.0.0.0');
  const [cidrPrefix, setCidrPrefix] = useState(24);
  const [copiedSubnetResult, setCopiedSubnetResult] = useState(false);

  // Subnet calculations
  const subnetDetails = useMemo(() => {
    try {
      const parts = ipAddress.trim().split('.').map(p => parseInt(p, 10));
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return { error: 'Please enter a valid IPv4 address (e.g. 10.0.0.0)' };
      }

      const prefix = parseInt(cidrPrefix, 10);
      if (isNaN(prefix) || prefix < 8 || prefix > 32) {
        return { error: 'CIDR prefix must be between /8 and /32' };
      }

      // Convert IP to 32-bit unsigned integer
      const ipNum = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
      
      // Calculate subnet mask
      const maskNum = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
      const maskParts = [
        (maskNum >>> 24) & 255,
        (maskNum >>> 16) & 255,
        (maskNum >>> 8) & 255,
        maskNum & 255
      ];
      const maskStr = maskParts.join('.');

      // Wildcard mask
      const wildcardParts = maskParts.map(p => 255 - p);
      const wildcardStr = wildcardParts.join('.');

      // Network address
      const networkNum = (ipNum & maskNum) >>> 0;
      const networkParts = [
        (networkNum >>> 24) & 255,
        (networkNum >>> 16) & 255,
        (networkNum >>> 8) & 255,
        networkNum & 255
      ];
      const networkStr = networkParts.join('.');

      // Broadcast address
      const broadcastNum = (networkNum | ~maskNum) >>> 0;
      const broadcastParts = [
        (broadcastNum >>> 24) & 255,
        (broadcastNum >>> 16) & 255,
        (broadcastNum >>> 8) & 255,
        broadcastNum & 255
      ];
      const broadcastStr = broadcastParts.join('.');

      // Total addresses
      const totalHosts = Math.pow(2, 32 - prefix);
      
      // Usable addresses (standard)
      const usableHosts = prefix >= 31 ? 0 : Math.max(0, totalHosts - 2);

      // AWS Reserved addresses: AWS reserves 5 IPs in every subnet
      // (.0 Network, .1 VPC Router, .2 Amazon DNS, .3 Future use, .255 Broadcast)
      const awsUsableHosts = prefix >= 29 ? Math.max(0, totalHosts - 5) : Math.max(0, totalHosts - 5);

      // First and last usable
      let firstUsableStr = 'N/A';
      let lastUsableStr = 'N/A';
      if (prefix <= 30) {
        const firstNum = (networkNum + 1) >>> 0;
        const lastNum = (broadcastNum - 1) >>> 0;
        firstUsableStr = [
          (firstNum >>> 24) & 255,
          (firstNum >>> 16) & 255,
          (firstNum >>> 8) & 255,
          firstNum & 255
        ].join('.');
        lastUsableStr = [
          (lastNum >>> 24) & 255,
          (lastNum >>> 16) & 255,
          (lastNum >>> 8) & 255,
          lastNum & 255
        ].join('.');
      }

      // Check IP scope
      const isPrivate =
        (parts[0] === 10) ||
        (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
        (parts[0] === 192 && parts[1] === 168);

      // Auto subnets calculation for Multi-AZ AWS architecture
      const subPrefix = Math.min(30, prefix + 2);
      const subChunkSize = Math.pow(2, 32 - subPrefix);
      const plannedSubnets = [0, 1, 2, 3].map((idx) => {
        const subNetNum = (networkNum + idx * subChunkSize) >>> 0;
        const subNetStr = [
          (subNetNum >>> 24) & 255,
          (subNetNum >>> 16) & 255,
          (subNetNum >>> 8) & 255,
          subNetNum & 255
        ].join('.');
        const names = [
          'Public Subnet AZ-A (ALB / Ingress)',
          'Public Subnet AZ-B (ALB / Ingress)',
          'Private App Subnet AZ-A (EC2 / K8s)',
          'Private App Subnet AZ-B (EC2 / K8s)'
        ];
        return {
          name: names[idx],
          cidr: `${subNetStr}/${subPrefix}`,
          hosts: Math.max(0, subChunkSize - 5)
        };
      });

      return {
        error: null,
        ipAddress: parts.join('.'),
        cidr: `${networkStr}/${prefix}`,
        mask: maskStr,
        wildcard: wildcardStr,
        network: networkStr,
        broadcast: broadcastStr,
        firstUsable: firstUsableStr,
        lastUsable: lastUsableStr,
        totalHosts,
        usableHosts,
        awsUsableHosts,
        isPrivate,
        plannedSubnets
      };
    } catch (e) {
      return { error: 'Calculation error. Check your inputs.' };
    }
  }, [ipAddress, cidrPrefix]);

  // ===================== DOCKERFILE LINTER STATE =====================
  const [dockerfileCode, setDockerfileCode] = useState(sampleDockerfiles.nodejs);
  const [activeTemplate, setActiveTemplate] = useState('nodejs');
  const [copiedDockerCode, setCopiedDockerCode] = useState(false);

  // Linting analysis rules engine
  const dockerLintReport = useMemo(() => {
    const lines = dockerfileCode.split('\n');
    const issues = [];
    let hasUser = false;
    let hasMultiStage = false;
    let fromCount = 0;
    let hasLatest = false;
    let hasAptWithoutCleanup = false;
    let copiesBeforePackage = false;
    let hasWorkdir = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('#') || !trimmed) return;

      if (trimmed.toUpperCase().startsWith('FROM ')) {
        fromCount++;
        if (trimmed.toUpperCase().includes(' AS ')) {
          hasMultiStage = true;
        }
        if (trimmed.includes(':latest')) {
          hasLatest = true;
          issues.push({
            id: 'latest-tag',
            line: index + 1,
            severity: 'warning',
            title: "Non-reproducible ':latest' tag used",
            desc: "Pin base images to explicit SHA digests or semantic versions (e.g. node:20-alpine or python:3.11-slim) to guarantee reproducible builds."
          });
        }
      }

      if (trimmed.toUpperCase().startsWith('USER ')) {
        hasUser = true;
      }

      if (trimmed.toUpperCase().startsWith('WORKDIR ')) {
        hasWorkdir = true;
      }

      if (trimmed.includes('apt-get install') && !trimmed.includes('rm -rf /var/lib/apt/lists')) {
        hasAptWithoutCleanup = true;
        issues.push({
          id: 'apt-cache',
          line: index + 1,
          severity: 'warning',
          title: 'Apt cache not purged after installation',
          desc: "Add 'rm -rf /var/lib/apt/lists/*' in the same RUN command to eliminate unnecessary MBs from image layers."
        });
      }

      if (trimmed.toUpperCase().startsWith('COPY . .') && index < 4 && !dockerfileCode.includes('package*.json')) {
        copiesBeforePackage = true;
      }
    });

    if (!hasUser) {
      issues.push({
        id: 'no-user',
        severity: 'critical',
        title: 'Container runs as ROOT user',
        desc: 'Missing explicit USER directive. If containerized code is compromised, attacker inherits root privileges on container and possible host breakout. Add a non-root user (e.g. USER 10001 or USER node).'
      });
    }

    if (fromCount === 1 && !hasMultiStage) {
      issues.push({
        id: 'no-multistage',
        severity: 'medium',
        title: 'Single-stage build includes build tools in production image',
        desc: 'Compilers, package managers, and devDependencies are shipped to production. Use a multi-stage Dockerfile to separate the builder layer from minimal runtime.'
      });
    }

    if (!hasWorkdir) {
      issues.push({
        id: 'no-workdir',
        severity: 'low',
        title: 'No explicit WORKDIR defined',
        desc: 'Commands execute in default root directory. Define WORKDIR /app to keep filesystem organized.'
      });
    }

    // Calculate score
    let score = 100;
    issues.forEach((iss) => {
      if (iss.severity === 'critical') score -= 35;
      else if (iss.severity === 'warning') score -= 20;
      else if (iss.severity === 'medium') score -= 15;
      else score -= 10;
    });
    score = Math.max(10, score);

    return {
      score,
      issues,
      hasUser,
      hasMultiStage
    };
  }, [dockerfileCode]);

  const loadTemplate = (key) => {
    setActiveTemplate(key);
    setDockerfileCode(sampleDockerfiles[key] || '');
  };

  const applyAutoOptimization = () => {
    if (activeTemplate === 'nodejs' || dockerfileCode.includes('node') || dockerfileCode.includes('npm')) {
      setDockerfileCode(sampleDockerfiles.optimizedNodejs);
      setActiveTemplate('optimizedNodejs');
    } else if (activeTemplate === 'python' || dockerfileCode.includes('python') || dockerfileCode.includes('pip')) {
      setDockerfileCode(sampleDockerfiles.optimizedPython);
      setActiveTemplate('optimizedPython');
    } else {
      setDockerfileCode(sampleDockerfiles.optimizedGolang);
      setActiveTemplate('optimizedGolang');
    }
  };

  // ===================== K8S CHEATSHEET STATE =====================
  const [k8sSearch, setK8sSearch] = useState('');
  const [k8sCategory, setK8sCategory] = useState('all');
  const [k8sVars, setK8sVars] = useState({
    namespace: 'production',
    deployment: 'core-api',
    podName: 'core-api-7d84b-9xj2q',
    serviceName: 'gateway-service',
    replicas: '4',
    appLabel: 'core-api',
    localPort: '8080',
    remotePort: '80',
    releaseName: 'microservices',
    chart: 'app-fleet',
    nodeName: 'ip-10-0-10-42.ec2.internal',
    appName: 'production-fleet'
  });
  const [copiedK8sCmd, setCopiedK8sCmd] = useState(null);

  const handleVarChange = (key, value) => {
    setK8sVars((prev) => ({ ...prev, [key]: value }));
  };

  const interpolateCommand = (template) => {
    let result = template;
    Object.entries(k8sVars).forEach(([k, v]) => {
      result = result.replaceAll(`{${k}}`, v || `{${k}}`);
    });
    return result;
  };

  const handleCopyK8s = (id, command) => {
    navigator.clipboard.writeText(command);
    setCopiedK8sCmd(id);
    setTimeout(() => setCopiedK8sCmd(null), 2000);
  };

  // Filter commands
  const filteredCommands = useMemo(() => {
    const list = [];
    k8sCheatsheetCategories.forEach((cat) => {
      if (k8sCategory !== 'all' && cat.id !== k8sCategory) return;
      cat.commands.forEach((cmd) => {
        const matchesSearch =
          !k8sSearch ||
          cmd.title.toLowerCase().includes(k8sSearch.toLowerCase()) ||
          cmd.desc.toLowerCase().includes(k8sSearch.toLowerCase()) ||
          cmd.template.toLowerCase().includes(k8sSearch.toLowerCase());
        if (matchesSearch) {
          list.push({ ...cmd, categoryTitle: cat.title });
        }
      });
    });
    return list;
  }, [k8sCategory, k8sSearch]);

  return (
    <div className="toolbox-page">
      {/* Header Banner */}
      <section className="toolbox-hero-section">
        <div className="container">
          <div className="arch-breadcrumb">
            <a href="#/" className="breadcrumb-link">Home</a>
            <ChevronRight size={14} />
            <span className="breadcrumb-current">DevOps Toolbox</span>
          </div>

          <div className="toolbox-badge">
            <Wrench size={14} />
            <span>Client-Side Cloud Utilities</span>
          </div>

          <h1 className="toolbox-hero-title">
            DevOps & Cloud <span className="gradient-text">Interactive Toolbox</span>
          </h1>
          <p className="toolbox-hero-desc">
            Production-grade developer utilities engineered for cloud architects: real-time CIDR Subnet Calculator with AWS allocation splitting, live Dockerfile Security Linter & Optimizer, and an interactive Kubernetes command generator.
          </p>

          {/* Primary Tool Switcher Tabs */}
          <div className="toolbox-main-tabs">
            <button
              onClick={() => setActiveTool('subnet')}
              className={`tool-switch-btn ${activeTool === 'subnet' ? 'active' : ''}`}
            >
              <div className="tool-tab-icon">
                <Calculator size={18} />
              </div>
              <div className="tool-tab-text">
                <span className="tool-title">CIDR & Subnet Calculator</span>
                <span className="tool-desc">AWS VPC allocation & host capacity</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTool('dockerfile')}
              className={`tool-switch-btn ${activeTool === 'dockerfile' ? 'active' : ''}`}
            >
              <div className="tool-tab-icon">
                <Container size={18} />
              </div>
              <div className="tool-tab-text">
                <span className="tool-title">Dockerfile Linter & Optimizer</span>
                <span className="tool-desc">Security checks, CVE prevention & distroless</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTool('k8s')}
              className={`tool-switch-btn ${activeTool === 'k8s' ? 'active' : ''}`}
            >
              <div className="tool-tab-icon">
                <Terminal size={18} />
              </div>
              <div className="tool-tab-text">
                <span className="tool-title">Kubernetes & Helm Generator</span>
                <span className="tool-desc">Dynamic parameters & copy-paste CLI</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tool Content Container */}
      <section className="tool-body-section">
        <div className="container">
          {/* ==================== 1. CIDR / SUBNET CALCULATOR ==================== */}
          {activeTool === 'subnet' && (
            <div className="subnet-tool-layout">
              <div className="tool-card inputs-card">
                <div className="card-top-title">
                  <Calculator size={18} className="icon-cyan" />
                  <h3>IP Network & Prefix Configuration</h3>
                </div>

                {/* Preset Chips */}
                <div className="subnet-presets-wrap">
                  <span className="preset-label">Quick Presets:</span>
                  <button
                    onClick={() => { setIpAddress('10.0.0.0'); setCidrPrefix(16); }}
                    className="preset-btn"
                  >
                    AWS VPC (10.0.0.0/16)
                  </button>
                  <button
                    onClick={() => { setIpAddress('192.168.0.0'); setCidrPrefix(20); }}
                    className="preset-btn"
                  >
                    K8s Pod CIDR (/20)
                  </button>
                  <button
                    onClick={() => { setIpAddress('10.0.1.0'); setCidrPrefix(24); }}
                    className="preset-btn"
                  >
                    Prod Subnet (/24)
                  </button>
                  <button
                    onClick={() => { setIpAddress('172.16.0.0'); setCidrPrefix(28); }}
                    className="preset-btn"
                  >
                    Bastion DMZ (/28)
                  </button>
                </div>

                <div className="input-fields-row">
                  <div className="input-group flex-2">
                    <label>IPv4 Network Base Address</label>
                    <input
                      type="text"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                      placeholder="e.g. 10.0.0.0"
                      className="tool-input font-mono"
                    />
                  </div>

                  <div className="input-group flex-1">
                    <label>CIDR Mask (/{cidrPrefix})</label>
                    <select
                      value={cidrPrefix}
                      onChange={(e) => setCidrPrefix(parseInt(e.target.value, 10))}
                      className="tool-select font-mono"
                    >
                      {Array.from({ length: 25 }, (_, i) => i + 8).map((p) => (
                        <option key={p} value={p}>
                          /{p} ({Math.pow(2, 32 - p).toLocaleString()} IPs)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Range Slider for quick visual tweaking */}
                <div className="cidr-slider-group">
                  <div className="slider-label-row">
                    <span>Subnet Mask Slider</span>
                    <span className="font-mono">/{cidrPrefix}</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="30"
                    value={cidrPrefix}
                    onChange={(e) => setCidrPrefix(parseInt(e.target.value, 10))}
                    className="cidr-range-input"
                  />
                </div>

                {subnetDetails.error ? (
                  <div className="tool-error-alert">
                    <AlertTriangle size={16} />
                    <span>{subnetDetails.error}</span>
                  </div>
                ) : (
                  <div className="subnet-metrics-cards">
                    <div className="metric-box highlight">
                      <span className="m-label">AWS VPC Usable Hosts</span>
                      <span className="m-val font-mono">{subnetDetails.awsUsableHosts.toLocaleString()}</span>
                      <span className="m-sub">5 AWS-reserved IPs deducted</span>
                    </div>
                    <div className="metric-box">
                      <span className="m-label">Total IP Addresses</span>
                      <span className="m-val font-mono">{subnetDetails.totalHosts.toLocaleString()}</span>
                      <span className="m-sub">2^{32 - cidrPrefix} total pool</span>
                    </div>
                    <div className="metric-box">
                      <span className="m-label">Network Scope</span>
                      <span className="m-val">
                        <span className={`scope-badge ${subnetDetails.isPrivate ? 'private' : 'public'}`}>
                          {subnetDetails.isPrivate ? 'RFC 1918 Private' : 'Public Routable'}
                        </span>
                      </span>
                      <span className="m-sub">Routing classification</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Subnet Results Card */}
              {!subnetDetails.error && (
                <div className="tool-card results-card">
                  <div className="card-top-title">
                    <Layers size={18} className="icon-purple" />
                    <h3>Address Range & AWS Subnet Partition</h3>
                  </div>

                  <div className="results-table">
                    <div className="res-row">
                      <span className="res-key">Full CIDR Representation</span>
                      <span className="res-val font-mono highlight">{subnetDetails.cidr}</span>
                    </div>
                    <div className="res-row">
                      <span className="res-key">Subnet Mask</span>
                      <span className="res-val font-mono">{subnetDetails.mask}</span>
                    </div>
                    <div className="res-row">
                      <span className="res-key">Wildcard Mask</span>
                      <span className="res-val font-mono">{subnetDetails.wildcard}</span>
                    </div>
                    <div className="res-row">
                      <span className="res-key">Network Address</span>
                      <span className="res-val font-mono">{subnetDetails.network}</span>
                    </div>
                    <div className="res-row">
                      <span className="res-key">First Usable Host</span>
                      <span className="res-val font-mono">{subnetDetails.firstUsable}</span>
                    </div>
                    <div className="res-row">
                      <span className="res-key">Last Usable Host</span>
                      <span className="res-val font-mono">{subnetDetails.lastUsable}</span>
                    </div>
                    <div className="res-row">
                      <span className="res-key">Broadcast Address</span>
                      <span className="res-val font-mono">{subnetDetails.broadcast}</span>
                    </div>
                  </div>

                  {/* Multi-AZ AWS Subnet Partition Planner */}
                  <div className="partition-planner">
                    <h4 className="planner-title">Automated Multi-AZ Subnet Allocation (4 Subnets)</h4>
                    <p className="planner-desc">
                      Recommended AWS VPC breakdown dividing this block into Public and Private subnets across 2 AZs:
                    </p>
                    <div className="planned-subnets-grid">
                      {subnetDetails.plannedSubnets.map((sub, idx) => (
                        <div key={idx} className="plan-subnet-chip">
                          <div className="chip-name">{sub.name}</div>
                          <div className="chip-cidr font-mono">{sub.cidr}</div>
                          <div className="chip-hosts">{sub.hosts.toLocaleString()} usable IPs</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== 2. DOCKERFILE LINTER & OPTIMIZER ==================== */}
          {activeTool === 'dockerfile' && (
            <div className="docker-tool-layout">
              {/* Left Column: Code Editor & Templates */}
              <div className="tool-card docker-editor-card">
                <div className="card-top-title">
                  <Container size={18} className="icon-cyan" />
                  <h3>Dockerfile Input & Multi-Stage Optimizer</h3>
                </div>

                <div className="template-selector-bar">
                  <span className="selector-label">Load Template:</span>
                  <div className="template-pills">
                    <button
                      onClick={() => loadTemplate('nodejs')}
                      className={`tpl-pill ${activeTemplate === 'nodejs' ? 'active' : ''}`}
                    >
                      Node.js (Bloated)
                    </button>
                    <button
                      onClick={() => loadTemplate('python')}
                      className={`tpl-pill ${activeTemplate === 'python' ? 'active' : ''}`}
                    >
                      Python FastAPI
                    </button>
                    <button
                      onClick={() => loadTemplate('golang')}
                      className={`tpl-pill ${activeTemplate === 'golang' ? 'active' : ''}`}
                    >
                      Go Minimal
                    </button>
                  </div>
                </div>

                <div className="docker-editor-wrap">
                  <textarea
                    value={dockerfileCode}
                    onChange={(e) => setDockerfileCode(e.target.value)}
                    className="docker-textarea font-mono"
                    spellCheck="false"
                    rows={16}
                  />
                </div>

                <div className="editor-bottom-bar">
                  <button
                    onClick={applyAutoOptimization}
                    className="btn btn-primary btn-sm"
                  >
                    <Sparkles size={14} />
                    <span>Auto-Optimize & Harden Dockerfile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(dockerfileCode);
                      setCopiedDockerCode(true);
                      setTimeout(() => setCopiedDockerCode(false), 2000);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    {copiedDockerCode ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedDockerCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Real-Time Security & Best Practices Report */}
              <div className="tool-card docker-report-card">
                <div className="card-top-title">
                  <ShieldCheck size={18} className="icon-emerald" />
                  <h3>Security & Best Practices Audit</h3>
                </div>

                {/* Score Dial */}
                <div className="audit-score-card">
                  <div className={`score-circle ${dockerLintReport.score >= 80 ? 'green' : dockerLintReport.score >= 50 ? 'amber' : 'red'}`}>
                    <span className="score-num font-mono">{dockerLintReport.score}%</span>
                    <span className="score-label">Score</span>
                  </div>
                  <div className="score-summary">
                    <h4 className="score-status">
                      {dockerLintReport.score >= 80
                        ? 'Production Hardened'
                        : dockerLintReport.score >= 50
                        ? 'Needs Optimization'
                        : 'Security Vulnerabilities Detected'}
                    </h4>
                    <p className="score-desc">
                      {dockerLintReport.issues.length === 0
                        ? 'Outstanding! Your container follows least-privilege non-root execution and multi-stage build best practices.'
                        : `Identified ${dockerLintReport.issues.length} potential improvements in layer caching and security posture.`}
                    </p>
                  </div>
                </div>

                {/* Issues List */}
                <div className="issues-list">
                  {dockerLintReport.issues.map((issue, idx) => (
                    <div key={idx} className={`issue-card severity-${issue.severity}`}>
                      <div className="issue-top">
                        <span className={`severity-tag ${issue.severity}`}>
                          {issue.severity.toUpperCase()}
                        </span>
                        {issue.line && (
                          <span className="issue-line font-mono">Line {issue.line}</span>
                        )}
                        <span className="issue-title">{issue.title}</span>
                      </div>
                      <p className="issue-desc">{issue.desc}</p>
                    </div>
                  ))}

                  {dockerLintReport.issues.length === 0 && (
                    <div className="all-clean-notice">
                      <ShieldCheck size={28} className="icon-emerald" />
                      <h4>Zero Vulnerabilities Found</h4>
                      <p>Non-root user verified, multi-stage runtime configured, and specific base tags pinned.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. KUBERNETES & HELM GENERATOR ==================== */}
          {activeTool === 'k8s' && (
            <div className="k8s-tool-layout">
              {/* Dynamic Variables Binding Bar */}
              <div className="tool-card k8s-vars-card">
                <div className="card-top-title">
                  <Sliders size={18} className="icon-cyan" />
                  <h3>Interactive Cluster Parameter Binding</h3>
                </div>
                <p className="vars-explanation">
                  Edit these parameters to dynamically interpolate into all commands below in real-time:
                </p>

                <div className="k8s-inputs-grid">
                  <div className="k8s-input-item">
                    <label>Namespace (-n)</label>
                    <input
                      type="text"
                      value={k8sVars.namespace}
                      onChange={(e) => handleVarChange('namespace', e.target.value)}
                      className="k8s-param-input font-mono"
                    />
                  </div>
                  <div className="k8s-input-item">
                    <label>Deployment Name</label>
                    <input
                      type="text"
                      value={k8sVars.deployment}
                      onChange={(e) => handleVarChange('deployment', e.target.value)}
                      className="k8s-param-input font-mono"
                    />
                  </div>
                  <div className="k8s-input-item">
                    <label>Pod Name</label>
                    <input
                      type="text"
                      value={k8sVars.podName}
                      onChange={(e) => handleVarChange('podName', e.target.value)}
                      className="k8s-param-input font-mono"
                    />
                  </div>
                  <div className="k8s-input-item">
                    <label>Service Name</label>
                    <input
                      type="text"
                      value={k8sVars.serviceName}
                      onChange={(e) => handleVarChange('serviceName', e.target.value)}
                      className="k8s-param-input font-mono"
                    />
                  </div>
                  <div className="k8s-input-item">
                    <label>Local Port</label>
                    <input
                      type="text"
                      value={k8sVars.localPort}
                      onChange={(e) => handleVarChange('localPort', e.target.value)}
                      className="k8s-param-input font-mono"
                    />
                  </div>
                  <div className="k8s-input-item">
                    <label>Remote Port</label>
                    <input
                      type="text"
                      value={k8sVars.remotePort}
                      onChange={(e) => handleVarChange('remotePort', e.target.value)}
                      className="k8s-param-input font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Cheatsheet Commands List */}
              <div className="k8s-commands-section">
                {/* Search & Category Pills */}
                <div className="k8s-filter-bar">
                  <div className="k8s-search-box">
                    <Search size={15} />
                    <input
                      type="text"
                      value={k8sSearch}
                      onChange={(e) => setK8sSearch(e.target.value)}
                      placeholder="Filter commands (e.g. logs, scale, rollout, helm)..."
                      className="k8s-search-input"
                    />
                  </div>

                  <div className="k8s-cat-pills">
                    <button
                      onClick={() => setK8sCategory('all')}
                      className={`k8s-pill ${k8sCategory === 'all' ? 'active' : ''}`}
                    >
                      All Commands
                    </button>
                    {k8sCheatsheetCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setK8sCategory(c.id)}
                        className={`k8s-pill ${k8sCategory === c.id ? 'active' : ''}`}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Commands Grid */}
                <div className="k8s-cards-grid">
                  {filteredCommands.map((cmd) => {
                    const generatedCmd = interpolateCommand(cmd.template);
                    const isCopied = copiedK8sCmd === cmd.id;

                    return (
                      <div key={cmd.id} className="k8s-cmd-card">
                        <div className="cmd-header">
                          <div>
                            <span className="cmd-cat-tag">{cmd.categoryTitle}</span>
                            <h4 className="cmd-title">{cmd.title}</h4>
                          </div>
                          <button
                            onClick={() => handleCopyK8s(cmd.id, generatedCmd)}
                            className="cmd-copy-btn"
                            title="Copy command to clipboard"
                          >
                            {isCopied ? (
                              <>
                                <Check size={13} style={{ color: 'var(--accent-emerald)' }} />
                                <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        <p className="cmd-desc">{cmd.desc}</p>

                        <div className="cmd-code-box font-mono">
                          <code>{generatedCmd}</code>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
