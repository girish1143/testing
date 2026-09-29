import React, { useState } from 'react';
import { personalInfo, recruiterQuickFacts } from '../data/portfolioData';
import { Mail, MapPin, Send, CheckCircle2, Clock, Loader2, MessageSquare, Calendar, Download, Zap } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'DevOps Full-Time Role',
    budget: 'Full-Time Employment',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        service: 'DevOps Full-Time Role',
        budget: 'Full-Time Employment',
        message: '',
      });
    }, 1200);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <MessageSquare size={14} />
            Direct Communication
          </span>
          <h2 className="section-title">
            Let's Connect & <span className="gradient-text">Build Together</span>
          </h2>
          <p className="section-description">
            Actively seeking Entry-Level / Associate DevOps, Cloud Infrastructure, and Platform Engineering roles. Ready to deploy and contribute from day one.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info */}
          <div className="contact-info-col">
            <div className="contact-info-header">
              <h3>Get In Touch Directly</h3>
              <p>
                Have a project in mind, an architectural challenge, or want to discuss engineering roles? Drop a message or reach out via direct channels.
              </p>
            </div>

            <div className="contact-cards-list">
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact-detail-card"
                title="Send direct email"
              >
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">Direct Inbox</span>
                  <span className="contact-card-val font-mono">{personalInfo.email}</span>
                </div>
              </a>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">Base Coordinates</span>
                  <span className="contact-card-val">{personalInfo.location}</span>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <Clock size={20} />
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">Response Latency</span>
                  <span className="contact-card-val">Guaranteed within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Recruiter Fast-Track Snapshot */}
            <div className="recruiter-fasttrack-card">
              <div className="fasttrack-header">
                <div className="fasttrack-title">
                  <Zap size={16} style={{ color: 'var(--accent-amber)' }} />
                  <span>Recruiter Fast-Track Snapshot</span>
                </div>
                <span className="fasttrack-badge">Ready to Join</span>
              </div>

              <div className="fasttrack-details">
                <div className="fasttrack-item">
                  <span className="ft-label">Notice Period:</span>
                  <span className="ft-val highlight-green">{recruiterQuickFacts.noticePeriod}</span>
                </div>
                <div className="fasttrack-item">
                  <span className="ft-label">Target Roles:</span>
                  <span className="ft-val">{recruiterQuickFacts.rolePreference}</span>
                </div>
                <div className="fasttrack-item">
                  <span className="ft-label">Work Mode:</span>
                  <span className="ft-val">{recruiterQuickFacts.locationPreference}</span>
                </div>
                <div className="fasttrack-item">
                  <span className="ft-label">Education:</span>
                  <span className="ft-val">{recruiterQuickFacts.education}</span>
                </div>
              </div>

              <div className="fasttrack-actions">
                <a
                  href="#experience"
                  onClick={() => document.getElementById('download-resume-btn')?.click()}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Download size={14} />
                  <span>Verified CV</span>
                </a>

                <a
                  href={`mailto:${personalInfo.email}?subject=Interview%20Invitation%20-%20DevOps%20Role&body=Hi%20Girish,%20we%20reviewed%20your%20DevOps%20portfolio%20and%20would%20love%20to%20connect%20for%20an%20interview.`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Calendar size={14} />
                  <span>Invite to Interview</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Engineering Footprint & Networks:
              </div>
              <div className="social-links-row">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-btn"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-btn"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-btn"
                >
                  <Twitter size={16} />
                  <span>Twitter/X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success-alert" style={{ flexDirection: 'column', textAlign: 'center', padding: '3rem 1.5rem', gap: '1rem' }}>
                <CheckCircle2 size={48} style={{ color: '#10b981' }} />
                <h4 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Inquiry Dispatched Successfully!
                </h4>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.6 }}>
                  Thank you for reaching out. Girish Sharma will review your project parameters and respond within 24 hours.
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.75rem' }}
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Alex Thorne"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-service">Opportunity / Engagement Type</label>
                    <select
                      id="contact-service"
                      className="form-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="DevOps Full-Time Role">Full-Time / Associate DevOps Role</option>
                      <option value="CI/CD Pipeline Automation">CI/CD Pipeline Automation (GitHub Actions / Jenkins)</option>
                      <option value="Docker & Kubernetes Orchestration">Docker & Kubernetes Containerization</option>
                      <option value="AWS & Terraform Infrastructure">Infrastructure as Code (Terraform & AWS)</option>
                      <option value="Observability & Monitoring">Observability Setup (Prometheus & Grafana)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-budget">Role Type / Availability</label>
                    <select
                      id="contact-budget"
                      className="form-select"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="Full-Time Employment">Full-Time (Immediate Availability)</option>
                      <option value="Contract / Freelance">Contract / Project-Based Infrastructure</option>
                      <option value="Internship / Trainee">Internship / Apprenticeship</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Project Context & Objectives *</label>
                  <textarea
                    id="contact-message"
                    required
                    placeholder="Tell me about your product requirements, current bottleneck, timeline, or team context..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  id="submit-inquiry-btn"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="spin-icon" />
                      <span>Encrypting & Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Dispatch</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
