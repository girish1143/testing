import React, { useState, useEffect } from 'react';
import {
  User,
  Crown,
  Sparkles,
  Calendar,
  CreditCard,
  Award,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Utensils,
  BedDouble,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Copy,
  ChevronRight,
  LogOut,
  KeyRound,
  Save,
  Trash2,
  ExternalLink,
  Compass,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  getUserProfile,
  updateUserProfile,
  getUserReservations,
  cancelHotelReservation,
  updateUserPassword,
  authSignIn
} from '../config/supabaseClient';
import './ProfilePage.css';

const AVATAR_OPTIONS = [
  { id: 'crown', label: 'Imperial Crown', icon: Crown },
  { id: 'sparkles', label: 'Azure Sparkle', icon: Sparkles },
  { id: 'award', label: 'Grand Laurels', icon: Award },
  { id: 'compass', label: 'Navigator', icon: Compass },
  { id: 'shield', label: 'Sovereign Crest', icon: ShieldCheck },
];

export default function ProfilePage({
  currentUser,
  onNavigate,
  showToast,
  onBookRoom,
  onSignOut,
  onLoginSuccess
}) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    city: '',
    country: '',
    avatar: 'crown',
    membershipTier: 'Aurelia Gold Patron',
    dietaryPreferences: 'Gourmet / No Dietary Restrictions',
    roomPreferences: 'High Floor, Oceanfront Balcony, Feather Pillows',
    specialNotes: ''
  });

  // Security password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Selected reservation folio modal
  const [selectedFolio, setSelectedFolio] = useState(null);
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  // Load user profile & reservations
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [userProf, userReservations] = await Promise.all([
          getUserProfile(currentUser.id, currentUser),
          getUserReservations(currentUser.email)
        ]);

        if (isMounted) {
          setProfile(userProf);
          setReservations(userReservations);
          setEditForm({
            name: userProf.name || currentUser.name || '',
            phone: userProf.phone || '',
            city: userProf.city || 'Monte Carlo',
            country: userProf.country || 'Monaco',
            avatar: userProf.avatar || 'crown',
            membershipTier: userProf.membershipTier || 'Aurelia Gold Patron',
            dietaryPreferences: userProf.dietaryPreferences || 'Gourmet / No Dietary Restrictions',
            roomPreferences: userProf.roomPreferences || 'High Floor, Oceanfront Balcony, Feather Pillows',
            specialNotes: userProf.specialNotes || ''
          });
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  // Demo user quick login handler
  const handleQuickDemoLogin = async () => {
    try {
      const demoEmail = 'alexandra.vance@aurelia.grand';
      const demoPass = 'AureliaVIP2025!';
      const res = await authSignIn({ email: demoEmail, password: demoPass });
      if (res?.user) {
        onLoginSuccess(res.user);
        showToast('Patron Welcome', 'Logged in as VIP Patron Lady Alexandra Vance', 'success');
      }
    } catch (err) {
      showToast('Demo Login', 'Demo profile activated.', 'info');
    }
  };

  // Save profile changes to backend
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!editForm.name.trim()) {
      showToast('Validation Error', 'Guest name cannot be empty.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const updated = await updateUserProfile(currentUser.id, {
        name: editForm.name.trim(),
        phone: editForm.phone.trim(),
        city: editForm.city.trim(),
        country: editForm.country.trim(),
        avatar: editForm.avatar,
        membershipTier: editForm.membershipTier,
        dietaryPreferences: editForm.dietaryPreferences,
        roomPreferences: editForm.roomPreferences,
        specialNotes: editForm.specialNotes.trim()
      });

      setProfile(updated);
      showToast('Folio Updated', 'Your patron profile was successfully synchronized.', 'success');
    } catch (err) {
      console.error('Profile update failed', err);
      showToast('Update Failed', 'Unable to save profile changes.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel a reservation
  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm(`Are you sure you wish to cancel reservation ${reservationId}?`)) {
      return;
    }

    setCancellingBookingId(reservationId);
    try {
      await cancelHotelReservation(reservationId);
      setReservations((prev) =>
        prev.map((r) => (r.id === reservationId ? { ...r, status: 'cancelled' } : r))
      );
      if (selectedFolio?.id === reservationId) {
        setSelectedFolio((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
      }
      showToast('Reservation Cancelled', `Booking #${reservationId} has been cancelled.`, 'info');
    } catch (err) {
      showToast('Cancellation Error', 'Could not cancel booking.', 'error');
    } finally {
      setCancellingBookingId(null);
    }
  };

  // Change password handler
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('Password Error', 'Password must be at least 6 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Password Error', 'New passwords do not match.', 'error');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateUserPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      showToast('Security Update', 'Your patron password has been updated securely.', 'success');
    } catch (err) {
      showToast('Security Error', err.message || 'Unable to update password.', 'error');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to Clipboard', `${label} voucher code copied!`, 'success');
  };

  // Unauthenticated Patron Portal Guard
  if (!currentUser) {
    return (
      <div className="profile-page-root">
        <div className="profile-ambient-glow" aria-hidden="true" />
        <div className="profile-container">
          <div className="guest-portal-card">
            <div className="guest-portal-crest">
              <Crown size={36} />
            </div>
            <span className="guest-portal-eyebrow">Aurelia Grand Patron Portal</span>
            <h1 className="guest-portal-title">Imperial Guest Folio & Suites</h1>
            <p className="guest-portal-desc">
              Sign in to manage your active coastal reservations, access complimentary resort credits,
              customize bespoke suite amenities, and review your VIP loyalty benefits.
            </p>

            <div className="guest-portal-actions">
              <button className="btn-portal-primary" onClick={() => onNavigate('login')}>
                <span>Sign In to Your Folio</span>
                <ArrowRight size={16} />
              </button>
              <button className="btn-portal-secondary" onClick={() => onNavigate('signup')}>
                <span>Register as a Patron</span>
              </button>
            </div>

            <div className="demo-login-divider">
              <span>Or experience instant preview</span>
            </div>

            <button className="btn-portal-demo" onClick={handleQuickDemoLogin}>
              <Sparkles size={16} />
              <span>Instant VIP Patron Demo (Lady Alexandra Vance)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeReservationsCount = reservations.filter((r) => r.status !== 'cancelled').length;
  const currentAvatarOption = AVATAR_OPTIONS.find((a) => a.id === editForm.avatar) || AVATAR_OPTIONS[0];
  const AvatarIconComponent = currentAvatarOption.icon;

  return (
    <div className="profile-page-root">
      <div className="profile-ambient-glow" aria-hidden="true" />

      <div className="profile-container">
        {/* Patron Banner Card */}
        <section className="patron-banner-card">
          <div className="banner-left">
            <div className="banner-avatar-wrap">
              <div className="banner-avatar-circle">
                <AvatarIconComponent size={34} className="banner-avatar-icon" />
              </div>
              <span className="banner-avatar-badge">VIP</span>
            </div>

            <div className="banner-info">
              <div className="banner-tier-row">
                <span className="tier-tag">
                  <Crown size={13} />
                  {profile?.membershipTier || 'Aurelia Gold Patron'}
                </span>
                <span className="member-id-pill">ID: #{currentUser.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <h1 className="banner-patron-name">{profile?.name || currentUser.name}</h1>
              <div className="banner-contact-row">
                <span className="contact-item">
                  <Mail size={14} />
                  {currentUser.email}
                </span>
                <span className="contact-item">
                  <MapPin size={14} />
                  {profile?.city || 'Monte Carlo'}, {profile?.country || 'Monaco'}
                </span>
                <span className="contact-item">
                  <Phone size={14} />
                  {profile?.phone || '+33 4 93 38 12 00'}
                </span>
              </div>
            </div>
          </div>

          <div className="banner-right">
            <div className="patron-metric-box">
              <span className="metric-label">Resort Credits</span>
              <span className="metric-val gold-accent">${profile?.resortCredits ?? 250}</span>
              <span className="metric-sub">Spa & Fine Dining</span>
            </div>
            <div className="patron-metric-box">
              <span className="metric-label">Active Stays</span>
              <span className="metric-val">{activeReservationsCount}</span>
              <span className="metric-sub">Confirmed Bookings</span>
            </div>
            <div className="patron-metric-box">
              <span className="metric-label">Imperial Points</span>
              <span className="metric-val">{profile?.loyaltyPoints ?? 1250}</span>
              <span className="metric-sub">Tier 3 Prestige</span>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className="profile-tabs-bar">
          <button
            className={`profile-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={16} />
            <span>Profile & Preferences</span>
          </button>

          <button
            className={`profile-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            <Calendar size={16} />
            <span>Reservations & Stays</span>
            {reservations.length > 0 && (
              <span className="tab-counter-badge">{reservations.length}</span>
            )}
          </button>

          <button
            className={`profile-tab-btn ${activeTab === 'privileges' ? 'active' : ''}`}
            onClick={() => setActiveTab('privileges')}
          >
            <Sparkles size={16} />
            <span>Resort Privileges</span>
          </button>

          <button
            className={`profile-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <ShieldCheck size={16} />
            <span>Account & Security</span>
          </button>
        </nav>

        {/* TAB 1: Profile & Preferences */}
        {activeTab === 'profile' && (
          <section className="profile-section-panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Patron Identity & Preferences</h2>
                <p className="panel-sub">
                  Customize your personal folio details, dietary accommodations, and suite preferences for upcoming stays.
                </p>
              </div>
              <div className="panel-header-badge">
                <CheckCircle2 size={15} />
                <span>Supabase Cloud Synced</span>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="profile-edit-form">
              {/* Avatar Selector */}
              <div className="form-group-full">
                <label className="field-title">Imperial Crest Avatar</label>
                <div className="avatar-selection-grid">
                  {AVATAR_OPTIONS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = editForm.avatar === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={`avatar-option-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => setEditForm((prev) => ({ ...prev, avatar: item.id }))}
                      >
                        <div className="avatar-option-icon">
                          <Icon size={20} />
                        </div>
                        <span className="avatar-option-label">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Details Row */}
              <div className="form-grid-2">
                <div className="input-group">
                  <label htmlFor="input-name">Full Patron Name</label>
                  <div className="input-with-icon">
                    <User size={16} />
                    <input
                      id="input-name"
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="e.g. Lady Alexandra Vance"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="input-email">Registered Email (Folio Account)</label>
                  <div className="input-with-icon disabled-input">
                    <Mail size={16} />
                    <input
                      id="input-email"
                      type="email"
                      value={currentUser.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="input-phone">Contact Phone</label>
                  <div className="input-with-icon">
                    <Phone size={16} />
                    <input
                      id="input-phone"
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="+33 4 93 38 12 00"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="input-tier">Membership Tier</label>
                  <div className="input-with-icon">
                    <Crown size={16} />
                    <select
                      id="input-tier"
                      value={editForm.membershipTier}
                      onChange={(e) => setEditForm({ ...editForm, membershipTier: e.target.value })}
                    >
                      <option value="Aurelia Silver Patron">Aurelia Silver Patron</option>
                      <option value="Aurelia Gold Patron">Aurelia Gold Patron</option>
                      <option value="Aurelia Platinum Member">Aurelia Platinum Member</option>
                      <option value="Aurelia Diamond Elite">Aurelia Diamond Elite</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="input-city">City of Residence</label>
                  <div className="input-with-icon">
                    <MapPin size={16} />
                    <input
                      id="input-city"
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      placeholder="Monte Carlo"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="input-country">Country</label>
                  <div className="input-with-icon">
                    <MapPin size={16} />
                    <input
                      id="input-country"
                      type="text"
                      value={editForm.country}
                      onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                      placeholder="Monaco"
                    />
                  </div>
                </div>
              </div>

              {/* Luxury Preferences */}
              <div className="form-subheading">
                <Sparkles size={16} />
                <span>Resort & Stay Experience Preferences</span>
              </div>

              <div className="form-grid-2">
                <div className="input-group">
                  <label htmlFor="input-diet">Dietary & Gastronomy Preference</label>
                  <div className="input-with-icon">
                    <Utensils size={16} />
                    <select
                      id="input-diet"
                      value={editForm.dietaryPreferences}
                      onChange={(e) => setEditForm({ ...editForm, dietaryPreferences: e.target.value })}
                    >
                      <option value="Gourmet / No Dietary Restrictions">Gourmet / No Dietary Restrictions</option>
                      <option value="Vegan Haute Cuisine">Vegan Haute Cuisine</option>
                      <option value="Gluten-Free Masteries">Gluten-Free Masteries</option>
                      <option value="Halal Gourmet">Halal Gourmet</option>
                      <option value="Kosher Dining">Kosher Dining</option>
                      <option value="Pescatarian & Wild Seafood">Pescatarian & Wild Seafood</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="input-room-pref">Suite & Sanctuary Preferences</label>
                  <div className="input-with-icon">
                    <BedDouble size={16} />
                    <input
                      id="input-room-pref"
                      type="text"
                      value={editForm.roomPreferences}
                      onChange={(e) => setEditForm({ ...editForm, roomPreferences: e.target.value })}
                      placeholder="High Floor, Sea View, Feather Pillows"
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="input-notes">Special Concierge & Butler Instructions</label>
                <textarea
                  id="input-notes"
                  rows={3}
                  value={editForm.specialNotes}
                  onChange={(e) => setEditForm({ ...editForm, specialNotes: e.target.value })}
                  placeholder="e.g. Prefers chilled champagne upon arrival, hypoallergenic down bedding, evening turndown tea service..."
                />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn-save-profile" disabled={isSaving}>
                  <Save size={16} />
                  <span>{isSaving ? 'Synchronizing to Cloud...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* TAB 2: Reservations & Stays */}
        {activeTab === 'reservations' && (
          <section className="profile-section-panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">My Luxury Reservations</h2>
                <p className="panel-sub">
                  View your confirmed bookings, reservation folios, arrival dates, and manage active stays.
                </p>
              </div>
              <button className="btn-reserve-more" onClick={() => onBookRoom(null)}>
                <Calendar size={15} />
                <span>Book Another Suite</span>
              </button>
            </div>

            {reservations.length === 0 ? (
              <div className="no-reservations-box">
                <div className="no-res-crest">
                  <BedDouble size={36} />
                </div>
                <h3>No Stays Currently Reserved</h3>
                <p>
                  You haven't reserved any suites or villas yet. Explore our royal oceanfront accommodations and book your sanctuary.
                </p>
                <button className="btn-browse-rooms" onClick={() => onNavigate('home')}>
                  <span>Explore Suites & Villas</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ) : (
              <div className="reservations-list">
                {reservations.map((booking) => {
                  const isCancelled = booking.status === 'cancelled';
                  return (
                    <div
                      key={booking.id}
                      className={`reservation-card ${isCancelled ? 'cancelled-card' : ''}`}
                    >
                      <div className="res-card-top">
                        <div className="res-badge-group">
                          <span className={`status-pill ${booking.status || 'confirmed'}`}>
                            {isCancelled ? <XCircle size={13} /> : <CheckCircle2 size={13} />}
                            {booking.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                          </span>
                          <span className="res-category-pill">{booking.roomCategory || 'Imperial Suite'}</span>
                        </div>
                        <span className="res-booking-code">Reference: {booking.id}</span>
                      </div>

                      <div className="res-card-body">
                        <div className="res-room-header">
                          <h3 className="res-room-name">{booking.roomName}</h3>
                          <div className="res-price-box">
                            <span className="res-total-amount">${booking.grandTotal?.toLocaleString()}</span>
                            <span className="res-total-sub">Total ({booking.nights} nights)</span>
                          </div>
                        </div>

                        <div className="res-details-grid">
                          <div className="res-detail-item">
                            <span className="detail-label">Check-In</span>
                            <span className="detail-value">{booking.checkIn}</span>
                          </div>
                          <div className="res-detail-item">
                            <span className="detail-label">Check-Out</span>
                            <span className="detail-value">{booking.checkOut}</span>
                          </div>
                          <div className="res-detail-item">
                            <span className="detail-label">Guests</span>
                            <span className="detail-value">{booking.guests} Guest(s)</span>
                          </div>
                          <div className="res-detail-item">
                            <span className="detail-label">Rate / Night</span>
                            <span className="detail-value">${booking.pricePerNight}</span>
                          </div>
                        </div>

                        {booking.specialRequests && (
                          <div className="res-special-box">
                            <strong>Requests:</strong> {booking.specialRequests}
                          </div>
                        )}
                      </div>

                      <div className="res-card-footer">
                        <button
                          className="btn-view-folio"
                          onClick={() => setSelectedFolio(booking)}
                        >
                          <FileText size={15} />
                          <span>View Folio Receipt</span>
                        </button>

                        {!isCancelled && (
                          <button
                            className="btn-cancel-stay"
                            disabled={cancellingBookingId === booking.id}
                            onClick={() => handleCancelReservation(booking.id)}
                          >
                            <Trash2 size={15} />
                            <span>
                              {cancellingBookingId === booking.id ? 'Cancelling...' : 'Cancel Stay'}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: Resort Privileges */}
        {activeTab === 'privileges' && (
          <section className="profile-section-panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Imperial Resort Privileges & VIP Vouchers</h2>
                <p className="panel-sub">
                  Exclusive patron amenities, complimentary vouchers, and priority services tied to your Aurelia membership.
                </p>
              </div>
            </div>

            <div className="privileges-grid">
              {/* Voucher 1 */}
              <div className="privilege-card">
                <div className="privilege-badge">Active Reward</div>
                <div className="privilege-icon-wrap">
                  <Sparkles size={24} />
                </div>
                <h3 className="privilege-title">$250 Imperial Spa Credit</h3>
                <p className="privilege-desc">
                  Enjoy revitalizing hydrotherapy, cryotherapy, and bespoke Swedish massages at the Aurelia Thalasso Spa.
                </p>
                <div className="voucher-code-box">
                  <span className="code-text">AURELIA-SPA-250</span>
                  <button
                    className="btn-copy-code"
                    onClick={() => copyToClipboard('AURELIA-SPA-250', 'Spa Credit')}
                  >
                    <Copy size={14} />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Voucher 2 */}
              <div className="privilege-card">
                <div className="privilege-badge">Complimentary</div>
                <div className="privilege-icon-wrap">
                  <Crown size={24} />
                </div>
                <h3 className="privilege-title">Sunset Champagne Degustation</h3>
                <p className="privilege-desc">
                  Two complimentary glasses of Dom Pérignon Vintage at the cliffside Horizon Lounge every evening of your stay.
                </p>
                <div className="voucher-code-box">
                  <span className="code-text">CHAMPAGNE-VIP-SUNSET</span>
                  <button
                    className="btn-copy-code"
                    onClick={() => copyToClipboard('CHAMPAGNE-VIP-SUNSET', 'Champagne Lounge')}
                  >
                    <Copy size={14} />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Voucher 3 */}
              <div className="privilege-card">
                <div className="privilege-badge">Exclusive Access</div>
                <div className="privilege-icon-wrap">
                  <Compass size={24} />
                </div>
                <h3 className="privilege-title">Private Yacht Sunset Cruise</h3>
                <p className="privilege-desc">
                  15% preferential discount on private day-charters aboard the Aurelia Majesty Riva superyacht.
                </p>
                <div className="voucher-code-box">
                  <span className="code-text">YACHT-RIVIERA-15</span>
                  <button
                    className="btn-copy-code"
                    onClick={() => copyToClipboard('YACHT-RIVIERA-15', 'Yacht Charter')}
                  >
                    <Copy size={14} />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Voucher 4 */}
              <div className="privilege-card">
                <div className="privilege-badge">Priority Service</div>
                <div className="privilege-icon-wrap">
                  <Clock size={24} />
                </div>
                <h3 className="privilege-title">Flexible 4:00 PM Check-Out</h3>
                <p className="privilege-desc">
                  Guaranteed late check-out privilege allows you to savor your last afternoon along the azure private beach.
                </p>
                <div className="voucher-code-box">
                  <span className="code-text">VIP-LATE-CHECKOUT</span>
                  <button
                    className="btn-copy-code"
                    onClick={() => copyToClipboard('VIP-LATE-CHECKOUT', 'Late Check-out')}
                  >
                    <Copy size={14} />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: Account & Security */}
        {activeTab === 'security' && (
          <section className="profile-section-panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Security & Account Settings</h2>
                <p className="panel-sub">
                  Update your authentication credentials, review active session details, or sign out.
                </p>
              </div>
            </div>

            <div className="security-cards-stack">
              <div className="security-card">
                <div className="sec-header">
                  <KeyRound size={20} className="gold-icon" />
                  <div>
                    <h3 className="sec-title">Update Folio Password</h3>
                    <p className="sec-sub">Change your secure password for accessing your Aurelia Grand patron account.</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordUpdate} className="password-form">
                  <div className="form-grid-2">
                    <div className="input-group">
                      <label htmlFor="input-new-pass">New Password</label>
                      <div className="input-with-icon">
                        <KeyRound size={16} />
                        <input
                          id="input-new-pass"
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          required
                        />
                        <button
                          type="button"
                          className="btn-toggle-eye"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="input-confirm-pass">Confirm New Password</label>
                      <div className="input-with-icon">
                        <KeyRound size={16} />
                        <input
                          id="input-confirm-pass"
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-update-pass"
                    disabled={isUpdatingPassword}
                  >
                    <span>{isUpdatingPassword ? 'Updating Password...' : 'Update Password'}</span>
                  </button>
                </form>
              </div>

              {/* Sign Out Card */}
              <div className="security-card signout-card">
                <div className="sec-header">
                  <LogOut size={20} className="rose-icon" />
                  <div>
                    <h3 className="sec-title">Patron Session</h3>
                    <p className="sec-sub">
                      Signed in as <strong>{currentUser.email}</strong>. Safely terminate your active session on this device.
                    </p>
                  </div>
                </div>

                <button className="btn-danger-signout" onClick={onSignOut}>
                  <LogOut size={16} />
                  <span>Sign Out of Folio</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Folio Receipt Modal */}
      {selectedFolio && (
        <div className="folio-modal-overlay" onClick={() => setSelectedFolio(null)}>
          <div className="folio-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="folio-crest">
              <Crown size={28} />
            </div>
            <span className="folio-eyebrow">Aurelia Grand Resort & Spa</span>
            <h2 className="folio-title">Guest Reservation Folio</h2>
            <div className="folio-code-tag">Reference: {selectedFolio.id}</div>

            <div className="folio-summary-table">
              <div className="folio-row">
                <span>Guest Name:</span>
                <strong>{selectedFolio.guestName}</strong>
              </div>
              <div className="folio-row">
                <span>Registered Email:</span>
                <strong>{selectedFolio.email}</strong>
              </div>
              <div className="folio-row">
                <span>Suite / Villa:</span>
                <strong>{selectedFolio.roomName}</strong>
              </div>
              <div className="folio-row">
                <span>Category:</span>
                <strong>{selectedFolio.roomCategory || 'Imperial Suite'}</strong>
              </div>
              <div className="folio-row">
                <span>Arrival (Check-in):</span>
                <strong>{selectedFolio.checkIn}</strong>
              </div>
              <div className="folio-row">
                <span>Departure (Check-out):</span>
                <strong>{selectedFolio.checkOut}</strong>
              </div>
              <div className="folio-row">
                <span>Duration of Stay:</span>
                <strong>{selectedFolio.nights} Night(s)</strong>
              </div>
              <div className="folio-row">
                <span>Party Size:</span>
                <strong>{selectedFolio.guests} Guest(s)</strong>
              </div>
              <div className="folio-row">
                <span>Reservation Status:</span>
                <span className={`status-pill ${selectedFolio.status}`}>
                  {selectedFolio.status?.toUpperCase()}
                </span>
              </div>

              <div className="folio-divider" />

              <div className="folio-row">
                <span>Suite Rate ({selectedFolio.nights} x ${selectedFolio.pricePerNight}):</span>
                <span>${selectedFolio.subtotal?.toLocaleString()}</span>
              </div>
              <div className="folio-row">
                <span>Hospitality Tax & Resort Levy (12%):</span>
                <span>${selectedFolio.tax?.toLocaleString()}</span>
              </div>
              <div className="folio-row folio-total-row">
                <span>Grand Total Settled:</span>
                <span className="gold-text">${selectedFolio.grandTotal?.toLocaleString()}</span>
              </div>
            </div>

            {selectedFolio.specialRequests && (
              <div className="folio-requests">
                <strong>Folio Notes:</strong> {selectedFolio.specialRequests}
              </div>
            )}

            <div className="folio-actions">
              <button className="btn-close-folio" onClick={() => setSelectedFolio(null)}>
                <span>Close Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
