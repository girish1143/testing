import React, { useState, useEffect } from 'react';
import { 
  Hotel, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Crown, 
  KeyRound, 
  Compass, 
  Layers, 
  Award,
  ArrowLeft,
  Briefcase
} from 'lucide-react';
import { HOTEL_INFO, DEMO_USERS } from '../data/hotelData';
import './AuthPage.css';

export default function AuthPage({
  initialMode = 'signin', // 'signin' | 'signup'
  onLoginSuccess,
  onNavigate,
  users = DEMO_USERS,
  onRegisterUser
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form States
  const [signUpType, setSignUpType] = useState('guest'); // 'guest' | 'staff'
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [preferredCategory, setPreferredCategory] = useState('penthouse');
  const [department, setDepartment] = useState('Front Desk Operations');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Keep mode in sync if initialMode changes
  useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
  }, [initialMode]);

  // Handle Quick Demo Sign In
  const handleQuickDemoLogin = (demoUser) => {
    setSignInEmail(demoUser.email);
    setSignInPassword(demoUser.password);
    onLoginSuccess(demoUser);
  };

  // Sign In Submit
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = signInEmail.trim().toLowerCase();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === signInPassword
    );

    if (!foundUser) {
      setErrorMsg('Invalid email or password. Please verify your credentials or select a 1-click Demo Account below.');
      return;
    }

    onLoginSuccess(foundUser);
  };

  // Sign Up Submit
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    const trimmedEmail = signUpEmail.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      setErrorMsg('An account with this email address already exists. Please sign in instead.');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: fullName.trim(),
      email: trimmedEmail,
      password: signUpPassword,
      phone: signUpPhone || '+1 (800) 555-0199',
      type: signUpType,
      role: signUpType === 'staff' ? 'front_desk' : 'vip_patron',
      roleTitle: signUpType === 'staff' ? department : 'Aurelia Privilege Member',
      department: signUpType === 'staff' ? department : 'VIP Guest Circle',
      membershipTier: signUpType === 'guest' ? 'Imperial Silver' : undefined,
      avatar: signUpType === 'staff' 
        ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    };

    onRegisterUser(newUser);
    onLoginSuccess(newUser);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotPasswordOpen(false);
      setForgotEmail('');
    }, 3000);
  };

  return (
    <div className="auth-page-container">
      {/* Back to Site Button */}
      <button className="auth-back-btn" onClick={() => onNavigate('overview')}>
        <ArrowLeft size={16} />
        <span>Return to Resort</span>
      </button>

      <div className="auth-card-wrapper">
        {/* Left Column: Luxury Brand Showcase */}
        <div className="auth-showcase-panel">
          <div className="auth-showcase-backdrop" />
          <div className="auth-showcase-content">
            <div className="auth-crest-wrap">
              <span className="auth-crest-star">✦</span>
              <Hotel size={28} className="auth-crest-icon" />
            </div>

            <div className="auth-brand-info">
              <span className="auth-kicker">Hospitality & Operations Portal</span>
              <h1 className="auth-showcase-title">{HOTEL_INFO.name}</h1>
              <p className="auth-showcase-desc">
                An integrated sanctuary platform connecting distinguished patrons, private butler services,
                and real-time resort property management operations.
              </p>
            </div>

            {/* Key Advantages List */}
            <div className="auth-perks-list">
              <div className="auth-perk-item">
                <Crown size={18} className="perk-icon" />
                <div>
                  <strong>VIP Patron Privileges</strong>
                  <span>Direct suite booking, fine dining billing & concierge key access</span>
                </div>
              </div>

              <div className="auth-perk-item">
                <Layers size={18} className="perk-icon" />
                <div>
                  <strong>Staff & Front Desk Console</strong>
                  <span>Interactive floor matrix, guest check-ins & folio billing desk</span>
                </div>
              </div>

              <div className="auth-perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <div>
                  <strong>Encrypted & Discrect</strong>
                  <span>Compliant with international hospitality privacy standards</span>
                </div>
              </div>
            </div>

            {/* Accolade Quote */}
            <div className="auth-quote-card">
              <p>
                "An effortless marriage of high-touch European discretion, bespoke gastronomy, and modern digital luxury."
              </p>
              <div className="auth-quote-author">
                <Award size={14} className="gold-icon" />
                <span>Forbes Travel Guide Distinction 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="auth-form-panel">
          {/* Mode Switcher Tabs */}
          <div className="auth-mode-tabs">
            <button
              className={`mode-tab-btn ${mode === 'signin' ? 'active' : ''}`}
              onClick={() => {
                setMode('signin');
                setErrorMsg('');
              }}
            >
              Sign In
            </button>
            <button
              className={`mode-tab-btn ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
              }}
            >
              Join / Sign Up
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="auth-error-banner" role="alert">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ================= SIGN IN MODE ================= */}
          {mode === 'signin' && (
            <div className="auth-form-content">
              <div className="form-head-block">
                <h2 className="form-title">Welcome to the Portal</h2>
                <p className="form-sub">
                  Sign in with your registered patron email or staff operations credentials.
                </p>
              </div>

              {/* 1-Click Demo Accounts Bar */}
              <div className="demo-accounts-section">
                <span className="demo-accounts-label">
                  <Sparkles size={13} /> 1-Click Instant Demo Login:
                </span>
                <div className="demo-buttons-grid">
                  <button
                    type="button"
                    className="demo-btn admin"
                    onClick={() => handleQuickDemoLogin(DEMO_USERS[0])}
                    title="Sign In as General Manager"
                  >
                    <Crown size={14} />
                    <span>General Manager</span>
                  </button>

                  <button
                    type="button"
                    className="demo-btn staff"
                    onClick={() => handleQuickDemoLogin(DEMO_USERS[1])}
                    title="Sign In as Front Desk Supervisor"
                  >
                    <KeyRound size={14} />
                    <span>Front Desk</span>
                  </button>

                  <button
                    type="button"
                    className="demo-btn vip"
                    onClick={() => handleQuickDemoLogin(DEMO_USERS[2])}
                    title="Sign In as Countess Sofia (Imperial VIP)"
                  >
                    <Sparkles size={14} />
                    <span>Countess Sofia (VIP)</span>
                  </button>

                  <button
                    type="button"
                    className="demo-btn guest"
                    onClick={() => handleQuickDemoLogin(DEMO_USERS[3])}
                    title="Sign In as Marcus Vance (Patron)"
                  >
                    <User size={14} />
                    <span>Marcus Vance</span>
                  </button>
                </div>
              </div>

              <div className="auth-or-divider">
                <span>or enter manual credentials</span>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSignInSubmit} className="auth-actual-form">
                <div className="auth-input-group">
                  <label htmlFor="signin-email">Email Address or Username</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-icon" />
                    <input
                      id="signin-email"
                      type="email"
                      placeholder="e.g. patron@domain.com or admin@grandaurelia.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <div className="label-with-link">
                    <label htmlFor="signin-password">Password</label>
                    <button
                      type="button"
                      className="forgot-link"
                      onClick={() => setForgotPasswordOpen(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="input-with-icon">
                    <Lock size={16} className="field-icon" />
                    <input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="remember-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember this session on this device</span>
                  </label>
                </div>

                <button type="submit" className="btn-auth-submit">
                  <span>Sign In to Sanctuary Portal</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="auth-switch-footer">
                <span>New to Grand Aurelia?</span>
                <button
                  className="switch-link-btn"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                >
                  Join the Aurelia Private Circle (Sign Up)
                </button>
              </div>
            </div>
          )}

          {/* ================= SIGN UP MODE ================= */}
          {mode === 'signup' && (
            <div className="auth-form-content">
              <div className="form-head-block">
                <h2 className="form-title">Join the Aurelia Circle</h2>
                <p className="form-sub">
                  Create your guest account for privileged reservations or register as a hotel staff associate.
                </p>
              </div>

              {/* Portal Persona Choice */}
              <div className="persona-toggle-group">
                <button
                  type="button"
                  className={`persona-card-btn ${signUpType === 'guest' ? 'selected' : ''}`}
                  onClick={() => setSignUpType('guest')}
                >
                  <Crown size={18} />
                  <div>
                    <strong>VIP Patron / Resident</strong>
                    <span>Exclusive suites, excursions & concierge dining</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`persona-card-btn ${signUpType === 'staff' ? 'selected' : ''}`}
                  onClick={() => setSignUpType('staff')}
                >
                  <Briefcase size={18} />
                  <div>
                    <strong>Staff & Operations</strong>
                    <span>PMS desk, floor matrix & housekeeping</span>
                  </div>
                </button>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSignUpSubmit} className="auth-actual-form">
                <div className="auth-input-group">
                  <label htmlFor="signup-name">Full Legal Name *</label>
                  <div className="input-with-icon">
                    <User size={16} className="field-icon" />
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="e.g. Lord Alexander Kensington"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="auth-inputs-grid-2">
                  <div className="auth-input-group">
                    <label htmlFor="signup-email">Email Address *</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="field-icon" />
                      <input
                        id="signup-email"
                        type="email"
                        placeholder="vip@domain.com"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="signup-phone">Mobile Phone</label>
                    <div className="input-with-icon">
                      <Phone size={16} className="field-icon" />
                      <input
                        id="signup-phone"
                        type="tel"
                        placeholder="+1 (555) 019-2831"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Conditional Fields based on Persona */}
                {signUpType === 'guest' ? (
                  <div className="auth-input-group">
                    <label htmlFor="signup-preferred">Preferred Suite Sanctuary</label>
                    <select
                      id="signup-preferred"
                      value={preferredCategory}
                      onChange={(e) => setPreferredCategory(e.target.value)}
                      className="auth-custom-select"
                    >
                      <option value="deluxe">Deluxe Garden Sanctuary ($280+)</option>
                      <option value="suite">Executive Horizon Suite ($490+)</option>
                      <option value="villa">Presidential Lagoon Villa ($920+)</option>
                      <option value="penthouse">The Aurelia Imperial Penthouse ($1850+)</option>
                    </select>
                  </div>
                ) : (
                  <div className="auth-input-group">
                    <label htmlFor="signup-dept">Hotel Department</label>
                    <select
                      id="signup-dept"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="auth-custom-select"
                    >
                      <option value="Front Desk Operations">Front Desk & Reservations</option>
                      <option value="Concierge & Dining">Concierge & Haute Cuisine</option>
                      <option value="Housekeeping & Engineering">Housekeeping & Facilities</option>
                      <option value="Executive Management">Executive Management & GM</option>
                    </select>
                  </div>
                )}

                <div className="auth-inputs-grid-2">
                  <div className="auth-input-group">
                    <label htmlFor="signup-pass">Create Password *</label>
                    <div className="input-with-icon">
                      <Lock size={16} className="field-icon" />
                      <input
                        id="signup-pass"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="signup-confirm-pass">Confirm Password *</label>
                    <div className="input-with-icon">
                      <Lock size={16} className="field-icon" />
                      <input
                        id="signup-confirm-pass"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repeat password"
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="remember-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                    />
                    <span>
                      I accept the Grand Aurelia Hospitality Charter & Privacy Discretion Terms
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-auth-submit">
                  <span>Create Account & Enter Portal</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="auth-switch-footer">
                <span>Already have an Aurelia profile?</span>
                <button
                  className="switch-link-btn"
                  onClick={() => {
                    setMode('signin');
                    setErrorMsg('');
                  }}
                >
                  Sign In instead
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Forgot Password Modal Simulation */}
      {forgotPasswordOpen && (
        <div className="hotel-modal-overlay" onClick={() => setForgotPasswordOpen(false)}>
          <div className="forgot-password-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="forgot-modal-title">Password Reset Assistance</h3>
            <p className="forgot-modal-sub">
              Enter your registered patron or staff email address. Our private concierge security system will transmit
              an authorized reset token.
            </p>

            {forgotSuccess ? (
              <div className="forgot-success-box">
                <CheckCircle2 size={32} className="gold-icon" />
                <p>A secure reset token has been dispatched to <strong>{forgotEmail}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="forgot-form">
                <div className="auth-input-group">
                  <label>Registered Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. patron@domain.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="forgot-actions">
                  <button
                    type="button"
                    className="btn-secondary-ghost"
                    onClick={() => setForgotPasswordOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-book-primary">
                    Transmit Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
