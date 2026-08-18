'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

import { SERVICES } from '../app/Data/content';

import gsap from 'gsap';

const BUSINESS_INFO = {
  phone: '+234 807 352 7146',
  email: 'petergodswill52@gmail.com',
  location: 'UK, United Kingdom',
  socialHandle: '@bigteewisedigital',
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://x.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
};

/* =========================================================
   SOCIAL ICONS
========================================================= */

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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
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

/* =========================================================
   HEADER
========================================================= */

export default function Header({
  onOpenQuoteModal,
  activeSection = '',
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuInnerRef = useRef(null);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Process', href: '/#process' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  /* =======================================================
     SCROLL STATE
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE MENU ON DESKTOP RESIZE
  ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  /* =======================================================
     PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
  ======================================================= */

  useEffect(() => {
    if (mobileMenuOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* =======================================================
     INITIAL GSAP ANIMATION
  ======================================================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [
            '.header-utility',
            '.header-shell',
            '.header-logo',
            '.header-nav-item',
            '.header-cta',
          ],
          {
            clearProps: 'all',
          }
        );

        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      tl.fromTo(
        '.header-utility',
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
        }
      )
        .fromTo(
          '.header-shell',
          {
            y: -18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
          },
          '-=0.3'
        )
        .fromTo(
          '.header-logo',
          {
            x: -20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
          },
          '-=0.35'
        )
        .fromTo(
          '.header-nav-item',
          {
            y: -12,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.045,
          },
          '-=0.3'
        )
        .fromTo(
          '.header-cta',
          {
            scale: 0.92,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
          },
          '-=0.3'
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  /* =======================================================
     MOBILE MENU GSAP
  ======================================================= */

  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        mobileMenuRef.current,
        {
          opacity: 0,
          y: -12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.mobile-nav-item',
        {
          opacity: 0,
          x: -18,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.055,
          delay: 0.08,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.mobile-social',
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          delay: 0.3,
          ease: 'power3.out',
        }
      );
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [mobileMenuOpen]);

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /* =======================================================
     ACTIVE NAV
  ======================================================= */

  const isLinkActive = (link) => {
    if (link.name === 'Portfolio') {
      return (
        activeSection === 'portfolio' ||
        activeSection === 'portfolio page'
      );
    }

    return activeSection === link.name.toLowerCase();
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-[100] pointer-events-none"
    >

      {/* =====================================================
          UTILITY BAR
      ===================================================== */}

      <div
        className={`header-utility pointer-events-auto hidden sm:block bg-slate-950 text-slate-300 border-b border-slate-800/80 transition-all duration-500 ${
          isScrolled
            ? 'max-h-0 overflow-hidden opacity-0'
            : 'max-h-20 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="min-h-9 flex items-center justify-between gap-5">

            {/* Contact */}

            <div className="flex items-center gap-4 lg:gap-6 min-w-0">

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="group flex items-center gap-1.5 text-[10px] lg:text-[11px] font-semibold tracking-wide hover:text-white transition-colors whitespace-nowrap"
              >
                <Phone className="w-3 h-3 text-blue-500 group-hover:scale-110 transition-transform" />
                {BUSINESS_INFO.phone}
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="hidden md:flex group items-center gap-1.5 text-[10px] lg:text-[11px] font-semibold tracking-wide hover:text-white transition-colors whitespace-nowrap"
              >
                <Mail className="w-3 h-3 text-blue-500 group-hover:scale-110 transition-transform" />
                {BUSINESS_INFO.email}
              </a>

              <span className="hidden lg:flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                <MapPin className="w-3 h-3 text-blue-500" />
                {BUSINESS_INFO.location}
              </span>

            </div>

            {/* Social */}

            <div className="flex items-center gap-3 shrink-0">

              <span className="hidden xl:inline text-[10px] text-slate-500">
                {BUSINESS_INFO.socialHandle}
              </span>

              <div className="flex items-center gap-1.5">

                {[
                  {
                    href: BUSINESS_INFO.socialLinks.facebook,
                    Icon: FacebookIcon,
                    label: 'Facebook',
                  },
                  {
                    href: BUSINESS_INFO.socialLinks.twitter,
                    Icon: TwitterXIcon,
                    label: 'X',
                  },
                  {
                    href: BUSINESS_INFO.socialLinks.instagram,
                    Icon: InstagramIcon,
                    label: 'Instagram',
                  },
                  {
                    href: BUSINESS_INFO.socialLinks.linkedin,
                    Icon: LinkedinIcon,
                    label: 'LinkedIn',
                  },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-5.5 h-5.5 rounded-md border border-slate-800 bg-slate-900 text-slate-500 hover:text-white hover:bg-blue-600 hover:border-blue-500 flex items-center justify-center transition-all duration-200"
                  >
                    <Icon className="w-3 h-3" />
                  </a>
                ))}

              </div>

            </div>

          </div>
        </div>
      </div>


      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div
        className={`header-shell pointer-events-auto transition-all duration-500 ${
          isScrolled
            ? 'pt-2 sm:pt-3'
            : 'pt-0'
        }`}
      >

        <div
          className={`max-w-7xl mx-auto transition-all duration-500 ${
            isScrolled
              ? 'px-3 sm:px-5 lg:px-6'
              : 'px-0'
          }`}
        >

          <div
            className={`relative bg-white/95 backdrop-blur-2xl border transition-all duration-500 ${
              isScrolled
                ? 'rounded-2xl sm:rounded-2xl border-slate-200/80 shadow-[0_15px_50px_-20px_rgba(15,23,42,0.25)]'
                : 'border-x-0 border-t-0 border-slate-100 shadow-sm'
            }`}
          >

            <div
              className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 flex items-center justify-between gap-3 transition-all duration-500 ${
                isScrolled
                  ? 'py-2.5 sm:py-3'
                  : 'py-3.5 sm:py-4'
              }`}
            >

              {/* =================================================
                  LOGO
              ================================================= */}

              <Link
                href="/"
                className="header-logo group flex items-center gap-2.5 min-w-0 shrink-0"
              >

                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/35 group-hover:-translate-y-0.5 transition-all duration-300">

                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-12 transition-transform duration-300" />

                  <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />

                </div>

                <div className="min-w-0">

                  <div className="flex items-center gap-0.5 leading-none whitespace-nowrap">

                    <span className="font-black text-[17px] sm:text-xl lg:text-2xl tracking-[-0.04em] text-slate-950">
                      BigTeeWise
                    </span>

                    <span className="font-black text-[17px] sm:text-xl lg:text-2xl tracking-[-0.04em] text-blue-600">
                      Digital
                    </span>

                  </div>

                  <p className="hidden sm:block mt-1 text-[8px] lg:text-[9px] uppercase tracking-[0.13em] font-bold text-slate-400 truncate max-w-[230px]">
                    Creative Agency & Author Branding
                  </p>

                </div>

              </Link>


              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}

              <nav className="hidden lg:flex items-center gap-1">

                {navLinks.map((link) => {

                  const isActive = isLinkActive(link);

                  if (link.name === 'Services') {
                    return (
                      <div
                        key={link.name}
                        className="header-nav-item relative group"
                      >

                        <Link
                          href={link.href}
                          className={`relative flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[12px] xl:text-[13px] font-bold tracking-wide transition-all duration-200 ${
                            isActive
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                          }`}
                        >
                          Services

                          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                        </Link>


                        {/* SERVICES DROPDOWN */}

                        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-250">

                          <div className="relative w-[min(560px,calc(100vw-32px))]">

                            {/* Small arrow */}

                            <div className="absolute left-1/2 -top-1.5 w-3 h-3 rotate-45 bg-white border-l border-t border-slate-200" />

                            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-[0_25px_70px_-20px_rgba(15,23,42,0.3)] p-3 overflow-hidden">

                              {/* Header */}

                              <div className="px-3 pt-2 pb-3 mb-1 border-b border-slate-100 flex items-center justify-between">

                                <div>
                                  <p className="text-[9px] uppercase tracking-[0.18em] font-black text-blue-600">
                                    What we do
                                  </p>

                                  <p className="mt-0.5 text-xs font-bold text-slate-900">
                                    Explore our services
                                  </p>
                                </div>

                                <Sparkles className="w-4 h-4 text-blue-500" />

                              </div>


                              {/* Service Grid */}

                              <div className="grid grid-cols-2 gap-1.5">

                                {SERVICES && SERVICES.length > 0 ? (
                                  SERVICES.map((service, index) => (
                                    <Link
                                      key={service.id}
                                      href={`/services/${service.id}`}
                                      className="group/item relative flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200"
                                    >

                                      <div className="min-w-0">

                                        <div className="flex items-center gap-2">

                                          <span className="text-[8px] font-black text-blue-500/60">
                                            {String(index + 1).padStart(2, '0')}
                                          </span>

                                          <span className="text-[11px] font-bold text-slate-700 group-hover/item:text-blue-600 transition-colors truncate">
                                            {service.title}
                                          </span>

                                        </div>

                                        {service.category && (
                                          <span className="block mt-1 ml-5 text-[8px] font-semibold uppercase tracking-wider text-slate-400 truncate">
                                            {service.category}
                                          </span>
                                        )}

                                      </div>

                                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all" />

                                    </Link>
                                  ))
                                ) : (
                                  <div className="col-span-2 text-xs text-slate-400 p-4 text-center">
                                    No services found
                                  </div>
                                )}

                              </div>

                              <Link
                                href="/#services"
                                className="mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-[10px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-colors"
                              >
                                View all services
                                <ArrowRight className="w-3 h-3" />
                              </Link>

                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`header-nav-item relative px-3 py-2.5 rounded-xl text-[12px] xl:text-[13px] font-bold tracking-wide transition-all duration-200 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

              </nav>


              {/* =================================================
                  DESKTOP CTA
              ================================================= */}

              <div className="header-cta hidden lg:block shrink-0">

                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] xl:text-[13px] font-black px-4 xl:px-5 py-2.5 rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-300"
                >
                  Get A Free Quote

                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

              </div>


              {/* =================================================
                  MOBILE ACTIONS — FIXED & VISIBLE QUOTE BUTTON
              ================================================= */}

              <div className="lg:hidden flex items-center gap-2 shrink-0 relative z-50">

                {/* QUOTE BUTTON — Visible on all mobile/tablet screens */}
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-300 shrink-0 whitespace-nowrap"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-label={
                    mobileMenuOpen
                      ? 'Close navigation menu'
                      : 'Open navigation menu'
                  }
                  aria-expanded={mobileMenuOpen}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 relative ${
                    mobileMenuOpen
                      ? 'bg-slate-950 border-slate-950 text-white shadow-lg shadow-slate-950/20'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200 hover:border-slate-300'
                  }`}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden pointer-events-auto fixed inset-0 top-[calc(3.75rem+env(safe-area-inset-top))] sm:top-[4.5rem] bg-slate-900/30 backdrop-blur-sm"
          onClick={closeMobileMenu}
        >

          <div
            ref={mobileMenuInnerRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl rounded-t-none shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain mx-3 sm:mx-6 border border-slate-200/80"
          >

            <div className="px-5 sm:px-7 py-6 sm:py-8">

              {/* Menu Header */}
              <div className="mobile-nav-item flex items-center justify-between pb-4 mb-5 border-b border-slate-200/70">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-600">
                    Navigation
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Explore BigTeeWise Digital
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = isLinkActive(link);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`mobile-nav-item group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 shadow-sm'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] font-black w-5 ${
                            isActive
                              ? 'text-blue-500'
                              : 'text-slate-300 group-hover:text-blue-400'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-semibold">
                          {link.name}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-all duration-200 ${
                          isActive
                            ? 'text-blue-500'
                            : 'text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* CTA Button */}
              <div className="mobile-nav-item mt-5 pt-5 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    if (onOpenQuoteModal) onOpenQuoteModal();
                  }}
                  className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all duration-300"
                >
                  Get A Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Contact & Social */}
              <div className="mobile-social mt-5 pt-5 border-t border-slate-200/70">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 border border-slate-200 shadow-sm">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[8px] uppercase tracking-[0.15em] font-black text-slate-400">
                        Call
                      </div>
                      <div className="text-[11px] font-bold text-slate-700 truncate">
                        {BUSINESS_INFO.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 border border-slate-200 shadow-sm">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[8px] uppercase tracking-[0.15em] font-black text-slate-400">
                        Email
                      </div>
                      <div className="text-[11px] font-bold text-slate-700 truncate">
                        {BUSINESS_INFO.email}
                      </div>
                    </div>
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-slate-100">
                  <span className="text-[8px] uppercase tracking-[0.2em] font-black text-slate-400">
                    Follow us
                  </span>
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="flex items-center gap-2">
                    {[
                      {
                        href: BUSINESS_INFO.socialLinks.facebook,
                        Icon: FacebookIcon,
                        label: 'Facebook',
                      },
                      {
                        href: BUSINESS_INFO.socialLinks.twitter,
                        Icon: TwitterXIcon,
                        label: 'X',
                      },
                      {
                        href: BUSINESS_INFO.socialLinks.instagram,
                        Icon: InstagramIcon,
                        label: 'Instagram',
                      },
                      {
                        href: BUSINESS_INFO.socialLinks.linkedin,
                        Icon: LinkedinIcon,
                        label: 'LinkedIn',
                      },
                    ].map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20"
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-slate-400">
                  <MapPin className="w-3 h-3" />
                  <span>{BUSINESS_INFO.location}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </header>
  );
}