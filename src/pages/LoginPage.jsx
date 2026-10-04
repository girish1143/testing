import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Crown, ShieldCheck, AlertCircle } from 'lucide-react';
import { authSignIn } from '../config/supabaseClient';
import './Auth.css';

export default function LoginPage({ onLoginSuccess, onNavigate, showToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
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
      const { user, error } = await authSignIn({
        email: email.trim(),
        password
      });

      if (error) {
        if (error.message?.includes('Invalid login credentials')) {
          setErrorMsg('Invalid email or password. Please verify your credentials.');
        } else {
          setErrorMsg(error.message || 'Authentication failed. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      onLoginSuccess(user);
      showToast?.('Welcome Back', `Signed in as ${user.name}.`, 'success');
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
          <span className="auth-pretitle">Patron Sanctuary</span>
          <h1 className="auth-heading">Sign In to Your Account</h1>
          <p className="auth-subheading">
            Access your reservation folios, preferred suites, and personalized guest services.
          </p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner" role="alert">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email */}
          <div className="auth-input-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="auth-input-container">
              <Mail size={17} className="input-icon" />
              <input
                id="login-email"
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
            <label htmlFor="login-password">Password</label>
            <div className="auth-input-container">
              <Lock size={17} className="input-icon" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
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

          {/* Submit */}
          <button type="submit" className="btn-auth-submit" disabled={isLoading}>
            {isLoading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <span>Sign In to Sanctuary</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Footer Switch to Sign Up */}
        <div className="auth-footer">
          <span>New guest to Aurelia Grand?</span>{' '}
          <button
            type="button"
            className="auth-link"
            onClick={() => onNavigate('signup')}
          >
            Create an Account
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
