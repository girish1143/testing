import React from 'react';
import { certificationsData } from '../data/portfolioData';
import { Award, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import './Certifications.css';

export default function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Award size={14} />
            Verified Accreditations
          </span>
          <h2 className="section-title">
            Industry <span className="gradient-text">Certifications & Badges</span>
          </h2>
          <p className="section-description">
            Recognized industry credentials validating hands-on cloud architecture, containerization standards, Linux administration, and Infrastructure as Code.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div
                className="cert-glow-accent"
                style={{ background: cert.badgeColor }}
              />

              <div className="cert-header">
                <div
                  className="cert-icon-box"
                  style={{
                    background: cert.badgeBg,
                    borderColor: cert.badgeColor,
                    color: cert.badgeColor
                  }}
                >
                  <ShieldCheck size={26} />
                </div>

                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-year">Issued {cert.issueDate}</span>
                </div>
              </div>

              <div className="cert-body">
                <h3 className="cert-title">{cert.title}</h3>

                <div className="cert-id-pill font-mono">
                  <span>ID:</span> {cert.credentialId}
                </div>

                <div className="cert-skills-list">
                  {cert.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="cert-skill-item">
                      <CheckCircle2 size={13} style={{ color: cert.badgeColor, flexShrink: 0 }} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cert-footer">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-btn"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
