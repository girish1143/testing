import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './ToastNotification.css';

export default function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="toast-icon success" size={20} />;
      case 'error':
        return <AlertCircle className="toast-icon error" size={20} />;
      default:
        return <Info className="toast-icon info" size={20} />;
    }
  };

  return (
    <div className={`hotel-toast ${toast.type || 'info'}`} role="alert">
      <div className="toast-content">
        {getIcon()}
        <div className="toast-text">
          <span className="toast-title">{toast.title || 'Notification'}</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
