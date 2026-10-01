import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  Plus, 
  Bed, 
  Check, 
  Filter, 
  RotateCw,
  ShieldAlert
} from 'lucide-react';
import './HousekeepingView.css';

export default function HousekeepingView({
  rooms = [],
  maintenanceLogs = [],
  onUpdateCleanStatus,
  onAddMaintenance,
  onResolveMaintenance
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'clean' | 'needs_cleaning' | 'in_progress'
  const [newRoomNum, setNewRoomNum] = useState(rooms[0] ? rooms[0].number : '101');
  const [newIssue, setNewIssue] = useState('');
  const [newSeverity, setNewSeverity] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('Carlos M. (Engineering)');

  // Counts
  const cleanCount = rooms.filter((r) => r.cleanStatus === 'clean' || r.cleanStatus === 'inspected').length;
  const inProgressCount = rooms.filter((r) => r.cleanStatus === 'in_progress').length;
  const needsCleaningCount = rooms.filter((r) => r.cleanStatus === 'needs_cleaning').length;

  const filteredRooms = rooms.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'clean') return r.cleanStatus === 'clean' || r.cleanStatus === 'inspected';
    return r.cleanStatus === activeFilter;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newIssue.trim()) return;

    const ticket = {
      id: `maint-${Date.now()}`,
      roomNumber: newRoomNum,
      issue: newIssue,
      severity: newSeverity,
      reportedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pending',
      assignedTo: assignedTo || 'Engineering Staff'
    };

    onAddMaintenance(ticket);
    setNewIssue('');
  };

  return (
    <section className="housekeeping-section" id="housekeeping">
      <div className="housekeeping-container">
        {/* Header */}
        <div className="hk-head">
          <div className="section-sub-tag">Facilities & Environmental Services</div>
          <h2 className="hk-title">
            Housekeeping & <span className="gold-text">Engineering Console</span>
          </h2>
          <p className="hk-desc">
            Monitor room sanitation standards, schedule turnover cleans, and dispatch maintenance engineering requests.
          </p>
        </div>

        {/* Readiness Dashboard */}
        <div className="hk-stats-grid">
          <div className="hk-stat-card clean">
            <div className="hk-stat-icon">
              <CheckCircle2 size={24} />
            </div>
            <div className="hk-stat-data">
              <span className="hk-stat-label">Sanitized & Inspected</span>
              <strong className="hk-stat-val">{cleanCount} Suites</strong>
              <span className="hk-stat-sub">Ready for immediate check-in</span>
            </div>
          </div>

          <div className="hk-stat-card progress">
            <div className="hk-stat-icon">
              <RotateCw size={24} />
            </div>
            <div className="hk-stat-data">
              <span className="hk-stat-label">Cleaning in Progress</span>
              <strong className="hk-stat-val">{inProgressCount} Suites</strong>
              <span className="hk-stat-sub">Staff currently assigned</span>
            </div>
          </div>

          <div className="hk-stat-card needs">
            <div className="hk-stat-icon">
              <Clock size={24} />
            </div>
            <div className="hk-stat-data">
              <span className="hk-stat-label">Awaiting Turnover</span>
              <strong className="hk-stat-val">{needsCleaningCount} Suites</strong>
              <span className="hk-stat-sub">Pending service assignment</span>
            </div>
          </div>

          <div className="hk-stat-card tickets">
            <div className="hk-stat-icon">
              <Wrench size={24} />
            </div>
            <div className="hk-stat-data">
              <span className="hk-stat-label">Active Work Orders</span>
              <strong className="hk-stat-val">{maintenanceLogs.filter(m => m.status !== 'resolved').length} Tickets</strong>
              <span className="hk-stat-sub">Engineering queue</span>
            </div>
          </div>
        </div>

        {/* Main Content Split: Room Cleaning Matrix & Maintenance Tracker */}
        <div className="hk-layout-split">
          {/* Left: Rooms Cleaning Matrix */}
          <div className="hk-rooms-block">
            <div className="hk-block-header">
              <div className="hk-block-title-row">
                <Sparkles size={18} className="gold-icon" />
                <h3>Room Sanitation Matrix</h3>
              </div>

              {/* Status Filter */}
              <div className="hk-filter-pills">
                <button
                  className={`hk-pill ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All ({rooms.length})
                </button>
                <button
                  className={`hk-pill ${activeFilter === 'clean' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('clean')}
                >
                  Cleaned ({cleanCount})
                </button>
                <button
                  className={`hk-pill ${activeFilter === 'in_progress' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('in_progress')}
                >
                  In Progress ({inProgressCount})
                </button>
                <button
                  className={`hk-pill ${activeFilter === 'needs_cleaning' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('needs_cleaning')}
                >
                  Needs Turnover ({needsCleaningCount})
                </button>
              </div>
            </div>

            {/* Room Rows List */}
            <div className="hk-room-cards-list">
              {filteredRooms.map((room) => {
                const isClean = room.cleanStatus === 'clean' || room.cleanStatus === 'inspected';
                const isInProgress = room.cleanStatus === 'in_progress';
                const isNeeds = room.cleanStatus === 'needs_cleaning';

                return (
                  <div key={room.id} className={`hk-room-card ${room.cleanStatus}`}>
                    <div className="hk-room-meta">
                      <span className="hk-room-num">Suite #{room.number}</span>
                      <strong className="hk-room-name">{room.name}</strong>
                      <span className="hk-room-type">Floor {room.floor} · {room.type}</span>
                    </div>

                    <div className="hk-clean-badge-cell">
                      <span className={`clean-badge ${room.cleanStatus}`}>
                        {isClean && 'CLEAN & READY'}
                        {isInProgress && 'IN PROGRESS'}
                        {isNeeds && 'NEEDS TURNOVER'}
                      </span>
                    </div>

                    {/* Quick 1-click status triggers */}
                    <div className="hk-actions-cell">
                      <button
                        className={`hk-action-btn ${isClean ? 'active-clean' : ''}`}
                        onClick={() => onUpdateCleanStatus(room.id, 'clean')}
                        title="Mark as Cleaned and Ready for Guest"
                      >
                        <Check size={14} /> Clean
                      </button>
                      <button
                        className={`hk-action-btn ${isInProgress ? 'active-progress' : ''}`}
                        onClick={() => onUpdateCleanStatus(room.id, 'in_progress')}
                        title="Mark Cleaning In Progress"
                      >
                        <RotateCw size={14} /> In Progress
                      </button>
                      <button
                        className={`hk-action-btn ${isNeeds ? 'active-needs' : ''}`}
                        onClick={() => onUpdateCleanStatus(room.id, 'needs_cleaning')}
                        title="Mark as Needs Turnover"
                      >
                        <Clock size={14} /> Dirty
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Maintenance Work Orders */}
          <div className="hk-maintenance-block">
            <div className="hk-block-header">
              <div className="hk-block-title-row">
                <Wrench size={18} className="gold-icon" />
                <h3>Maintenance & Engineering</h3>
              </div>
            </div>

            {/* Quick Report Ticket Form */}
            <form onSubmit={handleCreateTicket} className="hk-ticket-form">
              <h4 className="ticket-form-heading">Dispatch Work Order</h4>

              <div className="ticket-inputs-row">
                <div className="ticket-field">
                  <label>Suite #</label>
                  <select
                    value={newRoomNum}
                    onChange={(e) => setNewRoomNum(e.target.value)}
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.number}>
                        Suite #{r.number}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ticket-field">
                  <label>Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                  >
                    <option value="low">Low (Cosmetic)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="high">High (Urgent Attention)</option>
                  </select>
                </div>
              </div>

              <div className="ticket-field">
                <label>Issue Description</label>
                <input
                  type="text"
                  placeholder="e.g. Balcony lighting flickering, AC thermostat check..."
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  required
                />
              </div>

              <div className="ticket-field">
                <label>Assigned Specialist</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Staff or team name"
                />
              </div>

              <button type="submit" className="btn-book-primary w-full dispatch-btn">
                <Plus size={16} />
                <span>Log Maintenance Ticket</span>
              </button>
            </form>

            {/* Active Tickets List */}
            <div className="hk-tickets-list">
              <h4 className="active-tickets-title">
                Active Engineering Tickets ({maintenanceLogs.length})
              </h4>

              {maintenanceLogs.map((log) => {
                const isResolved = log.status === 'resolved';
                return (
                  <div key={log.id} className={`hk-ticket-item ${log.severity} ${isResolved ? 'resolved' : ''}`}>
                    <div className="ticket-item-top">
                      <span className="ticket-suite">Suite #{log.roomNumber}</span>
                      <span className={`severity-tag ${log.severity}`}>
                        {log.severity.toUpperCase()}
                      </span>
                    </div>

                    <p className="ticket-issue">{log.issue}</p>

                    <div className="ticket-meta-footer">
                      <span className="ticket-assigned">Assigned: {log.assignedTo}</span>
                      {!isResolved ? (
                        <button
                          className="btn-resolve-ticket"
                          onClick={() => onResolveMaintenance(log.id)}
                        >
                          <CheckCircle2 size={13} /> Resolve
                        </button>
                      ) : (
                        <span className="resolved-stamp">RESOLVED</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
