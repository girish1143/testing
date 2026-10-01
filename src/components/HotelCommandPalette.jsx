import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bed, 
  Users, 
  Layers, 
  Sparkles, 
  UtensilsCrossed, 
  ReceiptText, 
  Sun, 
  Moon, 
  X, 
  PlusCircle, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import './HotelCommandPalette.css';

export default function HotelCommandPalette({
  isOpen,
  onClose,
  rooms = [],
  reservations = [],
  onNavigate,
  onSelectRoom,
  onOpenBookingModal,
  onViewInvoice,
  theme,
  onToggleTheme,
  onResetData
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Construct searchable list
  const results = [];

  // System commands
  const defaultCommands = [
    {
      id: 'cmd-book',
      type: 'command',
      title: 'Reserve a Luxury Suite',
      subtitle: 'Open reservation booking engine',
      icon: PlusCircle,
      action: () => { onClose(); onOpenBookingModal(null); }
    },
    {
      id: 'cmd-matrix',
      type: 'command',
      title: 'Front Desk Floor Matrix',
      subtitle: 'View room occupancy & check-in guests',
      icon: Layers,
      action: () => { onClose(); onNavigate('frontdesk'); }
    },
    {
      id: 'cmd-hk',
      type: 'command',
      title: 'Housekeeping Console',
      subtitle: 'Inspect room sanitation & dispatch engineering',
      icon: Sparkles,
      action: () => { onClose(); onNavigate('housekeeping'); }
    },
    {
      id: 'cmd-dining',
      type: 'command',
      title: 'In-Room Dining & Concierge',
      subtitle: 'Order gourmet cuisine & private excursions',
      icon: UtensilsCrossed,
      action: () => { onClose(); onNavigate('dining'); }
    },
    {
      id: 'cmd-folio',
      type: 'command',
      title: 'Folio & Billing Desk',
      subtitle: 'Generate itemized official receipts & invoices',
      icon: ReceiptText,
      action: () => { onClose(); onNavigate('billing'); }
    },
    {
      id: 'cmd-theme',
      type: 'command',
      title: `Switch to ${theme === 'dark' ? 'Light Ivory' : 'Midnight Obsidian'} Theme`,
      subtitle: 'Toggle luxury interface palette',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => { onToggleTheme(); onClose(); }
    },
    {
      id: 'cmd-reset',
      type: 'command',
      title: 'Reset Hotel Demo Data',
      subtitle: 'Restore default sample rooms and bookings',
      icon: RotateCcw,
      action: () => { onResetData(); onClose(); }
    }
  ];

  if (!query.trim()) {
    results.push(...defaultCommands);
  } else {
    const q = query.toLowerCase();

    // Match rooms
    rooms.forEach((room) => {
      if (
        room.name.toLowerCase().includes(q) ||
        room.number.includes(q) ||
        room.type.toLowerCase().includes(q)
      ) {
        results.push({
          id: `room-${room.id}`,
          type: 'room',
          title: `Suite #${room.number} - ${room.name}`,
          subtitle: `${room.type} · $${room.price}/night · ${room.status.toUpperCase()}`,
          icon: Bed,
          action: () => {
            onClose();
            onSelectRoom(room);
          }
        });
      }
    });

    // Match reservations / guests
    reservations.forEach((res) => {
      if (
        res.guestName.toLowerCase().includes(q) ||
        res.id.toLowerCase().includes(q) ||
        res.email.toLowerCase().includes(q)
      ) {
        results.push({
          id: `res-${res.id}`,
          type: 'guest',
          title: `${res.guestName} (${res.id})`,
          subtitle: `Suite #${res.roomNumber} · ${res.status.toUpperCase()} · $${res.grandTotal}`,
          icon: Users,
          action: () => {
            onClose();
            onViewInvoice(res);
          }
        });
      }
    });

    // Match commands
    defaultCommands.forEach((cmd) => {
      if (
        cmd.title.toLowerCase().includes(q) ||
        cmd.subtitle.toLowerCase().includes(q)
      ) {
        results.push(cmd);
      }
    });
  }

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="hotel-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cmd-palette-box" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="cmd-input-row">
          <Search size={20} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input-field"
            placeholder="Type a suite #, guest name, booking code or action..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <button className="cmd-esc-btn" onClick={onClose}>
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="cmd-results-list">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-result-item ${isSelected ? 'selected' : ''}`}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-icon">
                    <Icon size={18} />
                  </div>
                  <div className="cmd-item-text">
                    <span className="cmd-item-title">{item.title}</span>
                    <span className="cmd-item-sub">{item.subtitle}</span>
                  </div>
                  <ArrowRight size={14} className="cmd-item-arrow" />
                </div>
              );
            })
          ) : (
            <div className="cmd-no-results">
              <p>No suites, patrons, or operations found for "{query}".</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="cmd-footer-shortcuts">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
