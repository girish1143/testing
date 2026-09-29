import React, { useState, useEffect } from 'react';
import { Sun, Moon, Code2, Menu, X, Sparkles, Command } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ theme, onToggleTheme, onOpenPalette }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'projects', 'pipeline', 'skills', 'certifications', 'experience', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#home', id: 'home' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'CI/CD Pipeline', href: '#pipeline', id: 'pipeline' },
    { label: 'Tech Stack', href: '#skills', id: 'skills' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-brand">
          <div className="brand-icon-box">
            <Code2 size={20} />
          </div>
          <div className="nav-brand-text">
            <span className="brand-name">Girish Sharma</span>
            <span className="brand-tag">DEVOPS & CLOUD</span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        <div className="nav-actions">
          <button
            onClick={onOpenPalette}
            className="command-palette-trigger-btn"
            title="Open Command Palette (Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <Command size={14} />
            <span className="cmd-kbd-badge">Ctrl K</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle dark/light theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#contact"
            className="btn btn-primary btn-sm"
          >
            <Sparkles size={15} />
            Let's Talk
          </a>

          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ marginTop: '0.5rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Get In Touch
          </a>
        </div>
      )}
    </header>
  );
}
