import React, { useState } from 'react';
import { experienceData, personalInfo } from '../data/portfolioData';
import { Briefcase, MapPin, CheckCircle, FileText, Download, Building2 } from 'lucide-react';
import './Experience.css';

export default function Experience() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadResume = () => {
    // Generate clean text resume
    const resumeContent = `
======================================================
${personalInfo.name} - ${personalInfo.title}
Email: ${personalInfo.email} | Location: ${personalInfo.location}
GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}
======================================================

EXECUTIVE SUMMARY:
${personalInfo.bio}

PROFESSIONAL EXPERIENCE:

${experienceData
  .map(
    (exp) => `
${exp.role.toUpperCase()} | ${exp.company}
Period: ${exp.period} | Location: ${exp.location}
Overview: ${exp.description}
Key Achievements:
${exp.achievements.map((a) => `  * ${a}`).join('\n')}
Core Technologies: ${exp.tech.join(', ')}
`
  )
  .join('\n------------------------------------------------------\n')}
======================================================
Generated via Girish Sharma Portfolio System
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Girish_Sharma_DevOps_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={14} />
            Experience & Education
          </span>
          <h2 className="section-title">
            DevOps & <span className="gradient-text">Practical Impact</span>
          </h2>
          <p className="section-description">
            Hands-on experience building automated CI/CD pipelines, containerizing applications, orchestrating Kubernetes workloads, and provisioning cloud infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line" />

          {experienceData.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot" />

              <div className="experience-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company">
                      <Building2 size={16} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="exp-meta">
                    <span className="exp-period">{exp.period}</span>
                    <span className="exp-location">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="exp-description">{exp.description}</p>

                <div className="exp-achievements">
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="exp-achievement-item">
                      <CheckCircle size={15} className="exp-achievement-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="exp-tech-chips">
                  {exp.tech.map((t) => (
                    <span key={t} className="exp-tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Resume Action */}
        <div className="resume-download-bar">
          <button
            className="btn btn-secondary"
            onClick={handleDownloadResume}
            id="download-resume-btn"
          >
            {downloaded ? <CheckCircle size={16} style={{ color: 'var(--accent-emerald)' }} /> : <FileText size={16} />}
            <span>{downloaded ? 'Resume Downloaded!' : 'Download Verified Curriculum Vitae'}</span>
            <Download size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
