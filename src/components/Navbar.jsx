import React, { useState } from 'react';
import { Crown, User, LogIn, LogOut, Menu, X, CalendarCheck } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ currentPage, onNavigate, currentUser, onSignOut, onBookClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="aurelia-header">
      <div className="aurelia-nav-container">
        {/* Brand Logo */}
        <div className="aurelia-brand" onClick={() => handleNav('home')} role="button" tabIndex={0}>
          <div className="brand-crest">
            <Crown size={20} />
          </div>
          <div className="brand-titles">
            <span className="brand-name">AURELIA GRAND</span>
            <span className="brand-sub">RESORT & SPA</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <button
            className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            <span>Home</span>
          </button>
          <a
            href="#rooms-section"
            className="nav-link-btn"
            onClick={(e) => {
              if (currentPage !== 'home') {
                e.preventDefault();
                handleNav('home');
                setTimeout(() => {
                  document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
          >
            <span>Suites & Villas</span>
          </a>
          <button
            className={`nav-link-btn ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => handleNav('profile')}
          >
            <span>{currentUser ? 'Patron Profile' : 'Patron Portal'}</span>
          </button>
        </nav>

        {/* Auth & CTA Actions */}
        <div className="nav-actions">
          {currentUser ? (
            <div className="user-logged-box">
              <button
                className={`user-pill interactive-pill ${currentPage === 'profile' ? 'active-pill' : ''}`}
                onClick={() => handleNav('profile')}
                title="View your Guest Folio, Stays & Loyalty Tier"
              >
                <User size={14} className="user-icon" />
                <span className="user-name">{currentUser.name}</span>
              </button>
              <button
                className="btn-signout"
                onClick={onSignOut}
                title="Sign out of your session"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="auth-btns-group">
              <button
                className={`btn-nav-auth ${currentPage === 'login' ? 'active' : ''}`}
                onClick={() => handleNav('login')}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
              <button
                className={`btn-nav-signup ${currentPage === 'signup' ? 'active' : ''}`}
                onClick={() => handleNav('signup')}
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}

          <button className="btn-reserve-nav" onClick={onBookClick}>
            <CalendarCheck size={16} />
            <span>Book Stay</span>
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <button
            className={`mobile-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <a
            href="#rooms-section"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            Suites & Villas
          </a>
          <button
            className={`mobile-link ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => handleNav('profile')}
          >
            {currentUser ? 'Patron Profile & Stays' : 'Patron Portal'}
          </button>

          <div className="mobile-divider" />

          {currentUser ? (
            <div className="mobile-user-actions">
              <button
                className="user-pill interactive-pill"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleNav('profile')}
              >
                <User size={15} />
                <span>{currentUser.name} (Folio)</span>
              </button>
              <button className="btn-signout" style={{ width: '100%', justifyContent: 'center' }} onClick={onSignOut}>
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="mobile-auth-actions">
              <button
                className="btn-nav-auth"
                style={{ width: '100%' }}
                onClick={() => handleNav('login')}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
              <button
                className="btn-nav-signup"
                style={{ width: '100%' }}
                onClick={() => handleNav('signup')}
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
