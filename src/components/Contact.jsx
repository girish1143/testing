import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, MapPin, Send, CheckCircle2, Clock, Loader2, MessageSquare } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Web App',
    budget: '$15k - $50k',
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
        service: 'Full-Stack Web App',
        budget: '$15k - $50k',
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
            Let's Build Something <span className="gradient-text">Exceptional</span>
          </h2>
          <p className="section-description">
            Available for select high-impact engineering leadership roles, complex full-stack architecture contracts, and technical advisory.
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
                    <label className="form-label" htmlFor="contact-service">Scope of Engagement</label>
                    <select
                      id="contact-service"
                      className="form-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Full-Stack Web App">Full-Stack Web App (React 19 / Node / Cloud)</option>
                      <option value="AI & LLM Integration">AI & Autonomous Agent Orchestration</option>
                      <option value="Architecture & Performance Audit">Architecture & Performance Audit</option>
                      <option value="Senior / Principal Role">Full-Time / Principal Engineering Role</option>
                      <option value="Advisory / Consultation">Technical Advisory & Consultation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-budget">Estimated Budget / Scope</label>
                    <select
                      id="contact-budget"
                      className="form-select"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="$5k - $15k">$5,000 - $15,000</option>
                      <option value="$15k - $50k">$15,000 - $50,000</option>
                      <option value="$50k+">$50,000+ Enterprise</option>
                      <option value="Full-Time / Contract">Permanent / Long-Term Retainer</option>
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
