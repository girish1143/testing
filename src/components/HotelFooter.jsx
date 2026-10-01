import React, { useState } from 'react';
import { 
  Hotel, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  ShieldCheck, 
  ArrowUp,
  Send,
  Sparkles
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import './HotelFooter.css';

export default function HotelFooter({ onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="hotel-footer-wrap">
      <div className="hotel-footer-inner">
        {/* Main Footer Grid */}
        <div className="footer-columns-grid">
          {/* Col 1: Brand & Heritage */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-crest">✦</div>
              <div>
                <h3 className="footer-brand-title">{HOTEL_INFO.name}</h3>
                <span className="footer-brand-tag">Luxury Resort & Suites</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Perched dramatically along the azure coastline, Grand Aurelia is a bastion of timeless grandeur,
              bespoke privacy, and world-class hospitality recognized globally with 5-star distinctions.
            </p>
            <div className="footer-awards-badges">
              <span className="award-badge"><Award size={13} /> Forbes Five-Star 2025</span>
              <span className="award-badge"><Award size={13} /> Michelin Key Distinction</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Resort Portals</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigate('overview')}>Resort Overview & Highlights</button>
              </li>
              <li>
                <button onClick={() => onNavigate('rooms')}>Suites, Villas & Penthouses</button>
              </li>
              <li>
                <button onClick={() => onNavigate('frontdesk')}>Front Desk PMS & Floor Matrix</button>
              </li>
              <li>
                <button onClick={() => onNavigate('housekeeping')}>Housekeeping & Maintenance</button>
              </li>
              <li>
                <button onClick={() => onNavigate('dining')}>In-Room Dining & Experiences</button>
              </li>
              <li>
                <button onClick={() => onNavigate('billing')}>Guest Folio Invoicing Desk</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Concierge & Location */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Private Concierge Desk</h4>
            <div className="footer-contact-items">
              <div className="contact-row">
                <MapPin size={16} className="contact-icon" />
                <span>{HOTEL_INFO.address}</span>
              </div>
              <div className="contact-row">
                <Phone size={16} className="contact-icon" />
                <span>{HOTEL_INFO.phone} (24/7 Dedicated)</span>
              </div>
              <div className="contact-row">
                <Mail size={16} className="contact-icon" />
                <span>{HOTEL_INFO.email}</span>
              </div>
              <div className="contact-row">
                <Clock size={16} className="contact-icon" />
                <span>Check-In: 15:00 · Check-Out: 11:00</span>
              </div>
            </div>
          </div>

          {/* Col 4: Private Privilege Journal */}
          <div className="footer-privilege-col">
            <h4 className="footer-col-title">The Aurelia Gazette</h4>
            <p className="privilege-text">
              Subscribe to receive private invitation-only previews of seasonal vintage releases and private villa availability.
            </p>

            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your VIP email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                <Send size={15} />
              </button>
            </form>
            {subscribed && (
              <span className="subscribed-msg">
                <Sparkles size={13} /> You are enrolled in the Aurelia Private Circle.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} {HOTEL_INFO.name}. All Rights Reserved. Luxury Hotel Management & Guest Operations Platform.
          </p>

          <button className="btn-back-to-top" onClick={scrollToTop} title="Scroll to top of page">
            <span>Ascend to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
