import React from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import {
  CheckCircle2,
  XCircle,
  Info,
  Loader2,
} from 'lucide-react';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        bottom: 24,
        right: 24,
      }}
      toastOptions={{
        duration: 4000,

        style: {
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '14px 16px',
          fontSize: '13px',
          fontWeight: 500,
          boxShadow:
            '0 10px 30px rgba(15,23,42,.25)',
          maxWidth: '420px',
        },

        success: {
          duration: 3500,
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
        },

        error: {
          duration: 4500,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },

        loading: {
          duration: Infinity,
        },
      }}
    />
  );
};

export const toast = {
  success: (message) =>
    hotToast.success(message, {
      icon: <CheckCircle2 size={18} />,
    }),

  error: (message) =>
    hotToast.error(message, {
      icon: <XCircle size={18} />,
    }),

  info: (message) =>
    hotToast(message, {
      icon: <Info size={18} />,
    }),

  loading: (message) =>
    hotToast.loading(message, {
      icon: (
        <Loader2
          size={18}
          className="animate-spin"
        />
      ),
    }),

  promise: (promise, messages) =>
    hotToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }),

  custom: (message, options = {}) =>
    hotToast(message, options),

  dismiss: (id) => hotToast.dismiss(id),

  remove: (id) => hotToast.remove(id),
};