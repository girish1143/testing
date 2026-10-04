import React, { useState } from 'react';
import { X, Calendar, Users, CheckCircle2, ShieldCheck, Crown, BedDouble, ArrowRight } from 'lucide-react';
import { createHotelBooking } from '../config/supabaseClient';
import './BookingModal.css';

export default function BookingModal({ room, isOpen, onClose, currentUser, showToast }) {
  if (!isOpen || !room) return null;

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [formError, setFormError] = useState('');

  // Calculate nights
  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 1);
  const roomSubtotal = room.price * nights;
  const tax = Math.round(roomSubtotal * 0.12);
  const grandTotal = roomSubtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!guestName.trim()) {
      setFormError('Please enter your full guest name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address for your reservation folio.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setFormError('Check-out date must be after check-in date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        roomId: room.id,
        roomName: room.name,
        roomCategory: room.category,
        pricePerNight: room.price,
        checkIn,
        checkOut,
        nights,
        guests: Number(guests),
        guestName: guestName.trim(),
        email: email.trim(),
        specialRequests: specialRequests.trim(),
        subtotal: roomSubtotal,
        tax,
        grandTotal
      };

      const result = await createHotelBooking(bookingData);
      setConfirmedBooking(result);
      showToast?.('Reservation Confirmed', `Suite ${room.name} booked for ${nights} nights!`, 'success');
    } catch (err) {
      setFormError('Failed to record booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {confirmedBooking ? (
          <div className="booking-success-view">
            <div className="success-crest">
              <CheckCircle2 size={36} />
            </div>
            <span className="success-eyebrow">Reservation Confirmed</span>
            <h2 className="success-title">Your Sanctuary Awaits</h2>
            <p className="success-p">
              Thank you, <strong>{confirmedBooking.guestName}</strong>. A confirmation folio has been registered under reference:
            </p>
            <div className="booking-ref-badge">
              <span>Folio #:</span>
              <strong>{confirmedBooking.id}</strong>
            </div>

            <div className="confirmed-summary-box">
              <div className="confirmed-row">
                <span>Suite Reserved:</span>
                <strong>{confirmedBooking.roomName}</strong>
              </div>
              <div className="confirmed-row">
                <span>Check-In:</span>
                <span>{confirmedBooking.checkIn} (15:00)</span>
              </div>
              <div className="confirmed-row">
                <span>Check-Out:</span>
                <span>{confirmedBooking.checkOut} (11:00)</span>
              </div>
              <div className="confirmed-row">
                <span>Total Folio:</span>
                <strong>${confirmedBooking.grandTotal.toLocaleString()} USD</strong>
              </div>
            </div>

            <button className="btn-modal-action" onClick={onClose}>
              <span>Return to Showcase</span>
            </button>
          </div>
        ) : (
          <div className="booking-form-view">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-suite-preview">
                <img src={room.image} alt={room.name} className="modal-suite-img" />
                <div>
                  <span className="modal-suite-type">{room.type}</span>
                  <h3 className="modal-suite-title">{room.name}</h3>
                  <span className="modal-suite-price">
                    ${room.price} <small>/ night</small>
                  </span>
                </div>
              </div>
            </div>

            {formError && (
              <div className="modal-alert-error">
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-booking-form">
              <div className="form-grid-2">
                <div className="modal-field">
                  <label>Check-In Date</label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-field">
                  <label>Check-Out Date</label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="modal-field">
                  <label>Guest Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Lord Julian Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="patron@aurelia.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-field">
                <label>Number of Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  {[...Array(room.maxGuests || 4)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-field">
                <label>Special In-Suite Requests (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Airport limousine transfer, chilled vintage champagne on arrival..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              {/* Price Calculation breakdown */}
              <div className="booking-price-card">
                <div className="price-row">
                  <span>${room.price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span>${roomSubtotal.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Hospitality & Luxury Tax (12%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="price-divider" />
                <div className="price-row total">
                  <span>Total Due</span>
                  <strong>${grandTotal.toLocaleString()} USD</strong>
                </div>
              </div>

              <button type="submit" className="btn-modal-action" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>Processing Folio...</span>
                ) : (
                  <>
                    <span>Confirm & Book Suite</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <div className="modal-security-footer">
                <ShieldCheck size={14} />
                <span>Instant Confirmation • No Cancellation Fee Up to 48h Prior</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
