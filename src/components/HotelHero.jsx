import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Bed, 
  Search, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  Compass,
  Award
} from 'lucide-react';
import './HotelHero.css';

export default function HotelHero({ 
  onSearchRooms, 
  onNavigate, 
  onOpenBookingModal,
  rooms = [] 
}) {
  const today = new Date().toISOString().split('T')[0];
  const nextDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(nextDate);
  const [category, setCategory] = useState('all');
  const [guests, setGuests] = useState('2');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchRooms({
      checkIn,
      checkOut,
      category,
      guests: parseInt(guests, 10)
    });
  };

  const featuredRooms = rooms.slice(0, 3);

  return (
    <section className="hotel-hero-section">
      {/* Visual Backdrop Overlay */}
      <div className="hero-backdrop">
        <div className="hero-gradient-overlay" />
      </div>

      <div className="hero-content-wrapper">
        {/* Luxury Badge */}
        <div className="hero-badge-pill">
          <Award size={14} className="badge-icon" />
          <span>Voted #1 Ultra-Luxury Coastal Resort & Spa 2025</span>
        </div>

        {/* Hero Headings */}
        <h1 className="hero-main-title">
          Where Infinite Horizons Meet <br />
          <span className="gold-text">Uncompromising Elegance</span>
        </h1>

        <p className="hero-description">
          Welcome to Grand Aurelia Resort & Suites. An iconic coastal haven crafted for the world's most 
          discerning guests — featuring private infinity lagoons, dedicated 24-hour butler teams, 
          and Michelin-starred gastronomy.
        </p>

        {/* Interactive Booking & Availability Search Widget */}
        <div className="hero-search-card">
          <form className="hero-search-form" onSubmit={handleSearchSubmit}>
            {/* Check-In */}
            <div className="search-field">
              <label htmlFor="hero-checkin">
                <Calendar size={15} /> Check-In
              </label>
              <input
                id="hero-checkin"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            {/* Check-Out */}
            <div className="search-field">
              <label htmlFor="hero-checkout">
                <Calendar size={15} /> Check-Out
              </label>
              <input
                id="hero-checkout"
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

            {/* Room Type */}
            <div className="search-field">
              <label htmlFor="hero-category">
                <Bed size={15} /> Suite Collection
              </label>
              <select
                id="hero-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All Suites & Villas</option>
                <option value="deluxe">Deluxe Sanctuaries ($270+)</option>
                <option value="suite">Executive Suites ($490+)</option>
                <option value="villa">Oceanfront Villas ($880+)</option>
                <option value="penthouse">Imperial Penthouses ($1650+)</option>
              </select>
            </div>

            {/* Guests */}
            <div className="search-field">
              <label htmlFor="hero-guests">
                <Users size={15} /> Guests
              </label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Adult (Solo Retreat)</option>
                <option value="2">2 Adults (Couple)</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests (Family Suite)</option>
                <option value="6">6 Guests (Imperial Suite)</option>
              </select>
            </div>

            {/* Search CTA */}
            <div className="search-field submit-field">
              <button type="submit" className="hero-search-btn">
                <Search size={18} />
                <span>Check Availability</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Stats Ribbon */}
        <div className="hero-stats-ribbon">
          <div className="stat-card">
            <span className="stat-num">15</span>
            <span className="stat-label">Bespoke Suites & Villas</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <span className="stat-num">99.4%</span>
            <span className="stat-label">Guest Satisfaction Score</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <span className="stat-num">3 Star</span>
            <span className="stat-label">Michelin Culinary Dining</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <span className="stat-num">24 / 7</span>
            <span className="stat-label">Private Butler & Valet</span>
          </div>
        </div>

        {/* Quick Portal Cards */}
        <div className="hero-portal-links">
          <div className="portal-card" onClick={() => onNavigate('rooms')}>
            <div className="portal-icon-box">
              <Bed size={20} />
            </div>
            <div className="portal-info">
              <h4>Explore Inventory</h4>
              <p>Browse floor plans, room specs & pricing</p>
            </div>
            <ChevronRight size={18} className="portal-arrow" />
          </div>

          <div className="portal-card" onClick={() => onNavigate('frontdesk')}>
            <div className="portal-icon-box">
              <ShieldCheck size={20} />
            </div>
            <div className="portal-info">
              <h4>Front Desk Operations</h4>
              <p>Interactive floor matrix & check-in management</p>
            </div>
            <ChevronRight size={18} className="portal-arrow" />
          </div>

          <div className="portal-card" onClick={() => onNavigate('dining')}>
            <div className="portal-icon-box">
              <Sparkles size={20} />
            </div>
            <div className="portal-info">
              <h4>Dining & Spa Concierge</h4>
              <p>In-room dining orders & wellness retreats</p>
            </div>
            <ChevronRight size={18} className="portal-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
}
