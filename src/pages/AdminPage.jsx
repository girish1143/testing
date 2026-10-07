import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building2,
  BedDouble,
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  Search,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  Percent
} from 'lucide-react';
import { getHotelBookings } from '../config/supabaseClient';
import './AdminPage.css';

export default function AdminPage({
  hotelInfo,
  onUpdateHotelInfo,
  rooms,
  onUpdateRooms,
  onResetDefaults,
  onNavigate,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('rooms'); // 'rooms' | 'hotel' | 'reservations' | 'stats'
  
  // Local Hotel Info Form State
  const [hotelForm, setHotelForm] = useState({ ...hotelInfo });

  useEffect(() => {
    setHotelForm({ ...hotelInfo });
  }, [hotelInfo]);

  // Inventory Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Add / Edit Room Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [roomFormData, setRoomFormData] = useState({
    name: '',
    category: 'deluxe',
    type: 'Deluxe Suite',
    price: 350,
    size: '500 sq ft',
    maxGuests: 2,
    bedType: 'King Size Bed',
    view: 'Ocean View',
    rating: 4.95,
    reviews: 50,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    description: '',
    amenities: 'Ocean View Veranda, High-Speed Wi-Fi, Smart Climate Control'
  });

  // Reservations State
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setReservations(getHotelBookings());
  }, []);

  // Save General Hotel Details
  const handleSaveHotelInfo = (e) => {
    e.preventDefault();
    onUpdateHotelInfo(hotelForm);
    showToast('Hotel Details Updated', 'The general resort parameters have been saved across the project.', 'success');
  };

  // Open Room Modal for Create
  const handleOpenCreateModal = () => {
    setEditingRoomId(null);
    setRoomFormData({
      name: '',
      category: 'deluxe',
      type: 'Deluxe Suite',
      price: 350,
      size: '500 sq ft',
      maxGuests: 2,
      bedType: 'King Size Imperial Bed',
      view: 'Ocean View',
      rating: 4.95,
      reviews: 20,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      description: 'Elegant suite crafted with artisanal teak finishes and floor-to-ceiling panoramic views.',
      amenities: 'Ocean View Veranda, Espresso Bar, Rainfall Shower, High-Speed Wi-Fi'
    });
    setIsModalOpen(true);
  };

  // Open Room Modal for Edit
  const handleOpenEditModal = (room) => {
    setEditingRoomId(room.id);
    setRoomFormData({
      name: room.name,
      category: room.category,
      type: room.type,
      price: room.price,
      size: room.size,
      maxGuests: room.maxGuests,
      bedType: room.bedType,
      view: room.view,
      rating: room.rating,
      reviews: room.reviews,
      image: room.image,
      description: room.description,
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities
    });
    setIsModalOpen(true);
  };

  // Save Room Form (Create or Edit)
  const handleSaveRoom = (e) => {
    e.preventDefault();
    if (!roomFormData.name.trim()) {
      showToast('Validation Error', 'Please specify a suite or room title.', 'error');
      return;
    }

    const amenitiesArray = typeof roomFormData.amenities === 'string'
      ? roomFormData.amenities.split(',').map((item) => item.trim()).filter(Boolean)
      : roomFormData.amenities;

    if (editingRoomId) {
      // Update existing room
      const updatedRooms = rooms.map((r) =>
        r.id === editingRoomId
          ? {
              ...r,
              ...roomFormData,
              price: Number(roomFormData.price),
              maxGuests: Number(roomFormData.maxGuests),
              rating: Number(roomFormData.rating),
              reviews: Number(roomFormData.reviews),
              amenities: amenitiesArray
            }
          : r
      );
      onUpdateRooms(updatedRooms);
      showToast('Suite Updated', `${roomFormData.name} has been successfully updated.`, 'success');
    } else {
      // Create new room
      const newRoom = {
        id: `suite-${Date.now().toString().slice(-4)}`,
        ...roomFormData,
        price: Number(roomFormData.price),
        maxGuests: Number(roomFormData.maxGuests),
        rating: Number(roomFormData.rating),
        reviews: Number(roomFormData.reviews),
        amenities: amenitiesArray
      };
      onUpdateRooms([newRoom, ...rooms]);
      showToast('New Suite Added', `${roomFormData.name} is now published to the catalog.`, 'success');
    }

    setIsModalOpen(false);
  };

  // Delete Room
  const handleDeleteRoom = (roomId, roomName) => {
    if (window.confirm(`Are you sure you want to remove "${roomName}" from the hotel catalog?`)) {
      const updated = rooms.filter((r) => r.id !== roomId);
      onUpdateRooms(updated);
      showToast('Suite Deleted', `${roomName} was removed from the catalog.`, 'info');
    }
  };

  // Toggle Reservation Status
  const handleToggleBookingStatus = (bookingId, newStatus) => {
    const updated = reservations.map((b) =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setReservations(updated);
    localStorage.setItem('aurelia_hotel_bookings', JSON.stringify(updated));
    showToast('Reservation Updated', `Folio ${bookingId} status changed to ${newStatus}.`, 'success');
  };

  // Filtered rooms for inventory display
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.view.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || room.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate Metrics
  const totalRevenue = reservations.reduce((sum, b) => sum + (Number(b.grandTotal) || 0), 0);
  const avgRoomPrice = Math.round(rooms.reduce((sum, r) => sum + Number(r.price), 0) / (rooms.length || 1));

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-title-box">
          <div className="admin-badge-row">
            <span className="admin-pill">
              <ShieldCheck size={14} /> Executive Admin Portal
            </span>
            <span className="admin-pill">Live Synced</span>
          </div>
          <h1 className="admin-title">
            Hotel Management & <span className="gold-accent">Operations Panel</span>
          </h1>
          <p className="admin-subtitle">
            Configure global resort details, adjust suite pricing & inventory, and supervise patron bookings live across the system.
          </p>
        </div>

        <div className="admin-header-actions">
          <button className="admin-btn admin-btn-secondary" onClick={() => onNavigate('home')}>
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </button>
          <button className="admin-btn admin-btn-primary" onClick={handleOpenCreateModal}>
            <Plus size={16} />
            <span>Add New Suite</span>
          </button>
          <button
            className="admin-btn admin-btn-danger-outline"
            onClick={() => {
              if (window.confirm('Reset all hotel settings and rooms back to original defaults?')) {
                onResetDefaults();
                showToast('Reset Complete', 'Factory defaults restored.', 'info');
              }
            }}
            title="Reset to factory defaults"
          >
            <RotateCcw size={15} />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="admin-metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box">
            <BedDouble size={22} />
          </div>
          <div>
            <div className="metric-value">{rooms.length}</div>
            <div className="metric-label">Active Suites & Villas</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box emerald">
            <DollarSign size={22} />
          </div>
          <div>
            <div className="metric-value">${avgRoomPrice}</div>
            <div className="metric-label">Avg Nightly Rate</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box purple">
            <CalendarDays size={22} />
          </div>
          <div>
            <div className="metric-value">{reservations.length}</div>
            <div className="metric-label">Total Bookings</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box blue">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="metric-value">${totalRevenue.toLocaleString()}</div>
            <div className="metric-label">Bookings Volume</div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          <BedDouble size={16} />
          <span>Suites & Inventory ({rooms.length})</span>
        </button>

        <button
          className={`admin-tab-btn ${activeTab === 'hotel' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotel')}
        >
          <Building2 size={16} />
          <span>Hotel Profile & Rates</span>
        </button>

        <button
          className={`admin-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => {
            setReservations(getHotelBookings());
            setActiveTab('reservations');
          }}
        >
          <CalendarDays size={16} />
          <span>Patron Reservations ({reservations.length})</span>
        </button>
      </div>

      {/* TAB 1: SUITES & INVENTORY */}
      {activeTab === 'rooms' && (
        <div className="admin-card-panel">
          <div className="inventory-actions-bar">
            <div className="inventory-search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search suites by name, view or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-input inventory-search-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="admin-select"
              >
                <option value="all">All Categories</option>
                <option value="deluxe">Deluxe Suites</option>
                <option value="villa">Private Villas</option>
                <option value="penthouse">Presidential Penthouses</option>
              </select>

              <button className="admin-btn admin-btn-primary" onClick={handleOpenCreateModal}>
                <Plus size={16} />
                <span>Add Room</span>
              </button>
            </div>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="admin-empty-state">
              <BedDouble size={48} />
              <p>No suites found matching your search criteria.</p>
            </div>
          ) : (
            <div className="suites-grid">
              {filteredRooms.map((room) => (
                <div key={room.id} className="admin-suite-card">
                  <div className="suite-card-thumb-wrap">
                    <img src={room.image} alt={room.name} className="suite-card-thumb" />
                    <span className="suite-card-cat-badge">{room.category}</span>
                    <span className="suite-card-price-pill">${room.price} / night</span>
                  </div>

                  <div className="suite-card-body">
                    <h3 className="suite-card-title">{room.name}</h3>
                    <p className="suite-card-desc">{room.description}</p>

                    <div className="suite-card-specs-row">
                      <span>📐 {room.size}</span>
                      <span>👥 Max {room.maxGuests} Guests</span>
                      <span>🛏️ {room.bedType}</span>
                    </div>

                    <div className="suite-card-actions">
                      <button
                        className="suite-card-btn-edit"
                        onClick={() => handleOpenEditModal(room)}
                      >
                        <Pencil size={14} />
                        <span>Edit Details</span>
                      </button>
                      <button
                        className="suite-card-btn-del"
                        onClick={() => handleDeleteRoom(room.id, room.name)}
                        title="Remove suite from catalog"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HOTEL PROFILE & RATES */}
      {activeTab === 'hotel' && (
        <div className="admin-card-panel">
          <div className="panel-section-header">
            <h2 className="panel-section-title">Resort Information & Operational Rules</h2>
            <p className="panel-section-desc">
              Any updates saved here will immediately reflect on the homepage, navbar branding, and reservation calculation policies.
            </p>
          </div>

          <form onSubmit={handleSaveHotelInfo}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Resort Brand Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hotelForm.name}
                  onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Official Tagline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hotelForm.tagline}
                  onChange={(e) => setHotelForm({ ...hotelForm, tagline: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Concierge Inquiries Phone</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hotelForm.phone}
                  onChange={(e) => setHotelForm({ ...hotelForm, phone: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Concierge Desk Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={hotelForm.email}
                  onChange={(e) => setHotelForm({ ...hotelForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group full-span">
                <label className="admin-label">Physical Location Address</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hotelForm.address}
                  onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Standard Check-In Hour</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hotelForm.checkIn}
                  onChange={(e) => setHotelForm({ ...hotelForm, checkIn: e.target.value })}
                  placeholder="15:00"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Standard Check-Out Hour</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hotelForm.checkOut}
                  onChange={(e) => setHotelForm({ ...hotelForm, checkOut: e.target.value })}
                  placeholder="11:00"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Resort Tax / Surcharge Rate (e.g. 0.12 for 12%)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="0.5"
                  className="admin-input"
                  value={hotelForm.taxRate}
                  onChange={(e) => setHotelForm({ ...hotelForm, taxRate: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Star Classification</label>
                <select
                  className="admin-select"
                  value={hotelForm.stars}
                  onChange={(e) => setHotelForm({ ...hotelForm, stars: parseInt(e.target.value, 10) })}
                >
                  <option value={5}>5-Star Luxury Imperial</option>
                  <option value={4}>4-Star Premium</option>
                  <option value={3}>3-Star Boutique</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Save size={16} />
                <span>Save Hotel Details</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: RESERVATIONS & BOOKINGS */}
      {activeTab === 'reservations' && (
        <div className="admin-card-panel">
          <div className="panel-section-header">
            <h2 className="panel-section-title">Live Patron Folios & Reservations</h2>
            <p className="panel-section-desc">
              Review current guests, booked suites, check-in dates, and change reservation statuses.
            </p>
          </div>

          {reservations.length === 0 ? (
            <div className="admin-empty-state">
              <CalendarDays size={48} />
              <p>No reservations placed in the system yet.</p>
            </div>
          ) : (
            <div className="reservations-table-wrap">
              <table className="reservations-table">
                <thead>
                  <tr>
                    <th>Folio ID</th>
                    <th>Guest Details</th>
                    <th>Suite Reserved</th>
                    <th>Stay Dates</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res) => (
                    <tr key={res.id}>
                      <td style={{ fontWeight: 600, color: '#e5c365' }}>{res.id}</td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{res.guestName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{res.email}</div>
                      </td>
                      <td>
                        <div style={{ color: '#fff' }}>{res.roomName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{res.guests} Guests • {res.nights} Nights</div>
                      </td>
                      <td>
                        <div>{res.checkIn} ➔ {res.checkOut}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: '#34d399' }}>
                        ${res.grandTotal || (res.pricePerNight * res.nights)}
                      </td>
                      <td>
                        <span className={`booking-status-tag ${res.status || 'confirmed'}`}>
                          {res.status || 'confirmed'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="admin-btn admin-btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                            onClick={() => handleToggleBookingStatus(res.id, 'checked-in')}
                            title="Mark Checked-in"
                          >
                            Check-In
                          </button>
                          <button
                            className="admin-btn admin-btn-danger-outline"
                            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                            onClick={() => handleToggleBookingStatus(res.id, 'cancelled')}
                            title="Cancel Reservation"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT SUITE MODAL */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingRoomId ? 'Edit Suite Specifications' : 'Publish New Suite / Villa'}
              </h3>
              <button className="admin-modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveRoom}>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-label">Suite Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={roomFormData.name}
                    onChange={(e) => setRoomFormData({ ...roomFormData, name: e.target.value })}
                    placeholder="e.g. Imperial Sapphire Penthouse"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Category</label>
                  <select
                    className="admin-select"
                    value={roomFormData.category}
                    onChange={(e) => setRoomFormData({ ...roomFormData, category: e.target.value })}
                  >
                    <option value="deluxe">Deluxe Suite</option>
                    <option value="villa">Private Villa</option>
                    <option value="penthouse">Presidential Penthouse</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Nightly Rate (USD $)</label>
                  <input
                    type="number"
                    min="50"
                    max="10000"
                    className="admin-input"
                    value={roomFormData.price}
                    onChange={(e) => setRoomFormData({ ...roomFormData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Floor Space / Size</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={roomFormData.size}
                    onChange={(e) => setRoomFormData({ ...roomFormData, size: e.target.value })}
                    placeholder="e.g. 680 sq ft"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Max Guest Capacity</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="admin-input"
                    value={roomFormData.maxGuests}
                    onChange={(e) => setRoomFormData({ ...roomFormData, maxGuests: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Bedding Configuration</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={roomFormData.bedType}
                    onChange={(e) => setRoomFormData({ ...roomFormData, bedType: e.target.value })}
                    placeholder="e.g. King Size Imperial Bed"
                    required
                  />
                </div>

                <div className="admin-form-group full-span">
                  <label className="admin-label">Image Web URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={roomFormData.image}
                    onChange={(e) => setRoomFormData({ ...roomFormData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>

                <div className="admin-form-group full-span">
                  <label className="admin-label">Suite Description</label>
                  <textarea
                    className="admin-textarea"
                    value={roomFormData.description}
                    onChange={(e) => setRoomFormData({ ...roomFormData, description: e.target.value })}
                    rows={3}
                    placeholder="Describe the architectural accents and scenery..."
                    required
                  />
                </div>

                <div className="admin-form-group full-span">
                  <label className="admin-label">Amenities (Comma-separated)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={roomFormData.amenities}
                    onChange={(e) => setRoomFormData({ ...roomFormData, amenities: e.target.value })}
                    placeholder="Ocean View Veranda, Plunge Pool, Espresso Bar, Marble Bath"
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Save size={15} />
                  <span>{editingRoomId ? 'Update Suite' : 'Publish Suite'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
