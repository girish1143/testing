import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Crown, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authSignUp } from '../config/supabaseClient';
import './Auth.css';

export default function SignUpPage({ onSignUpSuccess, onNavigate, showToast }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validate()) return;

    setIsLoading(true);

    try {
      const { user, error } = await authSignUp({
        fullName: fullName.trim(),
        email: email.trim(),
        password
      });

      if (error) {
        if (error.message?.includes('already registered')) {
          setErrorMsg('An account with this email already exists. Please Sign In.');
        } else {
          setErrorMsg(error.message || 'Registration failed. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      onSignUpSuccess(user);
      showToast?.('Welcome to Aurelia Grand', `Account created for ${user.name}!`, 'success');
      onNavigate('home');
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-ambient-glow" aria-hidden="true" />

      <div className="auth-box">
        {/* Back Link */}
        <button className="auth-back-btn" onClick={() => onNavigate('home')}>
          <ArrowLeft size={16} />
          <span>Return to Hotel Home</span>
        </button>

        {/* Header */}
        <div className="auth-header">
          <div className="auth-crest">
            <Crown size={28} />
          </div>
          <span className="auth-pretitle">Private Membership</span>
          <h1 className="auth-heading">Create Patron Account</h1>
          <p className="auth-subheading">
            Join the Aurelia Circle to enjoy tailored room selections, fast suite reservations, and dedicated concierge dispatch.
          </p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner" role="alert">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="auth-input-group">
            <label htmlFor="signup-name">Full Name</label>
            <div className="auth-input-container">
              <User size={17} className="input-icon" />
              <input
                id="signup-name"
                type="text"
                placeholder="e.g. Lord Julian Vance"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: null }));
                }}
                disabled={isLoading}
                required
              />
            </div>
            {fieldErrors.fullName && <span className="field-err">{fieldErrors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="auth-input-group">
            <label htmlFor="signup-email">Email Address</label>
            <div className="auth-input-container">
              <Mail size={17} className="input-icon" />
              <input
                id="signup-email"
                type="email"
                placeholder="patron@aurelia.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: null }));
                }}
                disabled={isLoading}
                required
              />
            </div>
            {fieldErrors.email && <span className="field-err">{fieldErrors.email}</span>}
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <label htmlFor="signup-password">Password</label>
            <div className="auth-input-container">
              <Lock size={17} className="input-icon" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: null }));
                }}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="pwd-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && <span className="field-err">{fieldErrors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="auth-input-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div className="auth-input-container">
              <Lock size={17} className="input-icon" />
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (fieldErrors.confirmPassword) setFieldErrors((prev) => ({ ...prev, confirmPassword: null }));
                }}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="pwd-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && <span className="field-err">{fieldErrors.confirmPassword}</span>}
          </div>

          {/* Submit */}
          <button type="submit" className="btn-auth-submit" disabled={isLoading}>
            {isLoading ? (
              <span>Establishing Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Footer Switch to Login */}
        <div className="auth-footer">
          <span>Already have a patron account?</span>{' '}
          <button
            type="button"
            className="auth-link"
            onClick={() => onNavigate('login')}
          >
            Sign In
          </button>
        </div>

        <div className="auth-security-tag">
          <ShieldCheck size={14} />
          <span>Encrypted Luxury Hospitality Protocol</span>
        </div>
      </div>
    </div>
  );
}
