import React, { useState, useEffect } from 'react';
import { X, Play, CheckCircle2, Loader2, Sparkles, Layers, Cpu } from 'lucide-react';
import { Github } from './SocialIcons';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const runSimulation = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setCurrentStep(1);

    setTimeout(() => setCurrentStep(2), 900);
    setTimeout(() => setCurrentStep(3), 1800);
    setTimeout(() => setCurrentStep(4), 2700);
    setTimeout(() => {
      setIsRunningSim(false);
    }, 3600);
  };

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2>{project.title}</h2>
            <div className="modal-tagline">{project.tagline}</div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Banner */}
          <div className="modal-banner" style={{ background: project.bannerGradient }}>
            <div className="modal-banner-content">
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>
                Case Study Architecture & Deep Dive
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: '#ffffff' }}>
                {project.metrics}
              </h3>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="modal-section-title">
              <Cpu size={18} style={{ color: 'var(--accent-secondary)' }} />
              System Architecture & Core Problem
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
              {project.detailedDescription}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="modal-section-title">
              <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
              Engineering Highlights
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.highlights.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Sandbox Simulator */}
          <div>
            <h3 className="modal-section-title">
              <Layers size={18} style={{ color: 'var(--accent-emerald)' }} />
              Interactive Simulation Sandbox
            </h3>
            <div className="interactive-sandbox">
              <div className="sandbox-header">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Live Engine Stress & Verification Test
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Trigger real-time simulated telemetry for {project.title}
                  </div>
                </div>
                <button
                  className="sandbox-run-btn"
                  onClick={runSimulation}
                  disabled={isRunningSim}
                >
                  {isRunningSim ? <Loader2 size={14} className="spin-icon" /> : <Play size={14} />}
                  {isRunningSim ? 'Executing...' : 'Run Live Test'}
                </button>
              </div>

              <div className="simulation-steps">
                <div className={`sim-step ${currentStep >= 1 ? (currentStep === 1 ? 'active' : 'completed') : ''}`}>
                  <span>{currentStep > 1 ? '✓' : '1.'}</span>
                  <span>[Init] Verifying cryptographic JWT session & edge routing...</span>
                  {currentStep === 1 && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#6366f1' }}>Running...</span>}
                </div>

                <div className={`sim-step ${currentStep >= 2 ? (currentStep === 2 ? 'active' : 'completed') : ''}`}>
                  <span>{currentStep > 2 ? '✓' : '2.'}</span>
                  <span>[Cache] Probing Redis distributed memory cluster: 0.8ms roundtrip.</span>
                  {currentStep === 2 && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#6366f1' }}>Syncing...</span>}
                </div>

                <div className={`sim-step ${currentStep >= 3 ? (currentStep === 3 ? 'active' : 'completed') : ''}`}>
                  <span>{currentStep > 3 ? '✓' : '3.'}</span>
                  <span>[Pipeline] Executing state machine transitions & data mutations.</span>
                  {currentStep === 3 && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#6366f1' }}>Processing...</span>}
                </div>

                <div className={`sim-step ${currentStep >= 4 ? 'completed' : ''}`}>
                  <span>{currentStep >= 4 ? '✓' : '4.'}</span>
                  <span>[Success] 200 OK — Payload committed with zero errors.</span>
                  {currentStep >= 4 && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#10b981' }}>Completed</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              Technologies Deployed:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.3rem 0.75rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <Github size={15} />
            Source Repository
          </a>
          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}
