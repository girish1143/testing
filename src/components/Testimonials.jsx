import React from 'react';
import { testimonialsData } from '../data/portfolioData';
import { Star, MessageSquareQuote } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <MessageSquareQuote size={14} />
            Peer Endorsements
          </span>
          <h2 className="section-title">
            Trusted by <span className="gradient-text">Engineering Leaders</span>
          </h2>
          <p className="section-description">
            What founders, VPs of Engineering, and product owners say about collaborating on complex, mission-critical systems.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonialsData.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div>
                <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" strokeWidth={0} />
                  ))}
                </div>

                <p className="testimonial-quote">
                  "{t.quote}"
                </p>
              </div>

              <div className="testimonial-author">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="author-avatar"
                  loading="lazy"
                />
                <div className="author-info">
                  <span className="author-name">{t.name}</span>
                  <span className="author-title">{t.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
