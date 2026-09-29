import React, { useState } from 'react';
import { personalInfo, metrics } from '../data/portfolioData';
import InteractiveTerminal from './InteractiveTerminal';
import { ArrowRight, Copy, Check, MapPin, Briefcase } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Introductions & CTA */}
          <div className="hero-content">
            <div className="hero-badge-wrap">
              <span className="status-pill">
                <span className="pulse-dot"></span>
                {personalInfo.availability}
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} /> {personalInfo.location}
              </span>
            </div>

            <h1 className="hero-title">
              Automating <span className="gradient-text">resilient cloud infrastructure</span> & delivery pipelines.
            </h1>

            <p className="hero-subtitle">
              Hi, I'm <strong style={{ color: 'var(--text-primary)' }}>{personalInfo.name}</strong> — an Associate DevOps & Cloud Engineer passionate about automating CI/CD pipelines, containerizing microservices, and provisioning resilient cloud infrastructure with Docker, Kubernetes, and Terraform.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View DevOps Projects
                <ArrowRight size={16} />
              </a>

              <a href="#contact" className="btn btn-secondary">
                <Briefcase size={16} />
                Connect / Hire Me
              </a>

              <button
                onClick={handleCopyEmail}
                className={`copy-email-btn ${copied ? 'copied' : ''}`}
                title="Copy developer email"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : personalInfo.email}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="hero-terminal-col">
            <InteractiveTerminal />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="metrics-row">
          {metrics.map((m, idx) => (
            <div key={idx} className="metric-card">
              <div className="metric-val">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-sub">{m.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
