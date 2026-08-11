'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Menu, X, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

const BUSINESS_INFO = {
  phone: '+234 800 000 0000',
  email: 'info@bigteewise.com',
  location: 'Lagos, Nigeria',
  socialHandle: '@bigteewisedigital',
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://x.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
};

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function TwitterXIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function Header({ onOpenQuoteModal, activeSection = '' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Utility Bar - Hidden on mobile screen size to maximize vertical viewport space */}
      <div
        className={`hidden sm:block bg-slate-950/95 backdrop-blur-md text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 transition-all duration-300 ${
          isScrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors tracking-wide font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors tracking-wide font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>{BUSINESS_INFO.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-block text-slate-400 font-medium tracking-wide">
              Agency: <span className="text-blue-400 font-semibold">{BUSINESS_INFO.socialHandle}</span>
            </span>
            <div className="flex items-center gap-2">
              <a href={BUSINESS_INFO.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <FacebookIcon className="w-3 h-3" />
              </a>
              <a href={BUSINESS_INFO.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <TwitterXIcon className="w-3 h-3" />
              </a>
              <a href={BUSINESS_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <InstagramIcon className="w-3 h-3" />
              </a>
              <a href={BUSINESS_INFO.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <LinkedinIcon className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Responsive Navbar */}
      <div
        className={`bg-white/95 backdrop-blur-xl transition-all duration-300 border-b ${
          isScrolled ? 'shadow-lg shadow-slate-950/5 border-slate-200/80 py-2.5 sm:py-3' : 'border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo - Scaled responsibly for small screens */}
          <Link href="/" className="flex items-center gap-2.5 shrink group min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col min-w-0 truncate">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-slate-900">BigTeeWise</span>
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-blue-600">Digital</span>
              </div>
              <p className="text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-slate-400 mt-0.5 truncate hidden xs:block">
                Creative Agency & Author Branding
              </p>
            </div>
          </Link>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 tracking-wide relative py-1 whitespace-nowrap ${
                    isActive ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full shadow-sm shadow-blue-500" />}
                </a>
              );
            })}
          </nav>

          {/* Desktop Call To Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span>Get A Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Menu Action Group */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              Get Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-2xl px-5 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-slate-800 hover:text-blue-600 font-semibold text-base py-2.5 px-3 rounded-xl hover:bg-blue-50/60 transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all whitespace-nowrap"
            >
              <span>Get A Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}