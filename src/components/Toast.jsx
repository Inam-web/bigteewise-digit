import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-right duration-300 max-w-md">
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>

      <p className="text-xs sm:text-sm font-semibold text-slate-100 flex-1 leading-snug">
        {message}
      </p>

      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};