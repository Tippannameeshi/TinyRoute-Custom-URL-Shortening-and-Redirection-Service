import React from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: '500'
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#0f172a'
          }
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#0f172a'
          }
        }
      }}
    />
  );
};

export const toast = {
  success: (msg) => hotToast.success(msg),
  error: (msg) => hotToast.error(msg),
  info: (msg) => hotToast(msg, { icon: 'ℹ️' }),
  loading: (msg) => hotToast.loading(msg),
  dismiss: (id) => hotToast.dismiss(id)
};
