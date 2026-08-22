'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SUPPORTED_LOCALES, LOCALE_INFO } from '@/i18n/config';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'desktop', className = '' }) {
  const { locale, switchLanguage, isPending } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const currentInfo = LOCALE_INFO[locale] || LOCALE_INFO.en;

  const handleSelect = (code) => {
    switchLanguage(code);
    setIsOpen(false);
  };

  // Mobile Drawer Menu
  if (variant === 'mobile-drawer') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            {locale === 'es' ? 'Idioma' : locale === 'it' ? 'Lingua' : locale === 'de' ? 'Sprache' : 'Language'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LOCALES.map((code) => {
            const info = LOCALE_INFO[code];
            const isActive = code === locale;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                disabled={isPending}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{info.flag}</span>
                  <span>{info.nativeName}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Utility Bar
  if (variant === 'utility') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Select Language"
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700 border border-slate-700 transition-all duration-200"
        >
          <span className="uppercase font-bold">{currentInfo.code}</span>
          <ChevronDown className={`w-2.5 h-2.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-28 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-1 z-[110] animate-in fade-in zoom-in-95 duration-150">
            {SUPPORTED_LOCALES.map((code) => {
              const info = LOCALE_INFO[code];
              const isActive = code === locale;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{info.flag}</span>
                    <span className="uppercase font-bold">{info.code}</span>
                  </div>
                  {isActive && <Check className="w-3 h-3 text-white" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Footer
  if (variant === 'footer') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all duration-200"
        >
          <Globe className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-sm">{currentInfo.flag}</span>
          <span className="uppercase font-bold">{currentInfo.code}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-40 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
            {SUPPORTED_LOCALES.map((code) => {
              const info = LOCALE_INFO[code];
              const isActive = code === locale;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{info.flag}</span>
                    <span className="uppercase font-bold">{info.code}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ✅ DESKTOP - DISTINCT STYLE (different from nav links)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Language switcher"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-2 border-blue-200/50 hover:border-blue-400 hover:from-blue-600/20 hover:to-indigo-600/20 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        {/* Globe icon instead of flag for distinct look */}
        <Globe className="w-3.5 h-3.5 text-blue-600" />
        <span className="font-bold text-xs tracking-wider text-slate-700">
          {currentInfo.code.toUpperCase()}
        </span>
        <ChevronDown className={`w-3 h-3 text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown with distinct design - pill style with gradient background */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white/95 backdrop-blur-xl border-2 border-blue-100/80 rounded-2xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.25)] p-1.5 z-[120] animate-in fade-in zoom-in-95 duration-200">
          {SUPPORTED_LOCALES.map((code) => {
            const info = LOCALE_INFO[code];
            const isActive = code === locale;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{info.flag}</span>
                  <span className="uppercase font-bold tracking-wide">{info.code}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}