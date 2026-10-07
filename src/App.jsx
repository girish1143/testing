import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

import { getCurrentUser, authSignOut } from './config/supabaseClient';
import {
  getStoredHotelInfo,
  saveHotelInfo,
  getStoredRooms,
  saveRooms,
  resetHotelData
} from './data/hotelManager';

import './App.css';

export default function App() {
  // Page Route State: 'home' | 'login' | 'signup' | 'profile' | 'admin'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/login') || hash.startsWith('#/signin')) return 'login';
    if (hash.startsWith('#/signup') || hash.startsWith('#/register')) return 'signup';
    if (hash.startsWith('#/profile') || hash.startsWith('#/account')) return 'profile';
    if (hash.startsWith('#/admin') || hash.startsWith('#/manage')) return 'admin';
    return 'home';
  });

  // Dynamic Resort and Rooms State (managed live by Admin)
  const [hotelInfo, setHotelInfo] = useState(() => getStoredHotelInfo());
  const [rooms, setRooms] = useState(() => getStoredRooms());

  // Current authenticated user
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  // Booking Modal State
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/login') || hash.startsWith('#/signin')) {
        setCurrentPage('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/signup') || hash.startsWith('#/register')) {
        setCurrentPage('signup');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/profile') || hash.startsWith('#/account')) {
        setCurrentPage('profile');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/admin') || hash.startsWith('#/manage')) {
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page) => {
    if (page === 'home') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${page}`;
    }
  };

  // Open booking modal for a specific room or default room
  const handleOpenBooking = (room = null) => {
    setSelectedRoomForBooking(room || (rooms.length > 0 ? rooms[0] : null));
    setIsBookingModalOpen(true);
  };

  // Admin Data Updaters
  const handleUpdateHotelInfo = (newInfo) => {
    const saved = saveHotelInfo(newInfo);
    setHotelInfo(saved);
  };

  const handleUpdateRooms = (newRooms) => {
    const saved = saveRooms(newRooms);
    setRooms(saved);
  };

  const handleResetDefaults = () => {
    const reset = resetHotelData();
    setHotelInfo(reset.info);
    setRooms(reset.rooms);
  };

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    navigateTo('profile');
  };

  const handleSignUpSuccess = (user) => {
    setCurrentUser(user);
    navigateTo('profile');
  };

  const handleSignOut = async () => {
    await authSignOut();
    setCurrentUser(null);
    showToast('Signed Out', 'You have been safely signed out.', 'info');
    navigateTo('home');
  };

  return (
    <div className="hotel-app-root">
      {/* Global Ambient Glow */}
      <div className="ambient-background" aria-hidden="true" />

      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onBookClick={() => handleOpenBooking(null)}
        hotelInfo={hotelInfo}
      />

      {/* Main Page Content */}
      <main className="app-main-content">
        {/* Page 1: Home Page */}
        {currentPage === 'home' && (
          <HomePage
            onBookRoom={handleOpenBooking}
            onNavigate={navigateTo}
            rooms={rooms}
            hotelInfo={hotelInfo}
          />
        )}

        {/* Page 2: Login Page */}
        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={navigateTo}
            showToast={showToast}
          />
        )}

        {/* Page 3: SignUp Page */}
        {currentPage === 'signup' && (
          <SignUpPage
            onSignUpSuccess={handleSignUpSuccess}
            onNavigate={navigateTo}
            showToast={showToast}
          />
        )}

        {/* Page 4: User Profile Page */}
        {currentPage === 'profile' && (
          <ProfilePage
            currentUser={currentUser}
            onNavigate={navigateTo}
            showToast={showToast}
            onBookRoom={handleOpenBooking}
            onSignOut={handleSignOut}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* Page 5: Executive Operations Admin Panel */}
        {currentPage === 'admin' && (
          <AdminPage
            hotelInfo={hotelInfo}
            onUpdateHotelInfo={handleUpdateHotelInfo}
            rooms={rooms}
            onUpdateRooms={handleUpdateRooms}
            onResetDefaults={handleResetDefaults}
            onNavigate={navigateTo}
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Booking Modal */}
      {isBookingModalOpen && selectedRoomForBooking && (
        <BookingModal
          room={selectedRoomForBooking}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          currentUser={currentUser}
          showToast={showToast}
        />
      )}

      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
