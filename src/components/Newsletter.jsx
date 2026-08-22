'use client';

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export const Newsletter = ({ onSuccessToast }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSubscribed(true);

    onSuccessToast(t('newsletter.successMsg'));

    setEmail('');
  };

  return (
    <section className="py-16 bg-slate-100 border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase">
          <span className="text-blue-600 font-extrabold">//</span>
          <span>{t('newsletter.badge')}</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('newsletter.heading')}
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
          {t('newsletter.subheading')}
        </p>

        {/* Subscribed State */}
        {subscribed ? (
          <div className="bg-emerald-50 text-emerald-800 font-bold p-4 rounded-2xl border border-emerald-200 inline-block animate-in fade-in">
            {t('newsletter.subscribedMessage')}
          </div>
        ) : (
          /* Newsletter Form */
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative w-full">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />

              <input
                type="email"
                required
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 rounded-full pl-11 pr-4 py-3.5 text-sm text-slate-900 focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>{t('newsletter.subscribeBtn')}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Privacy Note */}
        <p className="text-[10px] text-slate-400">
          {t('newsletter.privacyNote')}
        </p>

      </div>
    </section>
  );
};

export default Newsletter;