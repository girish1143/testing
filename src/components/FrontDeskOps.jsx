import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Bed, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  ArrowUpDown, 
  LogOut, 
  LogIn, 
  FileText, 
  Sparkles, 
  Key, 
  Eye, 
  Plus, 
  DollarSign, 
  Layers, 
  Calendar,
  XCircle,
  RefreshCw,
  Printer
} from 'lucide-react';
import './FrontDeskOps.css';

export default function FrontDeskOps({
  rooms = [],
  reservations = [],
  onUpdateRoomStatus,
  onCheckInGuest,
  onCheckOutGuest,
  onCancelReservation,
  onViewInvoice,
  onOpenBookingModal
}) {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'reservations' | 'walkin'
  const [selectedFloor, setSelectedFloor] = useState('all'); // 'all' | 1 | 2 | 3 | 4
  const [resSearch, setResSearch] = useState('');
  const [resStatusFilter, setResStatusFilter] = useState('all');

  // Quick stats
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
  const availableRooms = rooms.filter((r) => r.status === 'available').length;
  const cleaningRooms = rooms.filter((r) => r.status === 'cleaning').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  // Filtered floor rooms
  const floorRooms = useMemo(() => {
    if (selectedFloor === 'all') return rooms;
    return rooms.filter((r) => r.floor === parseInt(selectedFloor, 10));
  }, [rooms, selectedFloor]);

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      if (resStatusFilter !== 'all' && res.status !== resStatusFilter) {
        return false;
      }
      if (resSearch.trim()) {
        const q = resSearch.toLowerCase();
        const matchName = res.guestName.toLowerCase().includes(q);
        const matchId = res.id.toLowerCase().includes(q);
        const matchRoom = res.roomNumber.toLowerCase().includes(q);
        const matchEmail = res.email.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchRoom && !matchEmail) return false;
      }
      return true;
    });
  }, [reservations, resStatusFilter, resSearch]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'checked_in':
        return <span className="ops-badge in-house"><LogIn size={12} /> In-House</span>;
      case 'confirmed':
        return <span className="ops-badge confirmed"><Clock size={12} /> Confirmed</span>;
      case 'checked_out':
        return <span className="ops-badge checked-out"><CheckCircle2 size={12} /> Checked-Out</span>;
      case 'cancelled':
        return <span className="ops-badge cancelled"><XCircle size={12} /> Cancelled</span>;
      default:
        return null;
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return <span className="pay-badge paid">Paid in Full</span>;
      case 'partial':
        return <span className="pay-badge partial">Deposit Paid</span>;
      case 'due':
        return <span className="pay-badge due">Payment Due</span>;
      default:
        return null;
    }
  };

  return (
    <section className="front-desk-section" id="operations">
      <div className="ops-container">
        {/* Ops Header Banner */}
        <div className="ops-header-banner">
          <div>
            <div className="section-sub-tag">Front Desk & Hotel Operations</div>
            <h2 className="ops-main-title">
              Guest Management & <span className="gold-text">Floor Matrix</span>
            </h2>
            <p className="ops-subtitle">
              Real-time property management system (PMS) console for check-ins, guest folios, and room allocation.
            </p>
          </div>

          <div className="ops-header-actions">
            <button className="btn-book-primary" onClick={() => onOpenBookingModal(null)}>
              <Plus size={16} />
              <span>New Walk-In Reservation</span>
            </button>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="ops-metrics-grid">
          <div className="ops-metric-card">
            <div className="metric-icon-wrap gold">
              <Layers size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Occupancy Rate</span>
              <strong className="metric-val">{occupancyRate}%</strong>
              <span className="metric-sub">{occupiedRooms} of {totalRooms} suites occupied</span>
            </div>
          </div>

          <div className="ops-metric-card">
            <div className="metric-icon-wrap emerald">
              <CheckCircle2 size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Available for Check-In</span>
              <strong className="metric-val">{availableRooms} Suites</strong>
              <span className="metric-sub">Cleaned & inspected</span>
            </div>
          </div>

          <div className="ops-metric-card">
            <div className="metric-icon-wrap rose">
              <Key size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Active In-House Guests</span>
              <strong className="metric-val">{occupiedRooms} Guests</strong>
              <span className="metric-sub">Keycards assigned</span>
            </div>
          </div>

          <div className="ops-metric-card">
            <div className="metric-icon-wrap cyan">
              <Sparkles size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Housekeeping Queue</span>
              <strong className="metric-val">{cleaningRooms} Rooms</strong>
              <span className="metric-sub">Turnover in progress</span>
            </div>
          </div>
        </div>

        {/* Ops Main Workspace Tabs */}
        <div className="ops-workspace-card">
          {/* Tab Selector */}
          <div className="ops-tabs-nav">
            <button
              className={`ops-tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTab('matrix')}
            >
              <Layers size={17} />
              <span>Interactive Floor Matrix</span>
            </button>

            <button
              className={`ops-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
              onClick={() => setActiveTab('reservations')}
            >
              <Users size={17} />
              <span>Guest Reservations Desk ({reservations.length})</span>
            </button>
          </div>

          {/* TAB 1: INTERACTIVE FLOOR MATRIX */}
          {activeTab === 'matrix' && (
            <div className="ops-matrix-view">
              {/* Floor Filter Bar */}
              <div className="matrix-floor-bar">
                <span className="floor-bar-label">Select Floor View:</span>
                <div className="floor-pills">
                  <button 
                    className={`floor-pill ${selectedFloor === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedFloor('all')}
                  >
                    All Floors ({rooms.length})
                  </button>
                  <button 
                    className={`floor-pill ${selectedFloor === 1 ? 'active' : ''}`}
                    onClick={() => setSelectedFloor(1)}
                  >
                    Floor 1 · Deluxe Sanctuaries
                  </button>
                  <button 
                    className={`floor-pill ${selectedFloor === 2 ? 'active' : ''}`}
                    onClick={() => setSelectedFloor(2)}
                  >
                    Floor 2 · Executive Suites
                  </button>
                  <button 
                    className={`floor-pill ${selectedFloor === 3 ? 'active' : ''}`}
                    onClick={() => setSelectedFloor(3)}
                  >
                    Floor 3 · Oceanfront Villas
                  </button>
                  <button 
                    className={`floor-pill ${selectedFloor === 4 ? 'active' : ''}`}
                    onClick={() => setSelectedFloor(4)}
                  >
                    Floor 4 · Imperial Penthouses
                  </button>
                </div>
              </div>

              {/* Room Tiles Matrix */}
              <div className="floor-matrix-grid">
                {floorRooms.map((room) => {
                  const isOccupied = room.status === 'occupied';
                  const isAvailable = room.status === 'available';
                  const isCleaning = room.status === 'cleaning';
                  const isReserved = room.status === 'reserved';

                  return (
                    <div key={room.id} className={`room-matrix-tile ${room.status}`}>
                      <div className="tile-top-row">
                        <span className="tile-room-num">#{room.number}</span>
                        <span className={`tile-status-tag ${room.status}`}>
                          {room.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="tile-info">
                        <h4 className="tile-room-title">{room.name}</h4>
                        <span className="tile-specs">Floor {room.floor} · ${room.price}/night</span>
                      </div>

                      {/* Guest Info Box */}
                      {room.currentGuest ? (
                        <div className="tile-guest-info">
                          <Users size={13} />
                          <div>
                            <strong>{room.currentGuest.name}</strong>
                            <span>Departs: {room.currentGuest.checkOut}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="tile-vacant-info">
                          <span>{isCleaning ? 'Cleaning underway' : 'Vacant & Ready'}</span>
                        </div>
                      )}

                      {/* Quick Action Buttons */}
                      <div className="tile-actions">
                        {isOccupied && (
                          <>
                            <button
                              className="tile-btn check-out"
                              onClick={() => onCheckOutGuest(room)}
                              title="Process Guest Check-out & Generate Folio"
                            >
                              <LogOut size={13} /> Check-Out
                            </button>
                            <button
                              className="tile-btn view-folio"
                              onClick={() => {
                                const foundRes = reservations.find(r => r.roomNumber === room.number && r.status === 'checked_in');
                                if (foundRes) onViewInvoice(foundRes);
                              }}
                              title="View Folio / Charges"
                            >
                              <FileText size={13} /> Folio
                            </button>
                          </>
                        )}

                        {isAvailable && (
                          <>
                            <button
                              className="tile-btn check-in"
                              onClick={() => onOpenBookingModal(room)}
                              title="Assign Guest to Room"
                            >
                              <LogIn size={13} /> Assign
                            </button>
                            <button
                              className="tile-btn mark-clean"
                              onClick={() => onUpdateRoomStatus(room.id, 'cleaning')}
                              title="Mark Room for Housekeeping Turnover"
                            >
                              <Sparkles size={13} /> Service
                            </button>
                          </>
                        )}

                        {isCleaning && (
                          <button
                            className="tile-btn ready-btn"
                            onClick={() => onUpdateRoomStatus(room.id, 'available')}
                            title="Mark as Inspected & Cleaned"
                          >
                            <CheckCircle2 size={13} /> Mark Available
                          </button>
                        )}

                        {isReserved && (
                          <button
                            className="tile-btn check-in"
                            onClick={() => onCheckInGuest(reservations.find(r => r.roomNumber === room.number) || { roomNumber: room.number })}
                          >
                            <Key size={13} /> Check-In Guest
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: GUEST RESERVATIONS & FOLIO DESK */}
          {activeTab === 'reservations' && (
            <div className="ops-reservations-view">
              {/* Search & Filter Toolbar */}
              <div className="res-filter-toolbar">
                <div className="filter-search-box">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by Guest Name, Booking #, Room #, Email..."
                    value={resSearch}
                    onChange={(e) => setResSearch(e.target.value)}
                  />
                  {resSearch && (
                    <button className="clear-search-btn" onClick={() => setResSearch('')}>×</button>
                  )}
                </div>

                <div className="filter-select-box">
                  <Filter size={15} />
                  <select value={resStatusFilter} onChange={(e) => setResStatusFilter(e.target.value)}>
                    <option value="all">All Reservation Statuses</option>
                    <option value="confirmed">Confirmed (Upcoming)</option>
                    <option value="checked_in">In-House (Checked-In)</option>
                    <option value="checked_out">Checked-Out (Completed)</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="res-table-wrap">
                <table className="ops-res-table">
                  <thead>
                    <tr>
                      <th>Booking Code</th>
                      <th>Lead Guest</th>
                      <th>Suite</th>
                      <th>Stay Dates</th>
                      <th>Grand Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((res) => (
                      <tr key={res.id}>
                        <td>
                          <span className="res-id-cell">{res.id}</span>
                        </td>
                        <td>
                          <div className="guest-col">
                            <strong>{res.guestName}</strong>
                            <span>{res.email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="suite-col">
                            <strong>Suite #{res.roomNumber}</strong>
                            <span>{res.roomName}</span>
                          </div>
                        </td>
                        <td>
                          <div className="dates-col">
                            <span>{res.checkIn} → {res.checkOut}</span>
                            <small>{res.nights} nights ({res.adults} Ad, {res.children} Ch)</small>
                          </div>
                        </td>
                        <td>
                          <strong className="gold-text">${res.grandTotal.toLocaleString()}</strong>
                        </td>
                        <td>
                          {getPaymentBadge(res.paymentStatus)}
                        </td>
                        <td>
                          {getStatusBadge(res.status)}
                        </td>
                        <td className="text-right">
                          <div className="table-actions-cell">
                            {res.status === 'confirmed' && (
                              <button
                                className="action-pill-btn checkin"
                                onClick={() => onCheckInGuest(res)}
                                title="Check In Guest & Activate Room"
                              >
                                <LogIn size={13} /> Check In
                              </button>
                            )}

                            {res.status === 'checked_in' && (
                              <button
                                className="action-pill-btn checkout"
                                onClick={() => onCheckOutGuest({ number: res.roomNumber, name: res.roomName, id: res.roomNumber })}
                                title="Process Check-Out"
                              >
                                <LogOut size={13} /> Check Out
                              </button>
                            )}

                            <button
                              className="action-pill-btn invoice"
                              onClick={() => onViewInvoice(res)}
                              title="View & Print Guest Folio Invoice"
                            >
                              <FileText size={13} /> Folio
                            </button>

                            {res.status === 'confirmed' && (
                              <button
                                className="action-pill-btn cancel"
                                onClick={() => onCancelReservation(res.id)}
                                title="Cancel this reservation"
                              >
                                <XCircle size={13} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
