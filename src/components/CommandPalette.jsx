import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  Download,
  Copy,
  Check,
  Terminal,
  Play,
  Award,
  Layers,
  Briefcase,
  Mail,
  X
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import './CommandPalette.css';

export default function CommandPalette({ isOpen, onClose, theme, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Girish_Sharma_DevOps_Resume.txt';
    const fakeContent = `Girish Sharma - Associate Cloud & DevOps Engineer\nEmail: ${personalInfo.email}\nGitHub: ${personalInfo.github}\nSkills: AWS, Docker, Kubernetes, Terraform, CI/CD`;
    const blob = new Blob([fakeContent], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.click();
    onClose();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  const allActions = [
    {
      id: 'nav-pipeline',
      title: 'Run CI/CD Pipeline Simulator',
      category: 'Simulations',
      icon: <Play size={16} style={{ color: '#06b6d4' }} />,
      action: () => {
        scrollTo('pipeline');
        setTimeout(() => {
          document.getElementById('trigger-pipeline-btn')?.click();
        }, 600);
      }
    },
    {
      id: 'nav-certs',
      title: 'View Verified Certifications',
      category: 'Accreditation',
      icon: <Award size={16} style={{ color: '#f59e0b' }} />,
      action: () => scrollTo('certifications')
    },
    {
      id: 'nav-projects',
      title: 'Explore DevOps Projects',
      category: 'Navigation',
      icon: <Layers size={16} />,
      action: () => scrollTo('projects')
    },
    {
      id: 'nav-skills',
      title: 'Inspect Technical Stack',
      category: 'Navigation',
      icon: <Terminal size={16} />,
      action: () => scrollTo('skills')
    },
    {
      id: 'nav-experience',
      title: 'Career & Education Timeline',
      category: 'Navigation',
      icon: <Briefcase size={16} />,
      action: () => scrollTo('experience')
    },
    {
      id: 'nav-contact',
      title: 'Contact / Hire Girish Sharma',
      category: 'Navigation',
      icon: <Mail size={16} style={{ color: '#10b981' }} />,
      action: () => scrollTo('contact')
    },
    {
      id: 'act-resume',
      title: 'Download Verified Resume (.txt)',
      category: 'Quick Actions',
      icon: <Download size={16} style={{ color: '#a855f7' }} />,
      action: handleDownloadResume
    },
    {
      id: 'act-email',
      title: copiedEmail ? 'Email Copied!' : `Copy Email (${personalInfo.email})`,
      category: 'Quick Actions',
      icon: copiedEmail ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />,
      action: handleCopyEmail
    },
    {
      id: 'act-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Preferences',
      icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
      action: () => {
        onToggleTheme();
        onClose();
      }
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile',
      category: 'External Links',
      icon: <Github size={16} />,
      action: () => {
        window.open(personalInfo.github, '_blank');
        onClose();
      }
    },
    {
      id: 'act-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External Links',
      icon: <Linkedin size={16} />,
      action: () => {
        window.open(personalInfo.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filteredActions = allActions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose} onKeyDown={handleKeyDown}>
      <div className="palette-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="palette-search-bar">
          <Search size={18} className="palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="palette-input"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button className="palette-close-btn" onClick={onClose} aria-label="Close command palette">
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="palette-results">
          {filteredActions.length === 0 ? (
            <div className="palette-empty">No commands matching "{query}"</div>
          ) : (
            filteredActions.map((item, idx) => (
              <div
                key={item.id}
                className={`palette-item ${idx === selectedIndex ? 'active' : ''}`}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="palette-item-icon">{item.icon}</div>
                <div className="palette-item-text">
                  <span className="palette-item-title">{item.title}</span>
                  <span className="palette-item-category">{item.category}</span>
                </div>
                <ArrowRight size={14} className="palette-item-arrow" />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="palette-footer">
          <span className="palette-tip">
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </span>
          <span className="palette-tip">
            <kbd>↵</kbd> to select
          </span>
          <span className="palette-tip">
            <kbd>esc</kbd> to dismiss
          </span>
        </div>
      </div>
    </div>
  );
}
