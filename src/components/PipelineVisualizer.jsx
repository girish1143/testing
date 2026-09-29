import React, { useState, useEffect, useRef } from 'react';
import { pipelineSimulatorStages } from '../data/portfolioData';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Terminal,
  GitBranch,
  ShieldCheck,
  Package,
  Server,
  Cloud,
  Activity,
  Copy,
  Check,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import './PipelineVisualizer.css';

export default function PipelineVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [stageStatuses, setStageStatuses] = useState(
    pipelineSimulatorStages.map((_, i) => (i === 0 ? 'completed' : 'idle'))
  );
  const [environment, setEnvironment] = useState('production-eks');
  const [activeSelectedStage, setActiveSelectedStage] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState(pipelineSimulatorStages[0].logs);
  const [copiedLog, setCopiedLog] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const logsEndRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayedLogs]);

  // Handle stage selection
  const handleSelectStage = (idx) => {
    setActiveSelectedStage(idx);
    setDisplayedLogs(pipelineSimulatorStages[idx].logs);
  };

  // Run full pipeline simulation
  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setElapsedTime(0);

    // Reset all statuses to idle
    setStageStatuses(pipelineSimulatorStages.map(() => 'idle'));
    setActiveStageIndex(0);
    setActiveSelectedStage(0);
    setDisplayedLogs(['[INIT] Triggering automated delivery workflow for environment: ' + environment]);

    let currentIdx = 0;
    const intervalTimer = setInterval(() => {
      setElapsedTime((prev) => +(prev + 0.1).toFixed(1));
    }, 100);

    const runStep = (idx) => {
      if (idx >= pipelineSimulatorStages.length) {
        clearInterval(intervalTimer);
        setIsRunning(false);
        setActiveStageIndex(pipelineSimulatorStages.length - 1);
        setDisplayedLogs((prev) => [
          ...prev,
          `\n======================================================`,
          `✨ [SUCCESS] All 6 pipeline security & rollout gates PASSED.`,
          `Deployment committed with zero downtime to AWS EKS cluster.`
        ]);
        return;
      }

      setActiveStageIndex(idx);
      setActiveSelectedStage(idx);
      setStageStatuses((prev) => {
        const next = [...prev];
        next[idx] = 'running';
        return next;
      });

      // Stream logs for this stage
      const currentStage = pipelineSimulatorStages[idx];
      setDisplayedLogs((prev) => [
        ...prev,
        `\n>>> [STAGE ${idx + 1}/6: ${currentStage.name.toUpperCase()}] ($ ${currentStage.command})`,
        ...currentStage.logs
      ]);

      const stepDelay = idx === 2 ? 1400 : idx === 4 ? 1300 : 1000;

      setTimeout(() => {
        setStageStatuses((prev) => {
          const next = [...prev];
          next[idx] = 'completed';
          return next;
        });
        runStep(idx + 1);
      }, stepDelay);
    };

    runStep(0);
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setActiveStageIndex(0);
    setActiveSelectedStage(0);
    setStageStatuses(pipelineSimulatorStages.map((_, i) => (i === 0 ? 'completed' : 'idle')));
    setDisplayedLogs(pipelineSimulatorStages[0].logs);
    setElapsedTime(0);
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(displayedLogs.join('\n'));
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const getStageIcon = (iconName, size = 18) => {
    switch (iconName) {
      case 'GitBranch':
        return <GitBranch size={size} />;
      case 'ShieldCheck':
        return <ShieldCheck size={size} />;
      case 'Package':
        return <Package size={size} />;
      case 'Server':
        return <Server size={size} />;
      case 'Cloud':
        return <Cloud size={size} />;
      case 'Activity':
        return <Activity size={size} />;
      default:
        return <Layers size={size} />;
    }
  };

  return (
    <section id="pipeline" className="pipeline-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} />
            Live Automation Engine
          </span>
          <h2 className="section-title">
            Interactive <span className="gradient-text">CI/CD Pipeline Simulator</span>
          </h2>
          <p className="section-description">
            Experience the automated deployment lifecycle: from commit verification and Trivy CVE scans to Terraform state checks and zero-downtime Kubernetes rollouts.
          </p>
        </div>

        {/* Pipeline Control Toolbar */}
        <div className="pipeline-control-bar">
          <div className="pipeline-env-select">
            <span className="control-label">Target Cloud:</span>
            <div className="env-buttons">
              {[
                { id: 'production-eks', label: 'AWS EKS (Prod)' },
                { id: 'staging-ecs', label: 'AWS ECS (Staging)' },
                { id: 'canary-k8s', label: 'Canary Cluster (10%)' }
              ].map((env) => (
                <button
                  key={env.id}
                  className={`env-btn ${environment === env.id ? 'active' : ''}`}
                  onClick={() => !isRunning && setEnvironment(env.id)}
                  disabled={isRunning}
                >
                  <span className="env-dot" />
                  {env.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pipeline-actions-group">
            <div className="elapsed-timer font-mono">
              <span className="timer-label">Duration:</span>
              <span className="timer-val">{elapsedTime > 0 ? `${elapsedTime.toFixed(1)}s` : '0.0s'}</span>
            </div>

            <button
              onClick={startSimulation}
              disabled={isRunning}
              className="btn btn-primary btn-sm"
              id="trigger-pipeline-btn"
            >
              {isRunning ? <Loader2 size={15} className="spin-icon" /> : <Play size={15} />}
              <span>{isRunning ? 'Deploying Gates...' : 'Run Pipeline Simulation'}</span>
            </button>

            <button
              onClick={resetPipeline}
              disabled={isRunning}
              className="btn btn-secondary btn-icon btn-sm"
              title="Reset simulation"
              aria-label="Reset simulation"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Visual Pipeline Graph */}
        <div className="pipeline-graph-wrapper">
          <div className="pipeline-nodes-track">
            {pipelineSimulatorStages.map((stage, idx) => {
              const status = stageStatuses[idx];
              const isSelected = activeSelectedStage === idx;

              return (
                <React.Fragment key={stage.id}>
                  <div
                    className={`pipeline-node-card ${status} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectStage(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="node-status-bar" />
                    <div className="node-header">
                      <span className="node-step-badge">Stage {idx + 1}</span>
                      <span className="node-duration font-mono">{stage.duration}</span>
                    </div>

                    <div className="node-icon-box">
                      {status === 'running' ? (
                        <Loader2 size={20} className="spin-icon" />
                      ) : status === 'completed' ? (
                        <CheckCircle2 size={20} className="node-success-icon" />
                      ) : (
                        getStageIcon(stage.icon, 20)
                      )}
                    </div>

                    <div className="node-title">{stage.name}</div>
                    <div className="node-tool-badge">{stage.tool}</div>

                    <div className="node-status-pill">
                      {status === 'running' && 'IN PROGRESS'}
                      {status === 'completed' && 'PASSED'}
                      {status === 'idle' && 'READY'}
                    </div>
                  </div>

                  {idx < pipelineSimulatorStages.length - 1 && (
                    <div
                      className={`pipeline-connector ${
                        stageStatuses[idx] === 'completed' ? 'active' : ''
                      }`}
                    >
                      <ChevronRight size={18} className="connector-chevron" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Live Interactive Log Console */}
        <div className="pipeline-console-window">
          <div className="console-header">
            <div className="console-title">
              <Terminal size={15} style={{ color: 'var(--accent-secondary)' }} />
              <span>
                Workflow Telemetry Log — Stage {activeSelectedStage + 1}:{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  {pipelineSimulatorStages[activeSelectedStage].name}
                </strong>
              </span>
            </div>

            <div className="console-actions">
              <span className="console-cmd-pill font-mono">
                $ {pipelineSimulatorStages[activeSelectedStage].command}
              </span>
              <button
                className="console-copy-btn"
                onClick={handleCopyLogs}
                title="Copy execution log"
              >
                {copiedLog ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                <span>{copiedLog ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="console-body font-mono">
            {displayedLogs.map((log, lIdx) => (
              <div
                key={lIdx}
                className={`log-line ${
                  log.includes('[SUCCESS]') || log.includes('PASSED')
                    ? 'success'
                    : log.includes('[STAGE') || log.includes('>>>')
                    ? 'stage-heading'
                    : log.includes('[RUN]')
                    ? 'run'
                    : log.includes('[METRIC]')
                    ? 'metric'
                    : ''
                }`}
              >
                {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
