import React from 'react';
import { Crown, MapPin, Phone, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import './Footer.css';

export default function Footer({ onNavigate }) {
  return (
    <footer className="aurelia-footer">
      <div className="footer-top-glow" aria-hidden="true" />
      
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-brand" onClick={() => onNavigate('home')}>
            <div className="brand-crest">
              <Crown size={20} />
            </div>
            <div>
              <span className="brand-name">AURELIA GRAND</span>
              <span className="brand-sub">RESORT & SPA</span>
            </div>
          </div>
          <p className="footer-tagline">
            An ultra-luxury oceanfront sanctuary offering bespoke hospitality, Michelin-caliber gastronomy, and tranquil private living along the azure coastline.
          </p>
          <div className="footer-badge">
            <Sparkles size={14} />
            <span>Five-Star Imperial Hospitality Standard</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><button onClick={() => onNavigate('home')}>Home Sanctuary</button></li>
            <li><a href="#rooms-section" onClick={() => onNavigate('home')}>Suites & Villas</a></li>
            <li><button onClick={() => onNavigate('profile')}>Patron Profile & Stays</button></li>
            <li><button onClick={() => onNavigate('login')}>Patron Sign In</button></li>
            <li><button onClick={() => onNavigate('signup')}>Create Account</button></li>
            <li><button onClick={() => onNavigate('admin')} style={{ color: '#d4af37' }}>🛡️ Admin Operations</button></li>
          </ul>
        </div>

        {/* Hospitality & Experiences */}
        <div className="footer-col">
          <h4 className="footer-heading">Sanctuary Offerings</h4>
          <ul className="footer-links">
            <li><span>Oceanfront Lagoon Pool</span></li>
            <li><span>Michelin Private Dining</span></li>
            <li><span>Holistic Wellness & Spa</span></li>
            <li><span>Yacht & Helicopter Charters</span></li>
          </ul>
        </div>

        {/* Contact & Location */}
        <div className="footer-col">
          <h4 className="footer-heading">Concierge & Inquiries</h4>
          <div className="footer-contact-list">
            <div className="contact-item">
              <MapPin size={16} />
              <span>740 Boulevard de la Croisette, Azure Coast</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+1 (800) 555-8900</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>concierge@aureliagrand.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} Aurelia Grand Resort & Spa. All rights reserved.</p>
          <div className="footer-security-note">
            <ShieldCheck size={14} />
            <span>Encrypted Hotel Reservation & Authentication Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
