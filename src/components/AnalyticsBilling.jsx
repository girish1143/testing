import React, { useState, useMemo } from 'react';
import { 
  ReceiptText, 
  Printer, 
  Download, 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  FileText, 
  CheckCircle2, 
  Building, 
  Mail, 
  Phone,
  Search,
  ChevronRight
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import './AnalyticsBilling.css';

export default function AnalyticsBilling({
  reservations = [],
  rooms = [],
  activeInvoiceReservation = null,
  onCloseInvoice
}) {
  const [selectedResId, setSelectedResId] = useState(
    activeInvoiceReservation ? activeInvoiceReservation.id : (reservations[0]?.id || '')
  );

  const selectedReservation = useMemo(() => {
    return reservations.find((r) => r.id === selectedResId) || reservations[0];
  }, [reservations, selectedResId]);

  // Overall Financial Calculations
  const totalRevenue = useMemo(() => {
    return reservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((sum, r) => sum + r.grandTotal, 0);
  }, [reservations]);

  const totalNightsBooked = useMemo(() => {
    return reservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((sum, r) => sum + r.nights, 0);
  }, [reservations]);

  const averageDailyRate = totalNightsBooked > 0 
    ? Math.round(totalRevenue / totalNightsBooked) 
    : 450;

  const roomRevenue = useMemo(() => {
    return reservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((sum, r) => sum + (r.roomTotal || 0), 0);
  }, [reservations]);

  const addOnsRevenue = useMemo(() => {
    return reservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((sum, r) => sum + (r.addOnsTotal || 0), 0);
  }, [reservations]);

  const taxCollected = useMemo(() => {
    return reservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((sum, r) => sum + (r.taxes || 0), 0);
  }, [reservations]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="billing-section" id="billing">
      <div className="billing-container">
        {/* Header */}
        <div className="billing-header">
          <div className="section-sub-tag">Financial Accounting & Revenue Management</div>
          <h2 className="billing-title">
            Guest Folio Invoicing & <span className="gold-text">Revenue Analytics</span>
          </h2>
          <p className="billing-desc">
            Generate itemized tax folios, review departmental revenue distribution, and track guest billing accounts.
          </p>
        </div>

        {/* Top Financial Metric Tiles */}
        <div className="billing-metrics-row">
          <div className="billing-kpi-card">
            <span className="kpi-label">Gross Portfolio Revenue</span>
            <strong className="kpi-val">${totalRevenue.toLocaleString()}</strong>
            <span className="kpi-trend text-success">
              <TrendingUp size={14} /> +18.4% vs previous cycle
            </span>
          </div>

          <div className="billing-kpi-card">
            <span className="kpi-label">Average Daily Rate (ADR)</span>
            <strong className="kpi-val">${averageDailyRate}</strong>
            <span className="kpi-trend">Across all luxury suite tiers</span>
          </div>

          <div className="billing-kpi-card">
            <span className="kpi-label">Room Accommodations Revenue</span>
            <strong className="kpi-val">${roomRevenue.toLocaleString()}</strong>
            <span className="kpi-trend">Core lodging operations</span>
          </div>

          <div className="billing-kpi-card">
            <span className="kpi-label">Dining & Concierge Revenue</span>
            <strong className="kpi-val">${addOnsRevenue.toLocaleString()}</strong>
            <span className="kpi-trend text-gold">Spa, fine dining & experiences</span>
          </div>
        </div>

        {/* Main Workspace Split: Folio Viewer on Left, Reservations Select on Right */}
        <div className="billing-workspace">
          {/* Folio Selector Sidebar */}
          <div className="folio-selector-panel">
            <div className="selector-title">
              <FileText size={16} className="gold-icon" />
              <h4>Select Folio Account</h4>
            </div>

            <div className="folio-accounts-list">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className={`folio-account-item ${selectedResId === res.id ? 'active' : ''}`}
                  onClick={() => setSelectedResId(res.id)}
                >
                  <div className="account-top">
                    <span className="account-code">{res.id}</span>
                    <span className={`account-badge ${res.status}`}>{res.status.toUpperCase()}</span>
                  </div>
                  <strong className="account-name">{res.guestName}</strong>
                  <div className="account-sub">
                    <span>Suite #{res.roomNumber}</span>
                    <span className="gold-text">${res.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Luxury Folio Invoice Document */}
          <div className="folio-invoice-container">
            {selectedReservation ? (
              <div className="invoice-document" id="printable-folio">
                {/* Invoice Action Bar */}
                <div className="invoice-action-bar no-print">
                  <div className="invoice-status-pill">
                    Status:{' '}
                    <strong className={selectedReservation.paymentStatus === 'paid' ? 'text-success' : 'text-amber'}>
                      {selectedReservation.paymentStatus === 'paid' ? 'PAID IN FULL' : 'PAYMENT DUE AT FRONT DESK'}
                    </strong>
                  </div>

                  <div className="action-buttons">
                    <button className="btn-print-invoice" onClick={handlePrint}>
                      <Printer size={16} />
                      <span>Print Folio</span>
                    </button>
                  </div>
                </div>

                {/* Printable Invoice Header */}
                <div className="invoice-brand-header">
                  <div className="brand-invoice-left">
                    <div className="invoice-crest">✦</div>
                    <div>
                      <h2 className="invoice-resort-title">{HOTEL_INFO.name}</h2>
                      <p className="invoice-resort-sub">{HOTEL_INFO.tagline}</p>
                      <p className="invoice-address">{HOTEL_INFO.address}</p>
                      <p className="invoice-contact">{HOTEL_INFO.phone} · {HOTEL_INFO.email}</p>
                    </div>
                  </div>

                  <div className="invoice-meta-right">
                    <span className="invoice-doc-type">OFFICIAL GUEST FOLIO</span>
                    <div className="invoice-meta-row">
                      <span>Folio Ref:</span>
                      <strong>{selectedReservation.id}</strong>
                    </div>
                    <div className="invoice-meta-row">
                      <span>Issue Date:</span>
                      <strong>{selectedReservation.createdAt || '2026-10-01'}</strong>
                    </div>
                    <div className="invoice-meta-row">
                      <span>Currency:</span>
                      <strong>USD ($)</strong>
                    </div>
                  </div>
                </div>

                <div className="invoice-divider" />

                {/* Guest & Stay Details Grid */}
                <div className="invoice-guest-grid">
                  <div className="guest-info-block">
                    <span className="grid-label">Billed To (Lead Patron):</span>
                    <strong className="guest-name-large">{selectedReservation.guestName}</strong>
                    <span>{selectedReservation.email}</span>
                    <span>{selectedReservation.phone}</span>
                  </div>

                  <div className="stay-info-block">
                    <span className="grid-label">Accommodation Summary:</span>
                    <strong>Suite #{selectedReservation.roomNumber} - {selectedReservation.roomName}</strong>
                    <span>Check-In: {selectedReservation.checkIn} (15:00)</span>
                    <span>Check-Out: {selectedReservation.checkOut} (11:00)</span>
                    <span>Length of Stay: {selectedReservation.nights} Night(s)</span>
                  </div>
                </div>

                {/* Itemized Charges Table */}
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Description & Service Category</th>
                      <th>Quantity / Period</th>
                      <th>Unit Rate</th>
                      <th className="text-right">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Room Nights Charge */}
                    <tr>
                      <td>
                        <strong>Room Stay: {selectedReservation.roomName}</strong>
                        <div className="line-item-desc">Suite #{selectedReservation.roomNumber} lodging accommodations</div>
                      </td>
                      <td>{selectedReservation.nights} Nights</td>
                      <td>${selectedReservation.ratePerNight}</td>
                      <td className="text-right">${selectedReservation.roomTotal.toLocaleString()}</td>
                    </tr>

                    {/* Concierge Add-ons */}
                    {selectedReservation.addOns && selectedReservation.addOns.map((addon, i) => (
                      <tr key={`addon-${i}`}>
                        <td>
                          <strong>{addon.name}</strong>
                          <div className="line-item-desc">Concierge VIP Inclusion</div>
                        </td>
                        <td>1 Package</td>
                        <td>${addon.price}</td>
                        <td className="text-right">${addon.price.toLocaleString()}</td>
                      </tr>
                    ))}

                    {/* Room Service / Dining orders */}
                    {selectedReservation.roomServiceCharges && selectedReservation.roomServiceCharges.map((charge, i) => (
                      <tr key={`dining-${i}`}>
                        <td>
                          <strong>In-Room Dining: {charge.item}</strong>
                          <div className="line-item-desc">Delivered: {charge.time}</div>
                        </td>
                        <td>1 Order</td>
                        <td>${charge.price}</td>
                        <td className="text-right">${charge.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Invoice Financial Summary */}
                <div className="invoice-totals-wrapper">
                  <div className="invoice-notes-box">
                    <span className="notes-heading">Payment Information & Policy</span>
                    <p>
                      Method: {selectedReservation.paymentStatus === 'paid' ? 'Processed via Platinum Secured Card' : 'Front Desk Counter Payment'}
                    </p>
                    <p>
                      Special Request: {selectedReservation.specialRequests || 'Standard VIP guest preferences recorded.'}
                    </p>
                    <p className="gratuity-note">
                      * Gratuity is entirely at guest discretion. Thank you for staying with Grand Aurelia Resort & Suites.
                    </p>
                  </div>

                  <div className="invoice-totals-table">
                    <div className="total-line">
                      <span>Accommodations Subtotal:</span>
                      <strong>${selectedReservation.roomTotal.toLocaleString()}</strong>
                    </div>

                    <div className="total-line">
                      <span>Dining & Add-ons:</span>
                      <strong>${(selectedReservation.addOnsTotal || 0).toLocaleString()}</strong>
                    </div>

                    <div className="total-line">
                      <span>Hospitality & Luxury Tax (12%):</span>
                      <strong>${selectedReservation.taxes.toLocaleString()}</strong>
                    </div>

                    <div className="invoice-divider" />

                    <div className="total-line grand-line">
                      <span>Folio Grand Total:</span>
                      <strong className="gold-text">${selectedReservation.grandTotal.toLocaleString()}</strong>
                    </div>

                    <div className="total-line">
                      <span>Amount Paid:</span>
                      <strong className="text-success">${selectedReservation.paidAmount.toLocaleString()}</strong>
                    </div>

                    <div className="total-line balance-line">
                      <span>Balance Outstanding:</span>
                      <strong className={selectedReservation.grandTotal - selectedReservation.paidAmount > 0 ? 'text-amber' : 'text-success'}>
                        ${(selectedReservation.grandTotal - selectedReservation.paidAmount).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Official Seal / Signature Footer */}
                <div className="invoice-signature-section">
                  <div className="signature-box">
                    <div className="signature-line" />
                    <span>Authorized Concierge / Front Office General Manager</span>
                  </div>

                  <div className="official-hotel-seal">
                    <div className="seal-circle">
                      <span>GRAND AURELIA</span>
                      <small>OFFICIAL SEAL</small>
                      <span>✦ 5-STAR LUXURY ✦</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-folio-selected">
                <FileText size={48} className="gold-icon" />
                <h3>No Reservation Selected</h3>
                <p>Select a guest folio account from the sidebar to view their complete invoice breakdown.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
