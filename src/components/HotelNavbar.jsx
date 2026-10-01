import React, { useState } from 'react';
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
  RotateCcw
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
  occupiedCount
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
