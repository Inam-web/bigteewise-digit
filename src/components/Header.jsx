'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

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

import {
  FacebookIcon,
  TwitterXIcon,
  InstagramIcon,
  LinkedinIcon,
} from './SocialIcons';

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

export default function Header({
  onOpenQuoteModal,
  activeSection = '',
}) {
  const { t, locale } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuInnerRef = useRef(null);

  const navLinks = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.about'), href: `/${locale}/#about` },
    { name: t('nav.services'), href: `/${locale}/#services` },
    { name: t('nav.process'), href: `/${locale}/#process` },
    { name: t('nav.portfolio'), href: `/${locale}/portfolio` },
    { name: t('nav.team'), href: `/${locale}/#team` },
    { name: t('nav.contact'), href: `/${locale}/#contact` },
  ];

  /* ---------------------------------------------------------
     SCROLL STATE
  --------------------------------------------------------- */

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

  /* ---------------------------------------------------------
     CLOSE MOBILE MENU ON DESKTOP
  --------------------------------------------------------- */

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

  /* ---------------------------------------------------------
     BODY LOCK WHEN MOBILE MENU IS OPEN
  --------------------------------------------------------- */

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

  /* ---------------------------------------------------------
     HEADER INTRO ANIMATION
  --------------------------------------------------------- */

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

  /* ---------------------------------------------------------
     MOBILE MENU ANIMATION
  --------------------------------------------------------- */

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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /* ---------------------------------------------------------
     ACTIVE NAVIGATION
  --------------------------------------------------------- */

  const isLinkActive = (link) => {
    if (link.name === t('nav.portfolio')) {
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
                    className="w-5.5 h-5.5 rounded-md border border-slate-800 bg-slate-900 text-slate-500 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_-6px_rgba(37,99,235,0.8)] flex items-center justify-center transition-all duration-300"
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
          isScrolled ? 'pt-2 sm:pt-3' : 'pt-0'
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
            className={`relative bg-white/[0.97] backdrop-blur-2xl border transition-all duration-500 before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-200/70 before:to-transparent before:pointer-events-none ${
              isScrolled
                ? 'rounded-2xl sm:rounded-[1.35rem] border-slate-200/90 shadow-[0_18px_55px_-22px_rgba(15,23,42,0.28)]'
                : 'border-x-0 border-t-0 border-slate-200/70 shadow-[0_4px_20px_-12px_rgba(15,23,42,0.15)]'
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
                href={`/${locale}`}
                className="header-logo group flex items-center gap-2.5 min-w-0 shrink-0"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-500 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 group-hover:-translate-y-1 group-hover:scale-[1.03] transition-all duration-300">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-12 transition-transform duration-300" />

                  <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />

                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    {t('nav.tagline')}
                  </p>
                </div>
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}

              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);

                  /* ---------------------------------------------
                     SERVICES NAV ITEM
                  --------------------------------------------- */

                  if (link.name === t('nav.services')) {
                    return (
                      <div
                        key={link.name}
                        className="header-nav-item relative group"
                      >
                        <Link
                          href={link.href}
                          className={`relative flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[12px] xl:text-[13px] font-bold tracking-wide border transition-all duration-300 ${
                            isActive
                              ? 'text-blue-600 bg-blue-50/80 border-blue-100 shadow-[0_4px_14px_-8px_rgba(37,99,235,0.45)]'
                              : 'text-slate-600 bg-transparent border-transparent hover:text-blue-600 hover:bg-blue-50/60 hover:border-blue-100/80 hover:shadow-[0_6px_18px_-12px_rgba(37,99,235,0.55)] hover:-translate-y-[1px]'
                          }`}
                        >
                          {t('nav.services')}

                          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />

                          <span
                            className={`absolute left-3 right-3 bottom-1 h-[2px] rounded-full bg-blue-600 transition-all duration-300 ${
                              isActive
                                ? 'scale-x-100 opacity-100'
                                : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                            }`}
                          />
                        </Link>

                        {/* -----------------------------------------
                            SERVICES DROPDOWN
                        ----------------------------------------- */}

                        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                          <div className="relative w-[min(560px,calc(100vw-32px))]">
                            <div className="absolute left-1/2 -top-1.5 w-3 h-3 rotate-45 bg-white border-l border-t border-slate-200" />

                            <div className="relative bg-white border border-slate-200/90 rounded-2xl shadow-[0_25px_70px_-20px_rgba(15,23,42,0.3)] p-3 overflow-hidden">
                              {/* Top highlight */}
                              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

                              <div className="px-3 pt-2 pb-3 mb-1 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                  <p className="text-[9px] uppercase tracking-[0.18em] font-black text-blue-600">
                                    {t('nav.whatWeDo')}
                                  </p>

                                  <p className="mt-0.5 text-xs font-bold text-slate-900">
                                    {t('nav.exploreServices')}
                                  </p>
                                </div>

                                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                                  <Sparkles className="w-4 h-4 text-blue-500" />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5">
                                {SERVICES && SERVICES.length > 0 ? (
                                  SERVICES.map((service, index) => (
                                    <Link
                                      key={service.id}
                                      href={`/${locale}/services/${service.id}`}
                                      className="group/item relative flex items-center justify-between gap-3 p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/70 hover:shadow-[0_6px_18px_-12px_rgba(37,99,235,0.5)] transition-all duration-300"
                                    >
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[8px] font-black text-blue-500/60 group-hover/item:text-blue-600 transition-colors">
                                            {String(index + 1).padStart(2, '0')}
                                          </span>

                                          <span className="text-[11px] font-bold text-slate-700 group-hover/item:text-blue-600 transition-colors truncate">
                                            {service.title}
                                          </span>
                                        </div>

                                        {service.category && (
                                          <span className="block mt-1 ml-5 text-[8px] font-semibold uppercase tracking-wider text-slate-400 group-hover/item:text-blue-400 truncate transition-colors">
                                            {service.category}
                                          </span>
                                        )}
                                      </div>

                                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-300 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all duration-300" />
                                    </Link>
                                  ))
                                ) : (
                                  <div className="col-span-2 text-xs text-slate-400 p-4 text-center">
                                    No services found
                                  </div>
                                )}
                              </div>

                              <Link
                                href={`/${locale}/#services`}
                                className="group/all mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 text-[10px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-all duration-300"
                              >
                                {t('nav.viewAllServices')}

                                <ArrowRight className="w-3 h-3 group-hover/all:translate-x-1 transition-transform duration-300" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  /* ---------------------------------------------
                     NORMAL NAV ITEM
                  --------------------------------------------- */

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`header-nav-item group relative px-3 py-2.5 rounded-xl text-[12px] xl:text-[13px] font-bold tracking-wide border transition-all duration-300 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50/80 border-blue-100 shadow-[0_4px_14px_-8px_rgba(37,99,235,0.45)]'
                          : 'text-slate-600 bg-transparent border-transparent hover:text-blue-600 hover:bg-blue-50/60 hover:border-blue-100/80 hover:shadow-[0_6px_18px_-12px_rgba(37,99,235,0.55)] hover:-translate-y-[1px]'
                      }`}
                    >
                      {link.name}

                      <span
                        className={`absolute left-3 right-3 bottom-1 h-[2px] rounded-full bg-blue-600 origin-center transition-all duration-300 ${
                          isActive
                            ? 'scale-x-100 opacity-100'
                            : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* =================================================
                  DESKTOP CTA + LANGUAGE
              ================================================= */}

              <div className="header-cta hidden lg:flex items-center gap-3 shrink-0">
                <LanguageSwitcher />

                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group relative overflow-hidden inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] xl:text-[13px] font-black px-4 xl:px-5 py-2.5 rounded-full border border-blue-500/40 shadow-[0_8px_25px_-10px_rgba(37,99,235,0.7)] hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.8)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-300"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                  <span className="relative z-10">
                    {t('nav.getAQuote')}
                  </span>

                  <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* =================================================
                  MOBILE ACTIONS
              ================================================= */}

              <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0 relative z-50">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group relative overflow-hidden inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-black px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-blue-500/40 shadow-md shadow-blue-600/20 hover:shadow-[0_8px_22px_-8px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-300 shrink-0 whitespace-nowrap"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                  <span className="relative z-10">
                    {t('nav.getQuoteMobile')}
                  </span>

                  <ArrowRight className="relative z-10 w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMobileMenuOpen((prev) => !prev)
                  }
                  aria-label={
                    mobileMenuOpen
                      ? 'Close navigation menu'
                      : 'Open navigation menu'
                  }
                  aria-expanded={mobileMenuOpen}
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all duration-300 relative ${
                    mobileMenuOpen
                      ? 'bg-slate-950 border-slate-800 text-white shadow-[0_8px_25px_-10px_rgba(15,23,42,0.5)]'
                      : 'bg-white border-slate-200 text-slate-800 shadow-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 hover:shadow-[0_6px_18px_-10px_rgba(37,99,235,0.45)]'
                  }`}
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
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
            {/* Subtle top accent */}
            <div className="h-px mx-6 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            <div className="px-5 sm:px-7 py-6 sm:py-8">
              {/* ---------------------------------------------
                  MOBILE MENU HEADER
              --------------------------------------------- */}

              <div className="mobile-nav-item flex items-center justify-between pb-4 mb-5 border-b border-slate-200/70">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-600">
                    {t('nav.navigation')}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {t('nav.exploreAgency')}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* ---------------------------------------------
                  MOBILE NAV
              --------------------------------------------- */}

              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = isLinkActive(link);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`mobile-nav-item group relative flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-50/80 border-blue-100 text-blue-600 shadow-[0_6px_18px_-12px_rgba(37,99,235,0.5)]'
                          : 'border-transparent text-slate-700 hover:bg-blue-50/50 hover:border-blue-100/70 hover:text-blue-600 hover:translate-x-0.5'
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
                        className={`w-4 h-4 transition-all duration-300 ${
                          isActive
                            ? 'text-blue-500'
                            : 'text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* ---------------------------------------------
                  MOBILE LANGUAGE
              --------------------------------------------- */}

              <div className="mobile-nav-item mt-4 pt-4 border-t border-slate-200/70">
                <LanguageSwitcher variant="mobile-drawer" />
              </div>

              {/* ---------------------------------------------
                  MOBILE CTA
              --------------------------------------------- */}

              <div className="mobile-nav-item mt-4 pt-4 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();

                    if (onOpenQuoteModal) {
                      onOpenQuoteModal();
                    }
                  }}
                  className="group relative overflow-hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm py-3.5 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-600/25 hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.7)] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />

                  <span className="relative z-10">
                    {t('nav.freeConsultation')}
                  </span>

                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* ---------------------------------------------
                  MOBILE CONTACT / SOCIAL
              --------------------------------------------- */}

              <div className="mobile-social mt-5 pt-5 border-t border-slate-200/70">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 transition-all duration-300 border border-slate-100 hover:border-blue-100 hover:-translate-y-0.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 border border-slate-200 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
                      <Phone className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[8px] uppercase tracking-[0.15em] font-black text-slate-400">
                        Call
                      </div>

                      <div className="text-[11px] font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                        {BUSINESS_INFO.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 transition-all duration-300 border border-slate-100 hover:border-blue-100 hover:-translate-y-0.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 border border-slate-200 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
                      <Mail className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[8px] uppercase tracking-[0.15em] font-black text-slate-400">
                        Email
                      </div>

                      <div className="text-[11px] font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                        {BUSINESS_INFO.email}
                      </div>
                    </div>
                  </a>
                </div>

                {/* SOCIALS */}

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
                        className="group w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 border border-transparent hover:border-blue-500 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
                      >
                        <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* LOCATION */}

                <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-slate-400">
                  <MapPin className="w-3 h-3 text-blue-500" />

                  <span>
                    {BUSINESS_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}