import React, { useState } from 'react';
import { 
  X, 
  Bed, 
  Users, 
  Maximize2, 
  Compass, 
  Star, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  Coffee,
  Wifi,
  Bath,
  Tv,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './RoomDetailModal.css';

export default function RoomDetailModal({ room, onClose, onBookRoom }) {
  if (!room) return null;

  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="hotel-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="room-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        {/* Gallery Section */}
        <div className="modal-gallery-area">
          <div className="gallery-main-viewport">
            <img 
              src={images[activeImageIndex]} 
              alt={`${room.name} photo ${activeImageIndex + 1}`} 
              className="gallery-active-img"
            />
            {images.length > 1 && (
              <>
                <button className="gallery-nav-btn prev" onClick={prevImage} aria-label="Previous image">
                  <ChevronLeft size={22} />
                </button>
                <button className="gallery-nav-btn next" onClick={nextImage} aria-label="Next image">
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <div className="gallery-counter">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="gallery-thumbs-row">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`gallery-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt="thumbnail" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Info Content */}
        <div className="modal-info-scroll">
          {/* Header Banner */}
          <div className="modal-header-meta">
            <div>
              <span className="room-meta-type">{room.type} · Floor {room.floor}</span>
              <h2 className="modal-room-title">{room.name}</h2>
              <div className="modal-location-rating">
                <span className="room-view-tag">
                  <Compass size={14} /> {room.view}
                </span>
                <span className="room-rating-pill">
                  <Star size={13} fill="currentColor" /> {room.rating} ({room.reviews} verified reviews)
                </span>
              </div>
            </div>

            <div className="modal-price-box">
              <span className="price-tag-sub">Starting Rate</span>
              <span className="modal-price-num">${room.price}</span>
              <span className="price-tag-sub">per night</span>
            </div>
          </div>

          {/* Room Specs Matrix */}
          <div className="modal-specs-grid">
            <div className="modal-spec-cell">
              <Maximize2 size={18} />
              <div>
                <span className="cell-label">Living Area</span>
                <span className="cell-value">{room.size} sq.ft / {(room.size * 0.0929).toFixed(0)} m²</span>
              </div>
            </div>
            <div className="modal-spec-cell">
              <Users size={18} />
              <div>
                <span className="cell-label">Occupancy</span>
                <span className="cell-value">Up to {room.maxGuests} Guests</span>
              </div>
            </div>
            <div className="modal-spec-cell">
              <Bed size={18} />
              <div>
                <span className="cell-label">Bed Setup</span>
                <span className="cell-value">{room.bedType}</span>
              </div>
            </div>
            <div className="modal-spec-cell">
              <Clock size={18} />
              <div>
                <span className="cell-label">Suite Status</span>
                <span className={`cell-value status-val ${room.status}`}>
                  {room.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="modal-section-block">
            <h4 className="modal-block-title">The Residence Experience</h4>
            <p className="modal-description-text">{room.description}</p>
          </div>

          {/* Amenities & Tech */}
          <div className="modal-section-block">
            <h4 className="modal-block-title">Bespoke Amenities & Technology</h4>
            <div className="modal-amenities-grid">
              {room.amenities.map((amenity, i) => (
                <div key={i} className="amenity-item-row">
                  <Check size={16} className="check-icon" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resort Inclusions */}
          <div className="modal-inclusions-banner">
            <Sparkles size={20} className="sparkle-gold" />
            <div>
              <h5>Grand Aurelia Signature Privilege Inclusions</h5>
              <p>
                Includes 24/7 dedicated butler service, welcome vintage champagne bottle, daily artisanal breakfast buffet,
                and complimentary chauffeured beach limousine transfers.
              </p>
            </div>
          </div>

          {/* Current Occupant (if Staff View / Occupied) */}
          {room.currentGuest && (
            <div className="modal-occupant-banner">
              <ShieldCheck size={18} />
              <div>
                <strong>Current In-House Guest:</strong> {room.currentGuest.name} (Res #{room.currentGuest.reservationId})
                <span>Check-in: {room.currentGuest.checkIn} → Check-out: {room.currentGuest.checkOut}</span>
              </div>
            </div>
          )}

          {/* Modal Action CTA */}
          <div className="modal-action-footer">
            <button className="btn-secondary-ghost" onClick={onClose}>
              Back to Catalog
            </button>
            <button 
              className="btn-book-primary modal-cta-btn"
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
            >
              <Calendar size={16} />
              <span>Proceed to Reserve Suite #{room.number}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
