import React, { useState, useEffect } from 'react';
import { 
  HOTEL_INFO, 
  getStoredRooms, 
  saveStoredRooms, 
  getStoredReservations, 
  saveStoredReservations, 
  getStoredMaintenance, 
  saveStoredMaintenance, 
  resetAllHotelData 
} from './data/hotelData';

import HotelNavbar from './components/HotelNavbar';
import HotelHero from './components/HotelHero';
import ResortShowcase from './components/ResortShowcase';
import RoomCatalog from './components/RoomCatalog';
import RoomDetailModal from './components/RoomDetailModal';
import BookingModal from './components/BookingModal';
import FrontDeskOps from './components/FrontDeskOps';
import HousekeepingView from './components/HousekeepingView';
import DiningConcierge from './components/DiningConcierge';
import AnalyticsBilling from './components/AnalyticsBilling';
import HotelFooter from './components/HotelFooter';
import HotelCommandPalette from './components/HotelCommandPalette';
import ToastNotification from './components/ToastNotification';

import './App.css';

function App() {
  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('grand_aurelia_theme');
    if (saved) return saved;
    return 'dark'; // Luxury midnight obsidian by default
  });

  // Dynamic Hash Route Handling:
  // 'overview' | 'rooms' | 'frontdesk' | 'housekeeping' | 'dining' | 'billing'
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/rooms')) return 'rooms';
    if (hash.startsWith('#/frontdesk')) return 'frontdesk';
    if (hash.startsWith('#/housekeeping')) return 'housekeeping';
    if (hash.startsWith('#/dining')) return 'dining';
    if (hash.startsWith('#/billing')) return 'billing';
    return 'overview';
  });

  // Hotel core state
  const [rooms, setRooms] = useState(() => getStoredRooms());
  const [reservations, setReservations] = useState(() => getStoredReservations());
  const [maintenanceLogs, setMaintenanceLogs] = useState(() => getStoredMaintenance());

  // Modals & Drawers state
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPreSelectedRoom, setBookingPreSelectedRoom] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeInvoiceReservation, setActiveInvoiceReservation] = useState(null);

  // Search & Catalog Filter State
  const [initialCatalogFilters, setInitialCatalogFilters] = useState({});

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Sync Hash Changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/rooms')) {
        setCurrentRoute('rooms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/frontdesk')) {
        setCurrentRoute('frontdesk');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/housekeeping')) {
        setCurrentRoute('housekeeping');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/dining')) {
        setCurrentRoute('dining');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/billing')) {
        setCurrentRoute('billing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme attribute application
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('grand_aurelia_theme', theme);
  }, [theme]);

  // Global keyboard shortcut for Command Palette: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    saveStoredRooms(rooms);
  }, [rooms]);

  useEffect(() => {
    saveStoredReservations(reservations);
  }, [reservations]);

  useEffect(() => {
    saveStoredMaintenance(maintenanceLogs);
  }, [maintenanceLogs]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateToPage = (route) => {
    if (route === 'overview') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${route}`;
    }
  };

  // Search from Hero
  const handleSearchFromHero = ({ checkIn, checkOut, category, guests }) => {
    setInitialCatalogFilters({ category, checkIn, checkOut, guests });
    navigateToPage('rooms');
    showToast(
      "Search Applied",
      `Filtering suites for ${guests} guests in ${category === 'all' ? 'All Collections' : category.toUpperCase()}.`,
      'info'
    );
  };

  // Booking Modal triggers
  const handleOpenBookingModal = (room = null) => {
    setBookingPreSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  // Complete Booking flow
  const handleCompleteBooking = (newReservation, selectedRoom) => {
    // 1. Add reservation to top
    setReservations((prev) => [newReservation, ...prev]);

    // 2. Update room status to occupied or reserved
    const isTodayCheckIn = newReservation.checkIn <= new Date().toISOString().split('T')[0];
    const newRoomStatus = isTodayCheckIn ? 'occupied' : 'reserved';

    setRooms((prev) =>
      prev.map((r) => {
        if (r.number === selectedRoom.number) {
          return {
            ...r,
            status: newRoomStatus,
            currentGuest: {
              name: newReservation.guestName,
              reservationId: newReservation.id,
              checkIn: newReservation.checkIn,
              checkOut: newReservation.checkOut
            }
          };
        }
        return r;
      })
    );

    showToast(
      "Reservation Confirmed!",
      `Suite #${selectedRoom.number} secured for ${newReservation.guestName} (${newReservation.id}).`,
      'success'
    );
  };

  // Update room status directly
  const handleUpdateRoomStatus = (roomId, newStatus) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r))
    );
    showToast("Status Updated", `Room status changed to ${newStatus.toUpperCase()}`, 'info');
  };

  // Update room clean status
  const handleUpdateCleanStatus = (roomId, newCleanStatus) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          let updatedStatus = r.status;
          if (newCleanStatus === 'clean' && r.status === 'cleaning') {
            updatedStatus = 'available';
          }
          if (newCleanStatus === 'needs_cleaning' && r.status === 'available') {
            updatedStatus = 'cleaning';
          }
          return {
            ...r,
            cleanStatus: newCleanStatus,
            status: updatedStatus
          };
        }
        return r;
      })
    );
    showToast("Housekeeping Logged", `Sanitation status updated to ${newCleanStatus.toUpperCase()}`, 'success');
  };

  // Check In Guest
  const handleCheckInGuest = (reservation) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === reservation.id ? { ...res, status: 'checked_in' } : res))
    );

    setRooms((prev) =>
      prev.map((r) => {
        if (r.number === reservation.roomNumber) {
          return {
            ...r,
            status: 'occupied',
            cleanStatus: 'clean',
            currentGuest: {
              name: reservation.guestName,
              reservationId: reservation.id,
              checkIn: reservation.checkIn,
              checkOut: reservation.checkOut
            }
          };
        }
        return r;
      })
    );

    showToast(
      "Check-In Completed",
      `Guest ${reservation.guestName} checked into Suite #${reservation.roomNumber}. Keycard issued.`,
      'success'
    );
  };

  // Check Out Guest
  const handleCheckOutGuest = (roomOrReservation) => {
    const roomNum = roomOrReservation.number || roomOrReservation.roomNumber;

    setReservations((prev) =>
      prev.map((res) => {
        if (res.roomNumber === roomNum && res.status === 'checked_in') {
          return { ...res, status: 'checked_out' };
        }
        return res;
      })
    );

    setRooms((prev) =>
      prev.map((r) => {
        if (r.number === roomNum) {
          return {
            ...r,
            status: 'cleaning',
            cleanStatus: 'needs_cleaning',
            currentGuest: null
          };
        }
        return r;
      })
    );

    showToast(
      "Guest Checked Out",
      `Suite #${roomNum} checked out. Flagged for turnover housekeeping sanitation.`,
      'info'
    );

    // Auto navigate to billing with folio if available
    const found = reservations.find((r) => r.roomNumber === roomNum);
    if (found) {
      setActiveInvoiceReservation(found);
      navigateToPage('billing');
    }
  };

  // Cancel reservation
  const handleCancelReservation = (reservationId) => {
    const res = reservations.find((r) => r.id === reservationId);
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: 'cancelled' } : r))
    );

    if (res) {
      setRooms((prev) =>
        prev.map((r) => {
          if (r.number === res.roomNumber && (r.status === 'reserved' || r.status === 'occupied')) {
            return { ...r, status: 'available', currentGuest: null };
          }
          return r;
        })
      );
    }

    showToast("Reservation Cancelled", `Booking ${reservationId} has been cancelled.`, 'error');
  };

  // View Invoice
  const handleViewInvoice = (reservation) => {
    setActiveInvoiceReservation(reservation);
    navigateToPage('billing');
  };

  // Add room service order
  const handleAddRoomServiceOrder = ({ roomNumber, items, totalAmount, notes, time }) => {
    const occupiedRes = reservations.find(
      (r) => r.roomNumber === roomNumber && r.status === 'checked_in'
    );

    if (occupiedRes) {
      const newCharges = items.map((i) => ({
        item: `${i.qty}x ${i.name}`,
        price: i.price * i.qty,
        time
      }));

      setReservations((prev) =>
        prev.map((r) => {
          if (r.id === occupiedRes.id) {
            const updatedService = [...(r.roomServiceCharges || []), ...newCharges];
            const updatedAddons = (r.addOnsTotal || 0) + totalAmount;
            const updatedTaxes = Math.round(((r.roomTotal || 0) + updatedAddons) * HOTEL_INFO.taxRate);
            const updatedGrand = (r.roomTotal || 0) + updatedAddons + updatedTaxes;
            return {
              ...r,
              roomServiceCharges: updatedService,
              addOnsTotal: updatedAddons,
              taxes: updatedTaxes,
              grandTotal: updatedGrand
            };
          }
          return r;
        })
      );
    }

    showToast(
      "Room Service Dispatched!",
      `Order total $${totalAmount.toLocaleString()} delivered to Suite #${roomNumber} & added to room folio.`,
      'success'
    );
  };

  // Maintenance tickets
  const handleAddMaintenance = (ticket) => {
    setMaintenanceLogs((prev) => [ticket, ...prev]);
    showToast(
      "Work Order Dispatched",
      `Maintenance ticket logged for Suite #${ticket.roomNumber}: ${ticket.issue}`,
      'info'
    );
  };

  const handleResolveMaintenance = (ticketId) => {
    setMaintenanceLogs((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'resolved' } : t))
    );
    showToast("Work Order Resolved", "Engineering specialist completed maintenance task.", 'success');
  };

  // Reset to default data
  const handleResetData = () => {
    const data = resetAllHotelData();
    setRooms(data.rooms);
    setReservations(data.reservations);
    setMaintenanceLogs(data.maintenance);
    showToast("Demo Data Reset", "Restored all default suites, bookings and maintenance logs.", 'info');
  };

  const occupiedCount = rooms.filter((r) => r.status === 'occupied').length;

  return (
    <div className="portfolio-app hotel-app">
      {/* Background Ambient Glow */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Luxury Hotel Navigation Bar */}
      <HotelNavbar
        currentRoute={currentRoute}
        onNavigate={navigateToPage}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenBookingModal={handleOpenBookingModal}
        onResetData={handleResetData}
        totalRooms={rooms.length}
        occupiedCount={occupiedCount}
      />

      {/* Main View Router */}
      <main>
        {/* 1. Overview Route */}
        {currentRoute === 'overview' && (
          <>
            <HotelHero
              rooms={rooms}
              onSearchRooms={handleSearchFromHero}
              onNavigate={navigateToPage}
              onOpenBookingModal={handleOpenBookingModal}
            />
            <ResortShowcase
              onNavigate={navigateToPage}
              onOpenBookingModal={handleOpenBookingModal}
            />
            <RoomCatalog
              rooms={rooms}
              onSelectRoom={(room) => setSelectedRoomForDetail(room)}
              onBookRoom={(room) => handleOpenBookingModal(room)}
              initialFilters={initialCatalogFilters}
            />
          </>
        )}

        {/* 2. Suites & Villas Inventory Route */}
        {currentRoute === 'rooms' && (
          <RoomCatalog
            rooms={rooms}
            onSelectRoom={(room) => setSelectedRoomForDetail(room)}
            onBookRoom={(room) => handleOpenBookingModal(room)}
            initialFilters={initialCatalogFilters}
          />
        )}

        {/* 3. Front Desk PMS & Floor Matrix Route */}
        {currentRoute === 'frontdesk' && (
          <FrontDeskOps
            rooms={rooms}
            reservations={reservations}
            onUpdateRoomStatus={handleUpdateRoomStatus}
            onCheckInGuest={handleCheckInGuest}
            onCheckOutGuest={handleCheckOutGuest}
            onCancelReservation={handleCancelReservation}
            onViewInvoice={handleViewInvoice}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {/* 4. Housekeeping & Facilities Route */}
        {currentRoute === 'housekeeping' && (
          <HousekeepingView
            rooms={rooms}
            maintenanceLogs={maintenanceLogs}
            onUpdateCleanStatus={handleUpdateCleanStatus}
            onAddMaintenance={handleAddMaintenance}
            onResolveMaintenance={handleResolveMaintenance}
          />
        )}

        {/* 5. In-Room Dining & Concierge Route */}
        {currentRoute === 'dining' && (
          <DiningConcierge
            rooms={rooms}
            onAddRoomServiceOrder={handleAddRoomServiceOrder}
          />
        )}

        {/* 6. Folio Invoicing & Revenue Analytics Route */}
        {currentRoute === 'billing' && (
          <AnalyticsBilling
            reservations={reservations}
            rooms={rooms}
            activeInvoiceReservation={activeInvoiceReservation}
            onCloseInvoice={() => setActiveInvoiceReservation(null)}
          />
        )}
      </main>

      {/* Global Luxury Footer */}
      <HotelFooter onNavigate={navigateToPage} />

      {/* Room Detail Modal */}
      {selectedRoomForDetail && (
        <RoomDetailModal
          room={selectedRoomForDetail}
          onClose={() => setSelectedRoomForDetail(null)}
          onBookRoom={(room) => handleOpenBookingModal(room)}
        />
      )}

      {/* Reservation Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          rooms={rooms}
          preSelectedRoom={bookingPreSelectedRoom}
          onCompleteBooking={handleCompleteBooking}
          onViewInvoice={handleViewInvoice}
        />
      )}

      {/* Global Command Palette (Ctrl+K / Cmd+K) */}
      <HotelCommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        rooms={rooms}
        reservations={reservations}
        onNavigate={navigateToPage}
        onSelectRoom={(room) => setSelectedRoomForDetail(room)}
        onOpenBookingModal={handleOpenBookingModal}
        onViewInvoice={handleViewInvoice}
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetData={handleResetData}
      />

      {/* Toast Notification Alert */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
