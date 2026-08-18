import React, { useState } from 'react';
import { WhatsAppIcon } from './SocialIcons';
import { X, Send, Sparkles } from 'lucide-react';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const prefilledOptions = [
    'Hi BigTeeWise Digital! I want to inquire about Book Marketing & Author Branding.',
    'Hi! I need a custom Book Cover & 3D Mockup Design quote.',
    'Hi BigTeeWise! I want to discuss Digital Marketing & Social Media Strategy.',
  ];

  const sendWhatsApp = (text) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/2348073527146?text=${encoded}`;

    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">

      {/* Popover Chat Box */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden animate-in slide-in-from-bottom duration-300">

          {/* WhatsApp Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-lg">
                <WhatsAppIcon className="w-6 h-6 fill-white" />
              </div>

              <div>
                <h4 className="font-extrabold text-sm leading-snug">
                  BigTeeWise Digital Chat
                </h4>

                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Online • UK Team</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/10 transition-colors text-white"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

          {/* Messages Container */}
          <div className="p-4 bg-slate-50 space-y-3 max-h-80 overflow-y-auto">

            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-800 space-y-1">

              <p className="font-bold text-slate-900 flex items-center gap-1 text-blue-600">
                <Sparkles className="w-3.5 h-3.5" />
                BigTeeWise Team:
              </p>

              <p>
                Welcome! How can we help elevate your book or brand today?
              </p>

            </div>

            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Quick Select Topic:
            </p>

            <div className="space-y-2">
              {prefilledOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendWhatsApp(opt)}
                  className="w-full text-left bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-2">
                    {opt}
                  </span>

                  <Send className="w-3.5 h-3.5 text-emerald-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

          </div>

          {/* Custom Message Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">

            <input
              type="text"
              placeholder="Type your WhatsApp message..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendWhatsApp(customMsg || prefilledOptions[0]);
                }
              }}
              className="w-full bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={() =>
                sendWhatsApp(customMsg || prefilledOptions[0])
              }
              className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 hover:bg-emerald-600 transition-colors shadow-md"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>

          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center relative group"
        aria-label="Open WhatsApp Chat"
      >
        <WhatsAppIcon className="w-7 h-7 fill-white" />

        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
      </button>

    </div>
  );
};