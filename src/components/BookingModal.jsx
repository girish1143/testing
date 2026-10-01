import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  CheckCircle2, 
  Bed, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Printer, 
  Receipt,
  Car,
  Utensils,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import './BookingModal.css';

export default function BookingModal({
  isOpen,
  onClose,
  rooms = [],
  preSelectedRoom = null,
  onCompleteBooking,
  onViewInvoice
}) {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const defaultCheckOut = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Selected room
  const [selectedRoomId, setSelectedRoomId] = useState(
    preSelectedRoom ? preSelectedRoom.id : (rooms[0] ? rooms[0].id : '')
  );

  const selectedRoom = useMemo(() => {
    return rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  }, [rooms, selectedRoomId]);

  // Form states
  const [step, setStep] = useState(1); // 1 = Details & Add-ons, 2 = Guest Info, 3 = Confirmation
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

  // Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState({
    limousine: false,
    breakfast: true,
    spa: false,
    catamaran: false,
  });

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Nights calculation
  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.max(end - start, 86400000);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  }, [checkIn, checkOut]);

  // Financial calculations
  const roomRate = selectedRoom ? selectedRoom.price : 280;
  const roomSubtotal = roomRate * nights;

  const addOnItems = useMemo(() => {
    const items = [];
    const guestsNum = parseInt(adults, 10) + parseInt(children, 10);
    if (selectedAddOns.limousine) {
      items.push({ name: 'Chauffeured Airport Limousine', price: 60 });
    }
    if (selectedAddOns.breakfast) {
      items.push({ name: `Gourmet Breakfast (${guestsNum} guests × ${nights} nights)`, price: 45 * guestsNum * nights });
    }
    if (selectedAddOns.spa) {
      items.push({ name: 'Azure Signature Spa Treatment', price: 195 });
    }
    if (selectedAddOns.catamaran) {
      items.push({ name: 'Private Sunset Catamaran Cruise', price: 350 });
    }
    return items;
  }, [selectedAddOns, adults, children, nights]);

  const addOnsTotal = addOnItems.reduce((acc, item) => acc + item.price, 0);
  const subtotalBeforeTax = roomSubtotal + addOnsTotal;
  const taxes = Math.round(subtotalBeforeTax * HOTEL_INFO.taxRate);
  const grandTotal = subtotalBeforeTax + taxes;

  const toggleAddOn = (key) => {
    setSelectedAddOns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) return;

    const newBookingId = `GA-2025-${Math.floor(100 + Math.random() * 900)}`;

    const newReservation = {
      id: newBookingId,
      guestName,
      email: guestEmail,
      phone: guestPhone || '+1 (555) 019-2831',
      roomNumber: selectedRoom.number,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      adults: parseInt(adults, 10),
      children: parseInt(children, 10),
      ratePerNight: roomRate,
      roomTotal: roomSubtotal,
      taxes,
      addOnsTotal,
      grandTotal,
      paidAmount: paymentMethod === 'pay_on_arrival' ? 0 : grandTotal,
      paymentStatus: paymentMethod === 'pay_on_arrival' ? 'due' : 'paid',
      status: 'confirmed',
      specialRequests: specialRequests || 'None specified',
      addOns: addOnItems,
      roomServiceCharges: [],
      createdAt: today
    };

    setConfirmedBooking(newReservation);
    onCompleteBooking(newReservation, selectedRoom);
    setStep(3);
  };

  return (
    <div className="hotel-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="booking-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="booking-modal-header">
          <div className="booking-title-group">
            <span className="booking-kicker">Reservation Portal</span>
            <h2 className="booking-title">
              {step === 3 ? 'Reservation Confirmed' : 'Reserve Your Luxury Sanctuary'}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close booking">
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="booking-steps-bar">
          <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-circle">1</span>
            <span className="step-label">Stay & Amenities</span>
          </div>
          <div className="step-line" />
          <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-circle">2</span>
            <span className="step-label">Guest Details</span>
          </div>
          <div className="step-line" />
          <div className={`step-node ${step === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="booking-modal-body">
          {/* STEP 1: Dates, Room, and Add-ons */}
          {step === 1 && (
            <form onSubmit={handleProceedToStep2} className="booking-form-step">
              <div className="step-grid-2col">
                {/* Left: Inputs */}
                <div className="form-left-col">
                  {/* Select Room */}
                  <div className="input-group">
                    <label>
                      <Bed size={15} /> Select Suite or Villa
                    </label>
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="custom-select"
                    >
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          Suite #{r.number} - {r.name} (${r.price}/night · {r.status.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Room Highlight Card */}
                  {selectedRoom && (
                    <div className="selected-room-mini-card">
                      <img src={selectedRoom.image} alt={selectedRoom.name} className="mini-card-thumb" />
                      <div className="mini-card-info">
                        <strong>Suite #{selectedRoom.number} · {selectedRoom.name}</strong>
                        <span>{selectedRoom.bedType} · {selectedRoom.view}</span>
                        <span className="mini-price">${selectedRoom.price} / night</span>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="dates-row">
                    <div className="input-group">
                      <label><Calendar size={15} /> Check-In Date</label>
                      <input 
                        type="date" 
                        value={checkIn} 
                        min={today}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label><Calendar size={15} /> Check-Out Date</label>
                      <input 
                        type="date" 
                        value={checkOut} 
                        min={checkIn || today}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="guests-row">
                    <div className="input-group">
                      <label>Adults</label>
                      <select value={adults} onChange={(e) => setAdults(e.target.value)}>
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Children</label>
                      <select value={children} onChange={(e) => setChildren(e.target.value)}>
                        <option value="0">0 Children</option>
                        <option value="1">1 Child</option>
                        <option value="2">2 Children</option>
                      </select>
                    </div>
                  </div>

                  {/* Add-ons Checklist */}
                  <div className="addons-section">
                    <h4 className="addons-heading">
                      <Sparkles size={16} /> Enhance Your Stay (Bespoke Inclusions)
                    </h4>
                    
                    <div className="addons-list">
                      <label className={`addon-checkbox-card ${selectedAddOns.breakfast ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selectedAddOns.breakfast}
                          onChange={() => toggleAddOn('breakfast')}
                        />
                        <div className="addon-text">
                          <span className="addon-title">Gourmet Champagne Breakfast</span>
                          <span className="addon-desc">Artisanal caviar & pastry buffet by Chef Jean-Luc</span>
                        </div>
                        <span className="addon-price">+$45/guest</span>
                      </label>

                      <label className={`addon-checkbox-card ${selectedAddOns.limousine ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selectedAddOns.limousine}
                          onChange={() => toggleAddOn('limousine')}
                        />
                        <div className="addon-text">
                          <span className="addon-title">Airport Limousine Chauffeur</span>
                          <span className="addon-desc">Mercedes S-Class private airport meet & greet</span>
                        </div>
                        <span className="addon-price">+$60</span>
                      </label>

                      <label className={`addon-checkbox-card ${selectedAddOns.spa ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selectedAddOns.spa}
                          onChange={() => toggleAddOn('spa')}
                        />
                        <div className="addon-text">
                          <span className="addon-title">Azure Signature Spa Ritual (90 min)</span>
                          <span className="addon-desc">Ayurvedic hot stone body treatment & scrub</span>
                        </div>
                        <span className="addon-price">+$195</span>
                      </label>

                      <label className={`addon-checkbox-card ${selectedAddOns.catamaran ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selectedAddOns.catamaran}
                          onChange={() => toggleAddOn('catamaran')}
                        />
                        <div className="addon-text">
                          <span className="addon-title">Sunset Catamaran Cruise</span>
                          <span className="addon-desc">2-hour private yacht cruise with vintage brut</span>
                        </div>
                        <span className="addon-price">+$350</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right: Price Folio Summary */}
                <div className="form-right-col">
                  <div className="folio-preview-box">
                    <h4 className="folio-title">
                      <Receipt size={17} /> Live Stay Calculation
                    </h4>
                    <div className="folio-rows">
                      <div className="folio-row">
                        <span>{selectedRoom ? selectedRoom.name : 'Suite'} ({nights} nights × ${roomRate})</span>
                        <span>${roomSubtotal.toLocaleString()}</span>
                      </div>

                      {addOnItems.map((item, i) => (
                        <div key={i} className="folio-row addon-row">
                          <span>+ {item.name}</span>
                          <span>${item.price.toLocaleString()}</span>
                        </div>
                      ))}

                      <div className="folio-row">
                        <span>Subtotal</span>
                        <span>${subtotalBeforeTax.toLocaleString()}</span>
                      </div>

                      <div className="folio-row">
                        <span>Resort & Hospitality Tax (12%)</span>
                        <span>${taxes.toLocaleString()}</span>
                      </div>

                      <div className="folio-divider" />

                      <div className="folio-row total-row">
                        <span>Estimated Total</span>
                        <span className="gold-total">${grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="folio-note">
                      <ShieldCheck size={16} /> Free cancellation up to 48 hours prior to check-in.
                    </div>

                    <button type="submit" className="btn-book-primary w-full next-step-btn">
                      <span>Continue to Guest Details</span>
                      <ChevronRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: Guest Details & Payment Method */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="booking-form-step">
              <div className="step-grid-2col">
                <div className="form-left-col">
                  <h4 className="step-section-heading">Lead Guest Information</h4>

                  <div className="input-group">
                    <label><User size={15} /> Primary Guest Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Lord Alexander Kensington"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="dates-row">
                    <div className="input-group">
                      <label><Mail size={15} /> Email Address *</label>
                      <input
                        type="email"
                        placeholder="guest@domain.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label><Phone size={15} /> Mobile Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Special Requests or Dietary Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="High floor preference, feather-free pillows, champagne chilling upon arrival..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="payment-options-block">
                    <label className="section-label">Select Payment Method</label>
                    <div className="payment-radios">
                      <label className={`payment-radio-pill ${paymentMethod === 'card' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <CreditCard size={18} />
                        <span>Credit / Debit Card (Instant Guaranteed Booking)</span>
                      </label>

                      <label className={`payment-radio-pill ${paymentMethod === 'pay_on_arrival' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          value="pay_on_arrival"
                          checked={paymentMethod === 'pay_on_arrival'}
                          onChange={() => setPaymentMethod('pay_on_arrival')}
                        />
                        <Clock size={18} />
                        <span>Pay Upon Arrival at Front Desk</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Summary */}
                <div className="form-right-col">
                  <div className="folio-preview-box">
                    <h4 className="folio-title">Booking Summary</h4>
                    <div className="summary-suite-snippet">
                      <strong>Suite #{selectedRoom.number} · {selectedRoom.name}</strong>
                      <p>{checkIn} → {checkOut} ({nights} nights)</p>
                      <p>{adults} Adults, {children} Children</p>
                    </div>

                    <div className="folio-divider" />

                    <div className="folio-rows">
                      <div className="folio-row total-row">
                        <span>Grand Total</span>
                        <span className="gold-total">${grandTotal.toLocaleString()}</span>
                      </div>
                      <div className="folio-row">
                        <span>Payment Status:</span>
                        <strong className={paymentMethod === 'card' ? 'text-success' : 'text-amber'}>
                          {paymentMethod === 'card' ? 'Will Charge Card' : 'Pay at Check-In'}
                        </strong>
                      </div>
                    </div>

                    <div className="modal-actions-dual">
                      <button 
                        type="button" 
                        className="btn-secondary-ghost"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button type="submit" className="btn-book-primary">
                        <CheckCircle2 size={16} />
                        <span>Confirm Reservation</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: Booking Confirmed */}
          {step === 3 && confirmedBooking && (
            <div className="booking-confirmed-view">
              <div className="confirmed-badge-box">
                <CheckCircle2 size={54} className="badge-icon-confirmed" />
                <h3 className="confirmed-title">Reservation Successfully Secured</h3>
                <p className="confirmed-sub">
                  An electronic confirmation with concierge access keys has been logged for{' '}
                  <strong>{confirmedBooking.guestName}</strong>.
                </p>
                <div className="reservation-id-box">
                  <span className="res-tag">Confirmation Code</span>
                  <span className="res-code">{confirmedBooking.id}</span>
                </div>
              </div>

              {/* Summary Details */}
              <div className="confirmed-details-grid">
                <div className="detail-item">
                  <span>Assigned Suite:</span>
                  <strong>Suite #{confirmedBooking.roomNumber} - {confirmedBooking.roomName}</strong>
                </div>
                <div className="detail-item">
                  <span>Check-In Date:</span>
                  <strong>{confirmedBooking.checkIn} (from 15:00)</strong>
                </div>
                <div className="detail-item">
                  <span>Check-Out Date:</span>
                  <strong>{confirmedBooking.checkOut} (until 11:00)</strong>
                </div>
                <div className="detail-item">
                  <span>Total Amount:</span>
                  <strong className="gold-text">${confirmedBooking.grandTotal.toLocaleString()}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="confirmed-actions-row">
                <button 
                  className="btn-details-ghost"
                  onClick={() => onViewInvoice(confirmedBooking)}
                >
                  <Printer size={16} />
                  <span>View & Print Official Folio</span>
                </button>
                <button 
                  className="btn-book-primary"
                  onClick={onClose}
                >
                  <span>Return to Management Console</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
