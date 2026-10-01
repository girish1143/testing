import React, { useState, useRef, useEffect } from 'react';
import { 
  Hotel, 
  BedDouble, 
  LayoutDashboard, 
  Sparkles, 
  UtensilsCrossed, 
  ReceiptText, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  PlusCircle,
  RotateCcw,
  LogIn,
  User,
  LogOut,
  ChevronDown,
  Crown,
  Briefcase
} from 'lucide-react';
import './HotelNavbar.css';

export default function HotelNavbar({
  currentRoute,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenPalette,
  onOpenBookingModal,
  onResetData,
  totalRooms,
  occupiedCount,
  currentUser,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'overview', label: 'Overview', icon: Hotel },
    { id: 'rooms', label: 'Suites & Villas', icon: BedDouble },
    { id: 'frontdesk', label: 'Front Desk & Ops', icon: LayoutDashboard, badge: `${occupiedCount}/${totalRooms}` },
    { id: 'housekeeping', label: 'Housekeeping', icon: Sparkles },
    { id: 'dining', label: 'Dining & Concierge', icon: UtensilsCrossed },
    { id: 'billing', label: 'Folio & Invoicing', icon: ReceiptText },
  ];

  const handleNavClick = (routeId) => {
    onNavigate(routeId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="hotel-header">
      <div className="hotel-nav-container">
        {/* Brand Logo & Title */}
        <div className="hotel-brand" onClick={() => handleNavClick('overview')} role="button" tabIndex={0}>
          <div className="brand-crest">
            <span className="crest-symbol">✦</span>
            <Hotel className="crest-icon" size={24} />
          </div>
          <div className="brand-names">
            <span className="brand-title">Grand Aurelia</span>
            <span className="brand-subtitle">Resort & Luxury Suites</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hotel-nav-desktop" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentRoute === link.id;
            return (
              <button
                key={link.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                <Icon size={16} className="nav-item-icon" />
                <span className="nav-item-label">{link.label}</span>
                {link.badge && (
                  <span className="nav-item-badge" title="Occupied / Total Suites">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="hotel-actions-desktop">
          {/* Quick Search / Command Palette Trigger */}
          <button 
            className="action-icon-btn palette-trigger" 
            onClick={onOpenPalette}
            title="Search Rooms, Guests & Commands (Ctrl+K)"
          >
            <Search size={16} />
            <span className="shortcut-tag">⌘K</span>
          </button>

          {/* Theme Toggle */}
          <button 
            className="action-icon-btn theme-toggle" 
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Reset Demo Data */}
          <button 
            className="action-icon-btn reset-btn" 
            onClick={onResetData}
            title="Reset to default demo data"
            aria-label="Reset demo data"
          >
            <RotateCcw size={15} />
          </button>

          {/* User Profile or Sign In / Sign Up */}
          {currentUser ? (
            <div className="user-profile-menu-container" ref={dropdownRef}>
              <button
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-expanded={userDropdownOpen}
                title={`Signed in as ${currentUser.name}`}
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="user-nav-avatar"
                />
                <div className="user-nav-info">
                  <span className="user-nav-name">{currentUser.name.split(' ')[0]}</span>
                  <span className={`user-nav-role-badge ${currentUser.type}`}>
                    {currentUser.type === 'staff' ? 'Staff' : 'VIP'}
                  </span>
                </div>
                <ChevronDown size={14} className={`dropdown-chevron ${userDropdownOpen ? 'open' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="user-dropdown-card">
                  <div className="dropdown-user-header">
                    <img src={currentUser.avatar} alt={currentUser.name} className="dropdown-avatar-lg" />
                    <div className="dropdown-user-meta">
                      <strong>{currentUser.name}</strong>
                      <span className="dropdown-email">{currentUser.email}</span>
                      <span className="dropdown-role-title">
                        {currentUser.type === 'staff' ? <Briefcase size={12} /> : <Crown size={12} />}
                        {currentUser.roleTitle}
                      </span>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="dropdown-links-list">
                    <button 
                      className="dropdown-item-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('billing');
                      }}
                    >
                      <ReceiptText size={16} />
                      <span>My Guest Folio & Invoices</span>
                    </button>

                    {currentUser.type === 'staff' && (
                      <button 
                        className="dropdown-item-btn"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('frontdesk');
                        }}
                      >
                        <LayoutDashboard size={16} />
                        <span>Front Desk Operations</span>
                      </button>
                    )}

                    <button 
                      className="dropdown-item-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('rooms');
                      }}
                    >
                      <BedDouble size={16} />
                      <span>Explore Luxury Suites</span>
                    </button>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="dropdown-footer">
                    <button 
                      className="dropdown-signout-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-nav-buttons">
              <button 
                className="btn-signin-ghost"
                onClick={() => handleNavClick('signin')}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>

              <button 
                className="btn-signup-pill"
                onClick={() => handleNavClick('signup')}
              >
                <span>Join Circle</span>
              </button>
            </div>
          )}

          {/* Book Room Primary CTA */}
          <button 
            className="btn-book-primary" 
            onClick={() => onOpenBookingModal(null)}
          >
            <PlusCircle size={16} />
            <span>Reserve Suite</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            className="action-icon-btn mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="hotel-mobile-drawer">
          <div className="mobile-drawer-inner">
            {/* User profile on mobile */}
            {currentUser ? (
              <div className="mobile-user-card">
                <img src={currentUser.avatar} alt={currentUser.name} className="user-nav-avatar" />
                <div className="mobile-user-text">
                  <strong>{currentUser.name}</strong>
                  <span>{currentUser.roleTitle} ({currentUser.type === 'staff' ? 'Staff' : 'VIP'})</span>
                </div>
                <button className="mobile-signout-btn" onClick={onLogout} title="Sign Out">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="mobile-auth-row">
                <button 
                  className="btn-signin-ghost w-full"
                  onClick={() => handleNavClick('signin')}
                >
                  <LogIn size={15} />
                  <span>Sign In</span>
                </button>
                <button 
                  className="btn-signup-pill w-full"
                  onClick={() => handleNavClick('signup')}
                >
                  <span>Join VIP Circle</span>
                </button>
              </div>
            )}

            <nav className="mobile-nav-links">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(link.id)}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                    {link.badge && <span className="nav-item-badge">{link.badge}</span>}
                  </button>
                );
              })}
            </nav>

            <div className="mobile-drawer-footer">
              <button 
                className="btn-book-primary w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal(null);
                }}
              >
                <PlusCircle size={16} />
                <span>Reserve Suite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
