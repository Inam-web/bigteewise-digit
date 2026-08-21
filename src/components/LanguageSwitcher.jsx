'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SUPPORTED_LOCALES, LOCALE_INFO } from '@/i18n/config';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'desktop', className = '' }) {
  const { locale, switchLanguage, isPending } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
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

  // Mobile Drawer Menu layout (interactive pill buttons)
  if (variant === 'mobile-drawer') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            Language / Idioma / Lingua / Sprache
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

  // Compact Header / Utility Bar layout
  if (variant === 'utility') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Select Language"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-all duration-200"
        >
          <span>{currentInfo.flag}</span>
          <span className="uppercase text-[10px] font-bold tracking-wider">{currentInfo.code}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-1 z-[110] animate-in fade-in zoom-in-95 duration-150">
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
                  <div className="flex items-center gap-2">
                    <span>{info.flag}</span>
                    <span>{info.nativeName}</span>
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

  // Footer layout
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
          <span>{currentInfo.flag}</span>
          <span>{currentInfo.nativeName}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-44 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
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
                  <div className="flex items-center gap-2.5">
                    <span>{info.flag}</span>
                    <span>{info.nativeName}</span>
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

  // Default Desktop Navbar layout
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Language switcher"
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[12px] xl:text-[13px] font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 border border-transparent hover:border-blue-100 transition-all duration-200"
      >
        <span className="text-sm leading-none">{currentInfo.flag}</span>
        <span className="hidden sm:inline-block font-bold">{currentInfo.nativeName}</span>
        <span className="sm:hidden font-bold uppercase text-[11px]">{currentInfo.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] p-1.5 z-[120] animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1.5 mb-1 border-b border-slate-100 flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-extrabold text-blue-600">
            <Globe className="w-3 h-3" />
            <span>Select Language</span>
          </div>

          {SUPPORTED_LOCALES.map((code) => {
            const info = LOCALE_INFO[code];
            const isActive = code === locale;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold'
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
      )}
    </div>
  );
}
