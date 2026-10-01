import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Users, 
  Maximize2, 
  Bed, 
  Eye, 
  Calendar, 
  Sparkles, 
  Check, 
  Star,
  Compass,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import './RoomCatalog.css';

export default function RoomCatalog({
  rooms = [],
  onSelectRoom,
  onBookRoom,
  initialFilters = {}
}) {
  const [activeCategory, setActiveCategory] = useState(initialFilters.category || 'all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'available' | 'occupied'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'

  const categories = [
    { id: 'all', label: 'All Suites' },
    { id: 'deluxe', label: 'Deluxe Sanctuaries' },
    { id: 'suite', label: 'Executive Suites' },
    { id: 'villa', label: 'Oceanfront Villas' },
    { id: 'penthouse', label: 'Imperial Penthouses' },
  ];

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((room) => {
        // Category match
        if (activeCategory !== 'all' && room.category !== activeCategory) {
          return false;
        }
        // Status match
        if (statusFilter === 'available' && room.status !== 'available') {
          return false;
        }
        if (statusFilter === 'occupied' && room.status !== 'occupied') {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = room.name.toLowerCase().includes(q);
          const matchNumber = room.number.toLowerCase().includes(q);
          const matchType = room.type.toLowerCase().includes(q);
          const matchBed = room.bedType.toLowerCase().includes(q);
          const matchView = room.view.toLowerCase().includes(q);
          if (!matchTitle && !matchNumber && !matchType && !matchBed && !matchView) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured order
      });
  }, [rooms, activeCategory, statusFilter, searchQuery, sortBy]);

  const getStatusBadge = (room) => {
    switch (room.status) {
      case 'available':
        return <span className="status-badge available"><span className="status-dot"></span> Available Now</span>;
      case 'occupied':
        return <span className="status-badge occupied"><span className="status-dot"></span> Occupied</span>;
      case 'cleaning':
        return <span className="status-badge cleaning"><span className="status-dot"></span> Housekeeping</span>;
      case 'reserved':
        return <span className="status-badge reserved"><span className="status-dot"></span> Reserved</span>;
      default:
        return null;
    }
  };

  return (
    <section className="rooms-catalog-section" id="rooms">
      <div className="catalog-container">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="section-sub-tag">The Accommodation Portfolio</div>
          <h2 className="section-title-large">
            Bespoke Suites, Villas & <span className="gold-text">Penthouses</span>
          </h2>
          <p className="section-subtext">
            Each residential sanctuary at Grand Aurelia has been architecturally configured with private terraces, 
            hand-carved Italian marble baths, and personalized 24/7 dedicated butler service.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="catalog-controls-panel">
          {/* Category Tabs */}
          <div className="category-pills">
            {categories.map((cat) => {
              const count = cat.id === 'all' 
                ? rooms.length 
                : rooms.filter(r => r.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  className={`category-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="pill-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Search, Status, Sort */}
          <div className="catalog-secondary-filters">
            {/* Search Input */}
            <div className="filter-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search by suite name, bed type, view, #101..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            {/* Status Filter */}
            <div className="filter-select-box">
              <Filter size={15} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Room States</option>
                <option value="available">Available Only</option>
                <option value="occupied">Currently Occupied</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="filter-select-box">
              <ArrowUpDown size={15} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured Suites</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="catalog-results-meta">
          <span>Showing <strong>{filteredRooms.length}</strong> of {rooms.length} Suites & Villas</span>
          {(activeCategory !== 'all' || statusFilter !== 'all' || searchQuery) && (
            <button 
              className="btn-reset-filters"
              onClick={() => {
                setActiveCategory('all');
                setStatusFilter('all');
                setSearchQuery('');
                setSortBy('featured');
              }}
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Room Cards Grid */}
        {filteredRooms.length > 0 ? (
          <div className="rooms-grid">
            {filteredRooms.map((room) => {
              const isAvailable = room.status === 'available';
              return (
                <article key={room.id} className="room-card">
                  {/* Image Container with Badges */}
                  <div className="room-card-media" onClick={() => onSelectRoom(room)}>
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="room-card-img"
                      loading="lazy"
                    />
                    <div className="media-overlay-gradient" />
                    
                    <div className="card-top-badges">
                      <span className="room-number-tag">Suite #{room.number}</span>
                      {getStatusBadge(room)}
                    </div>

                    <div className="card-bottom-rating">
                      <Star size={13} fill="currentColor" />
                      <span>{room.rating}</span>
                      <span className="rating-count">({room.reviews})</span>
                    </div>
                  </div>

                  {/* Room Card Body */}
                  <div className="room-card-body">
                    <div className="room-type-tag">{room.type} · Floor {room.floor}</div>
                    <h3 className="room-card-title" onClick={() => onSelectRoom(room)}>
                      {room.name}
                    </h3>
                    <p className="room-card-view">
                      <Compass size={14} /> {room.view}
                    </p>

                    {/* Room Key Specs */}
                    <div className="room-specs-row">
                      <div className="spec-item" title="Room Living Space">
                        <Maximize2 size={14} />
                        <span>{room.size} sq.ft</span>
                      </div>
                      <div className="spec-item" title="Max Occupancy">
                        <Users size={14} />
                        <span>Up to {room.maxGuests} guests</span>
                      </div>
                      <div className="spec-item" title="Bed Configuration">
                        <Bed size={14} />
                        <span>{room.bedType}</span>
                      </div>
                    </div>

                    {/* Amenity tags */}
                    <div className="room-amenities-chips">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="amenity-chip">{amenity}</span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="amenity-chip more">+{room.amenities.length - 3} more</span>
                      )}
                    </div>

                    {/* Card Footer: Price & Actions */}
                    <div className="room-card-footer">
                      <div className="price-stack">
                        <span className="price-prefix">From</span>
                        <div className="price-val-wrap">
                          <span className="price-amount">${room.price}</span>
                          <span className="price-unit">/ night</span>
                        </div>
                        <span className="price-taxes-note">+ taxes & gratuity</span>
                      </div>

                      <div className="card-action-btns">
                        <button 
                          className="btn-details-ghost"
                          onClick={() => onSelectRoom(room)}
                          title="View Floorplan, Amenities & Full Gallery"
                        >
                          <Eye size={15} />
                          <span>Details</span>
                        </button>
                        
                        <button 
                          className={`btn-reserve-card ${!isAvailable ? 'btn-reserved-state' : ''}`}
                          onClick={() => onBookRoom(room)}
                          title={isAvailable ? 'Book this suite now' : 'Reserve for upcoming dates'}
                        >
                          <Calendar size={15} />
                          <span>{isAvailable ? 'Book Now' : 'Reserve'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-catalog-state">
            <div className="empty-icon-circle">
              <Search size={32} />
            </div>
            <h3>No Suites Found</h3>
            <p>We could not find any accommodations matching your current filter criteria.</p>
            <button 
              className="btn-book-primary"
              onClick={() => {
                setActiveCategory('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
