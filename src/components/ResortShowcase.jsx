import React from 'react';
import { 
  Waves, 
  Sparkles, 
  Utensils, 
  Compass, 
  Star, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { HOTEL_AMENITIES } from '../data/hotelData';
import './ResortShowcase.css';

export default function ResortShowcase({ onNavigate, onOpenBookingModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Waves':
        return <Waves size={24} />;
      case 'Sparkles':
        return <Sparkles size={24} />;
      case 'Utensils':
        return <Utensils size={24} />;
      case 'Compass':
        return <Compass size={24} />;
      default:
        return <Sparkles size={24} />;
    }
  };

  const reviews = [
    {
      author: "Lord Henry Cavendish",
      origin: "London, United Kingdom",
      quote: "The Imperial Penthouse at Grand Aurelia is peerless. From the private helicopter arrival to the Michelin-star dining served on our rooftop terrace, the experience was transcendent.",
      suite: "The Aurelia Imperial Penthouse",
      rating: 5
    },
    {
      author: "Helena Lindqvist",
      origin: "Stockholm, Sweden",
      quote: "The overwater coral villa took our breath away. Waking up to the sunrise over azure water through glass floor panels and enjoying breakfast brought by our private butler was pure paradise.",
      suite: "Overwater Coral Haven Villa",
      rating: 5
    },
    {
      author: "Jean-Paul & Chloé Mercier",
      origin: "Paris, France",
      quote: "Exceptional front-desk hospitality, immaculate suites, and the most relaxing spa treatments we have ever encountered in Europe. We have already booked our return stay.",
      suite: "Executive Horizon Suite",
      rating: 5
    }
  ];

  return (
    <section className="resort-showcase-section">
      <div className="showcase-container">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="section-sub-tag">The Aurelia Lifestyle</div>
          <h2 className="section-title-large">
            World-Class Amenities & <span className="gold-text">Sanctuary Facilities</span>
          </h2>
          <p className="section-subtext">
            Designed for boundless tranquility, restorative indulgence, and unforgettable Mediterranean living.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="amenities-showcase-grid">
          {HOTEL_AMENITIES.map((amenity) => (
            <div key={amenity.id} className="amenity-showcase-card">
              <div className="amenity-card-img-wrap">
                <img src={amenity.image} alt={amenity.title} loading="lazy" />
                <div className="amenity-icon-floating">
                  {getIcon(amenity.icon)}
                </div>
              </div>

              <div className="amenity-card-content">
                <span className="amenity-sub">{amenity.subtitle}</span>
                <h3 className="amenity-title">{amenity.title}</h3>
                <p className="amenity-desc">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials / Guest Acclaim Banner */}
        <div className="guest-acclaim-banner">
          <div className="section-head-center">
            <div className="section-sub-tag">Distinguished Guest Acclaim</div>
            <h3 className="section-title-large">Words From Our Patrons</h3>
          </div>

          <div className="reviews-cards-row">
            {reviews.map((rev, idx) => (
              <div key={idx} className="review-quote-card">
                <div className="review-stars-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" className="gold-star" />
                  ))}
                </div>

                <p className="review-quote-text">"{rev.quote}"</p>

                <div className="review-author-meta">
                  <strong>{rev.author}</strong>
                  <span>{rev.origin}</span>
                  <small className="reviewed-suite">Stayed in: {rev.suite}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big CTA Banner */}
        <div className="resort-cta-strip">
          <div className="cta-strip-text">
            <span className="cta-kicker">Experience Grand Aurelia</span>
            <h3>Ready to Reserve Your Coastal Sanctuary?</h3>
            <p>Our dedicated VIP concierge is available 24/7 to personalize every nuance of your arrival.</p>
          </div>

          <div className="cta-strip-buttons">
            <button className="btn-book-primary" onClick={() => onOpenBookingModal(null)}>
              <span>Reserve Your Suite Now</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn-details-ghost" onClick={() => onNavigate('rooms')}>
              <span>View All 15 Suites</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
