import React, { useState, useEffect } from 'react';
import { Sun, Moon, Code2, Menu, X, Sparkles, Command, Cpu, Wrench, BookOpen, Layers } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ theme, onToggleTheme, onOpenPalette, currentRoute = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentRoute !== 'home') return;

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
  }, [currentRoute]);

  const navItems = [
    { label: 'Overview', route: 'home', href: '#/', id: 'home' },
    { label: 'Architecture Lab', route: 'architecture', href: '#/architecture', id: 'architecture', isNew: true },
    { label: 'Case Studies', route: 'articles', href: '#/articles', id: 'articles' },
    { label: 'DevOps Toolbox', route: 'toolbox', href: '#/toolbox', id: 'toolbox', isHot: true },
    { label: 'Projects', section: 'projects', href: '#projects', id: 'projects' },
    { label: 'Tech Stack', section: 'skills', href: '#skills', id: 'skills' },
  ];

  const handleItemClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.route) {
      if (onNavigate) {
        onNavigate(item.route);
      } else {
        window.location.hash = item.href;
      }
    } else if (item.section) {
      if (currentRoute !== 'home') {
        if (onNavigate) onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById(item.section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById(item.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentRoute !== 'home') {
      if (onNavigate) onNavigate('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isItemActive = (item) => {
    if (item.route) {
      if (item.route === 'home') {
        return currentRoute === 'home' && (activeSection === 'home' || activeSection === 'testimonials');
      }
      return currentRoute === item.route;
    }
    if (item.section) {
      return currentRoute === 'home' && activeSection === item.section;
    }
    return false;
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#/" onClick={handleBrandClick} className="nav-brand">
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
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`nav-link ${active ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                  {item.isNew && <span className="nav-badge-new">Interactive</span>}
                  {item.isHot && <span className="nav-badge-tools">Tools</span>}
                </a>
              </li>
            );
          })}
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

          <button
            onClick={handleContactClick}
            className="btn btn-primary btn-sm"
          >
            <Sparkles size={15} />
            Let's Talk
          </button>

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
              className={`mobile-link ${isItemActive(item) ? 'active' : ''}`}
              onClick={(e) => handleItemClick(e, item)}
            >
              <span>{item.label}</span>
              {item.isNew && <span className="nav-badge-new">Interactive</span>}
              {item.isHot && <span className="nav-badge-tools">Tools</span>}
            </a>
          ))}
          <button
            onClick={handleContactClick}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
          >
            Get In Touch
          </button>
        </div>
      )}
    </header>
  );
}
