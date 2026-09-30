import React, { useState, useEffect } from 'react';
import { architectureTopologies } from '../data/architectureData';
import {
  Server,
  Cloud,
  Globe,
  Database,
  Shield,
  Layers,
  Activity,
  Cpu,
  GitBranch,
  Play,
  RotateCcw,
  Check,
  Copy,
  ChevronRight,
  ExternalLink,
  Zap,
  Info,
  Sliders,
  ArrowRight
} from 'lucide-react';
import './ArchitectureLab.css';

const iconMap = {
  Server: Server,
  Cloud: Cloud,
  Globe: Globe,
  Database: Database,
  Shield: Shield,
  Layers: Layers,
  Activity: Activity,
  Cpu: Cpu,
  GitBranch: GitBranch,
};

export default function ArchitectureLab() {
  const [selectedTopologyId, setSelectedTopologyId] = useState(architectureTopologies[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState(architectureTopologies[0].nodes[0].id);
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState(true);
  const [packetCount, setPacketCount] = useState(14820);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState('all');
  const [simulatedFailure, setSimulatedFailure] = useState(null);

  const currentTopology = architectureTopologies.find((t) => t.id === selectedTopologyId) || architectureTopologies[0];
  const currentNode = currentTopology.nodes.find((n) => n.id === selectedNodeId) || currentTopology.nodes[0];

  // When topology changes, select its first node
  useEffect(() => {
    if (!currentTopology.nodes.some((n) => n.id === selectedNodeId)) {
      setSelectedNodeId(currentTopology.nodes[0]?.id || null);
    }
  }, [selectedTopologyId]);

  // Traffic counter ticker
  useEffect(() => {
    if (!isSimulatingTraffic) return;
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 8) + 1);
    }, 400);
    return () => clearInterval(interval);
  }, [isSimulatingTraffic]);

  const handleCopyTerraform = () => {
    if (!currentNode?.terraform) return;
    navigator.clipboard.writeText(currentNode.terraform);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleFailoverSimulation = () => {
    if (simulatedFailure) {
      setSimulatedFailure(null);
    } else {
      // Pick a compute or app node to simulate failure
      const targetNode = currentTopology.nodes.find(n => n.id.includes('app') || n.id.includes('pods') || n.id.includes('asg')) || currentTopology.nodes[1];
      setSimulatedFailure(targetNode.id);
      setTimeout(() => {
        // Auto heal after 6s
        setSimulatedFailure(null);
      }, 7000);
    }
  };

  // Get unique tiers for filtering
  const allTiers = ['all', ...new Set(currentTopology.nodes.map(n => n.tier))];

  const filteredNodes = activeTierFilter === 'all'
    ? currentTopology.nodes
    : currentTopology.nodes.filter(n => n.tier === activeTierFilter);

  return (
    <div className="architecture-lab-page">
      {/* Header Banner */}
      <section className="arch-hero-section">
        <div className="container">
          <div className="arch-breadcrumb">
            <a href="#/" className="breadcrumb-link">Home</a>
            <ChevronRight size={14} />
            <span className="breadcrumb-current">Architecture Lab</span>
          </div>

          <div className="arch-hero-badge">
            <Zap size={14} className="badge-zap" />
            <span>Interactive Infrastructure Visualizer</span>
          </div>

          <h1 className="arch-hero-title">
            Cloud & DevOps <span className="gradient-text">Architecture Lab</span>
          </h1>
          <p className="arch-hero-desc">
            Explore battle-tested multi-AZ cloud topologies, declarative GitOps clusters, and zero-trust delivery pipelines. Inspect raw Terraform IaC, trigger live traffic simulations, and test automated failover recovery.
          </p>

          {/* Topology Selector Tabs */}
          <div className="topology-tabs">
            {architectureTopologies.map((top) => (
              <button
                key={top.id}
                onClick={() => {
                  setSelectedTopologyId(top.id);
                  setSimulatedFailure(null);
                }}
                className={`topology-tab-btn ${selectedTopologyId === top.id ? 'active' : ''}`}
              >
                <div className="tab-pill-icon">
                  <Cloud size={16} />
                </div>
                <div className="tab-text-wrap">
                  <span className="tab-title">{top.name}</span>
                  <span className="tab-category">{top.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Studio Canvas */}
      <section className="arch-canvas-section">
        <div className="container">
          {/* Top Control Bar */}
          <div className="canvas-control-bar">
            <div className="topology-meta">
              <div className="meta-item">
                <span className="meta-label">Topology Status</span>
                <span className="meta-val status-val-online">
                  <span className="pulse-dot green" />
                  {simulatedFailure ? 'Self-Healing in Progress' : currentTopology.status}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Target SLA</span>
                <span className="meta-val">{currentTopology.sla}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Telemetry Latency</span>
                <span className="meta-val">{currentTopology.latency}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Synthetic Packets</span>
                <span className="meta-val font-mono">
                  {packetCount.toLocaleString()} reqs
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="canvas-actions">
              <button
                onClick={() => setIsSimulatingTraffic(!isSimulatingTraffic)}
                className={`btn btn-sm ${isSimulatingTraffic ? 'btn-active-glow' : 'btn-outline'}`}
                title="Toggle synthetic traffic packet visualization"
              >
                <Play size={14} className={isSimulatingTraffic ? 'icon-spin-subtle' : ''} />
                <span>{isSimulatingTraffic ? 'Traffic Streaming' : 'Resume Traffic'}</span>
              </button>

              <button
                onClick={toggleFailoverSimulation}
                className={`btn btn-sm ${simulatedFailure ? 'btn-danger-active' : 'btn-outline'}`}
                title="Simulate container failure and automated recovery"
              >
                <RotateCcw size={14} />
                <span>{simulatedFailure ? 'Simulating Recovery...' : 'Simulate Failover'}</span>
              </button>
            </div>
          </div>

          {/* Tier Filters */}
          <div className="tier-filter-row">
            <span className="tier-filter-label">
              <Sliders size={13} />
              Filter Tier:
            </span>
            <div className="tier-filter-buttons">
              {allTiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTierFilter(tier)}
                  className={`tier-pill ${activeTierFilter === tier ? 'active' : ''}`}
                >
                  {tier === 'all' ? 'All Components' : tier}
                </button>
              ))}
            </div>
          </div>

          {/* Topology Split Grid */}
          <div className="topology-grid-layout">
            {/* Visual Node Graph */}
            <div className="topology-nodes-panel">
              <div className="panel-header">
                <h3>Architecture Components ({filteredNodes.length})</h3>
                <span className="panel-hint">Click any node to inspect declarative IaC specifications</span>
              </div>

              {simulatedFailure && (
                <div className="failover-alert-banner">
                  <div className="failover-dot-pulse" />
                  <div className="failover-alert-text">
                    <strong>Auto-Healing Active:</strong> Node health probe failed. AWS Auto Scaling / Kubernetes replica controller is provisioning replacement container...
                  </div>
                </div>
              )}

              <div className="nodes-flow-container">
                {filteredNodes.map((node, index) => {
                  const IconComponent = iconMap[node.icon] || Server;
                  const isSelected = currentNode?.id === node.id;
                  const isFailing = simulatedFailure === node.id;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`arch-node-card ${isSelected ? 'selected' : ''} ${isFailing ? 'node-failed' : ''}`}
                    >
                      <div className="node-card-top">
                        <div className="node-icon-wrapper">
                          <IconComponent size={20} />
                        </div>
                        <div className="node-tier-tag">{node.tier}</div>
                        <div className={`node-health-badge ${isFailing ? 'badge-failed' : 'badge-healthy'}`}>
                          <span className={`status-indicator ${isFailing ? 'red' : 'green'}`} />
                          <span>{isFailing ? 'Recovering' : node.status}</span>
                        </div>
                      </div>

                      <div className="node-card-body">
                        <h4 className="node-title">{node.label}</h4>
                        <span className="node-sublabel">{node.sublabel}</span>
                        <p className="node-description-short">{node.description}</p>
                      </div>

                      <div className="node-card-footer">
                        <span className="node-ip-tag">{node.ip}</span>
                        <span className="inspect-prompt">
                          <span>Inspect IaC</span>
                          <ArrowRight size={13} />
                        </span>
                      </div>

                      {isSimulatingTraffic && !isFailing && (
                        <div className="node-traffic-pulse-bar" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Topology Connections Flow Indicator */}
              <div className="connections-summary-card">
                <div className="conn-title">
                  <Activity size={15} />
                  <span>Configured Traffic Interconnects</span>
                </div>
                <div className="conn-list">
                  {currentTopology.connections.map((conn, idx) => (
                    <div key={idx} className="conn-chip">
                      <span className="conn-label">{conn.label}</span>
                      <span className="conn-proto font-mono">[{conn.protocol}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Component Inspector / IaC Drawer */}
            <div className="topology-inspector-panel">
              {currentNode ? (
                <div className="inspector-inner">
                  <div className="inspector-header">
                    <div className="inspector-title-group">
                      <span className="inspector-tag">{currentNode.tier}</span>
                      <h3>{currentNode.label}</h3>
                      <span className="inspector-sublabel font-mono">{currentNode.sublabel}</span>
                    </div>
                    <div className="inspector-status-pill">
                      <span className="pulse-dot green" />
                      <span>{currentNode.status}</span>
                    </div>
                  </div>

                  <p className="inspector-desc">{currentNode.description}</p>

                  {/* Specifications Grid */}
                  <div className="specs-section">
                    <h4 className="specs-heading">Runtime & Infrastructure Specs</h4>
                    <div className="specs-grid">
                      {Object.entries(currentNode.specs).map(([key, val]) => (
                        <div key={key} className="spec-card">
                          <span className="spec-key">{key}</span>
                          <span className="spec-val font-mono">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terraform / Manifest Code block */}
                  <div className="code-block-wrapper">
                    <div className="code-block-header">
                      <span className="code-lang-label">
                        {currentNode.terraform.includes('apiVersion') ? 'Kubernetes Manifest (YAML)' : 'Terraform HCL'}
                      </span>
                      <button
                        onClick={handleCopyTerraform}
                        className="copy-code-btn"
                        title="Copy configuration snippet"
                      >
                        {copiedCode ? (
                          <>
                            <Check size={13} style={{ color: 'var(--accent-emerald)' }} />
                            <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy IaC</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="arch-code-snippet font-mono">
                      <code>{currentNode.terraform}</code>
                    </pre>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="inspector-footer">
                    <a
                      href="#contact"
                      className="btn btn-outline btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Discuss this Architecture with Girish</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="empty-inspector">
                  <Info size={28} />
                  <p>Select any architecture component from the graph to inspect its specifications and code.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
