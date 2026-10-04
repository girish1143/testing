import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Search,
  Star,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Shield,
  Award,
  Waves,
  UtensilsCrossed
} from 'lucide-react';
import { HOTEL_ROOMS, HOTEL_AMENITIES } from '../data/hotelRooms';
import './HomePage.css';

export default function HomePage({ onBookRoom, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchGuests, setSearchGuests] = useState('2');
  const [searchCheckIn, setSearchCheckIn] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [searchCheckOut, setSearchCheckOut] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );

  const filteredRooms = HOTEL_ROOMS.filter((room) => {
    if (selectedCategory === 'all') return true;
    return room.category === selectedCategory;
  });

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const roomsEl = document.getElementById('rooms-section');
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* 1. HERO BANNER */}
      <section className="hero-section">
        <div className="hero-backdrop" />
        <div className="hero-ambient-glow" aria-hidden="true" />

        <div className="hero-content">
          <div className="prestige-tag">
            <Sparkles size={14} />
            <span>Condé Nast Gold List • Rated 4.96/5 Stars</span>
          </div>

          <h1 className="hero-title">
            Where Sapphire Oceans Meet <span className="gold-text">Imperial Luxury</span>
          </h1>

          <p className="hero-subtitle">
            Immerse yourself in bespoke European hospitality along the private azure coastline.
            Panoramic oceanfront suites, private heated plunge villas, and world-class culinary masteries.
          </p>

          {/* Booking Search Bar */}
          <form className="hero-booking-bar" onSubmit={handleHeroSearch}>
            <div className="booking-field">
              <span className="field-label">Check-In</span>
              <div className="field-input-row">
                <Calendar size={16} />
                <input
                  type="date"
                  value={searchCheckIn}
                  onChange={(e) => setSearchCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="field-divider" />

            <div className="booking-field">
              <span className="field-label">Check-Out</span>
              <div className="field-input-row">
                <Calendar size={16} />
                <input
                  type="date"
                  value={searchCheckOut}
                  onChange={(e) => setSearchCheckOut(e.target.value)}
                  min={searchCheckIn}
                />
              </div>
            </div>

            <div className="field-divider" />

            <div className="booking-field">
              <span className="field-label">Guests</span>
              <div className="field-input-row">
                <Users size={16} />
                <select
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>

            <button type="submit" className="hero-search-btn">
              <Search size={17} />
              <span>Explore Suites</span>
            </button>
          </form>

          {/* Highlights */}
          <div className="hero-badges-row">
            <div className="hero-badge-item">
              <CheckCircle size={15} />
              <span>Complimentary Airport Limousine</span>
            </div>
            <div className="hero-badge-item">
              <CheckCircle size={15} />
              <span>24/7 Dedicated Patron Butler</span>
            </div>
            <div className="hero-badge-item">
              <CheckCircle size={15} />
              <span>Michelin Gastronomy Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUITES & VILLAS CATALOG */}
      <section id="rooms-section" className="rooms-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Curated Living Spaces</span>
            <h2 className="section-title">Suites, Villas & Penthouse Havens</h2>
            <p className="section-desc">
              Every residence at Aurelia Grand is an architectural masterpiece crafted with rare travertine stone, 
              custom teak wood, and sweeping vistas of the sapphire Mediterranean.
            </p>

            {/* Category Filter Tabs */}
            <div className="category-tabs">
              <button
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Residences ({HOTEL_ROOMS.length})
              </button>
              <button
                className={`category-tab ${selectedCategory === 'deluxe' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('deluxe')}
              >
                Deluxe Suites
              </button>
              <button
                className={`category-tab ${selectedCategory === 'villa' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('villa')}
              >
                Private Villas
              </button>
              <button
                className={`category-tab ${selectedCategory === 'penthouse' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('penthouse')}
              >
                Presidential Penthouses
              </button>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-image-wrap">
                  <img src={room.image} alt={room.name} className="room-img" loading="lazy" />
                  <span className="room-type-tag">{room.type}</span>
                  <div className="room-rating-pill">
                    <Star size={13} fill="#d4af37" stroke="#d4af37" />
                    <span>{room.rating}</span>
                    <small>({room.reviews})</small>
                  </div>
                </div>

                <div className="room-info">
                  <div className="room-meta-top">
                    <span className="room-view-meta">{room.view}</span>
                    <span className="room-size-meta">{room.size}</span>
                  </div>

                  <h3 className="room-title">{room.name}</h3>
                  <p className="room-description">{room.description}</p>

                  <div className="room-amenities-pills">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="amenity-chip">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="room-card-footer">
                    <div className="room-price-wrap">
                      <span className="room-price">${room.price}</span>
                      <span className="room-price-unit">/ night</span>
                    </div>

                    <button
                      className="btn-reserve-room"
                      onClick={() => onBookRoom(room)}
                    >
                      <span>Reserve Suite</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SANCTUARY EXPERIENCES & AMENITIES */}
      <section className="amenities-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">The Aurelia Standard</span>
            <h2 className="section-title">Curated Experiences of Distinction</h2>
            <p className="section-desc">
              From dawn until twilight, our estate caters to your every whim with understated elegance and anticipatory service.
            </p>
          </div>

          <div className="amenities-grid">
            {HOTEL_AMENITIES.map((item, idx) => (
              <div key={idx} className="amenity-card">
                <div className="amenity-icon-box">
                  {idx === 0 && <Waves size={24} />}
                  {idx === 1 && <UtensilsCrossed size={24} />}
                  {idx === 2 && <Sparkles size={24} />}
                  {idx === 3 && <Shield size={24} />}
                </div>
                <h3 className="amenity-title">{item.title}</h3>
                <p className="amenity-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <div className="cta-content">
              <span className="prestige-tag">
                <Award size={14} />
                Exclusive Patron Privileges
              </span>
              <h2 className="cta-title">Unlock Preferred Rates & VIP Keycards</h2>
              <p className="cta-desc">
                Sign up for an Aurelia Circle account to access direct patron pricing, complimentary late check-out, and private cellar tastings.
              </p>
              <div className="cta-actions">
                <button
                  className="btn-cta-primary"
                  onClick={() => onNavigate('signup')}
                >
                  <span>Establish Patron Account</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn-cta-secondary"
                  onClick={() => onNavigate('login')}
                >
                  <span>Patron Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
