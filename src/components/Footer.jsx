import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Code2, ArrowUp, Clock } from 'lucide-react';
import './Footer.css';

export default function Footer({ currentRoute = 'home', onNavigate }) {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (route, sectionId) => {
    if (route) {
      if (onNavigate) {
        onNavigate(route);
      } else {
        window.location.hash = `#/${route}`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId) {
      if (currentRoute !== 'home') {
        if (onNavigate) onNavigate('home');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          {/* Brand info */}
          <div className="footer-brand-col">
            <a href="#/" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="footer-brand">
              <div className="brand-icon-box">
                <Code2 size={20} />
              </div>
              <span className="footer-brand-name">{personalInfo.name}</span>
            </a>
            <p className="footer-brand-desc">
              {personalInfo.subtitle}
            </p>
            <div className="status-pill" style={{ width: 'fit-content' }}>
              <span className="pulse-dot" />
              <span>Production Edge Deployment Active</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Sitemap & Pages</h4>
            <a href="#/" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="footer-nav-link">Overview</a>
            <a href="#/architecture" onClick={(e) => { e.preventDefault(); handleNav('architecture'); }} className="footer-nav-link" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Architecture Lab ★</a>
            <a href="#/articles" onClick={(e) => { e.preventDefault(); handleNav('articles'); }} className="footer-nav-link" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Case Studies & Articles</a>
            <a href="#/toolbox" onClick={(e) => { e.preventDefault(); handleNav('toolbox'); }} className="footer-nav-link" style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>DevOps Toolbox ★</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleNav(null, 'projects'); }} className="footer-nav-link">Featured Projects</a>
            <a href="#pipeline" onClick={(e) => { e.preventDefault(); handleNav(null, 'pipeline'); }} className="footer-nav-link">CI/CD Pipeline Simulator</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); handleNav(null, 'skills'); }} className="footer-nav-link">DevOps & Cloud Stack</a>
            <a href="#certifications" onClick={(e) => { e.preventDefault(); handleNav(null, 'certifications'); }} className="footer-nav-link">Verified Certifications</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav(null, 'contact'); }} className="footer-nav-link">Get In Touch</a>
          </div>

          {/* Live telemetry column */}
          <div className="footer-live-col">
            <h4 className="footer-nav-title">Timezone & Telemetry</h4>
            <div className="footer-live-time-card">
              <span className="live-time-label">
                <Clock size={13} />
                Bangalore, India (IST)
              </span>
              <span className="live-time-val">{istTime || '15:12:00 PM'}</span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Engineered with React 19, Vite & high-precision vanilla CSS animations.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Crafted for excellence.
          </div>

          <button
            onClick={scrollToTop}
            className="scroll-top-btn"
            aria-label="Scroll back to top"
          >
            <span>Back to Summit</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
